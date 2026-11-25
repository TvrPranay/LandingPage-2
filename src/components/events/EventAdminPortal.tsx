import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Search,
  Filter,
  Download,
  CheckCircle2,
  XCircle,
  Clock,
  Plus,
  Edit,
  Eye,
  Megaphone,
  Calendar,
  AlertCircle,
  Users,
  FileSpreadsheet,
} from 'lucide-react';
import {
  TeklozyEvent,
  EventRegistration,
  ParticipantRegistrationStatus,
} from '../../types/events';
import {
  getAllEventRegistrations,
  updateEventRegistrationStatus,
  saveEvent,
  addEventAnnouncement,
  exportRegistrationsToCsv,
} from '../../lib/eventsService';

interface EventAdminPortalProps {
  events: TeklozyEvent[];
  onRefreshEvents: () => void;
  onClose: () => void;
}

export const EventAdminPortal: React.FC<EventAdminPortalProps> = ({
  events,
  onRefreshEvents,
  onClose,
}) => {
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters
  const [selectedEventId, setSelectedEventId] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected registration for modal review
  const [activeReg, setActiveReg] = useState<EventRegistration | null>(null);
  const [statusNote, setStatusNote] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  // Announcement modal
  const [showAnnModal, setShowAnnModal] = useState(false);
  const [annEventId, setAnnEventId] = useState(events[0]?.id || '');
  const [annTitle, setAnnTitle] = useState('');
  const [annContent, setAnnContent] = useState('');

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await getAllEventRegistrations();
      setRegistrations(data);
    } catch {
      // fallback
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (
    regId: string,
    newStatus: ParticipantRegistrationStatus
  ) => {
    setIsUpdating(true);
    try {
      const updated = await updateEventRegistrationStatus(regId, newStatus, statusNote);
      setRegistrations((prev) => prev.map((r) => (r.id === regId ? updated : r)));
      setActiveReg(updated);
      setStatusNote('');
    } catch (err: any) {
      alert(err.message || 'Status update failed.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePostAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle.trim() || !annContent.trim()) return;
    await addEventAnnouncement(annEventId, annTitle.trim(), annContent.trim(), true);
    setShowAnnModal(false);
    setAnnTitle('');
    setAnnContent('');
    onRefreshEvents();
    alert('Announcement published successfully.');
  };

  const handleExportCsv = () => {
    const csvData = exportRegistrationsToCsv(filteredRegistrations);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Teklozy_Registrations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredRegistrations = registrations.filter((r) => {
    if (selectedEventId !== 'all' && r.eventId !== selectedEventId) return false;
    if (statusFilter !== 'all' && r.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const match =
        r.fullName.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q) ||
        r.college.toLowerCase().includes(q) ||
        (r.teamName && r.teamName.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 font-manrope space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-slate-900 text-sky-400 flex items-center justify-center">
            <ShieldAlert size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                Event Organizer Workspace
              </h2>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-900 text-sky-300">
                Authorized Admin
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Review event registrations, approve participant rosters, post announcements, and export data.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowAnnModal(true)}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Megaphone size={14} className="text-[#0088E0]" /> Post Announcement
          </button>
          <button
            type="button"
            onClick={handleExportCsv}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Download size={14} className="text-emerald-600" /> Export CSV
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs"
          >
            Close Panel
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-white p-4 rounded-2xl border border-slate-200 text-xs">
        <div>
          <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
            Filter by Event
          </label>
          <select
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
            className="w-full p-2 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:border-[#0088E0]"
          >
            <option value="all">All Events ({registrations.length})</option>
            {events.map((evt) => (
              <option key={evt.id} value={evt.id}>
                {evt.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
            Registration Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full p-2 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:border-[#0088E0]"
          >
            <option value="all">All Statuses</option>
            <option value="Submitted">Submitted</option>
            <option value="Under Review">Under Review</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Waitlisted">Waitlisted</option>
            <option value="Rejected">Rejected</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
            Search Registrant
          </label>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, college, team or ID..."
              className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0088E0]"
            />
          </div>
        </div>
      </div>

      {/* Registrations Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                <th className="p-3.5">ID & Event</th>
                <th className="p-3.5">Participant</th>
                <th className="p-3.5">Institution</th>
                <th className="p-3.5">Type & Team</th>
                <th className="p-3.5">Domain</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredRegistrations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    No registrations found matching the selected criteria.
                  </td>
                </tr>
              ) : (
                filteredRegistrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3.5">
                      <span className="font-mono font-bold text-[#0088E0] block">{reg.id}</span>
                      <span className="text-[11px] text-slate-500 truncate block max-w-[140px]">
                        {reg.eventTitle}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span className="font-bold text-slate-900 block">{reg.fullName}</span>
                      <span className="text-slate-400 text-[11px] block">{reg.email}</span>
                    </td>
                    <td className="p-3.5">
                      <span className="font-medium text-slate-800 block truncate max-w-[150px]">
                        {reg.college}
                      </span>
                      <span className="text-slate-400 text-[10px] block">
                        {reg.degree} • {reg.currentYear}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span className="font-medium text-slate-800 block">
                        {reg.participationType}
                      </span>
                      {reg.teamName && (
                        <span className="text-[10px] text-sky-600 block">
                          {reg.teamName} ({reg.teamSize} members)
                        </span>
                      )}
                    </td>
                    <td className="p-3.5">
                      <span className="text-[11px] text-slate-700 truncate block max-w-[120px]">
                        {reg.preferredDomain}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          reg.status === 'Confirmed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : reg.status === 'Under Review'
                            ? 'bg-sky-100 text-sky-800'
                            : reg.status === 'Waitlisted'
                            ? 'bg-amber-100 text-amber-800'
                            : reg.status === 'Rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-blue-50 text-blue-700'
                        }`}
                      >
                        {reg.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveReg(reg);
                          setStatusNote(reg.reviewerNotes || '');
                        }}
                        className="px-2.5 py-1 rounded-lg bg-sky-50 hover:bg-sky-100 text-[#0088E0] font-bold text-xs"
                      >
                        Inspect & Review
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Drawer / Modal */}
      {activeReg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 space-y-5 text-xs sm:text-sm">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#0088E0]">
                  {activeReg.id}
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-0.5">
                  Registration Review — {activeReg.fullName}
                </h3>
                <span className="text-xs text-slate-500">{activeReg.eventTitle}</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveReg(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full"
              >
                ✕
              </button>
            </div>

            {/* Profile snapshot */}
            <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Email</span>
                <span className="font-bold text-slate-800">{activeReg.email}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Phone</span>
                <span className="font-bold text-slate-800">{activeReg.phone}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block">
                  Institution & Branch
                </span>
                <span className="text-slate-800">
                  {activeReg.college} ({activeReg.degree} - {activeReg.branch})
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block">
                  Academic Year
                </span>
                <span className="text-slate-800">{activeReg.currentYear}</span>
              </div>
            </div>

            {/* Team details */}
            {activeReg.participationType === 'Team' && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700">
                  Team: {activeReg.teamName} ({activeReg.teamSize} members)
                </span>
                <div className="space-y-1.5">
                  {activeReg.teamMembers?.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-2 bg-slate-50 rounded-xl text-xs flex justify-between items-center"
                    >
                      <span className="font-semibold text-slate-800">{m.name}</span>
                      <span className="text-slate-500">
                        {m.email} {m.role ? `• ${m.role}` : ''}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Motivation & Skills */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">
                Technical Skills
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(activeReg.technicalSkills || []).map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 rounded-full bg-sky-50 text-[#0088E0] font-semibold text-xs"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {activeReg.motivation && (
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block">
                  Motivation Statement
                </span>
                <p className="mt-1 p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs leading-relaxed">
                  {activeReg.motivation}
                </p>
              </div>
            )}

            {/* Reviewer Note Input */}
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                Internal Reviewer Note / Feedback
              </label>
              <textarea
                rows={2}
                value={statusNote}
                onChange={(e) => setStatusNote(e.target.value)}
                placeholder="Optional internal notes or remarks visible to student..."
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0088E0]"
              />
            </div>

            {/* Status Change Buttons */}
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs text-slate-500">
                Current Status: <strong className="text-slate-800">{activeReg.status}</strong>
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled={isUpdating}
                  onClick={() => handleStatusChange(activeReg.id, 'Under Review')}
                  className="px-3 py-1.5 rounded-lg bg-sky-100 hover:bg-sky-200 text-sky-800 font-bold text-xs"
                >
                  Under Review
                </button>
                <button
                  type="button"
                  disabled={isUpdating}
                  onClick={() => handleStatusChange(activeReg.id, 'Waitlisted')}
                  className="px-3 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-800 font-bold text-xs"
                >
                  Waitlist
                </button>
                <button
                  type="button"
                  disabled={isUpdating}
                  onClick={() => handleStatusChange(activeReg.id, 'Rejected')}
                  className="px-3 py-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-800 font-bold text-xs"
                >
                  Reject
                </button>
                <button
                  type="button"
                  disabled={isUpdating}
                  onClick={() => handleStatusChange(activeReg.id, 'Confirmed')}
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm"
                >
                  Approve (Confirm Pass)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Post Announcement Modal */}
      {showAnnModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">Publish Event Announcement</h3>
              <button
                type="button"
                onClick={() => setShowAnnModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handlePostAnnouncement} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                  Target Event
                </label>
                <select
                  value={annEventId}
                  onChange={(e) => setAnnEventId(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium"
                >
                  {events.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                  Announcement Title
                </label>
                <input
                  type="text"
                  required
                  value={annTitle}
                  onChange={(e) => setAnnTitle(e.target.value)}
                  placeholder="e.g. Mentor schedule released"
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-medium"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                  Announcement Content
                </label>
                <textarea
                  rows={3}
                  required
                  value={annContent}
                  onChange={(e) => setAnnContent(e.target.value)}
                  placeholder="Details for participants..."
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAnnModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0088E0] text-white font-bold text-xs shadow-sm hover:bg-[#0077CC]"
                >
                  Publish Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
