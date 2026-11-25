import {
  TeklozyClub,
  ClubApplication,
  ClubMembership,
  ClubApplicationStatus,
  StudentSegregationFilters,
  ApplicantSkill,
} from '../types/clubs';
import { getValidSession, isSupabaseConfigured } from './supabase';

import devClubImg from '../assets/images/community/community-1.webp';
import aiClubImg from '../assets/images/community/community-2.webp';
import designClubImg from '../assets/images/community/community-4.webp';
import cyberClubImg from '../assets/images/community/community-7.webp';
import innoClubImg from '../assets/images/community/community-8.webp';

const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL || '').replace(/\/$/, '');
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const CLUBS_STORAGE_KEY = 'teklozy_clubs_cache_v2';
const APPLICATIONS_STORAGE_KEY = 'teklozy_club_applications_v2';
const MEMBERSHIPS_STORAGE_KEY = 'teklozy_club_memberships_v2';

export const INITIAL_CLUBS: TeklozyClub[] = [
  {
    id: 'dev-club',
    slug: 'development-club',
    name: 'Development Club',
    tagline: 'Architect scalable web systems, cross-platform apps, and open-source software.',
    description:
      'A community of builders dedicated to production engineering standards, full-stack systems, and open-source sprints.',
    iconName: 'Code2',
    accentColor: '#0088E0',
    bannerGradient: 'from-blue-600 via-sky-600 to-indigo-700',
    imageUrl: devClubImg,
    rating: 4.9,
    difficulty: 'Moderate Level',
    category: 'Software Engineering',
    isPublished: true,
    isApplicationOpen: true,
    applicationDeadline: '15 December 2026',
    mission:
      'To transform theoretical programming knowledge into production-ready software engineering mastery through collaborative real-world projects.',
    objectives: [
      'Bridge the gap between academic CS and production engineering practices.',
      'Contribute meaningfully to open-source software and developer utilities.',
      'Master system architecture, database design, caching, and CI/CD pipelines.',
      'Build portfolio-defining capstone projects with high code quality.',
    ],
    keyFocusAreas: [
      'Frontend Architecture (React, Next.js, TypeScript, Tailwind)',
      'Backend & APIs (Node.js, Go, Python, REST & GraphQL)',
      'Database Systems (PostgreSQL, Supabase, Redis, Data Modeling)',
      'Mobile App Development (React Native, Flutter)',
      'DevOps & Deployment (Docker, GitHub Actions, Cloud Hosting)',
    ],
    skillsDeveloped: [
      'Production TypeScript & React',
      'Scalable REST & GraphQL API Design',
      'PostgreSQL & Database Optimization',
      'Git Workflow, PR Reviews & CI/CD',
      'Performance Tuning & Web Vitals',
    ],
    exampleActivities: [
      {
        title: 'Weekly Production Code Reviews',
        description: 'Peer-led review sessions analyzing pull requests, architectural trade-offs, and clean code patterns.',
        frequency: 'Every Saturday',
      },
      {
        title: 'Monthly 48-Hour Open-Source Sprint',
        description: 'Collaborative sprints finding, fixing, and submitting PRs to popular open-source repositories.',
        frequency: 'Monthly',
      },
      {
        title: 'System Design Mock Interviews',
        description: 'Practical walkthroughs of scaling databases, cache layers, and handling traffic spikes.',
        frequency: 'Bi-weekly',
      },
    ],
    sampleProjects: [
      {
        title: 'Campus Course Review & Resource Hub',
        description: 'Full-stack platform with verified peer course notes, rating metrics, and algorithmic scheduling.',
        tech: ['Next.js', 'PostgreSQL', 'Tailwind CSS', 'Docker'],
        status: 'Active Sprint',
      },
      {
        title: 'Teklozy CLI Developer Toolkit',
        description: 'Lightweight terminal utility scaffolding project architectures, linting rules, and git hooks.',
        tech: ['Node.js', 'TypeScript', 'npm'],
        status: 'Proposed Track',
      },
    ],
    expectedParticipation: '4 to 6 hours per week (sprint meetups, async Discord collaboration, and code contributions).',
    membershipRequirements: [
      'Commitment to attend bi-weekly project syncs.',
      'Basic familiarity with at least one programming language (JavaScript/TypeScript, Python, or Go).',
      'Eagerness to learn in public and contribute actively to team deliverables.',
    ],
    announcements: [
      {
        id: 'dev-ann-1',
        date: '10 November 2026',
        title: 'Spring 2026 Cohort Applications Open',
        content: 'We are accepting 35 passionate student developers across frontend, backend, and full-stack tracks.',
        isImportant: true,
      },
    ],
    activeMembersCount: 28,
  },
  {
    id: 'ai-data-club',
    slug: 'ai-data-science-club',
    name: 'Artificial Intelligence & Data Science Club',
    tagline: 'Explore machine learning models, generative AI workflows, and data pipelines.',
    description:
      'The AI & Data Science Club unites students interested in transforming raw data into actionable insights and intelligent systems. From classical ML and computer vision to modern LLM agents and prompt engineering, members build real intelligent prototypes.',
    iconName: 'BrainCircuit',
    accentColor: '#8B5CF6',
    bannerGradient: 'from-purple-700 via-indigo-600 to-sky-700',
    imageUrl: aiClubImg,
    rating: 4.9,
    difficulty: 'Advanced Track',
    category: 'Artificial Intelligence',
    isPublished: true,
    isApplicationOpen: true,
    applicationDeadline: '15 December 2026',
    mission:
      'To empower students with deep theoretical comprehension and practical engineering capability in machine learning, deep learning, and intelligent data systems.',
    objectives: [
      'Demystify machine learning algorithms through intuitive visual labs.',
      'Build end-to-end data pipelines from data gathering to model deployment.',
      'Experiment with modern generative AI, fine-tuning, RAG, and agentic workflows.',
      'Publish student technical papers and open ML datasets.',
    ],
    keyFocusAreas: [
      'Machine Learning & Deep Learning (PyTorch, TensorFlow, Scikit-Learn)',
      'Generative AI & Agentic Systems (LangChain, LlamaIndex, OpenAI/Gemini APIs)',
      'Data Engineering & Analytics (Pandas, Polars, SQL, Spark)',
      'Computer Vision & Natural Language Processing',
      'AI Ethics, Fairness, and Model Evaluation',
    ],
    skillsDeveloped: [
      'Python for Machine Learning',
      'Data Wrangling & Statistical Analysis',
      'Retrieval-Augmented Generation (RAG) Architecture',
      'Model Deployment & Inference Optimization (FastAPI, ONNX)',
      'Scientific Communication & Visualization',
    ],
    exampleActivities: [
      {
        title: 'Kaggle & Data Sprint Jams',
        description: 'Team-based participation in public data competitions with shared exploratory notebooks.',
        frequency: 'Bi-weekly',
      },
      {
        title: 'Paper Reading & Breakdown Sessions',
        description: 'Deep-dive discussions on recent breakthrough AI research papers and architecture diagrams.',
        frequency: 'Every Wednesday',
      },
      {
        title: 'AI Product Buildathons',
        description: 'Building functional web demos with custom AI models hosted on cloud GPUs.',
        frequency: 'Monthly',
      },
    ],
    sampleProjects: [
      {
        title: 'Intelligent Academic Note Assistant (RAG)',
        description: 'Domain-specific semantic search and study guide generation across university lecture slides.',
        tech: ['Python', 'PyTorch', 'Qdrant Vector DB', 'FastAPI'],
        status: 'Active Sprint',
      },
      {
        title: 'Automated Student Code Quality Evaluator',
        description: 'LLM-powered automated static code reasoning engine that pinpoints security vulnerabilities.',
        tech: ['Python', 'LangChain', 'FastAPI'],
        status: 'Proposed Track',
      },
    ],
    expectedParticipation: '4 to 5 hours per week (paper reviews, lab notebooks, and project builds).',
    membershipRequirements: [
      'Curiosity about data, mathematics, or programming.',
      'Basic knowledge of Python or statistics (beginners with strong motivation are warmly welcome).',
      'Willingness to experiment and document findings rigorously.',
    ],
    announcements: [
      {
        id: 'ai-ann-1',
        date: '12 November 2026',
        title: 'AI Lab Workspace Access granted for new applicants',
        content: 'Shortlisted applicants will receive dedicated sandbox access to cloud compute clusters.',
        isImportant: true,
      },
    ],
    activeMembersCount: 32,
  },
  {
    id: 'design-creative-club',
    slug: 'design-creative-club',
    name: 'Design & Creative Club',
    tagline: 'Craft intuitive user interfaces, visual design systems, and delightful digital experiences.',
    description:
      'The Design & Creative Club brings together visual thinkers, UX researchers, product designers, and creative storytellers. Members master design systems, wireframing, high-fidelity Figma prototyping, and user psychology while partnering directly with developer tracks.',
    iconName: 'Palette',
    accentColor: '#EC4899',
    bannerGradient: 'from-pink-600 via-rose-600 to-amber-600',
    imageUrl: designClubImg,
    rating: 5.0,
    difficulty: 'All Levels',
    category: 'Product & Design',
    isPublished: true,
    isApplicationOpen: true,
    applicationDeadline: '15 December 2026',
    mission:
      'To cultivate human-centered design instincts, aesthetic excellence, and cross-functional product design expertise in student creators.',
    objectives: [
      'Master industry design tooling, component design systems, and token architectures.',
      'Execute user research, empathy mapping, and usability testing.',
      'Bridge the gap between designers and software engineers with clean handoffs.',
      'Build world-class design case studies ready for top product design roles.',
    ],
    keyFocusAreas: [
      'UI/UX Design & Prototyping (Figma, Framer)',
      'Design Systems & Component Libraries (Atomic Design, Tokens)',
      'User Research & Usability Testing',
      'Motion Design & Micro-interactions',
      'Visual Identity, Branding, and Creative Direction',
    ],
    skillsDeveloped: [
      'Figma Auto-layout, Variants & Variables',
      'Wireframing & Interactive Prototyping',
      'User Journey Mapping & Information Architecture',
      'Accessible & Inclusive Design (WCAG 2.1)',
      'Design Critique & Case Study Storytelling',
    ],
    exampleActivities: [
      {
        title: 'Figma Jam & Design Roasts',
        description: 'Constructive feedback sessions examining UI components, typography, and accessibility.',
        frequency: 'Every Thursday',
      },
      {
        title: 'Redesign Challenges',
        description: 'Re-imagining clunky university portals and public software into clean, modern flows.',
        frequency: 'Bi-weekly',
      },
      {
        title: 'Designer-Developer Handoff Labs',
        description: 'Pairing designers with dev club members to turn Figma files into responsive React code.',
        frequency: 'Monthly',
      },
    ],
    sampleProjects: [
      {
        title: 'Teklozy Design System & UI Kit v2',
        description: 'Comprehensive multi-platform tokenized design library covering dark/light themes and components.',
        tech: ['Figma', 'Framer', 'Tokens Studio'],
        status: 'Active Sprint',
      },
      {
        title: 'Campus Transit & Bus Route Mobile App UI',
        description: 'Zero-friction real-time transit tracker concept designed for high stress, bright sunlight use.',
        tech: ['Figma', 'Protopie'],
        status: 'Completed Prototype',
      },
    ],
    expectedParticipation: '3 to 5 hours per week (design critiques, prototype sprints, and peer reviews).',
    membershipRequirements: [
      'Eye for detail and passion for how products look and feel.',
      'Familiarity with Figma or basic visual tools (can be self-taught or beginner level).',
      'Openness to iterative feedback and continuous design refinement.',
    ],
    announcements: [
      {
        id: 'design-ann-1',
        date: '14 November 2026',
        title: 'Figma Community Files & Assets Released',
        content: 'Check out the club starter kits before beginning your application design step.',
        isImportant: false,
      },
    ],
    activeMembersCount: 22,
  },
  {
    id: 'cyber-cloud-club',
    slug: 'cybersecurity-cloud-club',
    name: 'Cybersecurity & Cloud Club',
    tagline: 'Defend systems, explore ethical hacking, and configure resilient cloud infrastructure.',
    description:
      'The Cybersecurity & Cloud Club is where students learn to secure the digital world and run bulletproof cloud workloads. From network packet inspection and CTF challenges to AWS/GCP architecture and Kubernetes clusters, members build rock-solid defensive skills.',
    iconName: 'ShieldCheck',
    accentColor: '#10B981',
    bannerGradient: 'from-emerald-700 via-teal-700 to-cyan-800',
    imageUrl: cyberClubImg,
    rating: 4.8,
    difficulty: 'Moderate Level',
    category: 'Security & DevOps',
    isPublished: true,
    isApplicationOpen: true,
    applicationDeadline: '15 December 2026',
    mission:
      'To build a generation of ethical security engineers and cloud architects capable of designing, auditing, and defending modern computing platforms.',
    objectives: [
      'Instill ethical hacking mindsets and responsible disclosure principles.',
      'Practice penetration testing and web application vulnerability assessment (OWASP Top 10).',
      'Learn Infrastructure-as-Code (Terraform, Docker, Kubernetes).',
      'Compete in collegiate and global Capture The Flag (CTF) security contests.',
    ],
    keyFocusAreas: [
      'Ethical Hacking & Web App Security (OWASP, Burp Suite, Kali)',
      'Cloud Architecture & Administration (AWS, Google Cloud, Azure)',
      'DevOps, Containerization & CI/CD (Docker, Kubernetes, Linux)',
      'Network Security & Protocol Analysis (Wireshark, Nmap)',
      'Cryptography & Identity Management (Zero-Trust, OAuth, PKI)',
    ],
    skillsDeveloped: [
      'Linux Server Administration & Bash Scripting',
      'Vulnerability Scanning & Penetration Testing',
      'Docker Containerization & Kubernetes Orchestration',
      'Cloud IAM & Security Group Configuration',
      'Incident Response & Forensics Fundamentals',
    ],
    exampleActivities: [
      {
        title: 'Weekend CTF War Games',
        description: 'Hands-on jeopardy-style CTFs solving cryptography, reverse engineering, and web challenges.',
        frequency: 'Every other Sunday',
      },
      {
        title: 'Cloud Homelab Build Nights',
        description: 'Spinning up virtual private clouds, load balancers, and monitoring stacks from scratch.',
        frequency: 'Bi-weekly',
      },
      {
        title: 'Vulnerability Tear-downs',
        description: 'Analyzing famous CVEs and understanding the defensive patch applied by security teams.',
        frequency: 'Monthly',
      },
    ],
    sampleProjects: [
      {
        title: 'Automated Student Vulnerability Scanner',
        description: 'Lightweight static analysis and secret detection pipeline for student GitHub repositories.',
        tech: ['Python', 'Docker', 'TruffleHog', 'Linux'],
        status: 'Active Sprint',
      },
      {
        title: 'Multi-Region Kubernetes Observability Stack',
        description: 'Terraform blueprint provisioning Prometheus, Grafana, and automated alert webhooks.',
        tech: ['Terraform', 'Kubernetes', 'Prometheus'],
        status: 'Proposed Track',
      },
    ],
    expectedParticipation: '4 to 5 hours per week (CTF practices, lab exercises, and security research).',
    membershipRequirements: [
      'Strict commitment to ethical principles and educational use of security tools.',
      'Basic comfort with command line / terminal interfaces.',
      'Eagerness to understand how systems operate under the hood.',
    ],
    announcements: [
      {
        id: 'cyber-ann-1',
        date: '11 November 2026',
        title: 'Winter CTF Team Forming',
        content: 'Club members are preparing for the upcoming Inter-College Cyber Defense Invitational.',
        isImportant: true,
      },
    ],
    activeMembersCount: 20,
  },
  {
    id: 'innovation-club',
    slug: 'innovation-entrepreneurship-club',
    name: 'Innovation & Entrepreneurship Club',
    tagline: 'Turn student ideas into viable products, pitch decks, and scalable ventures.',
    description:
      'The Innovation & Entrepreneurship Club is Teklozy’s startup incubator track. Students learn how to validate customer problems, build lean MVPs, pitch to angel mentors, understand unit economics, and collaborate with technical peers to launch actual solutions.',
    iconName: 'Rocket',
    accentColor: '#F59E0B',
    bannerGradient: 'from-amber-600 via-orange-600 to-red-600',
    imageUrl: innoClubImg,
    rating: 4.9,
    difficulty: 'All Levels',
    category: 'Venture & Product',
    isPublished: true,
    isApplicationOpen: true,
    applicationDeadline: '15 December 2026',
    mission:
      'To foster student entrepreneurship, commercial acumen, and customer empathy, turning technical skill into real-world business impact.',
    objectives: [
      'Teach rapid customer discovery, problem-solution fit, and lean startup methodologies.',
      'Guide students through MVP prototyping, landing page testing, and pre-launch campaigns.',
      'Provide pitch deck workshops, financial modeling fundamentals, and mentor matchmaking.',
      'Support teams entering national innovation grants and startup competitions.',
    ],
    keyFocusAreas: [
      'Product Discovery & User Validation',
      'Go-To-Market (GTM) Strategy & Growth Marketing',
      'Pitch Deck Crafting & Investor Communications',
      'Business Model Canvases & Unit Economics',
      'Intellectual Property & Startup Legal Basics',
    ],
    skillsDeveloped: [
      'Customer Interviewing & Problem Validation',
      'Product Management & Feature Prioritization',
      'Public Speaking, Pitching & Storytelling',
      'No-Code MVP Prototyping',
      'Market Sizing & Competitive Landscaping',
    ],
    exampleActivities: [
      {
        title: 'Pitch Practice & Shark Tank Nights',
        description: 'Students present 3-minute pitches to guest founders and receive unvarnished feedback.',
        frequency: 'Bi-weekly',
      },
      {
        title: 'Customer Discovery Sprints',
        description: 'Conducting 10+ real user interviews in a week to validate or invalidate project assumptions.',
        frequency: 'Monthly',
      },
      {
        title: 'Founder Fireside Chats',
        description: 'Intimate Q&A sessions with early-stage venture founders sharing lessons from the trenches.',
        frequency: 'Monthly',
      },
    ],
    sampleProjects: [
      {
        title: 'Hyper-Local Campus Book Exchange & Resale',
        description: 'Student-built marketplace that connected 500+ campus students with discounted textbook rentals.',
        tech: ['React', 'Supabase', 'Stripe API'],
        status: 'Beta Testing',
      },
      {
        title: 'Micro-Internship Project Marketplace',
        description: 'Platform connecting university clubs with fast 2-week freelance design and dev assignments.',
        tech: ['Next.js', 'Tailwind', 'PostgreSQL'],
        status: 'Proposed Track',
      },
    ],
    expectedParticipation: '3 to 5 hours per week (pitch practice, mentor check-ins, and team strategy).',
    membershipRequirements: [
      'High initiative and drive to solve real problems.',
      'No prior business experience required — open to all engineering and creative disciplines.',
      'Desire to build something people want.',
    ],
    announcements: [
      {
        id: 'inno-ann-1',
        date: '13 November 2026',
        title: 'Seed Grant Mentorship Tracks Announced',
        content: 'Three student venture ideas will be selected for direct incubation and pilot testing support.',
        isImportant: true,
      },
    ],
    activeMembersCount: 25,
  },
];

