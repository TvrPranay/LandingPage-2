import React, { useState } from 'react';
import {
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  FolderGit2,
  Layers,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Cpu,
  Globe,
  Rocket,
  ShieldCheck,
  Code2,
  Calendar,
  Clock,
  GraduationCap,
  Award,
  Users,
  GitBranch,
  Terminal,
  Database,
  Palette,
  ExternalLink,
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
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

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

  const faqs = [
    {
      question: `Can beginners join ${club.name}?`,
      answer:
        'Yes, absolutely. The club uses tiered squads where beginners work on starter tickets with guidance from senior student leads and mentors.',
    },
    {
      question: 'Is there any registration or membership fee?',
      answer:
        'Zero fees. Teklozy Student Clubs are 100% free for all college and university students.',
    },
    {
      question: 'How much time does it take per week?',
      answer:
        'Only 3 to 5 hours per week. Sprints are asynchronous and designed to easily fit alongside your college classes and exam schedules.',
    },
    {
      question: 'What do I get upon completing projects?',
      answer:
        'You receive verified digital membership credentials, public open-source Git commits on your GitHub profile, and portfolio artifacts.',
    },
  ];

  return (
    <div className="font-manrope text-slate-800 space-y-7 sm:space-y-8 pb-20 max-w-7xl mx-auto">
      {/* Back button */}
      <div>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#0088E0] transition-colors cursor-pointer"
        >
          <ArrowLeft size={15} /> Back to Clubs
        </button>
      </div>

      {/* 1. HERO CARD (CLEAN WHITE THEME: 3D Emblem + Category + Title + Tagline + Apply Button + 4 Metric Chips) */}
      <div className="bg-white rounded-[32px] sm:rounded-[36px] p-6 sm:p-8 shadow-[0_12px_45px_rgba(15,23,42,0.06)] border border-slate-100 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4 sm:gap-5">
            <div className="shrink-0 p-2 sm:p-2.5 rounded-2xl bg-slate-50 border border-slate-100 shadow-xs flex items-center justify-center">
              {renderClubVisual(club.id)}
            </div>
            <div className="space-y-1">
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[#0088E0] bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-100 inline-block">
                {club.category}
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#10233F] tracking-tight">
                {club.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-2xl leading-relaxed">
                {club.tagline}
              </p>
            </div>
          </div>

          <div className="shrink-0">
            {isApplied ? (
              <div className="px-6 py-3 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs sm:text-sm font-bold flex items-center gap-2">
                <CheckCircle2 size={16} />
                <span>Application Submitted • {appliedStatus || 'In Review'}</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="px-8 py-3.5 rounded-full bg-[#0088E0] hover:bg-[#0077CC] text-white font-extrabold text-sm shadow-md hover:shadow-sky-300/40 transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>Apply to Join Club</span>
                <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>

        {/* 4 Clean Metric Chips (Clean, high-contrast, professional) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2 border-t border-slate-100">
          <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50/90 border border-slate-100 text-center hover:border-sky-200 transition-colors">
            <span className="text-sm sm:text-base font-black text-slate-900 block">Batch 2026</span>
            <span className="text-xs text-slate-400 font-medium mt-0.5 block">Active Cohort</span>
          </div>
          <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50/90 border border-slate-100 text-center hover:border-sky-200 transition-colors">
            <span className="text-sm sm:text-base font-black text-slate-900 block">All College Students</span>
            <span className="text-xs text-slate-400 font-medium mt-0.5 block">1st–4th Year Eligible</span>
          </div>
          <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50/90 border border-slate-100 text-center hover:border-sky-200 transition-colors">
            <span className="text-sm sm:text-base font-black text-slate-900 block">3–5 Hours / Week</span>
            <span className="text-xs text-slate-400 font-medium mt-0.5 block">Flexible Schedule</span>
          </div>
          <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50/90 border border-slate-100 text-center hover:border-sky-200 transition-colors">
            <span className="text-sm sm:text-base font-black text-slate-900 block">100% Free</span>
            <span className="text-xs text-slate-400 font-medium mt-0.5 block">Verified Certificate</span>
          </div>
        </div>
      </div>

      {/* 2. CORE FOCUS TRACKS (VISUAL SPECIALIZATION CARDS) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-sky-50 text-[#0088E0] flex items-center justify-center font-bold border border-sky-100 shadow-xs shrink-0">
            <Layers size={18} />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-[#10233F] tracking-tight">
              Focus Tracks
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Pick a domain track to specialize and collaborate with peers
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {tracks.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs hover:border-sky-300 hover:shadow-md transition-all flex flex-col justify-between gap-4"
            >
              <div className="space-y-2">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-sky-100/70 text-[#0088E0] text-[10px] font-black uppercase tracking-wider">
                  {t.tag}
                </span>
                <h3 className="text-base sm:text-lg font-black text-[#10233F] leading-snug">
                  {t.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {t.pitch}
                </p>
              </div>

              {/* Tech Badges */}
              <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
                {t.stack.map((item, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2.5 py-1 rounded-lg bg-slate-50 text-slate-700 text-[11px] font-semibold border border-slate-100"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. ACTIVE CAPSTONE PROJECTS (WHAT THE SQUAD BUILDS) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold border border-purple-100 shadow-xs shrink-0">
            <FolderGit2 size={18} />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-[#10233F] tracking-tight">
              Active Capstone Projects
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Real codebases and applications you will contribute to
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {club.sampleProjects.map((proj, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs hover:border-purple-300 hover:shadow-md transition-all flex flex-col justify-between gap-4"
            >
              {/* Project Window Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 ml-1">
                    teklozy-project-0{idx + 1}.git
                  </span>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Active Sprint
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-black text-[#10233F] leading-snug">
                  {proj.title}
                </h3>
                <p className="text-xs text-slate-600 font-normal leading-relaxed">
                  {proj.description}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
                {proj.tech.map((t, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-0.5 rounded-md bg-purple-50 text-purple-700 text-[11px] font-mono font-semibold border border-purple-100"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. WEEKLY ACTIVITIES & SPRINT RHYTHM (WHAT MEMBERS ACTUALLY DO) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold border border-emerald-100 shadow-xs shrink-0">
            <Clock size={18} />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-[#10233F] tracking-tight">
              Weekly Squad Rhythm
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Structured sessions designed around your college classes
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {club.exampleActivities.map((act, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between gap-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                    {act.frequency}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-black text-slate-900 leading-snug">
                  {act.title}
                </h3>
                <p className="text-xs text-slate-600 font-normal leading-relaxed">
                  {act.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. SKILLS DEVELOPED (RESUME-READY CAPABILITIES) */}
      <div className="bg-white rounded-[32px] sm:rounded-[36px] p-6 sm:p-8 border border-slate-100 shadow-[0_10px_35px_rgba(15,23,42,0.05)] space-y-5">
        <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
          <div className="w-10 h-10 rounded-2xl bg-sky-50 text-[#0088E0] flex items-center justify-center font-bold shrink-0 border border-sky-100 shadow-xs">
            <Award size={20} />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-[#10233F] tracking-tight">
              Verified Skills You Will Build
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Practical competencies showcased on your verified digital credentials
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {club.skillsDeveloped.map((skill, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-center gap-3 hover:bg-sky-50/50 hover:border-sky-200 transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-sky-100 text-[#0088E0] flex items-center justify-center shrink-0">
                <CheckCircle2 size={14} />
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-800">
                {skill}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 6. HOW MEMBERSHIP WORKS (3-STEP CONNECTED ROADMAP) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold border border-amber-100 shadow-xs shrink-0">
            <Sparkles size={18} />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-[#10233F] tracking-tight">
              How Membership Works
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              3 simple steps from joining to shipping production code
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-2 hover:border-sky-300 transition-all">
            <div className="w-8 h-8 rounded-full bg-sky-50 text-[#0088E0] font-black text-xs flex items-center justify-center border border-sky-100">
              01
            </div>
            <h3 className="text-sm sm:text-base font-black text-slate-900">Apply in Minutes</h3>
            <p className="text-xs text-slate-500 font-normal leading-relaxed">
              Share your university info and pick your preferred domain track. Beginners are warmly welcome.
            </p>
          </div>

          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-2 hover:border-purple-300 transition-all">
            <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 font-black text-xs flex items-center justify-center border border-purple-100">
              02
            </div>
            <h3 className="text-sm sm:text-base font-black text-slate-900">Squad Assignment</h3>
            <p className="text-xs text-slate-500 font-normal leading-relaxed">
              Get matched into a 4–6 student squad with senior mentors to collaborate on real project tickets.
            </p>
          </div>

          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-2 hover:border-emerald-300 transition-all">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 font-black text-xs flex items-center justify-center border border-emerald-100">
              03
            </div>
            <h3 className="text-sm sm:text-base font-black text-slate-900">Ship & Get Verified</h3>
            <p className="text-xs text-slate-500 font-normal leading-relaxed">
              Commit code, deploy production features, and earn verified digital credentials for your resume.
            </p>
          </div>
        </div>
      </div>

      {/* 7. FAQS (CLEAN WHITE ACCORDION BOX) */}
      <div className="bg-white rounded-[32px] sm:rounded-[36px] p-6 sm:p-8 border border-slate-100 shadow-[0_10px_35px_rgba(15,23,42,0.05)] space-y-5">
        <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold shrink-0 border border-amber-100 shadow-xs">
            <HelpCircle size={20} />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-[#10233F] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Everything you need to know about joining and participating
            </p>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={idx} className="py-3.5 first:pt-0 last:pb-0">
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left font-bold text-slate-900 hover:text-[#0088E0] transition-colors gap-3 cursor-pointer py-1"
                >
                  <span className="text-xs sm:text-sm">{faq.question}</span>
                  <span className="shrink-0 text-slate-400">
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </span>
                </button>
                {isOpen && (
                  <p className="mt-2 text-slate-600 leading-relaxed text-xs font-normal">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 8. CLOSING HERO BANNER (REVERTED TO PREVIOUS CLEAN DEEP NAVY STYLE - ZERO MOUNTAIN GRAPHICS) */}
      <div className="relative overflow-hidden rounded-[32px] sm:rounded-[36px] bg-gradient-to-r from-[#071326] via-[#0B1E38] to-[#0A264F] text-white p-7 sm:p-10 shadow-2xl border border-sky-500/20">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-[#0088E0]/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] text-[#38BDF8]">
              Teklozy Student Communities
            </span>
            <h3 className="text-xl sm:text-3xl font-black text-white tracking-tight leading-tight">
              Ready to build software with {club.name}?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm font-medium">
              Join fellow students across India. 100% free membership, peer collaboration, and verified project credentials.
            </p>
          </div>

          <div className="shrink-0">
            {isApplied ? (
              <div className="px-7 py-3.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-bold text-xs sm:text-sm flex items-center gap-2">
                <CheckCircle2 size={16} />
                <span>Application Submitted</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="px-8 py-3.5 rounded-full bg-[#0088E0] hover:bg-[#0077CC] text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-sky-500/30 transition-all flex items-center gap-2.5 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Apply to Join Club</span>
                <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Multi-Step Modal */}
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
