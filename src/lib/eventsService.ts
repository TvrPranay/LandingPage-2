import { TeklozyEvent, EventRegistration, ParticipantRegistrationStatus } from '../types/events';
import { getValidSession, isSupabaseConfigured } from './supabase';

import hackathonImg from '../assets/images/community/community-8.webp';
import bootcampImg from '../assets/images/community/community-6.webp';
import webinarImg from '../assets/images/community/community-3.webp';

const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL || '').replace(/\/$/, '');
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const EVENTS_STORAGE_KEY = 'teklozy_events_cache_v2';
const REGISTRATIONS_STORAGE_KEY = 'teklozy_event_registrations_v2';

export const INITIAL_EVENTS: TeklozyEvent[] = [
  {
    id: 'teklozy-hackathon-2026',
    slug: 'teklozy-hackathon-2026',
    title: 'Teklozy Hackathon 2026',
    tagline: 'Code, collaborate, and build high-impact tech solutions in 48 hours.',
    category: 'Hackathon',
    dates: '19 December 2026 – 20 December 2026',
    startDate: '2026-12-19T09:00:00+05:30',
    endDate: '2026-12-20T19:00:00+05:30',
    duration: 'Two days (48 Hours)',
    mode: 'Hybrid',
    location: 'To be announced (Hybrid / Online Options Available)',
    bannerUrl: hackathonImg,
    imageUrl: hackathonImg,
    rating: 5.0,
    difficulty: 'Moderate Level',
    registrationStatus: 'Open',
    registrationDeadline: '12 December 2026, 11:59 PM IST',
    capacity: 250,
    currentRegistrations: 42,
    isFeatured: true,
    isPublished: true,
    about:
      'Teklozy Hackathon 2026 is our flagship student technology competition designed to bring together aspiring engineers, designers, and innovators. Over two action-packed days, teams will prototype real solutions to modern challenges, receive live mentor guidance, and present their work to tech leaders.',
    themes: [
      {
        title: 'EdTech & Adaptive Learning Systems',
        description: 'Personalized learning journeys, automated grading assistance, and accessible student skill progression.',
        isProvisional: true,
      },
      {
        title: 'Applied AI & Workflow Automation',
        description: 'Autonomous agents, document intelligence, assistive tools, and domain-specific LLM workflows.',
        isProvisional: true,
      },
      {
        title: 'Open Developer Infrastructure & Cloud Tools',
        description: 'Developer productivity tools, micro-SaaS utilities, CI/CD helpers, and secure API frameworks.',
        isProvisional: true,
      },
      {
        title: 'Sustainable Tech & Public Goods',
        description: 'Campus sustainability, resource optimization, smart energy analytics, and civic tech.',
        isProvisional: true,
      },
    ],
    eligibility: [
      'Open to all currently enrolled college / university students (Undergraduate & Postgraduate).',
      'Recent graduates (batch 2025/2026) are welcome to join.',
      'Solo participants and inter-college teams are fully permitted.',
      'Basic programming knowledge in any language or design tool is recommended.',
    ],
    teamConfig: {
      minTeamSize: 1,
      maxTeamSize: 4,
      allowIndividual: true,
    },
    rules: [
      'All code and project assets must be created during the official hackathon duration.',
      'Public repositories on GitHub with regular commits must be maintained throughout the event.',
      'Third-party open-source libraries, APIs, and boilerplate starters are permitted with proper attribution.',
      'Plagiarism or submission of pre-built commercial software will lead to immediate disqualification.',
      'Every team member must abide by the Teklozy Community Code of Conduct.',
    ],
    faqs: [
      {
        question: 'Who can participate in Teklozy Hackathon 2026?',
        answer: 'Any student enrolled in an accredited institution or university can participate. Beginners and experienced builders alike are encouraged to participate.',
      },
      {
        question: 'Is there any registration fee?',
        answer: 'No. Registration for Teklozy Hackathon 2026 is completely free of cost for all verified students.',
      },
      {
        question: 'Can I participate individually without a team?',
        answer: 'Yes! You can register as an individual participant. We also provide a community team-formation channel prior to kick-off if you wish to join forces with other participants.',
      },
      {
        question: 'When will problem statements be finalized?',
        answer: 'Final problem tracks will be unveiled during the Opening Ceremony on Day 1 (19 December 2026) to ensure fair competition.',
      },
      {
        question: 'Can team members be from different colleges?',
        answer: 'Yes, cross-college and inter-disciplinary teams are fully permitted and supported.',
      },
    ],
    placeholders: {
      venue: 'To be announced (Hybrid: Online Hackathon Discord + Regional Partner Hubs)',
      prizes: 'To be announced (Merit awards, sponsor tracks, and internship interviews)',
      sponsors: 'To be announced (Industry partner invitations underway)',
      finalProblems: 'To be announced (Detailed problem briefs revealed at 10:00 AM, 19 Dec 2026)',
    },
    provisionalSchedule: [
      {
        day: 'Day 1 — Saturday',
        date: '19 December 2026',
        isProvisional: true,
        items: [
          { time: '09:00 AM', title: 'Opening Ceremony & Keynote Address', description: 'Welcome address by the Teklozy team and briefing on hackathon rules and judging criteria.' },
          { time: '10:00 AM', title: 'Problem Statement Announcement', description: 'Release of detailed problem tracks and challenge briefs.' },
          { time: '10:30 AM', title: 'Team Confirmation & Workspace Allocation', description: 'Verification of team rosters and distribution of digital workspace credentials.' },
          { time: '11:00 AM', title: 'Hacking Begins (Round 1)', description: 'Sprint starts! Ideation, wireframing, architecture setup, and initial codebase creation.' },
          { time: '03:30 PM', title: 'Mentor Round 1: Architecture Check-in', description: '1-on-1 mentor breakout rooms for technical feedback and scope refinement.' },
          { time: '08:00 PM', title: 'Midpoint Milestone Sync & Dinner Break', description: 'Progress update commit checkpoint and community lightning games.' },
        ],
      },
      {
        day: 'Day 2 — Sunday',
        date: '20 December 2026',
        isProvisional: true,
        items: [
          { time: '08:30 AM', title: 'Morning Standup & Mentoring Round 2', description: 'Reviewing deployment hurdles, polishing user flows, and demo prep.' },
          { time: '01:00 PM', title: 'Feature Freeze & Dry Runs', description: 'Finalizing live demos and preparing 3-minute video/pitch presentation.' },
          { time: '03:00 PM', title: 'Code Freeze & Project Submission Deadline', description: 'Hard cutoff for GitHub repo submissions and project documentation.' },
          { time: '04:00 PM', title: 'Project Demonstrations & Evaluation', description: 'Live showcase to the evaluation panel and peer questions.' },
          { time: '06:30 PM', title: 'Closing Ceremony & Winner Announcement', description: 'Concluding remarks, awards presentation, and certificate distribution.' },
        ],
      },
    ],
    announcements: [
      {
        id: 'ann-1',
        date: '15 November 2026',
        title: 'Registrations officially opened for Teklozy Hackathon 2026',
        content: 'Applications are now open for all student cohorts. Form your teams or sign up individually before the 12 December deadline.',
        isImportant: true,
      },
      {
        id: 'ann-2',
        date: '17 November 2026',
        title: 'Mentor & Volunteer onboarding in progress',
        content: 'Technical mentors specializing in AI, Cloud, and Product Design are currently being matched with participating teams.',
        isImportant: false,
      },
    ],
  },
  {
    id: 'fullstack-production-bootcamp-2026',
    slug: 'fullstack-production-bootcamp',
    title: 'Full-Stack Architecture & Cloud Bootcamp',
    tagline: 'Design resilient micro-services, Postgres schemas, and modern React clients.',
    category: 'Bootcamp',
    dates: '05 December 2026 – 07 December 2026',
    startDate: '2026-12-05T10:00:00+05:30',
    endDate: '2026-12-07T17:00:00+05:30',
    duration: '3 Days intensive',
    mode: 'Online',
    location: 'Teklozy Live Classroom & Discord',
    bannerUrl: bootcampImg,
    imageUrl: bootcampImg,
    rating: 4.8,
    difficulty: 'Hard Level',
    registrationStatus: 'Open',
    registrationDeadline: '02 December 2026',
    capacity: 100,
    currentRegistrations: 78,
    isFeatured: false,
    isPublished: true,
    about: 'An intensive, hands-on masterclass where students transition from toy applications to production-grade architecture with real-world authentication, indexing, caching, and CI/CD pipelines.',
    themes: [
      { title: 'Schema Design & Data Modeling', description: 'Normal forms, UUID vs Bigint, migrations, and index strategies.' },
      { title: 'Secure Authentication & RBAC', description: 'JWTs, session tokens, refresh flows, and Row Level Security.' },
    ],
    eligibility: ['Basic familiarity with JavaScript/TypeScript and database concepts.'],
    teamConfig: { minTeamSize: 1, maxTeamSize: 1, allowIndividual: true },
    rules: ['Active participation in hands-on labs required for certification.'],
    faqs: [{ question: 'Are recordings provided?', answer: 'Yes, all enrolled students receive lifetime access to session recordings.' }],
    placeholders: { venue: 'Online Stream', prizes: 'Not Applicable', sponsors: 'Teklozy Education Lab', finalProblems: 'Capstone architecture project' },
    provisionalSchedule: [],
    announcements: [],
  },
  {
    id: 'open-source-career-roundtable',
    slug: 'open-source-career-roundtable',
    title: 'Open Source Engineering & Career Roundtable',
    tagline: 'How contributing to open source accelerates your first high-growth developer role.',
    category: 'Webinar',
    dates: '28 November 2026',
    startDate: '2026-11-28T18:00:00+05:30',
    endDate: '2026-11-28T20:00:00+05:30',
    duration: '2 Hours',
    mode: 'Online',
    location: 'YouTube Live & Interactive Q&A',
    bannerUrl: webinarImg,
    imageUrl: webinarImg,
    rating: 4.9,
    difficulty: 'Easy Level',
    registrationStatus: 'Open',
    registrationDeadline: '28 November 2026, 05:00 PM',
    capacity: 500,
    currentRegistrations: 210,
    isFeatured: false,
    isPublished: true,
    about: 'Join industry contributors as they break down how to find good first issues, communicate effectively with maintainers, and translate merged pull requests into tangible job offers.',
    themes: [{ title: 'GitHub Workflows', description: 'Forking, branch management, clean commit hygiene, and RFCs.' }],
    eligibility: ['Open to all students and self-taught developers.'],
    teamConfig: { minTeamSize: 1, maxTeamSize: 1, allowIndividual: true },
    rules: ['Polite and constructive dialogue in chat.'],
    faqs: [],
    placeholders: { venue: 'Online Webinar', prizes: 'None', sponsors: 'Teklozy Community', finalProblems: 'None' },
    provisionalSchedule: [],
    announcements: [],
  },
];

