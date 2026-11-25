export type ClubApplicationStatus =
  | 'Draft'
  | 'Submitted'
  | 'Under Review'
  | 'Shortlisted'
  | 'Interview Scheduled'
  | 'Accepted'
  | 'Waitlisted'
  | 'Rejected'
  | 'Withdrawn';

export type SkillProficiency = 'Beginner' | 'Intermediate' | 'Advanced';

export interface ApplicantSkill {
  name: string;
  proficiency: SkillProficiency;
  category?: string;
}

export interface ApplicantProject {
  id?: string;
  title: string;
  description: string;
  technologies: string;
  type: 'Individual' | 'Team';
  githubUrl?: string;
  liveDemoUrl?: string;
}

export interface ReviewerNote {
  id: string;
  authorName: string;
  note: string;
  createdAt: string;
}

export interface ClubAnnouncement {
  id: string;
  date: string;
  title: string;
  content: string;
  isImportant?: boolean;
}

export interface TeklozyClub {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  iconName: string;
  accentColor: string;
  bannerGradient: string;
  imageUrl?: string;
  rating?: number;
  difficulty?: string;
  category: string;
  isPublished: boolean;
  isApplicationOpen: boolean;
  applicationDeadline: string;
  mission: string;
  objectives: string[];
  keyFocusAreas: string[];
  skillsDeveloped: string[];
  exampleActivities: Array<{
    title: string;
    description: string;
    frequency?: string;
  }>;
  sampleProjects: Array<{
    title: string;
    description: string;
    tech: string[];
    status: string;
  }>;
  expectedParticipation: string;
  membershipRequirements: string[];
  announcements: ClubAnnouncement[];
  activeMembersCount: number;
}

export interface ClubApplication {
  id: string; // e.g. TK-CLB-2026-84920
  clubId: string;
  clubName: string;
  studentId?: string;

  // STEP 1: Personal Information
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  college: string;
  degree: string;
  branch: string;
  currentYear: string;
  graduationYear: string;
  location: string;

  // STEP 2: Academic Information
  currentCourse: string;
  specialization: string;
  relevantCoursework: string;
  cgpaOrPercentage?: string;
  academicProjectsSummary: string;
  certifications: string;

  // STEP 3: Interests & Preferences
  clubSpecificInterests: string[];
  primaryInterest: string;
  secondaryInterests: string[];
  reasonForJoining: string;
  learningGoals: string;
  expectedContributions: string;

  // STEP 4: Technical & Practical Skills
  skills: ApplicantSkill[];

  // STEP 5: Experience & Projects
  projects: ApplicantProject[];
  hackathonExperience: string;
  communityExperience?: string;
  leadershipExperience?: string;

  // STEP 6: Resume & Supporting Documents
  resumeFileName?: string;
  resumeFileSize?: number;
  resumeStoragePath?: string;
  resumeBase64Url?: string;

  // STEP 7: Availability & Commitment
  hoursPerWeek: string;
  preferredDays: string[];
  workModePreference: string;
  willingnessMeetings: boolean;
  willingnessCollaboration: boolean;
  availabilityNotes?: string;

  // STEP 8: Meta & Review
  status: ClubApplicationStatus;
  consentGiven: boolean;
  createdAt: string;
  updatedAt: string;
  reviewerNotes?: ReviewerNote[];

  // If accepted:
  membershipId?: string;
  membershipIssuedAt?: string;
}

export interface ClubMembership {
  id: string;
  membershipId: string; // e.g. TK-MBR-DEV-2026-1042
  clubId: string;
  clubName: string;
  studentId?: string;
  studentName: string;
  studentEmail: string;
  college: string;
  role: string;
  joinedAt: string;
  status: 'Active' | 'Alumni' | 'Inactive';
}

export interface StudentSegregationFilters {
  clubId?: string;
  primaryInterest?: string;
  secondaryInterest?: string;
  skillName?: string;
  proficiency?: SkillProficiency;
  currentYear?: string;
  experienceLevel?: string;
  status?: ClubApplicationStatus;
  searchQuery?: string;
}
