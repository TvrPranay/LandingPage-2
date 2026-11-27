import React from 'react';
import {
  Calendar,
  ArrowRight,
  Ticket,
  MapPin,
} from 'lucide-react';
import { TeklozyEvent } from '../../types/events';
import collaborativeTrioImg from '../../assets/images/hackathon-imgs/Collaborative Learning Tech Trio.png';

interface EventsLandingViewProps {
  events: TeklozyEvent[];
  onSelectEvent: (slug: string) => void;
  onOpenMyRegistrations: () => void;
  onOpenAdminPortal?: () => void;
  registeredEventIds: string[];
}

export const EventsLandingView: React.FC<EventsLandingViewProps> = ({
  events,
  onSelectEvent,
  onOpenMyRegistrations,
  registeredEventIds,
}) => {
  // Focus exclusively on the featured Hackathon
  const hackathon =
    events.find((e) => e.isFeatured || e.id.includes('hackathon')) || events[0];

  const isRegistered = hackathon ? registeredEventIds.includes(hackathon.id) : false;

  const renderEventVisual = () => {
    return (
      <div className="relative w-full flex items-center justify-center lg:justify-end">
        <img
          src={collaborativeTrioImg}
          alt="Teklozy Hackathon Collaborative Learning Tech Trio"
          className="w-full max-w-[540px] sm:max-w-[580px] lg:max-w-[620px] object-contain drop-shadow-[0_16px_36px_rgba(0,136,224,0.18)] transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none"
          loading="eager"
        />
      </div>
    );
  };

  return (
    <div className="font-manrope text-slate-800 space-y-4 sm:space-y-6 pb-16 max-w-7xl mx-auto">
      {/* Top Utility & Eyebrow Row */}
      <div className="flex items-center justify-between gap-4 pt-1">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <span className="w-6 sm:w-8 h-[2.5px] bg-[#0088E0] rounded-full inline-block" />
          <span className="text-xs sm:text-sm font-black uppercase tracking-[0.18em] text-[#0088E0]">
            HACKATHONS
          </span>
        </div>
        <button
          type="button"
          onClick={onOpenMyRegistrations}
          className="px-4 py-2 rounded-full bg-white border border-slate-200/90 hover:border-sky-300 text-slate-700 hover:text-[#0088E0] font-bold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Ticket size={15} className="text-[#0088E0]" />
          <span>My Passes ({registeredEventIds.length})</span>
        </button>
      </div>

      {/* Hero Headline with Styled Underline */}
      <div className="space-y-1.5 -mt-1">
        <h1 className="text-3xl sm:text-5xl font-black text-[#10233F] tracking-tight leading-tight">
          Build. Innovate.{' '}
          <span className="relative inline-block text-[#0088E0]">
            Compete.
            <svg
              aria-hidden="true"
              className="absolute -bottom-1 left-0 w-full h-2 text-[#0088E0] overflow-visible"
              viewBox="0 0 100 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 6C30 2 70 2 98 6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-slate-500 font-medium max-w-2xl">
          Join Teklozy Hackathons to solve real challenges and build impactful solutions.
        </p>
      </div>

      {/* Featured Hackathon Card — Balanced Left Text & Right Trio Visual */}
      {hackathon && (
        <div
          onClick={() => onSelectEvent(hackathon.slug)}
          className="relative isolate overflow-hidden rounded-[32px] sm:rounded-[36px] border border-slate-100 bg-white p-6 sm:p-10 shadow-[0_16px_50px_rgba(15,23,42,0.06)] hover:shadow-[0_24px_65px_rgba(0,136,224,0.14)] hover:border-sky-200 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center cursor-pointer group"
        >
          {/* Soft ambient wave & radial light background on the right */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background: `
                radial-gradient(ellipse 70% 80% at 88% 60%, rgba(215, 238, 255, 0.75) 0%, rgba(235, 246, 255, 0.4) 45%, transparent 75%),
                linear-gradient(to right, #ffffff 40%, rgba(248, 252, 255, 0.6) 70%, rgba(236, 246, 255, 0.8) 100%)
              `,
            }}
          />

          {/* Left Column (5 Cols): Clean Typography & Single Register CTA */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-5 z-10">
            {/* Pill badge */}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 border border-sky-100 px-3.5 py-1 text-xs font-bold text-[#0088E0] shadow-2xs">
              <span className="font-mono text-sky-500 font-bold">&lt;/&gt;</span> Teklozy Hackathon
            </span>

            {/* Title */}
            <h2 className="text-2xl sm:text-4xl lg:text-[40px] font-black text-[#10233F] tracking-tight leading-tight">
              {hackathon.title}
            </h2>

            {/* Date & Location row */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-slate-700 font-bold text-sm sm:text-base">
              <span className="inline-flex items-center gap-2">
                <Calendar size={17} className="text-[#0088E0] shrink-0" />
                <span>19–20 December 2026</span>
              </span>
              <span className="text-slate-300 hidden sm:inline" aria-hidden="true">•</span>
              <span className="inline-flex items-center gap-1.5 text-slate-600">
                <MapPin size={16} className="text-[#0088E0] shrink-0" />
                <span>Hybrid</span>
              </span>
            </div>

            {/* Tagline / Subtitle */}
            <p className="text-slate-500 text-sm sm:text-base font-normal leading-relaxed max-w-md">
              A 2-day hackathon to build innovative tech solutions using AI and modern technologies.
            </p>

            {/* Only One Button: Register Now */}
            <div className="pt-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectEvent(hackathon.slug);
                }}
                className="px-8 py-3.5 rounded-full bg-[#0088E0] hover:bg-[#0077CC] text-white font-extrabold text-sm sm:text-base shadow-md hover:shadow-sky-300/50 transition-all flex items-center gap-2.5 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>{isRegistered ? 'View Pass' : 'Register Now'}</span>
                <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>

          {/* Right Column (7 Cols): Collaborative Learning Tech Trio image */}
          <div className="lg:col-span-7 flex items-center justify-center lg:justify-end z-10">
            {renderEventVisual()}
          </div>
        </div>
      )}
    </div>
  );
};