// Helper to load events from cache or initial
export function loadEvents(): TeklozyEvent[] {
  if (typeof window === 'undefined') return INITIAL_EVENTS;
  try {
    const raw = window.localStorage.getItem(EVENTS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((e) => (e.mode === 'Ofline' ? { ...e, mode: 'Hybrid' } : e));
      }
    }
  } catch {
    // ignore
  }
  return INITIAL_EVENTS;
}

export function saveEvents(events: TeklozyEvent[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(events));
  } catch {
    // ignore
  }
}

export function loadRegistrations(): EventRegistration[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(REGISTRATIONS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // ignore
  }
  return [];
}

export function saveRegistrations(registrations: EventRegistration[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(REGISTRATIONS_STORAGE_KEY, JSON.stringify(registrations));
  } catch {
    // ignore
  }
}

// Generate unique ID
export function generateRegistrationId(): string {
  const rand = Math.floor(10000 + Math.random() * 90000);
  return `TK-EVT-2026-${rand}`;
}

export async function getEvents(): Promise<TeklozyEvent[]> {
  const local = loadEvents();
  if (isSupabaseConfigured) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1500);
      const response = await fetch(`${SUPABASE_URL}/rest/v1/events?select=*&order=start_date.asc`, {
        headers: { apikey: SUPABASE_ANON_KEY },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (response.ok) {
        const rows = await response.json();
        if (Array.isArray(rows) && rows.length > 0) {
          // Map DB rows to TeklozyEvent
          const mapped = rows.map((r: any) => ({
            id: r.id,
            slug: r.slug,
            title: r.title,
            tagline: r.tagline || '',
            category: r.category,
            dates: r.dates || '',
            startDate: r.start_date,
            endDate: r.end_date,
            duration: r.duration || '',
            mode: r.mode || 'Online',
            location: r.location || '',
            registrationStatus: r.registration_status || 'Open',
            registrationDeadline: r.registration_deadline || '',
            capacity: r.capacity,
            currentRegistrations: r.current_registrations || 0,
            isFeatured: Boolean(r.is_featured),
            isPublished: Boolean(r.is_published),
            about: r.about || '',
            themes: r.themes || [],
            eligibility: r.eligibility || [],
            teamConfig: r.team_config || { minTeamSize: 1, maxTeamSize: 4, allowIndividual: true },
            rules: r.rules || [],
            faqs: r.faqs || [],
            placeholders: r.placeholders || { venue: 'To be announced', prizes: 'To be announced', sponsors: 'To be announced', finalProblems: 'To be announced' },
            provisionalSchedule: r.provisional_schedule || [],
            announcements: r.announcements || [],
          }));
          saveEvents(mapped);
          return mapped;
        }
      }
    } catch {
      // fallback to local
    }
  }
  return local;
}

