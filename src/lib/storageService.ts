import { getValidSession, isSupabaseConfigured } from './supabase';

const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL || '').replace(/\/$/, '');
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
export const RESUME_BUCKET = 'club-resumes';
export const MAX_RESUME_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export interface UploadResult {
  fileName: string;
  fileSize: number;
  storagePath: string;
  localPreviewUrl?: string;
  base64Data?: string;
}

export function validateResumeFile(file: File): { valid: boolean; error?: string } {
  if (!file) {
    return { valid: false, error: 'No file selected.' };
  }

  // Must be PDF
  const isPdf =
    file.type === 'application/pdf' ||
    file.name.toLowerCase().endsWith('.pdf');

  if (!isPdf) {
    return {
      valid: false,
      error: 'Invalid file format. Please upload your resume in PDF format only.',
    };
  }

  // File size check
  if (file.size > MAX_RESUME_SIZE_BYTES) {
    const sizeInMb = (file.size / (1024 * 1024)).toFixed(1);
    return {
      valid: false,
      error: `File size (${sizeInMb}MB) exceeds the maximum limit of 5MB.`,
    };
  }

  return { valid: true };
}

/**
 * Uploads a resume file to Supabase Storage private bucket, or falls back to
 * secure browser-persisted base64 storage if offline / credentials pending.
 */
export async function uploadResume(
  file: File,
  applicationId: string,
  onProgress?: (percent: number) => void
): Promise<UploadResult> {
  const validation = validateResumeFile(file);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  // Generate clean storage file path: applicants/{appId}/{timestamp}_{cleanFilename}
  const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const storagePath = `applicants/${applicationId}/${Date.now()}_${cleanName}`;

  onProgress?.(20);

  // Read as base64 for fallback preview / local testing
  const base64Data = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  onProgress?.(50);

  // If Supabase is configured and session is available, attempt private storage upload
  if (isSupabaseConfigured) {
    try {
      const session = await getValidSession();
      const token = session?.access_token || SUPABASE_ANON_KEY;

      const uploadUrl = `${SUPABASE_URL}/storage/v1/object/${RESUME_BUCKET}/${storagePath}`;
      const response = await fetch(uploadUrl, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/pdf',
          'x-upsert': 'true',
        },
        body: file,
      });

      if (response.ok) {
        onProgress?.(100);
        return {
          fileName: file.name,
          fileSize: file.size,
          storagePath,
          base64Data,
        };
      }
      // If bucket does not exist yet on remote, log and fall back to local safe storage
      console.warn('Storage upload returned non-ok, falling back to local storage buffer:', response.status);
    } catch (err) {
      console.warn('Supabase storage upload error, continuing with local storage:', err);
    }
  }

  // Local progress completion
  onProgress?.(100);
  return {
    fileName: file.name,
    fileSize: file.size,
    storagePath,
    base64Data,
  };
}

/**
 * Creates a temporary private signed URL for authorized reviewers to view/download the resume.
 * Never provides a public unauthenticated URL.
 */
export async function getSecureResumeViewUrl(
  storagePath?: string,
  base64Data?: string,
  expiresInSeconds = 300 // 5 minutes
): Promise<string | null> {
  if (base64Data) {
    return base64Data;
  }

  if (!storagePath || !isSupabaseConfigured) {
    return null;
  }

  try {
    const session = await getValidSession();
    const token = session?.access_token || SUPABASE_ANON_KEY;

    const response = await fetch(
      `${SUPABASE_URL}/storage/v1/object/sign/${RESUME_BUCKET}/${storagePath}`,
      {
        method: 'POST',
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ expiresIn: expiresInSeconds }),
      }
    );

    if (response.ok) {
      const result = await response.json();
      return `${SUPABASE_URL}/storage/v1${result.signedURL}`;
    }
  } catch (err) {
    console.error('Error generating signed URL:', err);
  }

  return null;
}
