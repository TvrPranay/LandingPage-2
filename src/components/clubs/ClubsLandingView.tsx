import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Users, ArrowRight, Lock, Check, Bell, Award, Zap, Star, Code2, Layers, PenTool, ShieldCheck, Lightbulb } from 'lucide-react';
import { TeklozyClub } from '../../types/clubs';

interface ClubsLandingViewProps {
  clubs: TeklozyClub[];
  onSelectClub: (slug: string) => void;
  onOpenMyApplications: () => void;
  onOpenAdminPortal?: () => void;
  appliedClubIds: string[];
}

const WATCHLIST_KEY = 'teklozy_one_percent_watchlist';

const CLUB_TAGS: Record<string, string[]> = {
  'dev-club': ['Web & Mobile', 'APIs', 'Open Source'],
  'ai-data-club': ['ML', 'GenAI', 'Data Pipelines'],
  'design-creative-club': ['UI/UX', 'Design Systems', 'Prototyping'],
  'cyber-cloud-club': ['Cloud', 'DevOps', 'Security'],
  'innovation-club': ['Product', 'MVP', 'Venture'],
};

const CLUB_SHORT_NAMES: Record<string, string> = {
  'ai-data-club': 'AI & Data Science Club',
  'cyber-cloud-club': 'Cybersecurity & Cloud Club',
  'innovation-club': 'Innovation Club',
};