export function loadClubs(): TeklozyClub[] {
  if (typeof window === 'undefined') return INITIAL_CLUBS;
  try {
    const raw = window.localStorage.getItem(CLUBS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // ignore
  }
  return INITIAL_CLUBS;
}

export function saveClubs(clubs: TeklozyClub[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(CLUBS_STORAGE_KEY, JSON.stringify(clubs));
  } catch {
    // ignore
  }
}

export function loadApplications(): ClubApplication[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(APPLICATIONS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // ignore
  }
  return [];
}

export function saveApplications(apps: ClubApplication[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(apps));
  } catch {
    // ignore
  }
}

export function loadMemberships(): ClubMembership[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(MEMBERSHIPS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // ignore
  }
  return [];
}

export function saveMemberships(memberships: ClubMembership[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(MEMBERSHIPS_STORAGE_KEY, JSON.stringify(memberships));
  } catch {
    // ignore
  }
}

export function generateApplicationId(): string {
  const rand = Math.floor(10000 + Math.random() * 90000);
  return `TK-CLB-2026-${rand}`;
}

export function generateMembershipId(clubSlug: string): string {
  const prefix = clubSlug.slice(0, 3).toUpperCase();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `TK-MBR-${prefix}-${rand}`;
}

export async function getClubs(): Promise<TeklozyClub[]> {
  const local = loadClubs();
  if (isSupabaseConfigured) {
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/clubs?select=*&order=name.asc`, {
        headers: { apikey: SUPABASE_ANON_KEY },
      });
      if (response.ok) {
        const rows = await response.json();
        if (Array.isArray(rows) && rows.length > 0) {
          const mapped: TeklozyClub[] = rows.map((r: any) => ({
            id: r.id,
            slug: r.slug,
            name: r.name,
            tagline: r.tagline || '',
            description: r.description || '',
            iconName: r.icon_name || 'Code2',
            accentColor: r.accent_color || '#0088E0',
            bannerGradient: r.banner_gradient || 'from-blue-600 to-indigo-700',
            category: r.category || 'General',
            isPublished: Boolean(r.is_published),
            isApplicationOpen: Boolean(r.is_application_open),
            applicationDeadline: r.application_deadline || '',
            mission: r.mission || '',
            objectives: r.objectives || [],
            keyFocusAreas: r.key_focus_areas || [],
            skillsDeveloped: r.skills_developed || [],
            exampleActivities: r.example_activities || [],
            sampleProjects: r.sample_projects || [],
            expectedParticipation: r.expected_participation || '',
            membershipRequirements: r.membership_requirements || [],
            announcements: r.announcements || [],
            activeMembersCount: r.active_members_count || 0,
          }));
          saveClubs(mapped);
          return mapped;
        }
      }
    } catch {
      // fallback
    }
  }
  return local;
}

export async function getClubBySlug(slug: string): Promise<TeklozyClub | null> {
  const clubs = await getClubs();
  return clubs.find((c) => c.slug === slug || c.id === slug) || null;
}

export async function submitClubApplication(
  input: Omit<ClubApplication, 'id' | 'createdAt' | 'updatedAt' | 'status'>
): Promise<ClubApplication> {
  const existing = loadApplications();

  // Check duplicate application for same email + club
  const duplicate = existing.find(
    (a) => a.clubId === input.clubId && a.email.toLowerCase() === input.email.toLowerCase()
  );
  if (duplicate) {
    throw new Error(`You have already submitted an application for ${input.clubName}. Your application ID is ${duplicate.id}.`);
  }

  const id = generateApplicationId();
  const now = new Date().toISOString();
  const application: ClubApplication = {
    ...input,
    id,
    status: 'Submitted',
    createdAt: now,
    updatedAt: now,
    reviewerNotes: [],
  };

  const updated = [application, ...existing];
  saveApplications(updated);

  // Attempt Supabase insert if configured
  if (isSupabaseConfigured) {
    try {
      const session = await getValidSession();
      const token = session?.access_token || SUPABASE_ANON_KEY;
      await fetch(`${SUPABASE_URL}/rest/v1/club_applications`, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          id,
          club_id: input.clubId,
          club_name: input.clubName,
          full_name: input.fullName,
          email: input.email.toLowerCase(),
          phone: input.phone,
          date_of_birth: input.dateOfBirth || null,
          college: input.college,
          degree: input.degree,
          branch: input.branch,
          current_year: input.currentYear,
          graduation_year: input.graduationYear,
          location: input.location,
          current_course: input.currentCourse,
          specialization: input.specialization,
          relevant_coursework: input.relevantCoursework,
          cgpa_or_percentage: input.cgpaOrPercentage || null,
          academic_projects_summary: input.academicProjectsSummary,
          certifications: input.certifications,
          club_specific_interests: input.clubSpecificInterests,
          primary_interest: input.primaryInterest,
          secondary_interests: input.secondaryInterests,
          reason_for_joining: input.reasonForJoining,
          learning_goals: input.learningGoals,
          expected_contributions: input.expectedContributions,
          skills: input.skills,
          projects: input.projects,
          hackathon_experience: input.hackathonExperience,
          community_experience: input.communityExperience || null,
          leadership_experience: input.leadershipExperience || null,
          resume_file_name: input.resumeFileName || null,
          resume_file_size: input.resumeFileSize || null,
          resume_storage_path: input.resumeStoragePath || null,
          hours_per_week: input.hoursPerWeek,
          preferred_days: input.preferredDays,
          work_mode_preference: input.workModePreference,
          willingness_meetings: input.willingnessMeetings,
          willingness_collaboration: input.willingnessCollaboration,
          availability_notes: input.availabilityNotes || null,
          status: 'Submitted',
          consent_given: input.consentGiven,
        }),
      });
    } catch (err) {
      console.warn('Supabase application sync error, stored locally:', err);
    }
  }

  return application;
}

export async function getStudentClubApplications(email?: string): Promise<ClubApplication[]> {
  const apps = loadApplications();
  if (!email) return apps;
  return apps.filter((a) => a.email.toLowerCase() === email.toLowerCase());
}

export async function getStudentMemberships(email?: string): Promise<ClubMembership[]> {
  const memberships = loadMemberships();
  if (!email) return memberships;
  return memberships.filter((m) => m.studentEmail.toLowerCase() === email.toLowerCase());
}

export async function getAllClubApplications(clubId?: string): Promise<ClubApplication[]> {
  const local = loadApplications();
  if (isSupabaseConfigured) {
    try {
      const session = await getValidSession();
      if (session) {
        let url = `${SUPABASE_URL}/rest/v1/club_applications?select=*&order=created_at.desc`;
        if (clubId) {
          url += `&club_id=eq.${clubId}`;
        }
        const response = await fetch(url, {
          headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${session.access_token}`,
          },
        });
        if (response.ok) {
          const rows = await response.json();
          if (Array.isArray(rows)) {
            const mapped: ClubApplication[] = rows.map((r: any) => ({
              id: r.id,
              clubId: r.club_id,
              clubName: r.club_name,
              fullName: r.full_name,
              email: r.email,
              phone: r.phone,
              dateOfBirth: r.date_of_birth,
              college: r.college,
              degree: r.degree,
              branch: r.branch,
              currentYear: r.current_year,
              graduationYear: r.graduation_year,
              location: r.location,
              currentCourse: r.current_course,
              specialization: r.specialization,
              relevantCoursework: r.relevant_coursework,
              cgpaOrPercentage: r.cgpa_or_percentage,
              academicProjectsSummary: r.academic_projects_summary,
              certifications: r.certifications,
              clubSpecificInterests: r.club_specific_interests || [],
              primaryInterest: r.primary_interest,
              secondaryInterests: r.secondary_interests || [],
              reasonForJoining: r.reason_for_joining,
              learningGoals: r.learning_goals,
              expectedContributions: r.expected_contributions,
              skills: r.skills || [],
              projects: r.projects || [],
              hackathonExperience: r.hackathon_experience,
              communityExperience: r.community_experience,
              leadershipExperience: r.leadership_experience,
              resumeFileName: r.resume_file_name,
              resumeFileSize: r.resume_file_size,
              resumeStoragePath: r.resume_storage_path,
              hoursPerWeek: r.hours_per_week,
              preferredDays: r.preferred_days || [],
              workModePreference: r.work_mode_preference,
              willingnessMeetings: Boolean(r.willingness_meetings),
              willingnessCollaboration: Boolean(r.willingness_collaboration),
              availabilityNotes: r.availability_notes,
              status: r.status,
              consentGiven: Boolean(r.consent_given),
              createdAt: r.created_at,
              updatedAt: r.updated_at,
              reviewerNotes: r.reviewer_notes || [],
              membershipId: r.membership_id,
              membershipIssuedAt: r.membership_issued_at,
            }));
            saveApplications(mapped);
            return mapped;
          }
        }
      }
    } catch {
      // fallback
    }
  }
  return clubId ? local.filter((a) => a.clubId === clubId) : local;
}

