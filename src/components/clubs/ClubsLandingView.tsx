import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Users, ArrowRight, Lock, Check, Bell, Trophy, Crown, Zap, Code2, Layers, PenTool, ShieldCheck, Lightbulb } from 'lucide-react';
import { TeklozyClub } from '../../types/clubs';
import devClubImg from '../../assets/images/clubs-imgs/dev-coding-club.png';
import aiClubImg from '../../assets/images/clubs-imgs/aiclubimg.png';
import designClubImg from '../../assets/images/clubs-imgs/design-club.png';
import cyberCloudClubImg from '../../assets/images/clubs-imgs/cyber-cloud-club.png';
import innovationClubImg from '../../assets/images/clubs-imgs/innovation-club.png';
import onePercentStatue from '../../assets/images/clubs-imgs/one-percent-club-statue.png';

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

// Club banners: AI-generated artwork created for Teklozy, bundled locally.
const CLUB_IMAGES: Record<string, string> = {
  'dev-club': devClubImg,
  'ai-data-club': aiClubImg,
  'design-creative-club': designClubImg,
  'cyber-cloud-club': cyberCloudClubImg,
  'innovation-club': innovationClubImg,
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
    { icon: Trophy, label: 'Top builders' },
    { icon: Zap, label: 'High impact' },
    { icon: Layers, label: 'Cross-club recognition' },
  ];

  return (
    <section
      aria-labelledby="one-percent-heading"
      className="relative isolate overflow-hidden rounded-3xl border border-amber-200/10 bg-[#050B1A] text-white lg:min-h-[31rem]"
    >
      {/* Blue arcs and glow behind the statue */}
      <svg aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full" viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice" fill="none">
        <defs>
          <radialGradient id="onepct-bg-blue" cx="0.7" cy="0.55" r="0.6">
            <stop offset="0" stopColor="#1D4ED8" stopOpacity="0.38" />
            <stop offset="1" stopColor="#1D4ED8" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="onepct-bg-gold" cx="0.86" cy="0.12" r="0.3">
            <stop offset="0" stopColor="#F59E0B" stopOpacity="0.3" />
            <stop offset="1" stopColor="#F59E0B" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="onepct-arc-a" x1="420" y1="500" x2="760" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#3B82F6" stopOpacity="0" />
            <stop offset="0.5" stopColor="#93C5FD" stopOpacity="0.9" />
            <stop offset="1" stopColor="#60A5FA" stopOpacity="0" />
          </linearGradient>
          <filter id="onepct-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="12" />
          </filter>
        </defs>
        <rect width="1200" height="500" fill="url(#onepct-bg-blue)" />
        <rect width="1200" height="500" fill="url(#onepct-bg-gold)" />
        <path d="M420 520 C 470 300, 600 90, 800 -10" stroke="#3B82F6" strokeWidth="18" strokeOpacity="0.4" filter="url(#onepct-blur)" />
        <path d="M420 520 C 470 300, 600 90, 800 -10" stroke="url(#onepct-arc-a)" strokeWidth="1.5" />
        <path d="M520 520 C 580 330, 700 150, 900 40" stroke="url(#onepct-arc-a)" strokeWidth="1" strokeOpacity="0.5" />
      </svg>

      <div className="grid items-center lg:grid-cols-[1fr_1.1fr]">
        <div className="relative z-10 space-y-6 p-8 sm:p-12 lg:p-14">
          <p className="inline-flex items-center gap-2 rounded-full border border-amber-200/30 px-4 py-1.5 text-sm text-amber-100/90">
            <Lock size={14} /> Invite only
          </p>

          <div className="space-y-4">
            <div aria-hidden="true" className="flex items-center gap-3 text-amber-300">
              <span className="h-px w-16 bg-gradient-to-r from-transparent to-amber-300/60" />
              <Crown size={18} strokeWidth={1.5} />
              <span className="h-px w-16 bg-gradient-to-l from-transparent to-amber-300/60" />
            </div>
            <h2 id="one-percent-heading" className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
              The{' '}
              <span className="bg-gradient-to-b from-amber-100 via-amber-300 to-amber-500 bg-clip-text text-transparent">1%</span>{' '}
              Club
            </h2>
          </div>

          <p className="max-w-md text-base leading-relaxed text-slate-300">
            A special circle for the top builders, creators and leaders across all clubs.{' '}
            {progress > 0 ? (
              'You have started. Keep making a real impact.'
            ) : (
              <>
                To be considered, <span className="font-medium text-sky-300">join any club first</span> and make a real impact.
              </>
            )}
          </p>

          <button
            type="button"
            onClick={toggleWatch}
            aria-pressed={watching}
            className={`inline-flex min-h-[52px] items-center gap-2.5 rounded-full px-7 text-sm font-semibold transition-[transform,background-color] duration-150 ease-out active:scale-[0.97] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200 ${
              watching
                ? 'border border-amber-200/40 text-amber-100'
                : 'bg-gradient-to-r from-[#FBE3B5] to-[#F2C987] text-[#2A1B05] shadow-[0_0_34px_rgba(245,190,100,0.35)] hover:from-[#FFEBC6] hover:to-[#F6D294]'
            }`}
          >
            {watching ? <Check size={16} /> : <Bell size={16} />}
            {watching ? 'You are on the watchlist' : 'Notify me if I qualify'}
            {!watching && <ArrowRight size={16} />}
          </button>

          <ul className="flex flex-wrap items-center gap-y-3 text-xs text-slate-300">
            {perks.map((p, i) => (
              <li key={p.label} className={`flex items-center gap-2 ${i > 0 ? 'ml-4 border-l border-white/15 pl-4' : ''}`}>
                <p.icon size={17} strokeWidth={1.5} className="text-amber-300" />
                {p.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Statue holding the membership card */}
        <div className="relative mx-auto w-full max-w-xl px-6 pb-4 lg:absolute lg:inset-y-0 lg:right-0 lg:w-[56%] lg:max-w-none lg:p-0">
          <div className="relative mx-auto aspect-[3/2] w-full lg:absolute lg:bottom-0 lg:right-0 lg:mx-0 lg:h-full lg:w-auto">
            <svg aria-hidden="true" className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 1536 1024" fill="none">
              <defs>
                <filter id="onepct-ring-blur" x="-20%" y="-50%" width="140%" height="200%">
                  <feGaussianBlur stdDeviation="14" />
                </filter>
                <radialGradient id="onepct-card-glow" cx="0.5" cy="0.5" r="0.5">
                  <stop offset="0" stopColor="#F59E0B" stopOpacity="0.45" />
                  <stop offset="1" stopColor="#F59E0B" stopOpacity="0" />
                </radialGradient>
              </defs>
              <ellipse cx="1260" cy="210" rx="520" ry="330" fill="url(#onepct-card-glow)" />
              <g transform="rotate(-10 1260 230)">
                <ellipse cx="1260" cy="230" rx="430" ry="120" stroke="#F59E0B" strokeWidth="14" strokeOpacity="0.55" filter="url(#onepct-ring-blur)" />
                <ellipse cx="1260" cy="230" rx="430" ry="120" stroke="#FDE3A8" strokeWidth="2.5" strokeOpacity="0.9" />
              </g>
            </svg>
            <img
              src={onePercentStatue}
              alt=""
              loading="lazy"
              className="relative h-full w-full object-contain object-bottom drop-shadow-[0_24px_40px_rgba(0,0,0,0.55)]"
            />
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
    <div ref={root} className="font-manrope text-slate-800 space-y-12 sm:space-y-16 pb-16 max-w-7xl mx-auto">
      <header className="space-y-8">
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

      <section id="club-catalog" aria-labelledby="catalog-title" className="scroll-mt-20 space-y-8">
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
