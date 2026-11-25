import React from 'react';
import {
  Users,
  ArrowRight,
} from 'lucide-react';
import { TeklozyClub } from '../../types/clubs';
import {
  DevClubVisual,
  AiClubVisual,
  DesignClubVisual,
  CyberClubVisual,
  InnovationClubVisual,
} from '../ui/TechnologyVisuals';

interface ClubsLandingViewProps {
  clubs: TeklozyClub[];
  onSelectClub: (slug: string) => void;
  onOpenMyApplications: () => void;
  onOpenAdminPortal?: () => void;
  appliedClubIds: string[];
}

export const ClubsLandingView: React.FC<ClubsLandingViewProps> = ({
  clubs,
  onSelectClub,
  onOpenMyApplications,
  appliedClubIds,
}) => {
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

  const getClubTags = (id: string): string[] => {
    switch (id) {
      case 'dev-club':
        return ['Web & Mobile', 'APIs & Backend', 'Open Source'];
      case 'ai-data-club':
        return ['Machine Learning', 'GenAI & Agents', 'Data Pipelines'];
      case 'design-creative-club':
        return ['UI/UX Design', 'Design Systems', 'Prototyping'];
      case 'cyber-cloud-club':
        return ['Cloud Infrastructure', 'DevOps', 'Security'];
      case 'innovation-club':
        return ['Product Strategy', 'MVP Building', 'Venture'];
      default:
        return ['Technology', 'Engineering'];
    }
  };

  return (
    <div className="font-manrope text-slate-800 space-y-5 sm:space-y-6 pb-16 max-w-7xl mx-auto">
      {/* Top Utility & Eyebrow Row */}
      <div className="flex items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <span className="w-6 sm:w-8 h-[2.5px] bg-[#0088E0] rounded-full inline-block" />
          <span className="text-xs sm:text-sm font-black uppercase tracking-[0.18em] text-[#0088E0]">
            STUDENT CLUBS
          </span>
        </div>
        <button
          type="button"
          onClick={onOpenMyApplications}
          className="px-4 py-2 rounded-full bg-white border border-slate-200/90 hover:border-sky-300 text-slate-700 hover:text-[#0088E0] font-bold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Users size={15} className="text-[#0088E0]" />
          <span>My Applications ({appliedClubIds.length})</span>
        </button>
      </div>

      {/* Hero Headline (Matches Hackathon Header) */}
      <div className="space-y-1.5 -mt-1">
        <h1 className="text-3xl sm:text-5xl font-black text-[#10233F] tracking-tight leading-tight">
          Build. Collaborate. Lead.
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-slate-500 font-medium max-w-2xl">
          Join Teklozy student communities to collaborate on real codebases, build software, and develop practical skills.
        </p>
      </div>

      {/* Clean 2-Column Problem-Domain Style Cards Grid — Simple, Professional, Zero Clutter */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 pt-2">
        {clubs.map((club, idx) => {
          const isApplied = appliedClubIds.includes(club.id);
          const tags = getClubTags(club.id);

          return (
            <div
              key={club.id}
              onClick={() => onSelectClub(club.slug)}
              className="group relative rounded-2xl sm:rounded-3xl p-5 sm:p-6 bg-white border border-slate-200/80 hover:border-sky-300 shadow-xs hover:shadow-lg transition-all duration-300 flex items-center justify-between gap-4 cursor-pointer hover:-translate-y-0.5"
            >
              {/* Left Content */}
              <div className="space-y-2.5 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-sky-100/70 text-[#0088E0] text-[10px] font-black uppercase tracking-wider">
                    CLUB 0{idx + 1}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {club.category}
                  </span>
                  {isApplied && (
                    <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                      Applied
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-black text-[#10233F] leading-snug group-hover:text-[#0088E0] transition-colors truncate">
                    {club.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 font-normal leading-relaxed mt-0.5">
                    {club.tagline}
                  </p>
                </div>

                {/* 3 Skill Tags */}
                <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                  {tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 text-[10px] sm:text-[11px] font-medium border border-slate-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: 3D Vector Visual + Arrow Button */}
              <div className="flex flex-col items-end justify-between self-stretch shrink-0 gap-3">
                <div className="shrink-0 flex items-center justify-center">
                  {renderClubVisual(club.id)}
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200/80 shadow-xs flex items-center justify-center text-slate-600 group-hover:text-white group-hover:bg-[#0088E0] group-hover:border-[#0088E0] transition-all">
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
