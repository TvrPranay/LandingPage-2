import React, { useEffect, useRef, useState } from 'react';
import {
  BarChart3,
  Bot,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Cloud,
  Code2,
  Cpu,
  Database,
  GitBranch,
  Gamepad2,
  Layers,
  Lightbulb,
  Palette,
  PenTool,
  Rocket,
  ShieldCheck,
  Target,
  Terminal,
  TrendingUp,
  Users,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { TeklozyClub, ClubApplication } from '../../types/clubs';
import { ClubApplicationMultiStepModal } from './ClubApplicationMultiStepModal';
import {
  DevClubVisual,
  AiClubVisual,
  DesignClubVisual,
  CyberClubVisual,
  InnovationClubVisual,
} from '../ui/TechnologyVisuals';

const u = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&crop=entropy&q=70`;
const media = (hero: string, tracks: string[]) => ({
  hero: u(hero, 1200, 900),
  tracks: tracks.map((t) => u(t, 700, 500)),
});
const CLUB_MEDIA: Record<string, { hero: string; tracks: string[] }> = {
  'dev-club': media('1522071820081-009f0129c71c', ['1555066931-4365d14bab8c', '1461749280684-dccba630e2f6', '1542831371-29b0f74f9713']),
  'ai-data-club': media('1531482615713-2afd69097998', ['1485827404703-89b55fcc595e', '1677442136019-21780ecad995', '1518770660439-4636190af475']),
  'design-creative-club': media('1572044162444-ad60f128bdea', ['1586717791821-3f44a563fa4c', '1561070791-2526d30994b5', '1558655146-d09347e92766']),
  'cyber-cloud-club': media('1544197150-b99a580bb7a8', ['1550751827-4bd374c3f58b', '1558494949-ef010cbdcc31', '1451187580459-43490279c0fa']),
  'innovation-club': media('1553877522-43269d4ea984', ['1517048676732-d65bc937f952', '1559136555-9303baea8ebd', '1563986768609-322da13575f3']),
};
const TRACK_ICONS: Record<string, LucideIcon[]> = {
  'dev-club': [Code2, Database, GitBranch],
  'ai-data-club': [Bot, Cpu, Database],
  'design-creative-club': [PenTool, Palette, Layers],
  'cyber-cloud-club': [ShieldCheck, Cloud, Terminal],
  'innovation-club': [Lightbulb, Rocket, Users],
};
const CLUB_WORDS: Record<string, [string, string, string]> = {
  'dev-club': ['Build', 'Learn', 'Collaborate'],
  'ai-data-club': ['Explore', 'Train', 'Ship'],
  'design-creative-club': ['Sketch', 'Make', 'Share'],
  'cyber-cloud-club': ['Secure', 'Deploy', 'Defend'],
  'innovation-club': ['Dream', 'Test', 'Launch'],
};

interface ClubDetailsViewProps {
  club: TeklozyClub;
  onBack: () => void;
  onApplicationSuccess?: (app: ClubApplication) => void;
  isApplied?: boolean;
  appliedStatus?: string;
}

export const ClubDetailsView: React.FC<ClubDetailsViewProps> = ({
  club,
  onBack,
  onApplicationSuccess,
  isApplied = false,
  appliedStatus,
}) => {
  const [showModal, setShowModal] = useState(false);

  const renderClubVisual = (id: string) => {
    switch (id) {
      case 'dev-club':
        return <DevClubVisual className="w-14 h-14 sm:w-16 sm:h-16" />;
      case 'ai-data-club':
        return <AiClubVisual className="w-14 h-14 sm:w-16 sm:h-16" />;
      case 'design-creative-club':
        return <DesignClubVisual className="w-14 h-14 sm:w-16 sm:h-16" />;
      case 'cyber-cloud-club':
        return <CyberClubVisual className="w-14 h-14 sm:w-16 sm:h-16" />;
      case 'innovation-club':
        return <InnovationClubVisual className="w-14 h-14 sm:w-16 sm:h-16" />;
      default:
        return <DevClubVisual className="w-14 h-14 sm:w-16 sm:h-16" />;
    }
  };

  // Curated, punchy, visual domain tracks
  const getClubTracks = (id: string) => {
    switch (id) {
      case 'ai-data-club':
        return [
          {
            tag: 'TRACK 01',
            title: 'LLMs & Autonomous Agents',
            pitch: 'Build RAG pipelines, AI copilot assistants, and multi-agent workflows with tool use.',
            stack: ['LangChain', 'FastAPI', 'Gemini / OpenAI', 'Qdrant Vector DB'],
          },
          {
            tag: 'TRACK 02',
            title: 'Machine Learning & Neural Nets',
            pitch: 'Train predictive models, computer vision classifiers, and fine-tune transformers.',
            stack: ['PyTorch', 'Python', 'Scikit-Learn', 'HuggingFace'],
          },
          {
            tag: 'TRACK 03',
            title: 'Data Pipelines & Analytics',
            pitch: 'Ingest, clean, and transform large datasets with modern ETL and vector indices.',
            stack: ['Pandas', 'Polars', 'PostgreSQL', 'DuckDB'],
          },
        ];
      case 'dev-club':
        return [
          {
            tag: 'TRACK 01',
            title: 'Full-Stack Web Engineering',
            pitch: 'Build responsive client applications with modern state and component architecture.',
            stack: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
          },
          {
            tag: 'TRACK 02',
            title: 'Backend Systems & APIs',
            pitch: 'Design high-throughput REST and GraphQL endpoints with secure authentication.',
            stack: ['Node.js', 'Go', 'PostgreSQL', 'Redis'],
          },
          {
            tag: 'TRACK 03',
            title: 'Open Source & Dev Tools',
            pitch: 'Develop developer CLI tools, packages, and automated CI/CD workflows.',
            stack: ['Docker', 'GitHub Actions', 'Linux', 'Vitest'],
          },
        ];
      case 'design-creative-club':
        return [
          {
            tag: 'TRACK 01',
            title: 'UI/UX & Design Systems',
            pitch: 'Craft component libraries, token kits, and accessible multi-brand design systems.',
            stack: ['Figma', 'Auto-Layout', 'Design Tokens', 'WCAG AAA'],
          },
          {
            tag: 'TRACK 02',
            title: 'Product Prototyping',
            pitch: 'Create interactive user flows, rapid wireframes, and conducted usability tests.',
            stack: ['Interactive Prototypes', 'User Journeys', 'Wireframing', 'User Testing'],
          },
          {
            tag: 'TRACK 03',
            title: 'Brand Identity & Motion',
            pitch: 'Design visual identities, product marketing graphics, and micro-animations.',
            stack: ['Visual Branding', 'Typography', 'Motion Design', 'SVG Assets'],
          },
        ];
      case 'cyber-cloud-club':
        return [
          {
            tag: 'TRACK 01',
            title: 'Cloud Infrastructure & DevOps',
            pitch: 'Deploy containerized services with scalable cloud orchestration and monitoring.',
            stack: ['Docker', 'Kubernetes', 'AWS', 'Terraform'],
          },
          {
            tag: 'TRACK 02',
            title: 'Web Application Security',
            pitch: 'Audit codebases, patch vulnerabilities, and test against OWASP Top 10 exploits.',
            stack: ['Pen-testing', 'OWASP Top 10', 'Burp Suite', 'Linux CLI'],
          },
          {
            tag: 'TRACK 03',
            title: 'Zero-Trust & Network Defense',
            pitch: 'Configure firewall policies, secrets isolation, and encrypted network tunnels.',
            stack: ['TLS 1.3', 'WireGuard', 'Secrets Vault', 'Prometheus'],
          },
        ];
      case 'innovation-club':
      default:
        return [
          {
            tag: 'TRACK 01',
            title: 'Tech Entrepreneurship & MVPs',
            pitch: 'Validate problem statements, conduct customer discovery, and launch proof-of-concepts.',
            stack: ['Lean Startup', 'Rapid Prototyping', 'Pitch Decks', 'Analytics'],
          },
          {
            tag: 'TRACK 02',
            title: 'Product Management & Metrics',
            pitch: 'Define product roadmaps, write technical PRDs, and track north-star activation metrics.',
            stack: ['PRD Writing', 'User Stories', 'Mixpanel', 'Roadmapping'],
          },
          {
            tag: 'TRACK 03',
            title: 'Growth & Go-To-Market',
            pitch: 'Execute growth loops, campus community launches, and product marketing campaigns.',
            stack: ['Growth Funnels', 'Product Marketing', 'SEO', 'Community'],
          },
        ];
    }
  };

  const tracks = getClubTracks(club.id);

    const media = CLUB_MEDIA[club.id] ?? CLUB_MEDIA['dev-club'];
  const trackIcons = TRACK_ICONS[club.id] ?? TRACK_ICONS['dev-club'];
  const words = CLUB_WORDS[club.id] ?? CLUB_WORDS['dev-club'];
  const accent = club.accentColor || '#0088E0';
  const tint = `${accent}1F`;
  const tintStrong = `${accent}38`;

  const heroRef = useRef<HTMLElement | null>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);
  useEffect(() => {
    const el = heroRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([entry]) => setShowStickyBar(!entry.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const applyButton = (tone: 'light' | 'dark' = 'dark', label = 'Join the club') => {
    if (isApplied) {
      return (
        <div className="inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-emerald-700">
          <CheckCircle2 size={16} />
          <span>You're in · {appliedStatus || 'In review'}</span>
        </div>
      );
    }
    if (!club.isApplicationOpen) {
      return (
        <div className="inline-flex min-h-[48px] items-center rounded-xl bg-slate-200/70 px-6 text-sm font-semibold text-slate-600">
          Back soon
        </div>
      );
    }
    return (
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className={`group/btn inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl px-7 text-sm font-semibold transition-[transform,background-color] duration-150 ease-out active:scale-[0.97] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#10233F] ${
          tone === 'light' ? 'bg-white text-[#10233F] hover:bg-slate-100' : 'bg-[#10233F] text-white hover:bg-[#1a3558]'
        }`}
      >
        <span>{label}</span>
        <ChevronRight size={16} className="transition-transform duration-150 ease-out group-hover/btn:translate-x-0.5 motion-reduce:transition-none" />
      </button>
    );
  };

  const Heading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="flex items-center gap-3 text-xl font-semibold tracking-tight text-[#10233F]">
      <span aria-hidden="true" className="h-1 w-6 rounded-full" style={{ backgroundColor: accent }} />
      {children}
    </h2>
  );

  const facts = [
    { icon: Users, value: `${club.activeMembersCount} members` },
    { icon: BarChart3, value: club.difficulty ?? 'All levels' },
    { icon: Calendar, value: club.isApplicationOpen ? `Closes ${club.applicationDeadline}` : 'Closed for now' },
    { icon: Zap, value: 'Free' },
  ];

  const whyJoin = [
    { icon: Users, label: 'Belong together' },
    { icon: TrendingUp, label: 'Build confidence' },
    { icon: Gamepad2, label: 'Take a break and enjoy' },
    { icon: Target, label: 'Work with purpose' },
  ];

  return (
    <div className="font-manrope text-slate-800 space-y-10 pb-28 max-w-6xl mx-auto">
      <p className="text-sm text-slate-500">
        <button onClick={onBack} className="hover:text-[#10233F] transition-colors cursor-pointer">Clubs</button>
        <span className="px-2 text-slate-300">›</span>
        <span className="text-slate-700">{club.name}</span>
      </p>

      {/* Hero */}
      <header ref={heroRef} className="relative pb-10">
        <div className="grid overflow-hidden rounded-[2rem] lg:grid-cols-[1fr_1.1fr]" style={{ backgroundColor: tint }}>
          <div className="flex flex-col justify-center gap-5 p-7 sm:p-10 lg:py-14">
            <span className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#10233F]">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white">
                {renderClubVisual(club.id)}
              </span>
              {club.name}
            </span>
            <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-[#10233F] sm:text-5xl">
              {words[0]} <span style={{ color: accent }}>·</span> {words[1]} <span style={{ color: accent }}>·</span>{' '}
              <span className="block">{words[2]}</span>
            </h1>
            <p className="max-w-sm text-base text-slate-700">{club.tagline}</p>
            <div>{applyButton()}</div>
          </div>
          <div className="relative min-h-[16rem] lg:min-h-[26rem]">
            <img src={media.hero} alt="" className="absolute inset-0 h-full w-full object-cover" loading="eager" />
            <span className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-[#10233F]">
              <span className={`h-1.5 w-1.5 rounded-full ${club.isApplicationOpen ? 'bg-emerald-500' : 'bg-slate-400'}`} />
              {club.isApplicationOpen ? 'Open club' : 'Closed'}
            </span>
          </div>
        </div>

        <dl className="absolute inset-x-4 bottom-0 grid grid-cols-2 gap-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.4)] sm:inset-x-8 sm:grid-cols-4 sm:gap-0 sm:divide-x sm:divide-slate-200">
          {facts.map((f, i) => (
            <div key={i} className="flex items-center gap-2.5 px-3">
              <f.icon size={18} className="shrink-0 text-[#10233F]" />
              <dd className="text-sm font-semibold text-[#10233F]">{f.value}</dd>
            </div>
          ))}
        </dl>
      </header>

      {/* Why join */}
      <section className="grid items-center gap-6 pt-10 lg:grid-cols-[1fr_2fr] sm:pt-6">
        <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#10233F] sm:text-4xl">
          Grow beyond
          <br />
          classrooms
        </h2>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {whyJoin.map((w, i) => (
            <li
              key={i}
              className="flex aspect-[4/3] flex-col items-center justify-center gap-2.5 rounded-2xl p-3 text-center sm:aspect-square"
              style={{ backgroundColor: i % 2 ? tint : tintStrong }}
            >
              <w.icon size={26} className="text-[#10233F]" strokeWidth={1.75} />
              <span className="text-sm font-semibold leading-snug text-[#10233F]">{w.label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Find your people */}
      <section className="space-y-5">
        <Heading>Find your people</Heading>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {tracks.map((t, idx) => {
            const Icon = trackIcons[idx % trackIcons.length];
            return (
              <li key={idx} className="group relative isolate h-56 overflow-hidden rounded-2xl bg-[#0B1220]">
                <img
                  src={media.tracks[idx % media.tracks.length]}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none"
                />
                <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0B1220]/85 via-[#0B1220]/15 to-transparent" />
                <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 text-white">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: accent }}>
                    <Icon size={20} className="text-[#10233F]" />
                  </span>
                  <span className="text-base font-semibold leading-snug">{t.title}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Highlights */}
      <section className="space-y-5">
        <Heading>Our highlights</Heading>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {club.sampleProjects.slice(0, 2).map((proj, idx) => (
            <li
              key={idx}
              className="flex min-h-[10rem] flex-col justify-between gap-6 rounded-2xl p-6 transition-transform duration-200 ease-out hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              style={{ backgroundColor: idx % 2 ? '#F4F6FA' : tint }}
            >
              <h3 className="max-w-xs text-xl font-semibold leading-snug text-[#10233F]">{proj.title}</h3>
              <ul className="flex flex-wrap gap-1.5">
                {proj.tech.slice(0, 3).map((t, tIdx) => (
                  <li key={tIdx} className="rounded-full bg-white px-3 py-1 font-mono text-[11px] text-slate-700">
                    {t}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      {/* Week + skills */}
      <section className="grid gap-10 sm:grid-cols-2">
        <div className="space-y-4">
          <h2 className="flex items-center gap-2.5 text-lg font-semibold text-[#10233F]">
            <Calendar size={20} style={{ color: accent }} /> A week in the club
          </h2>
          <ul className="flex flex-wrap gap-2">
            {club.exampleActivities.map((act, idx) => (
              <li key={idx} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800">
                {act.title}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <h2 className="flex items-center gap-2.5 text-lg font-semibold text-[#10233F]">
            <Layers size={20} style={{ color: accent }} /> Skills you'll build
          </h2>
          <ul className="flex flex-wrap gap-2">
            {club.skillsDeveloped.map((skill, idx) => (
              <li key={idx} className="rounded-full px-4 py-2 text-sm font-medium text-[#10233F]" style={{ backgroundColor: tint }}>
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Journey */}
      <section className="flex flex-col gap-6 rounded-3xl p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8" style={{ backgroundColor: tint }}>
        <h2 className="text-xl font-semibold text-[#10233F]">The journey</h2>
        <ol className="flex flex-1 items-center justify-between gap-2 sm:max-w-xl">
          {['Bring ideas', 'Build together', 'Ship real projects'].map((s, i) => (
            <React.Fragment key={s}>
              <li className="flex flex-col items-center gap-2 text-center">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#10233F] font-mono text-sm font-semibold text-white">
                  {i + 1}
                </span>
                <span className="text-sm font-medium text-[#10233F]">{s}</span>
              </li>
              {i < 2 && <span aria-hidden="true" className="mb-6 h-px flex-1 border-t border-dashed border-slate-400" />}
            </React.Fragment>
          ))}
        </ol>
      </section>

      {/* Closing */}
      <section className="flex flex-col justify-between gap-5 rounded-3xl bg-[#10233F] p-6 text-white sm:flex-row sm:items-center sm:p-8">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Ready to join <span style={{ color: accent }}>{club.name}</span>?
        </h2>
        <div className="shrink-0">{applyButton('light')}</div>
      </section>

      {showStickyBar && !isApplied && club.isApplicationOpen && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur-sm">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <p className="truncate text-sm font-semibold text-[#10233F]">{club.name}</p>
            {applyButton('dark')}
          </div>
        </div>
      )}

      {showModal && (
        <ClubApplicationMultiStepModal
          club={club}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSuccess={(app) => {
            onApplicationSuccess?.(app);
          }}
        />
      )}
    </div>
  );
};
