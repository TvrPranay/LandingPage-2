import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  ArrowLeft,
  Calendar,
  Layers,
  ChevronDown,
  ChevronUp,
  Share2,
  ChevronRight,
  CheckCircle2,
  MapPin,
  Trophy,
  Users,
  Building,
  HelpCircle,
  ArrowRight,
  X,
  Sparkles,
  Code2,
  Check,
} from 'lucide-react';
import { TeklozyEvent, EventRegistration } from '../../types/events';
import { EventRegistrationModal } from './EventRegistrationModal';

interface EventDetailsViewProps {
  event: TeklozyEvent;
  onBack: () => void;
  onRegisteredSuccess?: (reg: EventRegistration) => void;
  isRegistered?: boolean;
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
}) => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
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

  /**
   * 3D Vector Visuals for each problem track matching the reference aesthetic
   */
  const renderTrackVisual = (index: number) => {
    switch (index) {
      case 0:
        // Track 01: 3D Glowing Graduation Mortarboard Cap
        return (
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-sky-400/20 rounded-full blur-xl pointer-events-none" />
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_8px_16px_rgba(0,136,224,0.35)]" fill="none">
              <path
                d="M50 20 L88 38 L50 56 L12 38 Z"
                fill="url(#capGradient)"
                stroke="#38BDF8"
                strokeWidth="1.5"
              />
              <path
                d="M26 45 L26 62 C26 72 74 72 74 62 L74 45"
                fill="url(#capBodyGradient)"
                stroke="#0284C7"
                strokeWidth="1.5"
              />
              <circle cx="50" cy="38" r="3" fill="#BAE6FD" />
              <path
                d="M50 38 Q65 42 72 58"
                stroke="#60A5FA"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M72 58 L71 70 M72 58 L73 70 M72 58 L75 69"
                stroke="#93C5FD"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="capGradient" x1="12" y1="20" x2="88" y2="56" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#60A5FA" />
                  <stop offset="0.5" stopColor="#3B82F6" />
                  <stop offset="1" stopColor="#1D4ED8" />
                </linearGradient>
                <linearGradient id="capBodyGradient" x1="26" y1="45" x2="74" y2="72" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#1E40AF" />
                  <stop offset="1" stopColor="#172554" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        );

      case 1:
        // Track 02: 3D Glowing AI Neural Chip Processor
        return (
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl pointer-events-none" />
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_8px_16px_rgba(0,136,224,0.35)]" fill="none">
              <path
                d="M32 12 L32 24 M50 12 L50 24 M68 12 L68 24 M32 76 L32 88 M50 76 L50 88 M68 76 L68 88 M12 32 L24 32 M12 50 L24 50 M12 68 L24 68 M76 32 L88 32 M76 50 L88 50 M76 68 L88 68"
                stroke="#60A5FA"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <rect
                x="22"
                y="22"
                width="56"
                height="56"
                rx="14"
                fill="url(#chipGradient)"
                stroke="#38BDF8"
                strokeWidth="2"
              />
              <rect
                x="30"
                y="30"
                width="40"
                height="40"
                rx="10"
                fill="url(#coreGradient)"
                stroke="#93C5FD"
                strokeWidth="1"
              />
              <text
                x="50"
                y="56"
                textAnchor="middle"
                fontSize="18"
                fontWeight="900"
                fontFamily="system-ui, sans-serif"
                fill="#FFFFFF"
                letterSpacing="1"
              >
                AI
              </text>
              <defs>
                <linearGradient id="chipGradient" x1="22" y1="22" x2="78" y2="78" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#38BDF8" />
                  <stop offset="0.5" stopColor="#0088E0" />
                  <stop offset="1" stopColor="#0369A1" />
                </linearGradient>
                <linearGradient id="coreGradient" x1="30" y1="30" x2="70" y2="70" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0284C7" />
                  <stop offset="1" stopColor="#0C4A6E" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        );

      case 2:
        // Track 03: 3D Cloud Developer Infrastructure with </>
        return (
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-sky-400/20 rounded-full blur-xl pointer-events-none" />
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_8px_16px_rgba(56,189,248,0.35)]" fill="none">
              <path
                d="M32 68 C22 68 14 60 14 50 C14 41 21 34 30 33 C33 22 43 14 55 14 C69 14 80 24 81 37 C87 39 92 45 92 52 C92 61 84 68 75 68 Z"
                fill="url(#cloudGradient)"
                stroke="#7DD3FC"
                strokeWidth="1.5"
              />
              <text
                x="53"
                y="48"
                textAnchor="middle"
                fontSize="16"
                fontWeight="900"
                fontFamily="ui-monospace, monospace"
                fill="#FFFFFF"
                letterSpacing="0.5"
              >
                &lt;/&gt;
              </text>
              <defs>
                <linearGradient id="cloudGradient" x1="14" y1="14" x2="92" y2="68" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#60A5FA" />
                  <stop offset="0.5" stopColor="#0284C7" />
                  <stop offset="1" stopColor="#0369A1" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        );

      case 3:
      default:
        // Track 04: 3D Sustainable Sprout / Eco Leaves
        return (
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-xl pointer-events-none" />
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_8px_16px_rgba(16,185,129,0.35)]" fill="none">
              <path
                d="M50 75 C42 60 22 56 18 36 C34 32 46 48 50 75 Z"
                fill="url(#leftLeafGrad)"
                stroke="#6EE7B7"
                strokeWidth="1.5"
              />
              <path
                d="M50 75 C56 55 78 46 84 25 C88 45 70 65 50 75 Z"
                fill="url(#rightLeafGrad)"
                stroke="#A7F3D0"
                strokeWidth="1.5"
              />
              <path
                d="M50 75 Q51 86 52 90"
                stroke="#059669"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="leftLeafGrad" x1="18" y1="32" x2="50" y2="75" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#34D399" />
                  <stop offset="1" stopColor="#059669" />
                </linearGradient>
                <linearGradient id="rightLeafGrad" x1="50" y1="25" x2="84" y2="75" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#6EE7B7" />
                  <stop offset="0.6" stopColor="#10B981" />
                  <stop offset="1" stopColor="#047857" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        );
    }
  };

  const activeTrackDetail =
    selectedTrackIndex !== null ? trackDetails[selectedTrackIndex] : null;

  return (
    <div className="font-manrope text-slate-800 space-y-10 pb-24 max-w-7xl mx-auto">
      {/* Back button */}
      <div>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#0088E0] transition-colors cursor-pointer"
        >
          <ArrowLeft size={15} /> Back to Events
        </button>
      </div>

      {/* 1. UNIFIED CONTAINER: Details + Metrics + Live Countdown Box */}
      <div className="bg-white rounded-[32px] sm:rounded-[36px] p-6 sm:p-8 shadow-[0_12px_45px_rgba(15,23,42,0.06)] border border-slate-100 space-y-6">
        {/* Top Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#0088E0] bg-sky-50 px-3 py-1 rounded-full">
                {event.category}
              </span>
              <span className="text-xs sm:text-sm font-mono font-bold text-slate-500">
                {event.dates}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-[#10233F] tracking-tight">
              {event.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 font-medium max-w-2xl leading-relaxed">
              {event.tagline}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {isRegistered ? (
              <div className="px-6 py-3.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-sm font-bold flex items-center gap-2">
                <CheckCircle2 size={16} />
                <span>Pass Issued</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowRegisterModal(true)}
                className="px-8 py-3.5 rounded-full bg-[#0088E0] hover:bg-[#0077CC] text-white font-extrabold text-sm shadow-md hover:shadow-sky-300/40 transition-all flex items-center gap-2.5 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>Register for Event</span>
                <ChevronRight size={16} />
              </button>
            )}

            <div className="relative">
              <button
                type="button"
                onClick={handleCopyLink}
                className={`p-3.5 rounded-full border transition-all cursor-pointer flex items-center justify-center ${
                  copiedLink
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-600 shadow-sm'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-[#0088E0]'
                }`}
                title={copiedLink ? 'Copied to clipboard!' : 'Share event invitation'}
              >
                {copiedLink ? <Check size={16} className="text-emerald-600" /> : <Share2 size={16} />}
              </button>

              {/* Toast feedback */}
              {copiedLink && (
                <div className="absolute top-full right-0 mt-2 z-30 px-3.5 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold whitespace-nowrap shadow-xl flex items-center gap-1.5">
                  <Check size={12} className="text-emerald-400" />
                  <span>Invite & link copied!</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 4 Clean Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-2xl bg-slate-50/90 border border-slate-100 text-center hover:border-sky-200 transition-colors">
            <span className="text-sm sm:text-base font-black text-slate-900 block">{event.duration}</span>
            <span className="text-xs text-slate-400 font-medium mt-0.5 block">Sprint Duration</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50/90 border border-slate-100 text-center hover:border-sky-200 transition-colors">
            <span className="text-sm sm:text-base font-black text-slate-900 block">
              1–{event.teamConfig.maxTeamSize} Members
            </span>
            <span className="text-xs text-slate-400 font-medium mt-0.5 block">Team Formation</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50/90 border border-slate-100 text-center hover:border-sky-200 transition-colors">
            <span className="text-sm sm:text-base font-black text-slate-900 block">{event.mode}</span>
            <span className="text-xs text-slate-400 font-medium mt-0.5 block">Participation Mode</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50/90 border border-slate-100 text-center hover:border-sky-200 transition-colors">
            <span className="text-sm sm:text-base font-black text-slate-900 block">Free</span>
            <span className="text-xs text-slate-400 font-medium mt-0.5 block">Registration Fee</span>
          </div>
        </div>

        {/* Integrated Deep Blue Countdown Box */}
        <div className="relative overflow-hidden rounded-[26px] sm:rounded-[28px] bg-gradient-to-br from-[#0B1528] via-[#10233F] to-[#0A1D36] text-white p-6 sm:p-7 border border-sky-500/25 shadow-xl">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-[#0088E0]/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-sky-400">
                  COUNTDOWN TO EVENT KICK-OFF
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Hacking Begins in
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Saturday, 19 December 2026 • 09:00 AM IST
              </p>
            </div>

            {/* 4 Deep Dark Glass Boxes */}
            <div className="grid grid-cols-4 gap-2.5 sm:gap-3 text-center min-w-[280px] sm:min-w-[340px]">
              <div className="p-3 sm:p-3.5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md shadow-inner">
                <span className="text-2xl sm:text-3xl font-black text-white font-mono block">
                  {String(timeLeft.days).padStart(2, '0')}
                </span>
                <span className="text-[10px] text-sky-300 font-bold uppercase mt-1 block tracking-wider">
                  Days
                </span>
              </div>
              <div className="p-3 sm:p-3.5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md shadow-inner">
                <span className="text-2xl sm:text-3xl font-black text-white font-mono block">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[10px] text-sky-300 font-bold uppercase mt-1 block tracking-wider">
                  Hours
                </span>
              </div>
              <div className="p-3 sm:p-3.5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md shadow-inner">
                <span className="text-2xl sm:text-3xl font-black text-white font-mono block">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[10px] text-sky-300 font-bold uppercase mt-1 block tracking-wider">
                  Mins
                </span>
              </div>
              <div className="p-3 sm:p-3.5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md shadow-inner">
                <span className="text-2xl sm:text-3xl font-black text-[#38BDF8] font-mono block">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[10px] text-sky-300 font-bold uppercase mt-1 block tracking-wider">
                  Secs
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-white/10 text-xs text-slate-300 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span className="text-slate-400">
              Registration Deadline:{' '}
              <strong className="text-white font-mono">{event.registrationDeadline}</strong>
            </span>
            <span className="text-sky-300 font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Free Student Registration Open
            </span>
          </div>
        </div>
      </div>

      {/* 2. PROBLEM DOMAINS (NO ENCLOSING OUTER WHITE BOX — DIRECT ON PAGE) */}
      <div className="space-y-5">
        {/* Section Header: Direct on Screen without outer card wrapper */}
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-sky-50 text-[#0088E0] flex items-center justify-center font-bold shadow-xs border border-sky-100/60 shrink-0">
            <Layers size={22} />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#10233F] tracking-tight">
              Problem Domains
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Choose a track and build a solution for a real-world problem.
            </p>
          </div>
        </div>

        {/* 2x2 Individual Track Cards — Direct on Page */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {event.themes.map((theme, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedTrackIndex(idx)}
              className="group relative rounded-2xl sm:rounded-3xl p-5 sm:p-6 bg-white border border-slate-200/80 hover:border-sky-300 shadow-xs hover:shadow-lg transition-all duration-300 flex items-center justify-between gap-4 cursor-pointer hover:-translate-y-0.5"
            >
              {/* Left text */}
              <div className="space-y-2 flex-1">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-sky-100/70 text-[#0088E0] text-[10px] font-black uppercase tracking-wider">
                  TRACK 0{idx + 1}
                </span>
                <h3 className="text-base sm:text-lg font-black text-[#10233F] leading-snug group-hover:text-[#0088E0] transition-colors">
                  {theme.title}
                </h3>
                {theme.description && (
                  <p className="text-xs text-slate-500 line-clamp-2 font-normal leading-relaxed">
                    {theme.description}
                  </p>
                )}
              </div>

              {/* Right: 3D Vector Visual + Arrow Button */}
              <div className="flex flex-col items-end justify-between self-stretch shrink-0 gap-2">
                {renderTrackVisual(idx)}
                <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200/80 shadow-xs flex items-center justify-center text-slate-600 group-hover:text-white group-hover:bg-[#0088E0] group-hover:border-[#0088E0] transition-all">
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. 48-HOUR HACKATHON SCHEDULE & TIMELINE (OPEN FLOW — NO OUTER BOX) */}
      <div className="space-y-6 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shrink-0 shadow-xs border border-emerald-100/60">
              <Calendar size={20} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#10233F] tracking-tight">
                48-Hour Hackathon Schedule & Timeline
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Detailed timeline for Day 1 and Day 2 of the sprint
              </p>
            </div>
          </div>

          <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 self-start sm:self-auto">
            Provisional Sample Schedule
          </span>
        </div>

        {/* Day Selector Tabs */}
        <div className="flex items-center gap-2.5 pb-1">
          {event.provisionalSchedule.map((sched, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveScheduleDay(idx)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeScheduleDay === idx
                  ? 'bg-[#0088E0] text-white shadow-sm'
                  : 'bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {sched.day} ({sched.date})
            </button>
          ))}
        </div>

        {/* Timeline Items Track */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-sky-100 space-y-5 ml-3 py-2">
          {event.provisionalSchedule[activeScheduleDay]?.items.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline Bullet Node */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white border-[3px] border-[#0088E0] shadow-sm group-hover:scale-125 transition-transform" />

              <div className="bg-white hover:bg-sky-50/30 p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-sky-300 transition-all space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="font-mono text-xs font-bold text-[#0088E0]">
                    {item.time}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Day {activeScheduleDay + 1} Session
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">{item.title}</h3>
                {item.description && (
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. VENUE DETAILS & FAQS (ONLY FAQ IN A WHITE BOX) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-4">
        {/* Left: Venue & Logistics Specs (6 cols - Open on canvas, zero box clutter) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-200/80">
            <div className="w-11 h-11 rounded-2xl bg-sky-50 text-[#0088E0] flex items-center justify-center font-bold shrink-0 border border-sky-100/60 shadow-xs">
              <MapPin size={22} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#10233F] tracking-tight">
                Venue & Logistics Details
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Confirmed specifications & upcoming logistics
              </p>
            </div>
          </div>

          <div className="divide-y divide-slate-200/80 space-y-1">
            <div className="pt-2 pb-4 first:pt-0 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#0088E0]">
                  Venue & Host
                </span>
                <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                  Format
                </span>
              </div>
              <p className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                {event.placeholders.venue}
              </p>
            </div>

            <div className="py-4 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#0088E0]">
                  Prize Details & Recognition
                </span>
                <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                  Awards
                </span>
              </div>
              <p className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                {event.placeholders.prizes}
              </p>
            </div>

            <div className="py-4 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#0088E0]">
                  Sponsors & Industry Partners
                </span>
                <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                  Partners
                </span>
              </div>
              <p className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                {event.placeholders.sponsors}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Frequently Asked Questions (ONLY this in a clean white box) */}
        <div className="lg:col-span-6 bg-white rounded-[32px] sm:rounded-[36px] p-6 sm:p-8 border border-slate-100 shadow-[0_10px_35px_rgba(15,23,42,0.05)] space-y-5">
          <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
            <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold shrink-0 border border-amber-100/60 shadow-xs">
              <HelpCircle size={22} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#10233F] tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Everything you need to know before registering
              </p>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {event.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="py-3.5 first:pt-0">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left font-bold text-slate-900 hover:text-[#0088E0] transition-colors gap-3 cursor-pointer py-1"
                  >
                    <span className="text-sm sm:text-base">{faq.question}</span>
                    <span className="shrink-0 text-slate-400">
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </span>
                  </button>
                  {isOpen && (
                    <p className="mt-2 text-slate-600 leading-relaxed text-xs sm:text-sm font-medium">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 5. CLOSING ACTION HERO BANNER (CLEAN, PRO, ZERO BOX CLUTTER) */}
      <div className="relative overflow-hidden rounded-[32px] sm:rounded-[36px] bg-gradient-to-r from-[#071326] via-[#0B1E38] to-[#0A264F] text-white p-8 sm:p-12 shadow-2xl border border-sky-500/20">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-[#0088E0]/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#38BDF8]">
              Teklozy Hackathon 2026
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Ready to build impactful tech in 48 hours?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base font-medium">
              Join student innovators across India on 19–20 December 2026. Free registration, verified certificate, and live mentor guidance.
            </p>
          </div>

          <div className="shrink-0">
            {isRegistered ? (
              <div className="px-8 py-4 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-bold text-sm flex items-center gap-2">
                <CheckCircle2 size={18} />
                <span>Pass Issued • Registered</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowRegisterModal(true)}
                className="px-9 py-4 rounded-full bg-[#0088E0] hover:bg-[#0077CC] text-white font-extrabold text-sm sm:text-base shadow-xl shadow-sky-500/30 transition-all flex items-center gap-3 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Register for Hackathon</span>
                <ChevronRight size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* INTERACTIVE TRACK ZOOM POPUP (FULL STATEMENT DETAILS) */}
      {activeTrackDetail &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] w-screen h-screen flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-hidden top-0 left-0 right-0 bottom-0 m-0"
            role="dialog"
            aria-modal="true"
          >
            <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-sky-100 flex flex-col font-manrope overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
              {/* Header */}
              <div className="flex items-start justify-between p-6 sm:p-7 border-b border-slate-100 bg-gradient-to-r from-sky-50/50 via-white to-blue-50/30">
                <div className="flex items-center gap-4">
                  {selectedTrackIndex !== null && renderTrackVisual(selectedTrackIndex)}
                  <div className="space-y-1">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#0088E0] text-white text-[10px] font-black uppercase tracking-wider">
                      {activeTrackDetail.tag}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-[#10233F] tracking-tight leading-tight">
                      {activeTrackDetail.title}
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedTrackIndex(null)}
                  className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="p-6 sm:p-7 overflow-y-auto space-y-6 text-sm">
                {/* Track Brief */}
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#0088E0] mb-1.5">
                    Problem Overview & Mission
                  </h4>
                  <p className="text-slate-700 leading-relaxed font-medium">
                    {activeTrackDetail.brief}
                  </p>
                </div>

                {/* Challenge Inspiration & Ideas */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                    Challenge Ideas & Inspiration Prompts
                  </h4>
                  <div className="space-y-2">
                    {activeTrackDetail.ideas.map((idea, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3"
                      >
                        <div className="w-5 h-5 rounded-full bg-sky-100 text-[#0088E0] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                          {idx + 1}
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                          {idea}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommended Tech Stack */}
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                    Recommended Tech Stack & Tools
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeTrackDetail.suggestedStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-xl bg-sky-50 text-[#0088E0] font-mono text-xs font-bold border border-sky-100"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Evaluation Criteria */}
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                    Evaluation Focus
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {activeTrackDetail.evaluation.map((evalItem, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-slate-50 text-slate-700 text-xs font-bold text-center border border-slate-100"
                      >
                        ✓ {evalItem}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-5 sm:p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedTrackIndex(null)}
                  className="px-5 py-2.5 rounded-full border border-slate-200 text-slate-600 font-bold text-xs hover:bg-white cursor-pointer"
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedTrackIndex(null);
                    setShowRegisterModal(true);
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#0088E0] hover:bg-[#0077CC] text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Register for this Track</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Registration Modal */}
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
