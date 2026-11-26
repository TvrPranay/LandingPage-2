import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import logoPng from '../../assets/images/erasebg-teklozy.webp';

interface HeaderProps {
  onScrollToLevel: (levelId: number) => void;
  onScrollToAchievements?: () => void;
  onOpenContact: () => void;
  onOpenLogin: () => void;
  onOpenTeam?: () => void;
  onOpenEvents?: () => void;
  onOpenClubs?: () => void;
  activeNav?: 'home' | 'events' | 'clubs' | 'team' | 'opportunities' | 'login';
  forceCapsule?: boolean;
}

/**
 * Site header: a light, frosted bar that matches the page's warm background.
 * It gains a soft shadow once the page scrolls, so it reads as lifted only when needed.
 */
export const Header: React.FC<HeaderProps> = ({
  onScrollToLevel,
  onScrollToAchievements,
  onOpenContact,
  onOpenLogin,
  onOpenTeam,
  onOpenEvents,
  onOpenClubs,
  activeNav = 'home',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const navWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (navWrapRef.current && !navWrapRef.current.contains(e.target as Node)) setMobileMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [mobileMenuOpen]);

  const skipToContent = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector<HTMLElement>('main, section');
    if (!target) return;
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    target.scrollIntoView({ block: 'start' });
  };

  const close = () => setMobileMenuOpen(false);
  const goLevels = () => {
    onScrollToLevel(1);
    close();
  };
  const goStories = () => {
    if (onScrollToAchievements) onScrollToAchievements();
    else onScrollToLevel(7);
    close();
  };
  const goTeam = () => {
    if (onOpenTeam) onOpenTeam();
    else onScrollToLevel(9);
    close();
  };
  const goEvents = () => {
    onOpenEvents?.();
    close();
  };
  const goClubs = () => {
    onOpenClubs?.();
    close();
  };

  const links: Array<{ label: string; onClick: () => void; active?: boolean }> = [
    { label: 'Events & Programs', onClick: goEvents, active: activeNav === 'events' },
    { label: 'Clubs', onClick: goClubs, active: activeNav === 'clubs' },
    { label: 'Career Levels', onClick: goLevels },
    { label: 'Success Stories', onClick: goStories },
    { label: 'Our Team', onClick: goTeam, active: activeNav === 'team' },
  ];

  const focusRing =
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0088E0]';

  return (
    <header
      ref={navWrapRef}
      className={`fixed inset-x-0 top-0 z-50 border-b bg-[#F7F7F2]/90 font-manrope backdrop-blur-md transition-[border-color,box-shadow] duration-200 ${
        isScrolled ? 'border-slate-900/10 shadow-[0_8px_24px_-20px_rgba(15,23,42,0.4)]' : 'border-transparent'
      }`}
    >
      <a
        href="#main"
        onClick={skipToContent}
        className="absolute left-4 top-2 z-10 -translate-y-[200%] rounded-lg bg-[#10233F] px-4 py-2.5 text-sm font-semibold text-white focus:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0088E0]"
      >
        Skip to content
      </a>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav
          aria-label="Main Navigation"
          className="flex h-14 items-center justify-between gap-4 sm:h-16"
        >
          <button
            type="button"
            onClick={goLevels}
            aria-label="Teklozy, back to top"
            className={`flex shrink-0 cursor-pointer select-none items-center gap-2.5 rounded-lg ${focusRing}`}
          >
            <div className="flex h-9 w-9 shrink-0 items-start justify-center overflow-hidden">
              <img
                decoding="async"
                src={logoPng}
                alt=""
                className="h-[150%] w-full object-contain"
              />
            </div>
            <span aria-hidden="true" className="font-display text-2xl font-bold tracking-tight text-[#10233F]">
              Tek<span className="text-[#0088E0]">lozy</span>
            </span>
          </button>

          <div className="hidden items-center gap-1 text-sm font-medium lg:flex">
            {links.map((l) => (
              <button
                key={l.label}
                type="button"
                onClick={l.onClick}
                aria-current={l.active ? 'page' : undefined}
                className={`min-h-[40px] cursor-pointer rounded-full px-3.5 transition-colors duration-150 ${focusRing} ${
                  l.active
                    ? 'bg-[#E3F1FB] font-semibold text-[#0B4F85]'
                    : 'text-slate-600 hover:bg-slate-900/5 hover:text-[#10233F]'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={onOpenLogin}
              className={`hidden min-h-[40px] cursor-pointer rounded-full px-3.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-900/5 hover:text-[#10233F] lg:inline-block ${focusRing}`}
            >
              Log in
            </button>
            <button
              type="button"
              onClick={onOpenContact}
              className={`hidden min-h-[40px] shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#10233F] px-5 text-sm font-semibold text-white transition-[background-color,transform] duration-150 ease-out hover:bg-[#1a3558] active:scale-[0.97] sm:inline-flex ${focusRing}`}
            >
              Contact us
            </button>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              className={`flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-[#10233F] transition-colors hover:bg-slate-900/5 lg:hidden ${focusRing}`}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div id="mobile-nav" className="max-h-[calc(100dvh-3.5rem)] overflow-y-auto overscroll-contain border-t border-slate-900/10 py-3 animate-in fade-in slide-in-from-top-2 duration-200 motion-reduce:animate-none lg:hidden">
            <div className="flex flex-col gap-1 text-sm font-medium">
              {links.map((l) => (
                <button
                  key={l.label}
                  type="button"
                  onClick={l.onClick}
                  aria-current={l.active ? 'page' : undefined}
                  className={`min-h-[44px] cursor-pointer rounded-xl px-3 text-left transition-colors ${focusRing} ${
                    l.active ? 'bg-[#E3F1FB] font-semibold text-[#0B4F85]' : 'text-slate-700 hover:bg-slate-900/5'
                  }`}
                >
                  {l.label}
                </button>
              ))}
              <div className="mt-2 flex flex-col gap-2 border-t border-slate-900/10 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    onOpenLogin();
                    close();
                  }}
                  className={`min-h-[44px] w-full cursor-pointer rounded-xl border border-slate-900/10 bg-white text-center font-semibold text-[#10233F] transition-colors hover:bg-slate-50 ${focusRing}`}
                >
                  Log in
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onOpenContact();
                    close();
                  }}
                  className={`min-h-[44px] w-full cursor-pointer rounded-xl bg-[#10233F] text-center font-semibold text-white transition-colors hover:bg-[#1a3558] ${focusRing}`}
                >
                  Contact us
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
