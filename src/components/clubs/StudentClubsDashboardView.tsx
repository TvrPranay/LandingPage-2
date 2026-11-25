import React, { useState } from 'react';
import {
  Users,
  Award,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  FileText,
  Sparkles,
  Calendar,
  Copy,
} from 'lucide-react';
import { ClubApplication, ClubMembership, ClubApplicationStatus } from '../../types/clubs';

interface StudentClubsDashboardViewProps {
  applications: ClubApplication[];
  memberships: ClubMembership[];
  onOpenClub: (slug: string) => void;
  onBrowseClubs: () => void;
}

export const StudentClubsDashboardView: React.FC<StudentClubsDashboardViewProps> = ({
  applications,
  memberships,
  onOpenClub,
  onBrowseClubs,
}) => {
  const [selectedApp, setSelectedApp] = useState<ClubApplication | null>(
    applications[0] || null
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(text);
      setCopiedId(text);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const getStatusBadge = (status: ClubApplicationStatus) => {
    switch (status) {
      case 'Accepted':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
            <CheckCircle2 size={13} /> Accepted & Member
          </span>
        );
      case 'Shortlisted':
      case 'Interview Scheduled':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-black bg-purple-100 text-purple-800 border border-purple-200 flex items-center gap-1.5">
            <Sparkles size={13} /> {status}
          </span>
        );
      case 'Under Review':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-black bg-sky-100 text-[#0088E0] border border-sky-200 flex items-center gap-1.5">
            <Clock size={13} /> Under Review
          </span>
        );
      case 'Waitlisted':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-800 border border-amber-200">
            Waitlisted
          </span>
        );
      case 'Rejected':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-black bg-red-100 text-red-800 border border-red-200">
            Rejected
          </span>
        );
      case 'Withdrawn':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-black bg-slate-100 text-slate-600 border border-slate-200">
            Withdrawn
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-full text-xs font-black bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1.5">
            <Clock size={13} /> Submitted
          </span>
        );
    }
  };

  if (applications.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-sky-100 p-8 sm:p-12 text-center max-w-xl mx-auto my-8 font-manrope shadow-xs">
        <div className="w-14 h-14 mx-auto rounded-full bg-sky-50 text-[#0088E0] flex items-center justify-center mb-4">
          <Users size={28} />
        </div>
        <h3 className="text-xl font-black text-slate-900 tracking-tight">
          No Club Applications Yet
        </h3>
        <p className="mt-2 text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
          Join a student community matching your technical or creative interests. Explore our 5 starter clubs and apply today.
        </p>
        <button
          type="button"
          onClick={onBrowseClubs}
          className="mt-6 px-6 py-2.5 rounded-full bg-[#0088E0] hover:bg-[#0077CC] text-white font-bold text-sm shadow transition-all cursor-pointer"
        >
          Explore Student Clubs
        </button>
      </div>
    );
  }

  return (
    <div className="font-manrope text-slate-800 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#10233F] tracking-tight">
            My Club Applications & Memberships
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Track admission statuses, reviewer feedback, and verified club memberships.
          </p>
        </div>
        <button
          type="button"
          onClick={onBrowseClubs}
          className="self-start sm:self-auto px-4 py-2 rounded-full border border-sky-200 text-[#0088E0] hover:bg-sky-50 font-bold text-xs cursor-pointer"
        >
          + Apply for Another Club
        </button>
      </div>

      {/* Main Grid: Application list + details / membership view */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (5 cols): Applications List */}
        <div className="lg:col-span-5 space-y-3">
          {applications.map((app) => {
            const isSelected = selectedApp?.id === app.id;
            return (
              <div
                key={app.id}
                onClick={() => setSelectedApp(app)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer text-left ${
                  isSelected
                    ? 'bg-sky-50/70 border-[#0088E0] shadow-sm'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-slate-400">
                    {app.id}
                  </span>
                  {getStatusBadge(app.status)}
                </div>

                <h3 className="text-base font-black text-slate-900 mt-2 truncate">
                  {app.clubName}
                </h3>

                <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                  <span>Primary: {app.primaryInterest}</span>
                  <span>{new Date(app.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column (7 cols): Selected Application Details & Membership Card */}
        {selectedApp && (
          <div className="lg:col-span-7 bg-white rounded-3xl border border-sky-100 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-5">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0088E0]">
                  Application Dossier
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-0.5">
                  {selectedApp.clubName}
                </h3>
              </div>
              <div>{getStatusBadge(selectedApp.status)}</div>
            </div>

            {/* If ACCEPTED: Show Official Club Membership Card */}
            {selectedApp.status === 'Accepted' && selectedApp.membershipId ? (
              <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0B1528] via-[#10233F] to-[#0A1D36] text-white shadow-xl border border-sky-400/30 space-y-5 relative overflow-hidden">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-extrabold tracking-widest uppercase text-sky-400 block">
                      Teklozy Student Community
                    </span>
                    <h4 className="text-xl font-black text-white mt-1">
                      Official Club Member
                    </h4>
                    <span className="text-xs text-slate-300">{selectedApp.clubName}</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black">
                    Active Member
                  </span>
                </div>

                <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block">Membership ID</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="font-mono font-bold text-sky-300 text-sm">
                        {selectedApp.membershipId}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(selectedApp.membershipId!)}
                        className="text-slate-400 hover:text-white"
                        title="Copy Membership ID"
                      >
                        <Copy size={13} />
                      </button>
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Member Name</span>
                    <span className="font-bold text-white text-sm block mt-0.5">
                      {selectedApp.fullName}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">College</span>
                    <span className="text-slate-200 block truncate">{selectedApp.college}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Inducted On</span>
                    <span className="text-slate-200 block">
                      {selectedApp.membershipIssuedAt
                        ? new Date(selectedApp.membershipIssuedAt).toLocaleDateString()
                        : 'Current Semester'}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-[11px] text-slate-300 flex items-center gap-2">
                  <ShieldCheck size={16} className="text-sky-400 shrink-0" />
                  <span>
                    Verified community credential. You now have access to club sprint channels, project workspaces, and peer review jams.
                  </span>
                </div>
              </div>
            ) : (
              /* Non-accepted summary state */
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-slate-400">
                    Application ID
                  </span>
                  <span className="font-mono font-bold text-slate-800">{selectedApp.id}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Applicant:</span>
                  <span className="font-bold text-slate-800">{selectedApp.fullName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Applied Track:</span>
                  <span className="font-bold text-slate-800">{selectedApp.primaryInterest}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Submission Date:</span>
                  <span className="text-slate-700">
                    {new Date(selectedApp.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            )}

            {/* Reviewer Notes & Feedback */}
            {selectedApp.reviewerNotes && selectedApp.reviewerNotes.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Review Committee Updates
                </h4>
                <div className="space-y-2">
                  {selectedApp.reviewerNotes.map((note) => (
                    <div
                      key={note.id}
                      className="p-3.5 rounded-xl bg-sky-50 border border-sky-100 text-xs text-sky-950"
                    >
                      <div className="flex justify-between items-center text-[10px] text-slate-400 mb-1">
                        <span className="font-bold text-slate-600">{note.authorName}</span>
                        <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="leading-relaxed">{note.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Profile & Skills Snapshot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">
                  Reported Skills
                </span>
                <div className="flex flex-wrap gap-1">
                  {(selectedApp.skills || []).map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-700 text-[11px]"
                    >
                      {s.name} ({s.proficiency})
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">
                  Weekly Commitment
                </span>
                <span className="font-bold text-slate-800 block">
                  {selectedApp.hoursPerWeek} ({selectedApp.workModePreference})
                </span>
                <span className="text-slate-500 text-[11px] block">
                  Days: {(selectedApp.preferredDays || []).join(', ')}
                </span>
              </div>
            </div>

            {/* Footer link to Club Details */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Application record #{selectedApp.id}
              </span>
              <button
                type="button"
                onClick={() => onOpenClub(selectedApp.clubId)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0088E0] hover:underline"
              >
                View Club Details <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
