import React from 'react';
import {
  Calendar,
  ArrowRight,
  Ticket,
} from 'lucide-react';
import { TeklozyEvent } from '../../types/events';
import { HackathonWorkspaceHeroVisual } from '../ui/TechnologyVisuals';

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
    return <HackathonWorkspaceHeroVisual className="w-full h-full" />;
  };

  return (
    <div className="font-manrope text-slate-800 space-y-4 sm:space-y-6 pb-16 max-w-7xl mx-auto">
      {/* Top Utility & Eyebrow Row */}
      <div className="flex items-center justify-between gap-4 pt-2">
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

      {/* Hero Headline */}
      <div className="space-y-1 sm:space-y-1.5 -mt-1">
        <h1 className="text-3xl sm:text-5xl font-black text-[#10233F] tracking-tight leading-tight">
          Build. Innovate. Compete.
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-slate-500 font-medium max-w-2xl">
          Join Teklozy Hackathons to solve real challenges and build impactful solutions.
        </p>
      </div>

      {/* Featured Hackathon Card — Horizontal Split Card (Matches Reference Image) */}
      {hackathon && (
        <div
          onClick={() => onSelectEvent(hackathon.slug)}
          className="bg-white rounded-[32px] sm:rounded-[36px] p-6 sm:p-10 shadow-[0_12px_45px_rgba(15,23,42,0.06)] hover:shadow-[0_20px_60px_rgba(0,136,224,0.12)] border border-slate-100 hover:border-sky-200 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center cursor-pointer group overflow-hidden"
        >
          {/* Left Column (5 Cols): Clean Typography & CTA */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-2xl sm:text-4xl font-black text-[#10233F] tracking-tight leading-tight">
              {hackathon.title}
            </h2>

            <div className="flex items-center gap-2.5 text-slate-800 font-bold text-sm sm:text-base">
              <Calendar size={18} className="text-[#0088E0] shrink-0" />
              <span>19–20 December 2026</span>
            </div>

            <p className="text-slate-500 text-sm sm:text-base font-normal leading-relaxed">
              A 2-day hackathon to build innovative tech solutions.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectEvent(hackathon.slug);
                }}
                className="px-7 py-3.5 rounded-full bg-[#0088E0] hover:bg-[#0077CC] text-white font-extrabold text-sm shadow-md hover:shadow-sky-300/50 transition-all flex items-center gap-2.5 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>{isRegistered ? 'View Pass' : 'Register Now'}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Right Column (7 Cols): Clean Workspace Visual with Curved Wave Background */}
          <div className="lg:col-span-7 h-64 sm:h-80 w-full overflow-hidden rounded-[24px] border border-slate-100/60 shadow-inner group-hover:scale-[1.01] transition-transform duration-300">
            {renderEventVisual()}
          </div>
        </div>
      )}
    </div>
  );
};
