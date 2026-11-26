import React, { useState, useEffect } from 'react';
import { CalendarDays, ArrowLeft } from 'lucide-react';
import { Header } from '../sections/Header';
import { Footer } from '../layout/Footer';
import { EventsLandingView } from '../events/EventsLandingView';
import { EventDetailsView } from '../events/EventDetailsView';
import { StudentEventsDashboardView } from '../events/StudentEventsDashboardView';
import { EventAdminPortal } from '../events/EventAdminPortal';
import { TeklozyEvent, EventRegistration } from '../../types/events';
import { getEvents, loadEvents, loadRegistrations } from '../../lib/eventsService';

interface EventsPageProps {
  onNavigateHome: () => void;
  onScrollToLevel: (levelId: number) => void;
  onScrollToAchievements?: () => void;
  onOpenEvents: () => void;
  onOpenClubs?: () => void;
  onOpenOpportunities: () => void;
  onOpenTeam: () => void;
  onOpenLogin: () => void;
  onOpenContact: () => void;
  initialSubView?: 'discover' | 'detail' | 'my-registrations';
}

export const EventsPage: React.FC<EventsPageProps> = ({
  onNavigateHome,
  onScrollToLevel,
  onScrollToAchievements,
  onOpenEvents,
  onOpenClubs,
  onOpenOpportunities,
  onOpenTeam,
  onOpenLogin,
  onOpenContact,
  initialSubView,
}) => {
  const [subView, setSubView] = useState<'discover' | 'detail' | 'my-registrations' | 'admin'>(() => {
    if (initialSubView) return initialSubView;
    if (typeof window !== 'undefined' && window.location.hash.includes('teklozy-hackathon-2026')) {
      return 'detail';
    }
    return 'discover';
  });
  const [events, setEvents] = useState<TeklozyEvent[]>(() => loadEvents());
  const [selectedSlug, setSelectedSlug] = useState<string>('teklozy-hackathon-2026');
  const [registrations, setRegistrations] = useState<EventRegistration[]>(() => loadRegistrations());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialSubView) {
      setSubView(initialSubView);
    }
  }, [initialSubView]);

  const refreshData = async () => {
    setIsLoading(true);
    try {
      const data = await getEvents();
      setEvents(data);
      const regs = loadRegistrations();
      setRegistrations(regs);
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

  const handleSelectEvent = (slug: string) => {
    setSelectedSlug(slug);
    setSubView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRegistrationSuccess = (reg: EventRegistration) => {
    setRegistrations((prev) => [reg, ...prev]);
  };

  const activeEvent = events.find((e) => e.slug === selectedSlug || e.id === selectedSlug) || events[0];
  const registeredEventIds = registrations.map((r) => r.eventId);

  return (
    <div className="min-h-screen bg-[#F7FAFE] text-slate-900 font-manrope">
      <Header
        forceCapsule
        activeNav="events"
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
          <EventsLandingView
            events={events}
            onSelectEvent={handleSelectEvent}
            onOpenMyRegistrations={() => setSubView('my-registrations')}
            onOpenAdminPortal={() => setSubView('admin')}
            registeredEventIds={registeredEventIds}
          />
        )}

        {subView === 'detail' && activeEvent && (
          <EventDetailsView
            event={activeEvent}
            onBack={() => setSubView('discover')}
            onRegisteredSuccess={handleRegistrationSuccess}
            isRegistered={registeredEventIds.includes(activeEvent.id)}
          />
        )}

        {subView === 'my-registrations' && (
          <div className="space-y-6">
            <button
              onClick={() => setSubView('discover')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#0088E0] transition-colors cursor-pointer"
            >
              <ArrowLeft size={16} /> Back to Events Catalog
            </button>
            <StudentEventsDashboardView
              registrations={registrations}
              events={events}
              onOpenEvent={(slug) => handleSelectEvent(slug)}
              onBrowseEvents={() => setSubView('discover')}
            />
          </div>
        )}

        {subView === 'admin' && (
          <div className="space-y-6">
            <button
              onClick={() => setSubView('discover')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#0088E0] transition-colors cursor-pointer"
            >
              <ArrowLeft size={16} /> Back to Events Catalog
            </button>
            <EventAdminPortal
              events={events}
              onRefreshEvents={refreshData}
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