export async function getEventBySlug(slug: string): Promise<TeklozyEvent | null> {
  const events = await getEvents();
  return events.find((e) => e.slug === slug || e.id === slug) || null;
}

export async function registerForEvent(input: Omit<EventRegistration, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<EventRegistration> {
  const existing = loadRegistrations();

  // Duplicate registration check: same email for same event
  const isDuplicate = existing.some(
    (r) => r.eventId === input.eventId && r.email.trim().toLowerCase() === input.email.trim().toLowerCase()
  );
  if (isDuplicate) {
    throw new Error(`A registration with email ${input.email} already exists for this event.`);
  }

  const id = generateRegistrationId();
  const now = new Date().toISOString();
  const registration: EventRegistration = {
    ...input,
    id,
    status: 'Submitted',
    createdAt: now,
    updatedAt: now,
  };

  const updated = [registration, ...existing];
  saveRegistrations(updated);

  // Sync count on local event
  const events = loadEvents();
  const eventIdx = events.findIndex((e) => e.id === input.eventId);
  if (eventIdx !== -1) {
    events[eventIdx].currentRegistrations = (events[eventIdx].currentRegistrations || 0) + 1;
    saveEvents(events);
  }

  // If Supabase configured, attempt insert
  if (isSupabaseConfigured) {
    try {
      const session = await getValidSession();
      const token = session?.access_token || SUPABASE_ANON_KEY;
      await fetch(`${SUPABASE_URL}/rest/v1/event_registrations`, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          id,
          event_id: input.eventId,
          event_title: input.eventTitle,
          full_name: input.fullName,
          email: input.email.toLowerCase(),
          phone: input.phone,
          college: input.college,
          degree: input.degree,
          branch: input.branch,
          current_year: input.currentYear,
          location: input.location,
          participation_type: input.participationType,
          team_name: input.teamName || null,
          team_size: input.teamSize || 1,
          team_members: input.teamMembers || [],
          preferred_domain: input.preferredDomain,
          technical_skills: input.technicalSkills,
          experience_level: input.experienceLevel,
          github_url: input.githubUrl || null,
          linkedin_url: input.linkedinUrl || null,
          portfolio_url: input.portfolioUrl || null,
          project_highlight: input.projectHighlight || null,
          motivation: input.motivation,
          status: 'Submitted',
        }),
      });
    } catch (err) {
      console.warn('Supabase insert failed, local record preserved:', err);
    }
  }

  return registration;
}