export async function updateClubApplicationStatus(
  applicationId: string,
  newStatus: ClubApplicationStatus,
  reviewerNoteText?: string,
  reviewerName = 'Admissions Reviewer'
): Promise<ClubApplication> {
  const apps = loadApplications();
  const index = apps.findIndex((a) => a.id === applicationId);
  if (index === -1) {
    throw new Error('Application record not found.');
  }

  const app = apps[index];
  const now = new Date().toISOString();
  const notes = [...(app.reviewerNotes || [])];

  if (reviewerNoteText?.trim()) {
    notes.push({
      id: `note-${Date.now()}`,
      authorName: reviewerName,
      note: reviewerNoteText.trim(),
      createdAt: now,
    });
  }

  let membershipId = app.membershipId;
  let membershipIssuedAt = app.membershipIssuedAt;

  // If newly Accepted, automatically issue verified Club Membership
  if (newStatus === 'Accepted' && !membershipId) {
    membershipId = generateMembershipId(app.clubId);
    membershipIssuedAt = now;

    const memberships = loadMemberships();
    const newMembership: ClubMembership = {
      id: `mbr-${Date.now()}`,
      membershipId,
      clubId: app.clubId,
      clubName: app.clubName,
      studentName: app.fullName,
      studentEmail: app.email,
      college: app.college,
      role: 'Core Member',
      joinedAt: now,
      status: 'Active',
    };
    memberships.unshift(newMembership);
    saveMemberships(memberships);
  }

  const updated: ClubApplication = {
    ...app,
    status: newStatus,
    reviewerNotes: notes,
    membershipId,
    membershipIssuedAt,
    updatedAt: now,
  };

  apps[index] = updated;
  saveApplications(apps);

  if (isSupabaseConfigured) {
    try {
      const session = await getValidSession();
      if (session) {
        await fetch(`${SUPABASE_URL}/rest/v1/club_applications?id=eq.${applicationId}`, {
          method: 'PATCH',
          headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status: newStatus,
            reviewer_notes: notes,
            membership_id: membershipId || null,
            membership_issued_at: membershipIssuedAt || null,
            updated_at: now,
          }),
        });
      }
    } catch {
      // fallback
    }
  }

  return updated;
}

