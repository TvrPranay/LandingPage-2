import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Header } from '../sections/Header';
import { Footer } from '../layout/Footer';
import { ClubsLandingView } from '../clubs/ClubsLandingView';
import { ClubDetailsView } from '../clubs/ClubDetailsView';
import { StudentClubsDashboardView } from '../clubs/StudentClubsDashboardView';
import { ClubAdminPortal } from '../clubs/ClubAdminPortal';
import { TeklozyClub, ClubApplication, ClubMembership } from '../../types/clubs';
import {
  getClubs,
  loadClubs,
  loadApplications,
  loadMemberships,
} from '../../lib/clubsService';

interface ClubsPageProps {
  onNavigateHome: () => void;
  onScrollToLevel: (levelId: number) => void;
  onScrollToAchievements?: () => void;
  onOpenEvents: () => void;
  onOpenClubs: () => void;
  onOpenOpportunities: () => void;
  onOpenTeam: () => void;
  onOpenLogin: () => void;
  onOpenContact: () => void;
}

export const ClubsPage: React.FC<ClubsPageProps> = ({
  onNavigateHome,
  onScrollToLevel,
  onScrollToAchievements,
  onOpenEvents,
  onOpenClubs,
  onOpenOpportunities,
  onOpenTeam,
  onOpenLogin,
  onOpenContact,
}) => {
  const [subView, setSubView] = useState<'discover' | 'detail' | 'my-applications' | 'admin'>('discover');
  const [clubs, setClubs] = useState<TeklozyClub[]>(() => loadClubs());
  const [selectedClubSlug, setSelectedClubSlug] = useState<string>('development-club');
  const [applications, setApplications] = useState<ClubApplication[]>(() => loadApplications());
  const [memberships, setMemberships] = useState<ClubMembership[]>(() => loadMemberships());
  const [isLoading, setIsLoading] = useState(false);

  const refreshData = async () => {
    setIsLoading(true);
    try {
      const clubList = await getClubs();
      setClubs(clubList);
      setApplications(loadApplications());
      setMemberships(loadMemberships());
    } catch {
      // fallback
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSelectClub = (slug: string) => {
    setSelectedClubSlug(slug);
    setSubView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApplicationSuccess = (app: ClubApplication) => {
    setApplications((prev) => [app, ...prev]);
  };

  const activeClub = clubs.find((c) => c.slug === selectedClubSlug || c.id === selectedClubSlug) || clubs[0];
  const appliedClubIds = applications.map((a) => a.clubId);
  const activeAppForClub = applications.find((a) => a.clubId === activeClub?.id);

  return (
    <div className="min-h-screen bg-[#F7FAFE] text-slate-900 font-manrope">
      <Header
        forceCapsule
        activeNav="clubs"
        onScrollToLevel={onScrollToLevel}
        onScrollToAchievements={onScrollToAchievements}
        onOpenContact={onOpenContact}
        onOpenLogin={onOpenLogin}
        onOpenTeam={onOpenTeam}
        onOpenEvents={onOpenEvents}
        onOpenClubs={onOpenClubs}
      />

      <main className="min-h-[75vh] px-4 sm:px-6 pt-20 sm:pt-[5.5rem] pb-16 max-w-7xl mx-auto">
        {subView === 'discover' && (
          <ClubsLandingView
            clubs={clubs}
            onSelectClub={handleSelectClub}
            onOpenMyApplications={() => setSubView('my-applications')}
            onOpenAdminPortal={() => setSubView('admin')}
            appliedClubIds={appliedClubIds}
          />
        )}

        {subView === 'detail' && activeClub && (
          <ClubDetailsView
            club={activeClub}
            onBack={() => {
              setSubView('discover');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onApplicationSuccess={handleApplicationSuccess}
            isApplied={appliedClubIds.includes(activeClub.id)}
            appliedStatus={activeAppForClub?.status}
          />
        )}

        {subView === 'my-applications' && (
          <div className="space-y-6">
            <button
              onClick={() => setSubView('discover')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#0088E0] transition-colors cursor-pointer"
            >
              <ArrowLeft size={16} /> Back to Clubs Catalog
            </button>
            <StudentClubsDashboardView
              applications={applications}
              memberships={memberships}
              onOpenClub={(slug) => handleSelectClub(slug)}
              onBrowseClubs={() => setSubView('discover')}
            />
          </div>
        )}

        {subView === 'admin' && (
          <div className="space-y-6">
            <button
              onClick={() => setSubView('discover')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#0088E0] transition-colors cursor-pointer"
            >
              <ArrowLeft size={16} /> Back to Clubs Catalog
            </button>
            <ClubAdminPortal
              clubs={clubs}
              onRefreshClubs={refreshData}
              onClose={() => setSubView('discover')}
            />
          </div>
        )}
      </main>

      <Footer
        brandName="Teklozy"
        onBackToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onOpenContact={onOpenContact}
        onOpenLogin={onOpenLogin}
        onOpenOpportunities={onOpenOpportunities}
        onOpenEvents={onOpenEvents}
        onOpenClubs={onOpenClubs}
        onNavigateToLevel={onScrollToLevel}
      />
    </div>
  );
};