export async function getStudentEventRegistrations(email?: string): Promise<EventRegistration[]> {
  const registrations = loadRegistrations();
  if (!email) return registrations;
  return registrations.filter((r) => r.email.toLowerCase() === email.toLowerCase());
}

export async function getAllEventRegistrations(): Promise<EventRegistration[]> {
  const local = loadRegistrations();
  if (isSupabaseConfigured) {
    try {
      const session = await getValidSession();
      if (session) {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/event_registrations?select=*&order=created_at.desc`, {
          headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${session.access_token}`,
          },
        });
        if (response.ok) {
          const rows = await response.json();
          if (Array.isArray(rows)) {
            const mapped = rows.map((r: any) => ({
              id: r.id,
              eventId: r.event_id,
              eventTitle: r.event_title,
              fullName: r.full_name,
              email: r.email,
              phone: r.phone,
              college: r.college,
              degree: r.degree,
              branch: r.branch,
              currentYear: r.current_year,
              location: r.location,
              participationType: r.participation_type,
              teamName: r.team_name,
              teamSize: r.team_size,
              teamMembers: r.team_members || [],
              preferredDomain: r.preferred_domain,
              technicalSkills: r.technical_skills || [],
              experienceLevel: r.experience_level,
              githubUrl: r.github_url,
              linkedinUrl: r.linkedin_url,
              portfolioUrl: r.portfolio_url,
              projectHighlight: r.project_highlight,
              motivation: r.motivation,
              status: r.status,
              createdAt: r.created_at,
              updatedAt: r.updated_at,
              reviewerNotes: r.reviewer_notes,
            }));
            saveRegistrations(mapped);
            return mapped;
          }
        }
      }
    } catch {
      // fallback
    }
  }
  return local;
}