export async function addClubReviewerNote(
  applicationId: string,
  noteText: string,
  reviewerName = 'Review Committee'
): Promise<ClubApplication> {
  const apps = loadApplications();
  const index = apps.findIndex((a) => a.id === applicationId);
  if (index === -1) throw new Error('Application not found.');

  const now = new Date().toISOString();
  const notes = [
    ...(apps[index].reviewerNotes || []),
    {
      id: `note-${Date.now()}`,
      authorName: reviewerName,
      note: noteText.trim(),
      createdAt: now,
    },
  ];

  apps[index].reviewerNotes = notes;
  apps[index].updatedAt = now;
  saveApplications(apps);
  return apps[index];
}

export async function saveClub(club: TeklozyClub): Promise<TeklozyClub> {
  const clubs = loadClubs();
  const idx = clubs.findIndex((c) => c.id === club.id);
  if (idx !== -1) {
    clubs[idx] = club;
  } else {
    clubs.unshift(club);
  }
  saveClubs(clubs);
  return club;
}

export async function addClubAnnouncement(
  clubId: string,
  title: string,
  content: string,
  isImportant = false
): Promise<void> {
  const clubs = loadClubs();
  const club = clubs.find((c) => c.id === clubId);
  if (club) {
    const ann = {
      id: `ann-${Date.now()}`,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      title,
      content,
      isImportant,
    };
    club.announcements = [ann, ...(club.announcements || [])];
    saveClubs(clubs);
  }
}

