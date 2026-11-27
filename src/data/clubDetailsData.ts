import {
  Code2,
  Bot,
  PenTool,
  Rocket,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';

// Dedicated hero club visuals
import devClubImg from '../assets/images/clubs-imgs/dev-coding-club.png';
import devCodingClub2Img from '../assets/images/clubs-imgs/dev-coding-club2.png';
import aiClubImg from '../assets/images/clubs-imgs/aiclubimg.png';
import designClubImg from '../assets/images/clubs-imgs/design-club.png';
import cyberClubImg from '../assets/images/clubs-imgs/cyber-cloud-club.png';
import innoClubImg from '../assets/images/clubs-imgs/innovation-club.png';

// New high-fidelity section assets
import teamCollaborationImg from '../assets/images/clubs-imgs/Collaborative Session.png';
import eligibilityStatueImg from '../assets/images/clubs-imgs/Marble Guardian with Blue Shield.png';
import belongingSummitImg from '../assets/images/clubs-imgs/Sunrise Ridge Hikers with Blue Flag.png';
import trophyImg from '../assets/images/clubs-imgs/trophyimage.png';
import growthImg from '../assets/images/clubs-imgs/growthimage.png';
import purposeImg from '../assets/images/clubs-imgs/purposeimage.png';

// Community avatar photos
import comm1 from '../assets/images/community/community-1.webp';
import comm2 from '../assets/images/community/community-2.webp';
import comm3 from '../assets/images/community/community-3.webp';

// Unsplash photography helper with consistent parameters
export const u = (id: string, w = 600, h = 400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&crop=entropy&q=75`;

export interface ActivityItem {
  title: string;
  description: string;
  badge: string;
  badgeColor: 'blue' | 'green' | 'amber';
  image: string;
}

export interface ClubDomainConfig {
  badgeLabel: string;
  heroImage: string;
  teamImage: string;
  toolBadges: string[];
  toolIcon: LucideIcon;
  badgeAccent: string;
  activities: ActivityItem[];
  networkHeadline: string;
  networkDescription: string;
  networkPills: [string, string, string];
  networkCallouts: [string, string, string];
  whyJoinHeadline: string;
  whyJoinTagline: string;
  belongingSubtext: string;
  enjoymentSubtext: string;
  growthSubtext: string;
  purposeSubtext: string;
}

// Global shared visual assets for section cards
export const SHARED_SECTION_ASSETS = {
  teamCollaborationImg,
  eligibilityStatueImg,
  belongingSummitImg,
  trophyImg,
  growthImg,
  purposeImg,
  communityAvatars: [comm1, comm2, comm3],
};

// Domain-specific configuration for all 5 official Teklozy Clubs
export const CLUB_CONFIGS: Record<string, ClubDomainConfig> = {
  'design-creative-club': {
    badgeLabel: 'Design & Creative Club',
    heroImage: designClubImg,
    teamImage: teamCollaborationImg,
    toolBadges: ['Figma', 'Ps', 'Ai', 'Xd'],
    toolIcon: PenTool,
    badgeAccent: '#0088E0',
    activities: [
      {
        title: 'UI/UX Workshops',
        description: 'Learn UI, UX and product design.',
        badge: 'Recurring',
        badgeColor: 'blue',
        image: u('1586717791821-3f44a563fa4c', 600, 380),
      },
      {
        title: 'Creative Projects',
        description: 'Collaborate and build real design solutions.',
        badge: 'Ongoing',
        badgeColor: 'green',
        image: u('1561070791-2526d30994b5', 600, 380),
      },
      {
        title: 'Design Labs',
        description: 'Experiment, prototype and get feedback.',
        badge: 'Weekly',
        badgeColor: 'blue',
        image: u('1558655146-d09347e92766', 600, 380),
      },
      {
        title: 'Creative Challenges',
        description: 'Short, fun prompts to boost your creativity.',
        badge: 'Open',
        badgeColor: 'green',
        image: u('1531403009284-440f080d1e12', 600, 380),
      },
    ],
    networkHeadline: 'Learn, Collaborate & Grow Together',
    networkDescription:
      'Be part of an active community where members share ideas, build together, and help each other grow.',
    networkPills: [
      'Work with like-minded members',
      'Learn from experienced peers',
      'Collaborate on real projects',
    ],
    networkCallouts: [
      'Project Collaboration',
      'Peer Review',
      'Knowledge Sharing',
    ],
    whyJoinHeadline: 'More Than a Club',
    whyJoinTagline: 'A supportive community to learn, create, collaborate, and grow your skills.',
    belongingSubtext: 'Be part of a like-minded community that supports your journey.',
    enjoymentSubtext: 'Take a break with fun challenges and community activities.',
    growthSubtext: 'Build practical skills, get feedback, and develop a strong portfolio.',
    purposeSubtext: 'Create work that solves real problems and makes an impact.',
  },
  'dev-club': {
    badgeLabel: 'Development Club',
    heroImage: devClubImg,
    teamImage: teamCollaborationImg || devCodingClub2Img,
    toolBadges: ['React', 'TS', 'Node.js', 'Git'],
    toolIcon: Code2,
    badgeAccent: '#0088E0',
    activities: [
      {
        title: 'Production Code Reviews',
        description: 'Peer-led architectural review and refactoring.',
        badge: 'Recurring',
        badgeColor: 'blue',
        image: u('1555066931-4365d14bab8c', 600, 380),
      },
      {
        title: 'Open-Source Sprints',
        description: 'Collaborate and build real developer tooling.',
        badge: 'Ongoing',
        badgeColor: 'green',
        image: u('1461749280684-dccba630e2f6', 600, 380),
      },
      {
        title: 'System Design Labs',
        description: 'Microservices, database scaling, and caching.',
        badge: 'Weekly',
        badgeColor: 'blue',
        image: u('1558494949-ef010cbdcc31', 600, 380),
      },
      {
        title: '48-Hour Hack Sprints',
        description: 'Rapid weekend builds solving engineering problems.',
        badge: 'Open',
        badgeColor: 'green',
        image: u('1504384308090-c894fdcc538d', 600, 380),
      },
    ],
    networkHeadline: 'Learn, Collaborate & Grow Together',
    networkDescription:
      'Be part of an active community where members share ideas, build together, and help each other grow.',
    networkPills: [
      'Work with like-minded members',
      'Learn from experienced peers',
      'Collaborate on real projects',
    ],
    networkCallouts: [
      'Project Collaboration',
      'Peer Review',
      'Knowledge Sharing',
    ],
    whyJoinHeadline: 'More Than a Club',
    whyJoinTagline: 'A supportive community to learn, create, collaborate, and grow your skills.',
    belongingSubtext: 'Be part of a like-minded community that supports your journey.',
    enjoymentSubtext: 'Take a break with fun challenges and community activities.',
    growthSubtext: 'Build practical skills, get feedback, and develop a strong portfolio.',
    purposeSubtext: 'Create work that solves real problems and makes an impact.',
  },
  'ai-data-club': {
    badgeLabel: 'AI & Data Science Club',
    heroImage: aiClubImg,
    teamImage: teamCollaborationImg || aiClubImg,
    toolBadges: ['PyTorch', 'Python', 'FastAPI', 'HuggingFace'],
    toolIcon: Bot,
    badgeAccent: '#8B5CF6',
    activities: [
      {
        title: 'LLM & RAG Workshops',
        description: 'Build copilot agents and retrieval pipelines.',
        badge: 'Recurring',
        badgeColor: 'blue',
        image: u('1677442136019-21780ecad995', 600, 380),
      },
      {
        title: 'Autonomous Agent Labs',
        description: 'Multi-agent coordination and tool-use systems.',
        badge: 'Ongoing',
        badgeColor: 'green',
        image: u('1485827404703-89b55fcc595e', 600, 380),
      },
      {
        title: 'Neural Net Labs',
        description: 'Train classifiers, vision models, and embeddings.',
        badge: 'Weekly',
        badgeColor: 'blue',
        image: u('1518770660439-4636190af475', 600, 380),
      },
      {
        title: 'Kaggle & Data Sprints',
        description: 'Benchmark models on competitive real datasets.',
        badge: 'Open',
        badgeColor: 'green',
        image: u('1551288049-bebda4e38f71', 600, 380),
      },
    ],
    networkHeadline: 'Learn, Collaborate & Grow Together',
    networkDescription:
      'Be part of an active community where members share ideas, build together, and help each other grow.',
    networkPills: [
      'Work with like-minded members',
      'Learn from experienced peers',
      'Collaborate on real projects',
    ],
    networkCallouts: [
      'Model Collaboration',
      'Peer Review',
      'Knowledge Sharing',
    ],
    whyJoinHeadline: 'More Than a Club',
    whyJoinTagline: 'A supportive community to learn, create, collaborate, and grow your skills.',
    belongingSubtext: 'Be part of a like-minded community that supports your journey.',
    enjoymentSubtext: 'Take a break with fun challenges and community activities.',
    growthSubtext: 'Build practical skills, get feedback, and develop a strong portfolio.',
    purposeSubtext: 'Create work that solves real problems and makes an impact.',
  },
  'cyber-cloud-club': {
    badgeLabel: 'Cybersecurity & Cloud Club',
    heroImage: cyberClubImg,
    teamImage: teamCollaborationImg || cyberClubImg,
    toolBadges: ['Linux', 'Docker', 'K8s', 'OWASP'],
    toolIcon: ShieldCheck,
    badgeAccent: '#10B981',
    activities: [
      {
        title: 'Pen-Testing Workshops',
        description: 'Hands-on auditing and vulnerability disclosure.',
        badge: 'Recurring',
        badgeColor: 'blue',
        image: u('1550751827-4bd374c3f58b', 600, 380),
      },
      {
        title: 'Cloud Infrastructure Labs',
        description: 'Architect secure AWS/GCP clusters with Terraform.',
        badge: 'Ongoing',
        badgeColor: 'green',
        image: u('1451187580459-43490279c0fa', 600, 380),
      },
      {
        title: 'Zero-Trust Audits',
        description: 'Configure firewalls, secret isolation, and tunnels.',
        badge: 'Weekly',
        badgeColor: 'blue',
        image: u('1563986768-1c35650b00f3', 600, 380),
      },
      {
        title: 'CTF War Games',
        description: 'Capture-the-flag competitions and exploit analysis.',
        badge: 'Open',
        badgeColor: 'green',
        image: u('1526374965328-7f61d4dc18c5', 600, 380),
      },
    ],
    networkHeadline: 'Learn, Collaborate & Grow Together',
    networkDescription:
      'Be part of an active community where members share ideas, build together, and help each other grow.',
    networkPills: [
      'Work with like-minded members',
      'Learn from experienced peers',
      'Collaborate on real projects',
    ],
    networkCallouts: [
      'Project Collaboration',
      'Peer Review',
      'Knowledge Sharing',
    ],
    whyJoinHeadline: 'More Than a Club',
    whyJoinTagline: 'A supportive community to learn, create, collaborate, and grow your skills.',
    belongingSubtext: 'Be part of a like-minded community that supports your journey.',
    enjoymentSubtext: 'Take a break with fun challenges and community activities.',
    growthSubtext: 'Build practical skills, get feedback, and develop a strong portfolio.',
    purposeSubtext: 'Create work that solves real problems and makes an impact.',
  },
  'innovation-club': {
    badgeLabel: 'Innovation & Entrepreneurship Club',
    heroImage: innoClubImg,
    teamImage: teamCollaborationImg || innoClubImg,
    toolBadges: ['Lean', 'MVP', 'Pitch', 'Product'],
    toolIcon: Rocket,
    badgeAccent: '#F59E0B',
    activities: [
      {
        title: 'MVP Validation Sprints',
        description: 'From customer discovery to working prototype.',
        badge: 'Recurring',
        badgeColor: 'blue',
        image: u('1517048676732-d65bc937f952', 600, 380),
      },
      {
        title: 'Founder Breakout Rooms',
        description: 'Pitch deck teardowns, business models, and feedback.',
        badge: 'Ongoing',
        badgeColor: 'green',
        image: u('1559136555-9303baea8ebd', 600, 380),
      },
      {
        title: 'Product Teardowns',
        description: 'Reverse-engineering high-growth consumer apps.',
        badge: 'Weekly',
        badgeColor: 'blue',
        image: u('1531482615713-2afd69097998', 600, 380),
      },
      {
        title: 'Campus Pitch Challenges',
        description: 'Present to angel mentors and win initial micro-grants.',
        badge: 'Open',
        badgeColor: 'green',
        image: u('1556761175-5973dc0f32e7', 600, 380),
      },
    ],
    networkHeadline: 'Learn, Collaborate & Grow Together',
    networkDescription:
      'Be part of an active community where members share ideas, build together, and help each other grow.',
    networkPills: [
      'Work with like-minded members',
      'Learn from experienced peers',
      'Collaborate on real projects',
    ],
    networkCallouts: [
      'Venture Sprints',
      'Peer Review',
      'Knowledge Sharing',
    ],
    whyJoinHeadline: 'More Than a Club',
    whyJoinTagline: 'A supportive community to learn, create, collaborate, and grow your skills.',
    belongingSubtext: 'Be part of a like-minded community that supports your journey.',
    enjoymentSubtext: 'Take a break with fun challenges and community activities.',
    growthSubtext: 'Build practical skills, get feedback, and develop a strong portfolio.',
    purposeSubtext: 'Create work that solves real problems and makes an impact.',
  },
};

export const getClubConfig = (clubId: string): ClubDomainConfig => {
  return CLUB_CONFIGS[clubId] || CLUB_CONFIGS['dev-club'];
};