// Photos: Unsplash (free to use under the Unsplash License), cropped via URL params.
const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&h=480&crop=entropy&q=70`;
const CLUB_IMAGES: Record<string, string> = {
  'dev-club': unsplash('1555066931-4365d14bab8c'),
  'ai-data-club': unsplash('1620712943543-bcc4688e7485'),
  'design-creative-club': unsplash('1558655146-d09347e92766'),
  'cyber-cloud-club': unsplash('1544197150-b99a580bb7a8'),
  'innovation-club': unsplash('1517048676732-d65bc937f952'),
};

const CLUB_ICONS: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  'dev-club': Code2,
  'ai-data-club': Layers,
  'design-creative-club': PenTool,
  'cyber-cloud-club': ShieldCheck,
  'innovation-club': Lightbulb,
};

const HEADLINE = 'Find your club. Build with people who ship.'.split(' ');

const OnePercentSection: React.FC<{ progress: number }> = ({ progress }) => {
  const [watching, setWatching] = useState<boolean>(() => {
    try {
      return localStorage.getItem(WATCHLIST_KEY) === '1';
    } catch {
      return false;
    }
  });

  const toggleWatch = () => {
    const next = !watching;
    setWatching(next);
    try {
      localStorage.setItem(WATCHLIST_KEY, next ? '1' : '0');
    } catch {
      /* ignore */
    }
  };

  const perks = [
    { icon: Award, label: 'Top builders' },
    { icon: Zap, label: 'High impact' },
    { icon: Star, label: 'Cross-club recognition' },
  ];

  return (
    <section
      aria-labelledby="one-percent-heading"
      className="relative isolate overflow-hidden rounded-3xl border border-white/10 bg-[#0A101C] text-white"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(70% 90% at 80% 50%, black, transparent)',
          WebkitMaskImage: 'radial-gradient(70% 90% at 80% 50%, black, transparent)',
        }}
      />
      <svg aria-hidden="true" className="absolute inset-y-0 right-0 -z-10 hidden h-full w-3/5 lg:block" viewBox="0 0 600 400" preserveAspectRatio="none" fill="none">
        <defs>
          <linearGradient id="onepct-arc" x1="40" y1="400" x2="330" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#3B82F6" stopOpacity="0" />
            <stop offset="0.45" stopColor="#93C5FD" stopOpacity="0.9" />
            <stop offset="0.8" stopColor="#60A5FA" stopOpacity="0.35" />
            <stop offset="1" stopColor="#60A5FA" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="onepct-arc-fill" cx="0.75" cy="0.55" r="0.7">
            <stop offset="0" stopColor="#1D4ED8" stopOpacity="0.28" />
            <stop offset="1" stopColor="#1D4ED8" stopOpacity="0" />
          </radialGradient>
          <filter id="onepct-arc-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="10" />
          </filter>
        </defs>
        <path d="M40 400 C 60 220, 170 70, 330 0 L 600 0 L 600 400 Z" fill="url(#onepct-arc-fill)" />
        <path d="M40 400 C 60 220, 170 70, 330 0" stroke="#3B82F6" strokeWidth="16" strokeOpacity="0.45" filter="url(#onepct-arc-blur)" />
        <path d="M40 400 C 60 220, 170 70, 330 0" stroke="url(#onepct-arc)" strokeWidth="1.5" />
      </svg>
      <div aria-hidden="true" className="absolute -bottom-24 right-16 -z-10 h-40 w-[26rem] rounded-full bg-blue-600/20 blur-3xl" />

      <div className="grid gap-12 p-8 sm:p-12 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16 lg:p-16">
        <div className="space-y-6">
          <p className="inline-flex items-center gap-2 text-sm text-slate-400">
            <Lock size={14} /> Invite only
          </p>
          <h2 id="one-percent-heading" className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
            The <span className="bg-gradient-to-r from-sky-300 to-indigo-300 bg-clip-text text-transparent">1%</span> Club
          </h2>
          <p className="max-w-md text-base leading-relaxed text-slate-300">
            There is no form and no fee. Teklozy invites the standout builders, creators and leaders from every club.
            {progress > 0 ? ' You have started. Keep building.' : ' To be considered, join any club first.'}
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <button
              type="button"
              onClick={toggleWatch}
              aria-pressed={watching}
              className={`inline-flex min-h-[48px] items-center gap-2 rounded-full px-7 text-sm font-semibold transition-all active:scale-[0.98] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                watching
                  ? 'border border-white/20 text-slate-200'
                  : 'bg-[#F4F1EA] text-[#0A101C] shadow-[0_0_32px_rgba(244,241,234,0.28)] hover:bg-white'
              }`}
            >
              {watching ? <Check size={16} /> : <Bell size={16} />}
              {watching ? 'You are on the watchlist' : 'Notify me if I qualify'}
            </button>

            <ul className="flex flex-wrap items-center gap-y-2 text-xs text-slate-400">
              {perks.map((p, i) => (
                <li key={p.label} className={`flex items-center gap-2 ${i > 0 ? 'ml-4 border-l border-white/10 pl-4' : ''}`}>
                  <p.icon size={16} strokeWidth={1.5} className="text-slate-300" />
                  {p.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md py-8 [perspective:1400px]" aria-hidden="true">
          <div className="pointer-events-none absolute inset-x-10 bottom-3 h-px bg-gradient-to-r from-transparent via-sky-200 to-transparent" />
          <div className="pointer-events-none absolute inset-x-16 bottom-0 h-8 rounded-full bg-blue-500/40 blur-2xl" />

          <div
            className="absolute inset-x-2 inset-y-8 translate-x-6 translate-y-3 rounded-3xl border border-sky-200/20 bg-[#0E1729]/70"
            style={{ transform: 'translate(22px, 10px) rotateY(-14deg) rotateX(6deg) rotateZ(-2deg)' }}
          />

          <div
            className="relative flex aspect-[1.586/1] flex-col justify-between overflow-hidden rounded-3xl border border-sky-100/50 bg-gradient-to-br from-[#1C2A4A] via-[#111B32] to-[#0C1427] p-7"
            style={{
              transform: 'rotateY(-14deg) rotateX(6deg) rotateZ(-2deg)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.35), inset 0 0 40px rgba(59,130,246,0.12), 0 0 36px rgba(59,130,246,0.35), 0 30px 60px -28px rgba(0,0,0,0.95)',
            }}
          >
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 252" preserveAspectRatio="none" fill="none">
              <defs>
                <linearGradient id="onepct-card-arc" x1="150" y1="252" x2="400" y2="110" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#60A5FA" stopOpacity="0" />
                  <stop offset="0.55" stopColor="#BFDBFE" stopOpacity="0.95" />
                  <stop offset="1" stopColor="#93C5FD" stopOpacity="0.2" />
                </linearGradient>
                <filter id="onepct-card-blur" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" />
                </filter>
              </defs>
              <path d="M150 252 C 210 170, 300 120, 400 110 L 400 252 Z" fill="#60A5FA" fillOpacity="0.05" />
              <path d="M150 252 C 210 170, 300 120, 400 110" stroke="#3B82F6" strokeWidth="10" strokeOpacity="0.5" filter="url(#onepct-card-blur)" />
              <path d="M150 252 C 210 170, 300 120, 400 110" stroke="url(#onepct-card-arc)" strokeWidth="1.6" />
            </svg>
            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />

            <div className="relative flex items-start justify-between">
              <p className="text-sm font-medium text-slate-100">Teklozy</p>
              <Lock size={16} className="text-amber-300" />
            </div>
            <div className="relative space-y-3">
              <div className="h-3 w-3/5 rounded-sm bg-white/25" />
              <div className="h-3 w-2/5 rounded-sm bg-white/15" />
            </div>
            <div className="relative flex items-end justify-between">
              <p className="font-mono text-2xl font-medium tracking-tight text-slate-50">1% Club</p>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-slate-400">No.</span>
                <span
                  className="block h-4 w-12 opacity-80"
                  style={{ backgroundImage: 'repeating-linear-gradient(90deg, #cbd5e1 0 2px, transparent 2px 4px, #cbd5e1 4px 5px, transparent 5px 8px)' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const ClubsLandingView: React.FC<ClubsLandingViewProps> = ({
  clubs,
  onSelectClub,
  onOpenMyApplications,
  appliedClubIds,
}) => {
  const root = useRef<HTMLDivElement>(null);
  const totalMembers = clubs.reduce((sum, c) => sum + (c.activeMembersCount || 0), 0);
  const openCount = clubs.filter((c) => c.isApplicationOpen).length;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-word]', { yPercent: 110, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.07 });
        gsap.from('[data-hero-fade]', { y: 16, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.08, delay: 0.45 });

        const io = new IntersectionObserver(
          (entries) =>
            entries.forEach((e) => {
              if (!e.isIntersecting) return;
              gsap.from(e.target, { y: 32, opacity: 0, duration: 0.8, ease: 'power3.out' });
              io.unobserve(e.target);
            }),
          { threshold: 0.12 }
        );
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => io.observe(el));
        return () => io.disconnect();
      });
    },
    { scope: root }
  );

  return (
    <div ref={root} className="font-manrope text-slate-800 space-y-16 sm:space-y-24 pb-16 max-w-7xl mx-auto">
      <header className="space-y-8 pt-2">
        <div data-hero-fade className="flex items-center justify-between gap-4">
          <p className="text-sm font-semibold text-[#0088E0]">Student clubs</p>
          <button
            type="button"
            onClick={onOpenMyApplications}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-300 hover:text-[#0088E0] cursor-pointer"
          >
            <Users size={16} /> My applications ({appliedClubIds.length})
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-[#10233F] sm:text-6xl lg:text-7xl">
            <span className="sr-only">Find your club. Build with people who ship.</span>
            <span aria-hidden="true">
              {HEADLINE.map((w, i) => (
                <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.08em]">
                  <span data-word className="inline-block">{w}&nbsp;</span>
                </span>
              ))}
            </span>
          </h1>
          <div data-hero-fade className="space-y-3">
            <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
              Five student communities working on real projects. Pick one and apply in a few minutes.
            </p>
            <p className="text-sm text-slate-500">
              <span className="font-mono tabular-nums text-slate-800">{totalMembers}+</span> active members
              <span className="px-2">·</span>
              <span className="font-mono tabular-nums text-slate-800">{openCount}</span> clubs open
            </p>
          </div>
        </div>
      </header>

      <section id="club-catalog" aria-labelledby="catalog-title" className="scroll-mt-28 space-y-8">
        <style>{`@keyframes club-card-in{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}@media (prefers-reduced-motion:no-preference){.club-card{animation:club-card-in .7s cubic-bezier(.22,1,.36,1) backwards}}`}</style>
        <div className="space-y-2">
          <h2 id="catalog-title" className="text-3xl font-semibold tracking-tight text-[#10233F] sm:text-4xl">Pick your path</h2>
          <p className="text-slate-600">Not sure? Start with the one closest to what you already enjoy.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {clubs.map((club, idx) => {
            const isApplied = appliedClubIds.includes(club.id);
            const tags = CLUB_TAGS[club.id] || ['Technology'];
            const image = CLUB_IMAGES[club.id];
            const accent = club.accentColor || '#0088E0';
            const shortName = CLUB_SHORT_NAMES[club.id] || club.name;
            const Icon = CLUB_ICONS[club.id] || Code2;
            const inkOnTint = `color-mix(in srgb, ${accent} 62%, #0B1220)`;

            return (
              <article
                key={club.id}
                style={{ animationDelay: `${idx * 80}ms` }}
                className="club-card group relative flex flex-col rounded-3xl border border-slate-200 bg-white p-2.5 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.12)] transition-shadow duration-200 hover:shadow-[0_1px_2px_rgba(15,23,42,0.06),0_16px_32px_-12px_rgba(15,23,42,0.2)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-900">
                  {image && (
                    <img
                      src={image}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  )}
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-slate-950/30 to-transparent" />
                  <div className="absolute left-5 top-5 max-w-[60%]">
                    <p className="text-sm font-semibold uppercase leading-snug tracking-wide text-white">{shortName}</p>
                    <span className="mt-2 block h-[3px] w-10 rounded-full" style={{ backgroundColor: accent }} />
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-4 px-3 pb-3 pt-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="flex items-center gap-2 text-sm text-slate-500">
                      {isApplied ? (
                        <span className="inline-flex items-center gap-1.5 font-medium text-emerald-700"><Check size={14} /> Applied</span>
                      ) : club.isApplicationOpen ? (
                        <span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Open</span>
                      ) : (
                        <span>Closed</span>
                      )}
                      <span aria-hidden="true">·</span>
                      <span><span className="font-mono tabular-nums text-slate-700">{club.activeMembersCount}</span> members</span>
                    </p>
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                      style={{ backgroundColor: `${accent}1F`, color: inkOnTint }}
                    >
                      <Icon size={18} strokeWidth={1.75} />
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-xl font-semibold leading-snug text-[#10233F]" title={club.name}>{shortName}</h3>
                    <p className="min-h-[2.8rem] text-sm leading-relaxed text-slate-600 line-clamp-2">{club.tagline}</p>
                  </div>

                  <ul className="flex flex-nowrap gap-1.5 overflow-hidden">
                    {tags.map((t) => (
                      <li
                        key={t}
                        className="shrink-0 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium"
                        style={{ backgroundColor: `${accent}1A`, color: inkOnTint }}
                      >
                        {t}
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => onSelectClub(club.slug)}
                    aria-label={`Explore ${club.name}`}
                    className="mt-auto inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#10233F] text-sm font-semibold text-white transition-colors hover:bg-[#0088E0] active:scale-[0.98] cursor-pointer after:absolute after:inset-0 after:rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0088E0]"
                  >
                    Explore club <ArrowRight size={16} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <OnePercentSection progress={appliedClubIds.length} />
    </div>
  );
};
