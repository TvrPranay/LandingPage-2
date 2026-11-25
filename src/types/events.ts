export type EventCategory = 'Hackathon' | 'Workshop' | 'Webinar' | 'Bootcamp' | 'Competition';

export type EventMode = 'Online' | 'Hybrid' | 'In-person';

export type EventRegistrationStatus = 'Open' | 'Closed' | 'Coming Soon';

export type ParticipantRegistrationStatus =
  | 'Submitted'
  | 'Under Review'
  | 'Confirmed'
  | 'Waitlisted'
  | 'Rejected'
  | 'Cancelled';

export interface EventTheme {
  title: string;
  description: string;
  isProvisional?: boolean;
}

export interface ScheduleItem {
  time: string;
  title: string;
  description: string;
}

export interface DaySchedule {
  day: string;
  date: string;
  items: ScheduleItem[];
  isProvisional?: boolean;
}

export interface EventFAQ {
  question: string;
  answer: string;
}

export interface EventAnnouncement {
  id: string;
  date: string;
  title: string;
  content: string;
  isImportant?: boolean;
}

export interface TeklozyEvent {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: EventCategory;
  dates: string;
  startDate: string;
  endDate: string;
  duration: string;
  mode: EventMode;
  location: string;
  bannerUrl?: string;
  imageUrl?: string;
  rating?: number;
  difficulty?: string;
  registrationStatus: EventRegistrationStatus;
  registrationDeadline: string;
  capacity?: number;
  currentRegistrations?: number;
  isFeatured?: boolean;
  isPublished: boolean;
  about: string;
  themes: EventTheme[];
  eligibility: string[];
  teamConfig: {
    minTeamSize: number;
    maxTeamSize: number;
    allowIndividual: boolean;
  };
  rules: string[];
  faqs: EventFAQ[];
  placeholders: {
    venue: string;
    prizes: string;
    sponsors: string;
    finalProblems: string;
  };
  provisionalSchedule: DaySchedule[];
  announcements: EventAnnouncement[];
}

export interface TeamMemberInput {
  name: string;
  email: string;
  phone?: string;
  college?: string;
  role?: string;
}

export interface EventRegistration {
  id: string; // e.g. TK-EVT-2026-10492
  eventId: string;
  eventTitle: string;
  studentId?: string;
  fullName: string;
  email: string;
  phone: string;
  college: string;
  degree: string;
  branch: string;
  currentYear: string;
  location: string;
  participationType: 'Individual' | 'Team';
  teamName?: string;
  teamSize?: number;
  teamMembers?: TeamMemberInput[];
  preferredDomain: string;
  technicalSkills: string[];
  experienceLevel: string;
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  projectHighlight?: string;
  motivation: string;
  status: ParticipantRegistrationStatus;
  submissionUrl?: string;
  createdAt: string;
  updatedAt: string;
  reviewerNotes?: string;
}