export async function updateEventRegistrationStatus(
  registrationId: string,
  newStatus: ParticipantRegistrationStatus,
  reviewerNotes?: string
): Promise<EventRegistration> {
  const registrations = loadRegistrations();
  const index = registrations.findIndex((r) => r.id === registrationId);
  if (index === -1) {
    throw new Error('Registration record not found.');
  }

  const updated: EventRegistration = {
    ...registrations[index],
    status: newStatus,
    reviewerNotes: reviewerNotes ?? registrations[index].reviewerNotes,
    updatedAt: new Date().toISOString(),
  };

  registrations[index] = updated;
  saveRegistrations(registrations);

  if (isSupabaseConfigured) {
    try {
      const session = await getValidSession();
      if (session) {
        await fetch(`${SUPABASE_URL}/rest/v1/event_registrations?id=eq.${registrationId}`, {
          method: 'PATCH',
          headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status: newStatus,
            reviewer_notes: updated.reviewerNotes,
            updated_at: updated.updatedAt,
          }),
        });
      }
    } catch {
      // fallback
    }
  }

  return updated;
}

export async function saveEvent(event: TeklozyEvent): Promise<TeklozyEvent> {
  const events = loadEvents();
  const index = events.findIndex((e) => e.id === event.id);
  if (index !== -1) {
    events[index] = event;
  } else {
    events.unshift(event);
  }
  saveEvents(events);
  return event;
}

export async function addEventAnnouncement(
  eventId: string,
  title: string,
  content: string,
  isImportant = false
): Promise<void> {
  const events = loadEvents();
  const event = events.find((e) => e.id === eventId);
  if (event) {
    const ann = {
      id: `ann-${Date.now()}`,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      title,
      content,
      isImportant,
    };
    event.announcements = [ann, ...(event.announcements || [])];
    saveEvents(events);
  }
}

export function exportRegistrationsToCsv(registrations: EventRegistration[]): string {
  const headers = [
    'Registration ID',
    'Event Title',
    'Participant Name',
    'Email',
    'Phone',
    'College',
    'Degree',
    'Branch',
    'Academic Year',
    'Type',
    'Team Name',
    'Team Size',
    'Preferred Domain',
    'Skills',
    'Status',
    'Registered At',
  ];

  const escapeCell = (val: any) => `"${String(val ?? '').replace(/"/g, '""')}"`;

  const rows = registrations.map((r) => [
    escapeCell(r.id),
    escapeCell(r.eventTitle),
    escapeCell(r.fullName),
    escapeCell(r.email),
    escapeCell(r.phone),
    escapeCell(r.college),
    escapeCell(r.degree),
    escapeCell(r.branch),
    escapeCell(r.currentYear),
    escapeCell(r.participationType),
    escapeCell(r.teamName || 'N/A'),
    escapeCell(r.teamSize || 1),
    escapeCell(r.preferredDomain),
    escapeCell((r.technicalSkills || []).join('; ')),
    escapeCell(r.status),
    escapeCell(r.createdAt),
  ]);

  return [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
}