// -------------------------------------------------------------
// PART 5 — INTELLIGENT STUDENT SEGREGATION ENGINE
// -------------------------------------------------------------
export function filterApplicants(
  applications: ClubApplication[],
  filters: StudentSegregationFilters
): ClubApplication[] {
  return applications.filter((app) => {
    // Club filter
    if (filters.clubId && filters.clubId !== 'all' && app.clubId !== filters.clubId) {
      return false;
    }

    // Status filter
    if (filters.status && filters.status !== ('all' as any) && app.status !== filters.status) {
      return false;
    }

    // Academic Year filter
    if (filters.currentYear && filters.currentYear !== 'all' && app.currentYear !== filters.currentYear) {
      return false;
    }

    // Primary interest
    if (filters.primaryInterest && filters.primaryInterest !== 'all') {
      const match =
        app.primaryInterest?.toLowerCase() === filters.primaryInterest.toLowerCase() ||
        app.clubSpecificInterests?.some((i) => i.toLowerCase().includes(filters.primaryInterest!.toLowerCase()));
      if (!match) return false;
    }

    // Skill filter
    if (filters.skillName && filters.skillName !== 'all') {
      const hasSkill = app.skills?.some(
        (s) =>
          s.name.toLowerCase().includes(filters.skillName!.toLowerCase()) &&
          (!filters.proficiency || filters.proficiency === 'all' || s.proficiency === filters.proficiency)
      );
      if (!hasSkill) return false;
    }

    // Search query
    if (filters.searchQuery && filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase().trim();
      const matchName = app.fullName?.toLowerCase().includes(q);
      const matchEmail = app.email?.toLowerCase().includes(q);
      const matchCollege = app.college?.toLowerCase().includes(q);
      const matchId = app.id?.toLowerCase().includes(q);
      const matchSkill = app.skills?.some((s) => s.name.toLowerCase().includes(q));
      if (!matchName && !matchEmail && !matchCollege && !matchId && !matchSkill) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Computes intelligent, transparent classification tags for an applicant
 * (e.g., "Full-Stack Specialist", "AI & Data Engineer", "UI/UX & Product Designer").
 */
export function computeApplicantSegregationTags(app: ClubApplication): string[] {
  const tags: string[] = [];
  const skills = (app.skills || []).map((s) => ({
    name: s.name.toLowerCase(),
    prof: s.proficiency,
  }));
  const interests = (app.clubSpecificInterests || []).map((i) => i.toLowerCase());

  // Club context tags
  if (app.clubId === 'dev-club') {
    const hasFront = skills.some((s) => ['react', 'next.js', 'vue', 'frontend', 'html', 'css', 'tailwind'].some((k) => s.name.includes(k)));
    const hasBack = skills.some((s) => ['node', 'express', 'python', 'django', 'backend', 'golang', 'sql', 'postgres'].some((k) => s.name.includes(k)));
    if (hasFront && hasBack) tags.push('Full-Stack Specialist');
    else if (hasFront) tags.push('Frontend Focused');
    else if (hasBack) tags.push('Backend Architecture');
    if (interests.some((i) => i.includes('open-source'))) tags.push('Open-Source Enthusiast');
  } else if (app.clubId === 'ai-data-club') {
    const hasML = skills.some((s) => ['pytorch', 'tensorflow', 'scikit', 'machine learning', 'deep learning'].some((k) => s.name.includes(k)));
    const hasGenAI = interests.some((i) => i.includes('generative ai') || i.includes('rag')) || skills.some((s) => s.name.includes('llm') || s.name.includes('langchain'));
    if (hasGenAI) tags.push('GenAI & Agent Builder');
    if (hasML) tags.push('ML/DL Practitioner');
    const hasData = skills.some((s) => ['pandas', 'numpy', 'sql', 'analytics', 'tableau'].some((k) => s.name.includes(k)));
    if (hasData) tags.push('Data Analyst');
  } else if (app.clubId === 'design-creative-club') {
    const hasFigma = skills.some((s) => s.name.includes('figma') || s.name.includes('ui/ux') || s.name.includes('prototyping'));
    if (hasFigma) tags.push('UI/UX & Prototyping');
    const hasBrand = interests.some((i) => i.includes('branding') || i.includes('graphic'));
    if (hasBrand) tags.push('Brand & Visual Stylist');
  } else if (app.clubId === 'cyber-cloud-club') {
    const hasCloud = skills.some((s) => ['aws', 'cloud', 'docker', 'kubernetes', 'devops'].some((k) => s.name.includes(k)));
    const hasSec = skills.some((s) => ['linux', 'wireshark', 'security', 'ctf', 'nmap', 'burp'].some((k) => s.name.includes(k)));
    if (hasCloud) tags.push('Cloud & DevOps');
    if (hasSec) tags.push('Ethical Hacker / CTF');
  } else if (app.clubId === 'innovation-club') {
    tags.push('Venture Builder');
    if (app.hackathonExperience && app.hackathonExperience !== 'None') tags.push('Hackathon Veteran');
  }

  // Academic year indicator
  if (app.currentYear) {
    tags.push(`Year ${app.currentYear}`);
  }

  // Projects indicator
  if (app.projects && app.projects.length >= 2) {
    tags.push(`${app.projects.length} Projects`);
  }

  return tags.length > 0 ? tags : ['General Applicant'];
}

export function exportApplicantsToCsv(applications: ClubApplication[]): string {
  const headers = [
    'Application ID',
    'Club Name',
    'Full Name',
    'Email',
    'Phone',
    'College',
    'Degree & Branch',
    'Academic Year',
    'Graduation Year',
    'Primary Interest',
    'Skills Summary',
    'Hours/Week',
    'Status',
    'Applied At',
    'Membership ID',
  ];

  const escapeCell = (val: any) => `"${String(val ?? '').replace(/"/g, '""')}"`;

  const rows = applications.map((a) => [
    escapeCell(a.id),
    escapeCell(a.clubName),
    escapeCell(a.fullName),
    escapeCell(a.email),
    escapeCell(a.phone),
    escapeCell(a.college),
    escapeCell(`${a.degree} - ${a.branch}`),
    escapeCell(a.currentYear),
    escapeCell(a.graduationYear),
    escapeCell(a.primaryInterest),
    escapeCell((a.skills || []).map((s) => `${s.name} (${s.proficiency})`).join('; ')),
    escapeCell(a.hoursPerWeek),
    escapeCell(a.status),
    escapeCell(a.createdAt),
    escapeCell(a.membershipId || 'N/A'),
  ]);

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
}
