import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  ExternalLink,
  FileText,
  Flag,
  Gift,
  Globe,
  HelpCircle,
  MapPin,
  Play,
  Share2,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
  X,
  Zap,
} from 'lucide-react';
import { TeklozyEvent, EventRegistration } from '../../types/events';
import { EventRegistrationModal } from './EventRegistrationModal';
import bannerHero from '../../assets/images/hackathon-imgs/banner-img-3.png';

// Placeholder track photos (Unsplash, free license) until artwork is supplied.
const ph = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&h=450&crop=entropy&q=70`;
const TRACK_PHOTOS = [ph('1531482615713-2afd69097998'), ph('1485827404703-89b55fcc595e'), ph('1558494949-ef010cbdcc31'), ph('1451187580459-43490279c0fa')];

interface EventDetailsViewProps {
  event: TeklozyEvent;
  onBack: () => void;
  onRegisteredSuccess?: (reg: EventRegistration) => void;
  isRegistered?: boolean;
  onOpenContact?: () => void;
}

interface TrackDetailInfo {
  tag: string;
  title: string;
  description: string;
  brief: string;
  ideas: string[];
  suggestedStack: string[];
  evaluation: string[];
}

export const EventDetailsView: React.FC<EventDetailsViewProps> = ({
  event,
  onBack,
  onRegisteredSuccess,
  isRegistered = false,
  onOpenContact,
}) => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [activeMainTab, setActiveMainTab] = useState<'tracks' | 'timeline' | 'submission' | 'prizes' | 'rules' | 'faq'>('tracks');
  const [faqCategory, setFaqCategory] = useState<string>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeScheduleDay, setActiveScheduleDay] = useState<number>(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedTrackIndex, setSelectedTrackIndex] = useState<number | null>(null);

  // Live countdown to event.startDate
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(event.startDate).getTime();
      const diff = Math.max(0, target - Date.now());

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [event.startDate]);

  // Lock body scroll when track details modal is open
  useEffect(() => {
    if (selectedTrackIndex !== null) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [selectedTrackIndex]);

  const handleCopyLink = async () => {
    if (typeof window === 'undefined') return;

    const currentUrl = `${window.location.origin}${window.location.pathname}#events/teklozy-hackathon-2026`;
    const shareMessage = `🚀 Join me at Teklozy Hackathon 2026!

📅 Dates: 19–20 December 2026 (48-Hour Sprint)
🌐 Mode: Hybrid (Online & Partner Hubs)
💡 Tracks: EdTech, Applied AI, Cloud Infrastructure & Sustainable Tech
🎓 Eligibility: Free for all college/university students (Teams of 1–4)
🏆 Verified Digital Certificate, Mentor Guidance & Awards

Claim your free student pass here:
${currentUrl}`;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareMessage);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = shareMessage;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  /**
   * Track detailed specifications for the Zoom Modal
   */
  const trackDetails: TrackDetailInfo[] = [
    {
      tag: 'TRACK 01',
      title: 'EdTech & Adaptive Learning Systems',
      description:
        'Personalized learning journeys, automated grading assistance, and accessible student skill progression.',
      brief:
        'Reinvent how students understand and retain complex STEM concepts through intelligent, adaptive software that meets each learner at their current skill level.',
      ideas: [
        'Adaptive diagnostics engine that personalizes code challenges based on student mistakes.',
        'Socratic AI code mentor that provides conceptual hints without giving away the full answer.',
        'Interactive visual roadmap generator aligning university curricula with high-demand job skills.',
      ],
      suggestedStack: ['React', 'TypeScript', 'FastAPI', 'Python', 'Vector DB', 'Tailwind CSS'],
      evaluation: ['Pedagogical impact', 'Real-time interactivity', 'Adaptive difficulty UX'],
    },
    {
      tag: 'TRACK 02',
      title: 'Applied AI & Workflow Automation',
      description:
        'Autonomous agents, document intelligence, assistive tools, and domain-specific LLM workflows.',
      brief:
        'Develop reliable, production-ready AI agents and automation pipelines that eliminate repetitive friction for professionals, educators, or researchers.',
      ideas: [
        'Autonomous technical documentation generator from raw git commits and PR discussions.',
        'Structured schema extractor for invoices, contracts, and transcripts with confidence scoring.',
        'Local-first research assistant capable of synthesizing academic PDFs and citations offline.',
      ],
      suggestedStack: ['Python', 'LangChain / LlamaIndex', 'Next.js', 'PostgreSQL', 'FastAPI'],
      evaluation: ['Agent decision reliability', 'Error tolerance & guardrails', 'Practical automation utility'],
    },
    {
      tag: 'TRACK 03',
      title: 'Open Developer Infrastructure & Cloud Tools',
      description:
        'Developer productivity tools, micro-SaaS utilities, CI/CD helpers, and secure API frameworks.',
      brief:
        'Empower engineering teams with faster local feedback loops, resilient telemetry, and secure developer utilities that solve real dev experience hurdles.',
      ideas: [
        'Lightweight terminal CLI that monitors local docker containers and flags memory leaks.',
        'Dynamic mock API server with schema fuzzing for frontend integration testing.',
        'Security linting bot that checks pull requests for hardcoded secrets and unpinned dependencies.',
      ],
      suggestedStack: ['Node.js / Go', 'Docker API', 'React', 'SQLite', 'WebSockets', 'GitHub Actions'],
      evaluation: ['CLI/developer ergonomics', 'Execution speed & safety', 'Architectural elegance'],
    },
    {
      tag: 'TRACK 04',
      title: 'Sustainable Tech & Public Goods',
      description:
        'Campus sustainability, resource optimization, smart energy analytics, and civic tech.',
      brief:
        'Apply data intelligence, IoT metrics, and civic software to address energy efficiency, surplus food waste, and public transit logistics in academic and urban communities.',
      ideas: [
        'Campus energy analytics dashboard that correlates room occupancy with lighting and HVAC usage.',
        'Student surplus food redistribution network connecting campus cafeterias to local shelters.',
        'Smart carpooling and micro-transit coordinator optimizing daily student commuter routes.',
      ],
      suggestedStack: ['React / PWA', 'Node.js', 'Leaflet / Mapbox', 'TimescaleDB', 'PostgreSQL'],
      evaluation: ['Measurable resource impact', 'Community adoption feasibility', 'Data visualization clarity'],
    },
  ];

  const activeTrackDetail =
    selectedTrackIndex !== null ? trackDetails[selectedTrackIndex] : null;

  useEffect(() => {
    if (selectedTrackIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedTrackIndex(null);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [selectedTrackIndex]);

  const countdown = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Mins', value: timeLeft.minutes },
    { label: 'Secs', value: timeLeft.seconds },
  ];

  const stats = [
    { icon: Zap, value: '48 Hours', label: 'Sprint duration' },
    { icon: Users, value: `1–${event.teamConfig.maxTeamSize} Members`, label: 'Team formation' },
    { icon: Globe, value: event.mode, label: 'Participation mode' },
    { icon: Award, value: 'Free', label: 'Registration fee' },
  ];

  // Comprehensive FAQ directory
  const allFaqs = [
    {
      category: 'eligibility',
      question: 'Who can participate in Teklozy Hackathon 2026?',
      answer:
        'Any student enrolled in an accredited undergraduate, postgraduate, or diploma program across India can participate. Whether you are a beginner taking your first steps or an experienced full-stack developer, everyone is welcome.',
    },
    {
      category: 'eligibility',
      question: 'Is there any registration fee?',
      answer:
        'No. Registration for Teklozy Hackathon 2026 is 100% free of charge for all verified students, made possible by Teklozy and our partner community network.',
    },
    {
      category: 'team',
      question: 'Can I participate individually without a team?',
      answer:
        'Yes! You can participate as an individual builder. We also provide a dedicated matchmaking channel on our Discord server prior to kick-off if you wish to find teammates with complementary skills.',
    },
    {
      category: 'rules',
      question: 'When will problem statements be finalized?',
      answer:
        'Detailed problem tracks and challenge specifications will be unveiled during the Opening Ceremony on Day 1 (19 December 2026 at 10:00 AM IST) to ensure a fair playing field.',
    },
    {
      category: 'team',
      question: 'Can team members be from different colleges?',
      answer:
        'Yes! Cross-college, cross-department, and multi-disciplinary teams are fully permitted. Teams can have anywhere between 1 to 4 members.',
    },
    {
      category: 'rules',
      question: 'Can we use pre-existing code or third-party libraries?',
      answer:
        'Open-source libraries, UI components, public APIs, and framework boilerplates are allowed with proper attribution. The core solution and application logic must be developed during the 48-hour sprint.',
    },
    {
      category: 'eligibility',
      question: 'Will all participants receive verified certificates?',
      answer:
        'Yes. All registered participants who submit a qualifying project complying with the submission guidelines will receive a verified Teklozy Digital Certificate of Participation.',
    },
  ];

  const displayedFaqs =
    faqCategory === 'all'
      ? allFaqs
      : allFaqs.filter((f) => f.category === faqCategory);

  const registerButton = (tone: 'light' | 'dark' = 'light', extra = '') =>
    isRegistered ? (
      <div className={`inline-flex min-h-[44px] sm:min-h-[48px] items-center justify-center gap-2 rounded-xl px-6 sm:px-7 text-sm font-semibold ${tone === 'light' ? 'bg-white text-emerald-700' : 'border border-emerald-200 bg-emerald-50 text-emerald-700'} ${extra}`}>
        <CheckCircle2 size={16} /> Pass issued
      </div>
    ) : (
      <button
        type="button"
        onClick={() => setShowRegisterModal(true)}
        className={`group/btn inline-flex min-h-[44px] sm:min-h-[48px] items-center justify-center gap-2 rounded-xl px-6 sm:px-7 text-sm font-semibold transition-[transform,background-color] duration-150 ease-out active:scale-[0.97] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0088E0] ${
          tone === 'light' ? 'bg-white text-[#10233F] hover:bg-slate-100 shadow-md' : 'bg-[#10233F] text-white hover:bg-[#1a3558]'
        } ${extra}`}
      >
        Register for hackathon
        <ArrowRight size={16} className="transition-transform duration-150 group-hover/btn:translate-x-0.5 motion-reduce:transition-none" />
      </button>
    );

  const scrollToId = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const SectionHead: React.FC<{ icon: React.ElementType; title: string; sub?: string }> = ({ icon: Icon, title, sub }) => (
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#10233F] text-white shrink-0">
        <Icon size={17} />
      </span>
      <div>
        <h2 className="text-lg font-bold tracking-tight text-[#10233F]">{title}</h2>
        {sub && <p className="text-xs text-slate-500 font-medium">{sub}</p>}
      </div>
    </div>
  );

  return (
    <div className="font-manrope text-slate-800 pb-28 sm:pb-20 max-w-7xl mx-auto space-y-5 sm:space-y-6">
      <style>{`@keyframes evt-rise{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}@media (prefers-reduced-motion:no-preference){.evt-rise{animation:evt-rise .65s cubic-bezier(.22,1,.36,1) backwards}}`}</style>

      {/* Top Navigation: Breadcrumbs & Back to Events - Tight, clean vertical spacing */}
      <nav aria-label="Breadcrumb navigation" className="flex flex-wrap items-center justify-between gap-3 pt-0 mb-3">
        <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
          <button
            type="button"
            onClick={onBack}
            className="group inline-flex items-center gap-1.5 rounded-xl border border-slate-200/90 bg-white px-3 sm:px-3.5 py-1.5 text-xs sm:text-sm font-bold text-slate-700 shadow-xs transition-all hover:border-sky-300 hover:bg-slate-50 hover:text-[#0088E0] active:scale-[0.98] cursor-pointer"
          >
            <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-0.5 text-slate-400 group-hover:text-[#0088E0]" />
            <span>Back to Events</span>
          </button>

          <span className="text-slate-300 select-none hidden sm:inline" aria-hidden="true">/</span>

          <ol className="hidden sm:inline-flex items-center gap-2 text-slate-500 font-medium">
            <li>
              <button
                type="button"
                onClick={onBack}
                className="hover:text-[#0088E0] transition-colors cursor-pointer"
              >
                Events &amp; Programs
              </button>
            </li>
            <li className="text-slate-300 select-none" aria-hidden="true">/</li>
            <li className="text-slate-400 font-medium">Hackathons</li>
            <li className="text-slate-300 select-none" aria-hidden="true">/</li>
            <li className="font-bold text-[#10233F]" aria-current="page">
              Teklozy Hackathon 2026
            </li>
          </ol>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 px-3 py-1 text-[11px] sm:text-xs font-bold text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Registrations Open
          </span>
          <span className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-slate-100 border border-slate-200 px-3 py-1 text-[11px] sm:text-xs font-semibold text-slate-600">
            <Clock size={13} className="text-slate-400" />
            48-Hour Sprint
          </span>
        </div>
      </nav>

      {/* Hero Banner: Balanced 50/50 Composition with banner-img-2.png */}
      <header className="relative isolate overflow-hidden rounded-[2rem] border border-blue-500/25 bg-[#03081A] text-white shadow-[0_20px_50px_-15px_rgba(2,6,23,0.7)]">
        {/* Soft sapphire & electric cyan gradient mesh blending smoothly */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background: `
              radial-gradient(ellipse 65% 60% at 75% 50%, rgba(14, 90, 245, 0.45) 0%, rgba(10, 45, 140, 0.25) 45%, transparent 72%),
              radial-gradient(ellipse 50% 40% at 75% 85%, rgba(6, 182, 212, 0.25) 0%, transparent 60%),
              radial-gradient(ellipse 45% 45% at 20% 80%, rgba(2, 132, 199, 0.15) 0%, transparent 60%),
              linear-gradient(135deg, #020614 0%, #051028 40%, #0A1C44 75%, #04091A 100%)
            `,
          }}
        />

        {/* Luminous orbital curves */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-sky-400/25 [mask-image:linear-gradient(135deg,black,transparent_75%)] -z-10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-8 top-1/2 -translate-y-1/2 w-[460px] h-[460px] rounded-full border border-cyan-400/30 [mask-image:linear-gradient(45deg,transparent,black_50%,transparent)] -z-10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-16 bottom-2 w-72 h-32 bg-cyan-400/18 rounded-full blur-3xl -z-10"
        />

        {/* Delicate subtle tech grid pattern */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-15 [mask-image:radial-gradient(ellipse_at_72%_50%,black_35%,transparent_75%)]"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Top border fine highlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/40 to-transparent -z-10"
        />

        <div className="grid items-center lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Column: Balanced Typography & Action Controls */}
          <div className="relative z-10 space-y-4 sm:space-y-5 p-6 sm:p-8 lg:p-10">
            <span
              className="evt-rise inline-flex items-center gap-2 rounded-full border border-sky-400/35 bg-sky-500/15 px-3 py-1 font-mono text-xs font-semibold tracking-wider text-sky-200 backdrop-blur-md shadow-xs"
              style={{ animationDelay: '0ms' }}
            >
              <span aria-hidden="true" className="text-sky-400 font-bold">&lt;/&gt;</span> TEKLOZY HACKATHON
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold leading-[1.08] tracking-tight text-white">
              Teklozy Hackathon{' '}
              <span className="bg-gradient-to-r from-white via-sky-100 to-sky-300 bg-clip-text text-transparent">
                2026
              </span>
            </h1>

            <p
              className="evt-rise max-w-md text-sm sm:text-base leading-relaxed text-slate-300 font-normal"
              style={{ animationDelay: '350ms' }}
            >
              {event.tagline || 'Code, collaborate, and build high-impact tech solutions in 48 hours.'}
            </p>

            <div
              className="evt-rise flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-slate-200 font-medium"
              style={{ animationDelay: '450ms' }}
            >
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 border border-white/10 backdrop-blur-xs">
                <Calendar size={14} className="text-sky-300" /> {event.dates}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 border border-white/10 backdrop-blur-xs">
                <MapPin size={14} className="text-sky-300" /> {event.mode}
              </span>
            </div>

            <div className="evt-rise flex flex-wrap items-center gap-3 pt-1" style={{ animationDelay: '550ms' }}>
              {registerButton('light')}
              <button
                type="button"
                onClick={() => {
                  setActiveMainTab('tracks');
                  scrollToId('hack-tabs-section');
                }}
                className="inline-flex min-h-[44px] sm:min-h-[48px] items-center gap-2 rounded-xl border border-white/25 bg-white/5 px-5 sm:px-6 text-sm font-semibold text-white transition-all hover:bg-white/15 hover:border-white/40 cursor-pointer"
              >
                <Play size={14} className="fill-white/30 text-white" /> Explore challenges
              </button>
              <button
                type="button"
                onClick={handleCopyLink}
                aria-label={copiedLink ? 'Link copied' : 'Share event'}
                title={copiedLink ? 'Link copied to clipboard!' : 'Share event'}
                className={`flex h-[44px] w-[44px] sm:h-[48px] sm:w-[48px] items-center justify-center rounded-xl border transition-all cursor-pointer ${
                  copiedLink
                    ? 'border-emerald-300 bg-emerald-500/20 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                    : 'border-white/25 bg-white/5 text-white hover:bg-white/15 hover:border-white/40'
                }`}
              >
                {copiedLink ? <Check size={16} /> : <Share2 size={16} />}
              </button>
            </div>
          </div>

          {/* Right Column: Balanced image size blending with banner */}
          <div className="relative z-10 flex items-center justify-center lg:justify-end px-4 sm:px-6 lg:px-0 lg:pr-8 py-4 sm:py-6 lg:py-8">
            <img
              src={bannerHero}
              alt="Teklozy Hackathon 2026 Team"
              className="evt-rise w-full max-w-[460px] sm:max-w-[500px] lg:max-w-[540px] xl:max-w-[560px] object-contain drop-shadow-[0_20px_40px_rgba(0,100,230,0.35)] transition-transform duration-300 hover:scale-[1.01]"
              style={{ animationDelay: '350ms' }}
              loading="eager"
            />
          </div>
        </div>
      </header>

      {/* Stats bar overlapping the hero bottom - Tightened spacing */}
      <dl className="relative z-10 -mt-5 sm:-mt-6 mx-3 sm:mx-6 lg:mx-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-200/90 shadow-[0_10px_25px_-10px_rgba(15,23,42,0.12)] sm:grid-cols-4 mb-4">
        {stats.map((s, i) => (
          <div key={i} className="flex items-center gap-3 bg-white px-4 sm:px-5 py-3.5 transition-colors hover:bg-slate-50/70">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E8F2FB] text-[#0088E0]">
              <s.icon size={18} />
            </span>
            <div>
              <dd className="text-sm sm:text-base font-bold text-[#10233F]">{s.value}</dd>
              <dt className="text-xs text-slate-500 font-medium">{s.label}</dt>
            </div>
          </div>
        ))}
      </dl>

      {/* Tabs Navigation matching Reference Image 3 (Horizontal underline tabs) */}
      <div id="hack-tabs-section" className="scroll-mt-20">
        <div className="border-b border-slate-200 mb-6">
          <div
            className="flex items-center gap-6 sm:gap-8 overflow-x-auto no-scrollbar"
            role="tablist"
            aria-label="Hackathon sections"
          >
            {[
              { id: 'tracks', label: 'Challenge Tracks' },
              { id: 'timeline', label: 'Timeline' },
              { id: 'submission', label: 'Submission' },
              { id: 'prizes', label: 'Prizes' },
              { id: 'rules', label: 'Rules' },
              { id: 'faq', label: 'FAQ' },
            ].map((tab) => {
              const isActive = activeMainTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveMainTab(tab.id as any)}
                  className={`pb-3 text-sm font-semibold transition-colors relative whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'text-[#10233F] font-bold'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <span>{tab.label}</span>
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-0.5 bg-[#10233F] rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Two-Column Layout */}
        <div className="grid gap-6 lg:grid-cols-[1fr_21rem] lg:gap-8 items-start">
          {/* Left Column: Active Tab Content */}
          <div className="min-w-0 space-y-6">
            {/* TAB 1: CHALLENGE TRACKS */}
            {activeMainTab === 'tracks' && (
              <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <SectionHead icon={Flag} title="Problem Domains" sub="Choose a track and build a solution for a real-world problem" />
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1 text-xs font-semibold text-slate-600">
                    {event.themes.length} Problem Domains
                  </span>
                </div>

                <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {event.themes.map((theme, idx) => (
                    <li key={idx}>
                      <button
                        type="button"
                        onClick={() => setSelectedTrackIndex(idx)}
                        className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white text-left transition-all duration-200 hover:-translate-y-1 hover:border-sky-300 hover:shadow-lg motion-reduce:hover:translate-y-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0088E0]"
                      >
                        <span className="relative block aspect-[16/9] overflow-hidden bg-[#081225]">
                          <img
                            src={TRACK_PHOTOS[idx % TRACK_PHOTOS.length]}
                            alt={theme.title}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                          <span className="absolute left-3 top-3 rounded-lg bg-white/95 px-2.5 py-1 font-mono text-[11px] font-bold text-[#10233F] shadow-xs">
                            TRACK 0{idx + 1}
                          </span>
                        </span>
                        <span className="flex flex-1 flex-col gap-2 p-5 sm:p-6">
                          <span className="text-base sm:text-lg font-bold leading-snug text-[#10233F] group-hover:text-[#0088E0] transition-colors">
                            {theme.title}
                          </span>
                          {theme.description && (
                            <span className="line-clamp-2 text-sm leading-relaxed text-slate-600">
                              {theme.description}
                            </span>
                          )}
                          <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-semibold text-[#0B4F85] group-hover:text-[#0088E0]">
                            View track brief <ArrowRight size={15} className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
                          </span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* TAB 2: TIMELINE */}
            {activeMainTab === 'timeline' && (
              <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <SectionHead
                    icon={Calendar}
                    title="48-Hour Hackathon Schedule & Timeline"
                    sub="Detailed milestone roadmap across Day 1 and Day 2"
                  />
                  <div role="tablist" aria-label="Schedule day" className="inline-flex rounded-full bg-slate-100 p-1">
                    {event.provisionalSchedule.map((sched, idx) => (
                      <button
                        key={idx}
                        type="button"
                        role="tab"
                        aria-selected={activeScheduleDay === idx}
                        onClick={() => setActiveScheduleDay(idx)}
                        className={`min-h-[38px] rounded-full px-5 text-sm font-semibold transition-colors cursor-pointer ${
                          activeScheduleDay === idx
                            ? 'bg-[#10233F] text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {sched.day} · {sched.date}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Day Overview banner */}
                <div className="rounded-2xl border border-slate-200/80 bg-slate-50 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0088E0]/15 text-[#0088E0] font-bold text-xs">
                      {activeScheduleDay === 0 ? 'Day 1' : 'Day 2'}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-[#10233F]">{event.provisionalSchedule[activeScheduleDay]?.day}</p>
                      <p className="text-xs text-slate-500">
                        {event.provisionalSchedule[activeScheduleDay]?.items.length} structured checkpoints &amp; mentor sessions
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200 self-start sm:self-auto">
                    Hybrid: Online Discord + Regional Hubs
                  </span>
                </div>

                {/* Timeline step list */}
                <ol className="relative ml-3 space-y-0 border-l-2 border-slate-200 pl-7 py-2">
                  {event.provisionalSchedule[activeScheduleDay]?.items.map((item, idx) => (
                    <li key={idx} className="relative pb-8 last:pb-2">
                      <span
                        aria-hidden="true"
                        className="absolute -left-[35px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#0088E0] bg-white ring-4 ring-sky-50"
                      />
                      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                        <span className="inline-flex items-center rounded-md bg-[#E8F2FB] px-2.5 py-0.5 font-mono text-xs font-bold text-[#0B4F85]">
                          {item.time}
                        </span>
                        <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                      </div>
                      {item.description && (
                        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
                          {item.description}
                        </p>
                      )}
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {/* TAB 3: SUBMISSION */}
            {activeMainTab === 'submission' && (
              <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
                <SectionHead
                  icon={FileText}
                  title="Submission Guidelines & Checklist"
                  sub="Ensure your project satisfies all criteria before the 20 Dec deadline"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      title: 'Public GitHub Repository',
                      desc: 'A well-structured repository containing all source code, commit history created during the 48h sprint, and an open-source license.',
                      badge: 'Required',
                    },
                    {
                      title: 'Live Deployed Demo / APK',
                      desc: 'A functioning web application URL or downloadable mobile APK allowing the evaluation jury to test interactive flows.',
                      badge: 'Required',
                    },
                    {
                      title: '3-Minute Video Walkthrough',
                      desc: 'A concise video explaining problem statement, architecture overview, live product demonstration, and future roadmap.',
                      badge: 'Required',
                    },
                    {
                      title: 'Comprehensive README',
                      desc: 'Clear problem summary, installation guide, tech stack rationale, team member contributions, and API documentation.',
                      badge: 'Recommended',
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-bold text-[#10233F]">{item.title}</h3>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          item.badge === 'Required' ? 'bg-sky-100 text-[#0088E0]' : 'bg-slate-200 text-slate-600'
                        }`}>
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Judging Criteria Breakdown */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Evaluation &amp; Scoring Matrix</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { title: 'Technical Architecture', weight: '25%', desc: 'Code hygiene, scalability, and stack elegance' },
                      { title: 'Innovation & Impact', weight: '25%', desc: 'Originality of approach and value to users' },
                      { title: 'UI/UX Polish', weight: '25%', desc: 'Design taste, accessibility, and user flow' },
                      { title: 'Feasibility & Readiness', weight: '25%', desc: 'Real-world utility and execution depth' },
                    ].map((crit, idx) => (
                      <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs text-center space-y-1">
                        <span className="block font-mono text-xl font-extrabold text-[#0088E0]">{crit.weight}</span>
                        <span className="block text-xs font-bold text-slate-900">{crit.title}</span>
                        <span className="block text-[11px] text-slate-500">{crit.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 flex items-center gap-3">
                  <Clock className="text-amber-600 shrink-0" size={20} />
                  <p className="text-xs sm:text-sm text-amber-900 font-medium">
                    <strong>Submission Cutoff:</strong> Sunday, 20 December 2026 at 03:00 PM IST. Late submissions cannot be accepted by the portal.
                  </p>
                </div>
              </section>
            )}

            {/* TAB 4: PRIZES */}
            {activeMainTab === 'prizes' && (
              <section className="space-y-4">
                {/* Top Card: Total prize pool */}
                <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs">
                  <span className="text-sm font-normal text-slate-500">Total prize pool</span>
                  <div className="mt-1 text-4xl sm:text-5xl font-black tracking-tight text-[#10233F]">
                    ₹50K
                  </div>
                  <p className="mt-2 text-sm text-slate-600">
                    ₹50,000 cash + $100 Claude Code credits for each of the top 3
                  </p>
                </div>

                {/* Bottom Card: 3 podium rows matching reference */}
                <div className="rounded-2xl border border-slate-200/90 bg-white divide-y divide-slate-100 overflow-hidden shadow-xs">
                  {/* 1st Place */}
                  <div className="p-5 sm:p-6 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full border border-amber-300 bg-amber-50 text-amber-600 font-semibold text-sm flex items-center justify-center shrink-0">
                        1st
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 text-base sm:text-lg">1st place</h3>
                        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                          ₹25,000 cash + $100 Claude Code credits
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-slate-900 text-base sm:text-lg shrink-0">₹25K</span>
                  </div>

                  {/* 2nd Place */}
                  <div className="p-5 sm:p-6 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full border border-slate-200 bg-slate-50 text-slate-600 font-semibold text-sm flex items-center justify-center shrink-0">
                        2nd
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 text-base sm:text-lg">2nd place</h3>
                        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                          ₹15,000 cash + $100 Claude Code credits
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-slate-900 text-base sm:text-lg shrink-0">₹15K</span>
                  </div>

                  {/* 3rd Place */}
                  <div className="p-5 sm:p-6 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full border border-slate-200 bg-slate-50 text-slate-600 font-semibold text-sm flex items-center justify-center shrink-0">
                        3rd
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 text-base sm:text-lg">3rd place</h3>
                        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                          ₹10,000 cash + $100 Claude Code credits
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-slate-900 text-base sm:text-lg shrink-0">₹10K</span>
                  </div>
                </div>

                {/* Additional participant perk badge */}
                <div className="p-4 sm:p-5 rounded-2xl border border-slate-200/80 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Award size={18} className="text-[#0088E0] shrink-0" />
                    <span>Verified Teklozy Digital Certificates of Participation for all active teams</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 font-semibold text-slate-800">
                    <Sparkles size={14} className="text-amber-500" />
                    4 Domain Tracks Recognized
                  </span>
                </div>
              </section>
            )}

            {/* TAB 5: RULES */}
            {activeMainTab === 'rules' && (
              <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
                <SectionHead
                  icon={ShieldCheck}
                  title="Rules &amp; Code of Conduct"
                  sub="Guidelines to ensure fairness, security, and respectful collaboration"
                />

                <div className="space-y-3">
                  {event.rules.map((rule, idx) => (
                    <div key={idx} className="flex items-start gap-3.5 p-4 rounded-xl border border-slate-200/90 bg-white">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E8F2FB] font-mono text-xs font-bold text-[#0B4F85] mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-sm text-slate-700 leading-relaxed font-medium">{rule}</p>
                    </div>
                  ))}
                </div>

                <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
                  <h3 className="text-sm font-bold text-[#10233F]">Eligibility &amp; Team Composition</h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                    {event.eligibility.map((el, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                        <span>{el}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {/* TAB 6: FAQ */}
            {activeMainTab === 'faq' && (
              <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <SectionHead
                    icon={HelpCircle}
                    title="Frequently Asked Questions"
                    sub="Everything you need to know before registering and participating"
                  />

                  {/* FAQ Category Pills */}
                  <div className="inline-flex flex-wrap gap-1 rounded-xl bg-slate-100 p-1 text-xs font-semibold self-start sm:self-auto">
                    {[
                      { id: 'all', label: 'All FAQs' },
                      { id: 'eligibility', label: 'Eligibility' },
                      { id: 'team', label: 'Teams' },
                      { id: 'rules', label: 'Rules' },
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setFaqCategory(cat.id)}
                        className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                          faqCategory === cat.id
                            ? 'bg-white text-[#10233F] shadow-xs font-bold'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* FAQ Accordion Items */}
                <div className="space-y-3 pt-1">
                  {displayedFaqs.map((faq, idx) => {
                    const isOpen = openFaqIndex === idx;
                    return (
                      <div
                        key={idx}
                        className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                          isOpen
                            ? 'border-sky-300 bg-sky-50/30 shadow-xs'
                            : 'border-slate-200/90 bg-white hover:border-slate-300'
                        }`}
                      >
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                          className="flex w-full items-center justify-between gap-4 p-5 text-left text-sm sm:text-base font-bold text-[#10233F] hover:text-[#0088E0] transition-colors cursor-pointer"
                        >
                          <span className="flex items-center gap-3">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 font-mono text-xs font-bold text-slate-500">
                              {idx + 1}
                            </span>
                            <span>{faq.question}</span>
                          </span>
                          <ChevronDown
                            size={18}
                            className={`shrink-0 text-slate-400 transition-transform duration-200 motion-reduce:transition-none ${
                              isOpen ? 'rotate-180 text-[#0088E0]' : ''
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="border-t border-slate-100/90 px-5 pb-5 pt-3">
                            <p className="text-sm sm:text-[15px] leading-relaxed text-slate-600 pl-9">
                              {faq.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Need more help banner */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-sky-100 bg-[#F4F9FD] p-5">
                  <div className="space-y-0.5 text-center sm:text-left">
                    <p className="text-sm font-bold text-[#10233F]">Have a question not listed here?</p>
                    <p className="text-xs text-slate-600">Connect with our organizing mentors or drop us a query.</p>
                  </div>
                  {onOpenContact && (
                    <button
                      type="button"
                      onClick={onOpenContact}
                      className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-[#10233F] hover:bg-slate-50 hover:border-sky-300 shadow-xs transition-all cursor-pointer whitespace-nowrap"
                    >
                      Contact Organizers
                    </button>
                  )}
                </div>
              </section>
            )}
          </div>

          {/* Right Column: Sticky Sidebar */}
          <aside className="h-fit space-y-5 lg:sticky lg:top-24">
            {/* 1. Countdown Card (Matching Reference Structure in Dark Mode) */}
            <div className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-b from-[#091533] via-[#060E24] to-[#040816] p-6 text-white border border-blue-500/20 shadow-xl space-y-4">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-blue-500/20 blur-2xl -z-10"
              />
              
              <div>
                <p className="text-sm font-normal text-slate-300">Registration closes in</p>
              </div>

              {/* 4 Countdown Tiles */}
              <div className="grid grid-cols-4 gap-2 text-center">
                {countdown.map((c) => (
                  <div
                    key={c.label}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] py-3 px-1 backdrop-blur-xs flex flex-col items-center justify-center"
                  >
                    <span className="block font-mono text-xl sm:text-2xl font-bold tabular-nums text-white">
                      {String(c.value).padStart(2, '0')}
                    </span>
                    <span className="mt-1 block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      {c.label.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              {isRegistered ? (
                <div className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-sm font-bold text-emerald-300">
                  <CheckCircle2 size={16} /> Pass issued
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowRegisterModal(true)}
                  className="flex min-h-[48px] w-full items-center justify-center rounded-xl bg-white text-sm sm:text-base font-bold text-[#091533] transition-all duration-150 ease-out hover:bg-slate-100 active:scale-[0.98] shadow-md cursor-pointer"
                >
                  Register now
                </button>
              )}

              {/* Social Proof Row */}
              <div className="flex items-center gap-2.5 pt-0.5">
                <div className="flex -space-x-1.5 shrink-0">
                  <span className="inline-block h-5 w-5 rounded-full bg-[#A3E635] ring-2 ring-[#060E24]" />
                  <span className="inline-block h-5 w-5 rounded-full bg-[#00D2FF] ring-2 ring-[#060E24]" />
                  <span className="inline-block h-5 w-5 rounded-full bg-[#EC4899] ring-2 ring-[#060E24]" />
                  <span className="inline-block h-5 w-5 rounded-full bg-[#F59E0B] ring-2 ring-[#060E24]" />
                </div>
                <p className="text-xs sm:text-sm text-slate-300">
                  <strong className="text-white font-bold">221</strong> registered · <strong className="text-white font-bold">7</strong> new today 🔥
                </p>
              </div>

              {/* Divider */}
              <div className="border-t border-white/10" />

              {/* Event Metadata Table */}
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex items-center justify-between py-1">
                  <span className="text-slate-400 font-normal">Registered</span>
                  <span className="font-bold text-white">221</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-slate-400 font-normal">Registration</span>
                  <span className="font-bold text-white">13 Nov – 6 Dec</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-slate-400 font-normal">Submissions</span>
                  <span className="font-bold text-white">13 Nov – 12 Dec</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-slate-400 font-normal">Entry fee</span>
                  <span className="font-bold text-white">Free</span>
                </div>
                <div className="flex items-start justify-between py-1 gap-2">
                  <span className="text-slate-400 font-normal shrink-0">Eligibility</span>
                  <span className="font-bold text-white text-right leading-snug">
                    Students, Freshers,<br />Professionals
                  </span>
                </div>
              </div>
            </div>

            {/* 2. Venue & Logistics Card */}
            <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
              <SectionHead icon={MapPin} title="Venue & Logistics" sub="Confirmed specifications" />
              <dl className="divide-y divide-slate-100 text-sm">
                {[
                  { icon: Globe, label: 'Format', value: `${event.mode} (Online Discord + Regional Partner Hubs)` },
                  { icon: Trophy, label: 'Prizes & Recognition', value: event.placeholders.prizes },
                  { icon: Users, label: 'Sponsors & Partners', value: event.placeholders.sponsors },
                ].map((row) => (
                  <div key={row.label} className="flex gap-3 py-3.5">
                    <row.icon size={17} className="mt-0.5 shrink-0 text-[#0088E0]" />
                    <div>
                      <dt className="text-xs font-medium text-slate-500">{row.label}</dt>
                      <dd className="text-sm font-semibold text-slate-900 leading-snug mt-0.5">{row.value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </div>

      {/* Closing CTA */}
      <section className="relative isolate overflow-hidden rounded-[2rem] border border-blue-500/20 bg-[#050C1F] text-white shadow-xl">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background: `
              radial-gradient(ellipse 60% 80% at 85% 80%, rgba(14, 82, 230, 0.45) 0%, transparent 65%),
              radial-gradient(ellipse 40% 50% at 15% 20%, rgba(6, 182, 212, 0.2) 0%, transparent 60%),
              linear-gradient(135deg, #04091A 0%, #081636 50%, #0C2356 100%)
            `,
          }}
        />
        <div className="flex flex-col justify-between gap-6 p-8 sm:p-12 lg:flex-row lg:items-center">
          <div className="max-w-xl space-y-2">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-sky-300">Ready to Compete?</span>
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl text-white">
              Ready to build real-world solutions?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Join student innovators across the country for 48 hours. Free registration, verified certificate, and live mentor guidance.
            </p>
          </div>
          <div className="shrink-0">{registerButton('light')}</div>
        </div>
      </section>

      {/* Track brief dialog */}
      {activeTrackDetail &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-3 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="track-dialog-title"
            onClick={() => setSelectedTrackIndex(null)}
          >
            <div
              className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white font-manrope shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 border-b border-slate-200 p-6 sm:p-7">
                <div className="space-y-1">
                  <p className="font-mono text-sm text-slate-400">Track 0{(selectedTrackIndex ?? 0) + 1}</p>
                  <h3 id="track-dialog-title" className="text-xl font-semibold leading-tight tracking-tight text-[#10233F] sm:text-2xl">
                    {activeTrackDetail.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedTrackIndex(null)}
                  aria-label="Close"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-7 overflow-y-auto p-6 text-sm sm:p-7">
                <div className="space-y-1.5">
                  <h4 className="text-sm font-semibold text-slate-900">Problem overview</h4>
                  <p className="leading-relaxed text-slate-600">{activeTrackDetail.brief}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-slate-900">Challenge ideas</h4>
                  <ol className="divide-y divide-slate-100 rounded-2xl border border-slate-200">
                    {activeTrackDetail.ideas.map((idea, idx) => (
                      <li key={idx} className="flex gap-3 p-4">
                        <span className="font-mono text-slate-400">0{idx + 1}</span>
                        <p className="leading-relaxed text-slate-700">{idea}</p>
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-slate-900">Suggested stack</h4>
                  <ul className="flex flex-wrap gap-2">
                    {activeTrackDetail.suggestedStack.map((tech, idx) => (
                      <li key={idx} className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-xs text-slate-700">{tech}</li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-slate-900">How it is judged</h4>
                  <ul className="space-y-2">
                    {activeTrackDetail.evaluation.map((evalItem, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 text-slate-700">
                        <Check size={16} className="shrink-0 text-slate-400" /> {evalItem}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-slate-200 p-5 sm:px-7">
                <button
                  type="button"
                  onClick={() => setSelectedTrackIndex(null)}
                  className="min-h-[44px] rounded-xl border border-slate-200 px-5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTrackIndex(null);
                    setShowRegisterModal(true);
                  }}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[#10233F] px-6 text-sm font-semibold text-white transition-[transform,background-color] hover:bg-[#1a3558] active:scale-[0.97] cursor-pointer"
                >
                  Register for this track <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Mobile-only Sticky Register Option (Accessibility & Quick Action) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] md:hidden px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
          <div>
            <p className="font-bold text-slate-900 text-sm tracking-tight leading-tight">
              ₹50K in prizes
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              10 days left · 221 registered
            </p>
          </div>
          {isRegistered ? (
            <div className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs font-bold text-emerald-700">
              <CheckCircle2 size={15} /> Pass issued
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowRegisterModal(true)}
              className="px-6 py-2.5 rounded-xl bg-[#10233F] text-white text-sm font-bold tracking-tight hover:bg-[#1a3558] active:scale-[0.98] transition-all shadow-sm cursor-pointer whitespace-nowrap"
            >
              Register
            </button>
          )}
        </div>
      </div>

      {showRegisterModal && (
        <EventRegistrationModal
          event={event}
          isOpen={showRegisterModal}
          onClose={() => setShowRegisterModal(false)}
          onSuccess={(reg) => {
            onRegisteredSuccess?.(reg);
          }}
        />
      )}
    </div>
  );
};
