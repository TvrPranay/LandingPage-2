import React, { useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Calendar,
  CheckCircle2,
  FileText,
  Gamepad2,
  GraduationCap,
  Layers,
  MessageSquare,
  Shield,
  Target,
  Ticket,
  TrendingUp,
  User,
  Users,
} from 'lucide-react';
import { TeklozyClub, ClubApplication } from '../../types/clubs';
import { ClubApplicationMultiStepModal } from './ClubApplicationMultiStepModal';
import {
  getClubConfig,
  SHARED_SECTION_ASSETS,
} from '../../data/clubDetailsData';

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

  const domain = getClubConfig(club.id);
  const heroImageSrc = domain.heroImage || club.imageUrl;
  const ToolIcon = domain.toolIcon;

  const joinAction = () => {
    if (isApplied) return;
    setShowModal(true);
  };

  return (
    <div className="font-manrope text-slate-800 pb-24 max-w-7xl mx-auto space-y-12 sm:space-y-14">
      {/* Top Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 pt-1">
        <button
          type="button"
          onClick={onBack}
          className="hover:text-[#10233F] transition-colors cursor-pointer flex items-center gap-1 font-medium"
        >
          <span>← Clubs</span>
        </button>
        <span className="text-slate-300">›</span>
        <span className="font-semibold text-slate-800 truncate">{club.name}</span>
      </nav>

      {/* ========================================================= */}
      {/* SECTION 01 — CLUB HERO (Single Primary CTA, Quiet Chrome) */}
      {/* ========================================================= */}
      <header className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Identity & Primary CTA */}
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50/80 px-3.5 py-1 text-xs font-bold text-[#0088E0] shadow-2xs">
              <ToolIcon size={14} className="shrink-0" />
              <span>{domain.badgeLabel}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-black tracking-tight text-[#10233F] leading-[1.08]">
              {club.name}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              {club.tagline ||
                'A hands-on community for designers, creators, and visual thinkers to learn, collaborate, and ship real work.'}
            </p>

            <div className="flex items-center gap-3 pt-2">
              {isApplied ? (
                <div className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-7 text-sm font-bold text-emerald-700 shadow-xs">
                  <CheckCircle2 size={16} />
                  <span>You're in · {appliedStatus || 'In review'}</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={joinAction}
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#0088E0] px-8 text-sm font-bold text-white transition-all duration-150 ease-out hover:bg-[#0077CC] hover:shadow-lg hover:shadow-sky-500/25 active:scale-[0.98] cursor-pointer"
                >
                  Join the Club <ArrowRight size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Hero Visual with Domain Badges */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 bg-slate-900 shadow-xl aspect-[16/10] sm:aspect-[16/9.5] group">
              <img
                src={heroImageSrc}
                alt={`${club.name} community collaboration`}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                loading="eager"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none"
              />

              <div className="absolute top-4 right-4 flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-slate-950/75 border border-white/15 px-3 py-1.5 backdrop-blur-md shadow-lg">
                  {domain.toolBadges.map((tool) => (
                    <span
                      key={tool}
                      className="text-[11px] font-bold text-white/90 px-1.5 py-0.5 rounded bg-white/10"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
                <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-[#0088E0] to-[#0055AA] border border-white/30 flex items-center justify-center text-white shadow-lg shadow-sky-500/40">
                  <ToolIcon size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Key Stats Strip */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          <div className="flex items-center gap-3 pt-2 sm:pt-0">
            <div className="flex -space-x-2 shrink-0">
              {SHARED_SECTION_ASSETS.communityAvatars.map((av, i) => (
                <img
                  key={i}
                  src={av}
                  alt=""
                  className="h-8 w-8 rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>
            <div>
              <p className="text-sm font-bold text-[#10233F] leading-tight">
                {club.activeMembersCount || 28} Active Members
              </p>
              <p className="text-xs font-semibold text-emerald-600">+5 this week</p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:pl-6 pt-2 sm:pt-0">
            <div className="h-9 w-9 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-[#10233F] shrink-0">
              <BarChart3 size={18} />
            </div>
            <div>
              <p className="text-sm font-bold text-[#10233F] leading-tight">{club.difficulty || 'Moderate Level'}</p>
              <p className="text-xs text-slate-500">Skill-building &amp; real projects</p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:pl-6 pt-2 sm:pt-0">
            <div className="h-9 w-9 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-[#10233F] shrink-0">
              <Calendar size={18} />
            </div>
            <div>
              <p className="text-sm font-bold text-[#10233F] leading-tight">
                {club.applicationDeadline || '15 Dec, 2026'}
              </p>
              <p className="text-xs text-slate-500">Next Event</p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:pl-6 pt-2 sm:pt-0">
            <div className="h-9 w-9 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-[#10233F] shrink-0">
              <Ticket size={18} />
            </div>
            <div>
              <p className="text-sm font-bold text-[#10233F] leading-tight">Free to Join</p>
              <p className="text-xs text-slate-500">No membership fees</p>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* SECTION 02 — CLUB ACTIVITIES & EVENTS                     */}
      {/* ========================================================= */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span aria-hidden="true" className="h-1.5 w-6 rounded-full bg-[#0088E0]" />
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#10233F]">
              Club Activities &amp; Events
            </h2>
          </div>
          <p className="text-sm font-medium text-slate-500">
            Workshops, design sprints, creative challenges, and real-world projects.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {domain.activities.map((act, idx) => (
            <div
              key={idx}
              className="group rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 flex flex-col justify-between hover:border-sky-300 hover:shadow-lg hover:shadow-sky-500/10 transition-all duration-200"
            >
              <div>
                <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl bg-slate-900 mb-3.5 group-hover:shadow-sm transition-all">
                  <img
                    src={act.image}
                    alt={act.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#10233F] group-hover:text-[#0088E0] transition-colors leading-snug">
                  {act.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  {act.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 mt-3 border-t border-slate-100">
                <span
                  className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${
                    act.badgeColor === 'green'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-sky-50 text-sky-700 border border-sky-200'
                  }`}
                >
                  {act.badge}
                </span>
                <span className="text-slate-400 group-hover:text-[#0088E0] group-hover:translate-x-1 transition-all">
                  →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 03 — NETWORK & TEAM (Balanced Composition)        */}
      {/* ========================================================= */}
      <section className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Heading, Subtitle & 3 Value Pills */}
          <div className="lg:col-span-5 space-y-5">
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <span aria-hidden="true" className="h-1.5 w-6 rounded-full bg-[#0088E0]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#0088E0]">
                  Network &amp; Team
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black tracking-tight text-[#10233F] leading-tight">
                {domain.networkHeadline}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                {domain.networkDescription}
              </p>
            </div>

            <div className="space-y-3 pt-1">
              {[
                { icon: Users, text: domain.networkPills[0] },
                { icon: GraduationCap, text: domain.networkPills[1] },
                { icon: Layers, text: domain.networkPills[2] },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3.5 p-3.5 rounded-2xl border border-slate-200/80 bg-white shadow-2xs hover:border-sky-300 hover:shadow-xs transition-all"
                >
                  <div className="h-10 w-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#0088E0] shrink-0">
                    <item.icon size={20} />
                  </div>
                  <span className="text-sm font-bold text-slate-800 leading-snug">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Collaborative Team Scene with Floating Badges */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 bg-slate-900 shadow-xl aspect-[16/11] group">
              <img
                src={SHARED_SECTION_ASSETS.teamCollaborationImg}
                alt={`${club.name} team collaboration`}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                loading="lazy"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none"
              />

              <div className="absolute top-5 left-5 inline-flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-md px-3.5 py-1.5 shadow-lg border border-slate-200/80 text-xs font-bold text-slate-800">
                <Layers size={14} className="text-[#0088E0]" />
                <span>{domain.networkCallouts[0]}</span>
              </div>

              <div className="absolute top-5 right-5 inline-flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-md px-3.5 py-1.5 shadow-lg border border-slate-200/80 text-xs font-bold text-slate-800">
                <MessageSquare size={14} className="text-[#0088E0]" />
                <span>{domain.networkCallouts[1]}</span>
              </div>

              <div className="absolute bottom-5 right-5 inline-flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-md px-3.5 py-1.5 shadow-lg border border-slate-200/80 text-xs font-bold text-slate-800">
                <BookOpen size={14} className="text-[#0088E0]" />
                <span>{domain.networkCallouts[2]}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 04 — ELIGIBILITY & REGULATIONS (Marble Guardian)  */}
      {/* ========================================================= */}
      <section className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 lg:p-10 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Marble Guardian with Blue Shield */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-full max-w-sm aspect-square flex items-center justify-center rounded-3xl overflow-hidden">
              <img
                src={SHARED_SECTION_ASSETS.eligibilityStatueImg}
                alt="Community standards and integrity"
                className="relative z-10 h-72 sm:h-80 w-auto object-contain drop-shadow-[0_16px_32px_rgba(15,23,42,0.18)] transition-transform duration-500 hover:scale-[1.02]"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column: Heading, Subtitle & 2x2 Grid of 4 Cards */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span aria-hidden="true" className="h-1.5 w-6 rounded-full bg-[#0088E0]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#0088E0]">
                  Eligibility &amp; Regulations
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#10233F]">
                Simple, Fair &amp; Inclusive
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                A clear framework to keep the club welcoming, respectful, and productive for everyone.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: User, title: 'Open to all students' },
                { icon: FileText, title: 'Follow the club code of conduct' },
                { icon: Users, title: 'Collaborate respectfully and inclusively' },
                { icon: Shield, title: 'Adhere to institute guidelines' },
              ].map((card, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-slate-200/90 bg-white hover:border-sky-300 shadow-2xs hover:shadow-xs transition-all flex items-center gap-3.5"
                >
                  <div className="h-10 w-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#0088E0] shrink-0">
                    <card.icon size={20} />
                  </div>
                  <span className="text-sm font-bold text-slate-800 leading-snug">
                    {card.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 05 — WHY JOIN (Belonging Card with Full BG Image) */}
      {/* ========================================================= */}
      <section className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Heading & Subtitle */}
          <div className="lg:col-span-4 flex flex-col justify-center space-y-3">
            <div className="flex items-center gap-2">
              <span aria-hidden="true" className="h-1.5 w-6 rounded-full bg-[#0088E0]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#0088E0]">Why Join</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#10233F]">
              {domain.whyJoinHeadline}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-sm">
              {domain.whyJoinTagline}
            </p>
          </div>

          {/* Middle Column: Belonging Card (Full Background Image matching Reference) */}
          <div className="lg:col-span-4">
            <div className="relative rounded-3xl overflow-hidden shadow-lg h-full min-h-[380px] p-6 sm:p-7 flex flex-col justify-between text-white border border-slate-200/30 group">
              {/* Full Background Image */}
              <img
                src={SHARED_SECTION_ASSETS.belongingSummitImg}
                alt="Community belonging summit"
                className="absolute inset-0 w-full h-full object-cover object-bottom transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              {/* Subtle upper gradient overlay to guarantee maximum text legibility */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-b from-[#0B1E48]/80 via-[#0B1E48]/30 to-transparent pointer-events-none"
              />

              {/* Header Content directly over image background */}
              <div className="space-y-2 relative z-10 max-w-[260px]">
                <div className="inline-flex h-9 w-9 rounded-xl bg-white/20 border border-white/30 items-center justify-center text-white backdrop-blur-md shadow-xs">
                  <Users size={18} />
                </div>
                <h3 className="text-2xl font-black tracking-tight text-white leading-tight">Belonging</h3>
                <p className="text-xs sm:text-sm text-blue-50/90 leading-relaxed font-normal">
                  {domain.belongingSubtext}
                </p>
              </div>

              {/* Bottom Spacer to let mountain summit and flag breathe */}
              <div className="relative z-10 pt-24" />
            </div>
          </div>

          {/* Right Column: 3 Horizontal Stacked Cards with Clean Visual Assets */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-4">
            {/* Card 1: Enjoyment with Golden Trophy */}
            <div className="flex-1 rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 flex items-center justify-between gap-4 shadow-2xs hover:border-sky-300 transition-all group">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Gamepad2 size={16} className="text-[#0088E0]" />
                  <h3 className="text-base font-bold text-[#10233F]">Enjoyment</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {domain.enjoymentSubtext}
                </p>
              </div>
              <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl overflow-hidden shrink-0 flex items-center justify-center">
                <img
                  src={SHARED_SECTION_ASSETS.trophyImg}
                  alt="Enjoyment trophy"
                  className="h-full w-full object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Card 2: Growth with Growth Chart */}
            <div className="flex-1 rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 flex items-center justify-between gap-4 shadow-2xs hover:border-sky-300 transition-all group">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} className="text-[#0088E0]" />
                  <h3 className="text-base font-bold text-[#10233F]">Growth</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {domain.growthSubtext}
                </p>
              </div>
              <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl overflow-hidden shrink-0 flex items-center justify-center">
                <img
                  src={SHARED_SECTION_ASSETS.growthImg}
                  alt="Growth chart"
                  className="h-full w-full object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Card 3: Purpose with Bullseye Target */}
            <div className="flex-1 rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 flex items-center justify-between gap-4 shadow-2xs hover:border-sky-300 transition-all group">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Target size={16} className="text-[#0088E0]" />
                  <h3 className="text-base font-bold text-[#10233F]">Purpose</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {domain.purposeSubtext}
                </p>
              </div>
              <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl overflow-hidden shrink-0 flex items-center justify-center">
                <img
                  src={SHARED_SECTION_ASSETS.purposeImg}
                  alt="Purpose target"
                  className="h-full w-full object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 06 — JOIN CLUB CTA BANNER                         */}
      {/* ========================================================= */}
      <section className="relative rounded-3xl bg-gradient-to-r from-[#09152C] via-[#0E2044] to-[#0A1835] border border-blue-500/25 p-6 sm:p-8 lg:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl overflow-hidden">
        {/* Left Side: Users Icon Box + Divider + Heading & Subtitle */}
        <div className="flex items-center gap-5 relative z-10">
          <div className="h-14 w-14 rounded-2xl bg-white/5 border border-white/15 flex items-center justify-center text-white shrink-0 shadow-md">
            <Users size={26} />
          </div>
          <div className="h-12 w-px bg-white/15 hidden sm:block" />
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
              Ready to Create Together?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed max-w-xl">
              Join the club, collaborate on real projects, and grow with a community that creates, learns, and ships.
            </p>
          </div>
        </div>

        {/* Right Side: Join the Club Button */}
        <div className="shrink-0 relative z-10 w-full sm:w-auto flex justify-start sm:justify-end">
          {isApplied ? (
            <div className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-400/40 px-7 text-sm font-bold text-emerald-300">
              <CheckCircle2 size={16} />
              <span>You're in · {appliedStatus || 'In review'}</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={joinAction}
              className="inline-flex min-h-[50px] w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#0088E0] px-8 text-sm sm:text-base font-bold text-white transition-all duration-150 ease-out hover:bg-[#0077CC] hover:shadow-lg hover:shadow-sky-500/30 active:scale-[0.98] cursor-pointer whitespace-nowrap"
            >
              Join the Club <ArrowRight size={18} />
            </button>
          )}
        </div>
      </section>

      {/* ========================================================= */}
      {/* MOBILE-ONLY STICKY REGISTER OPTION (ACCESSIBILITY)        */}
      {/* ========================================================= */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] md:hidden px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
          <div>
            <p className="font-bold text-slate-900 text-sm tracking-tight leading-tight truncate max-w-[190px]">
              {club.name}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">Free to join · {club.difficulty || 'All levels'}</p>
          </div>
          {isApplied ? (
            <div className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-300 text-xs font-bold text-emerald-700">
              <CheckCircle2 size={14} /> Joined
            </div>
          ) : (
            <button
              type="button"
              onClick={joinAction}
              className="px-6 py-2.5 rounded-full bg-[#0088E0] text-white text-sm font-bold tracking-tight hover:bg-[#0077CC] active:scale-[0.98] transition-all shadow-sm cursor-pointer whitespace-nowrap"
            >
              Join Club
            </button>
          )}
        </div>
      </div>

      {/* Multi-step Application Modal */}
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
