import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  FileCode,
  Tag,
  Users,
  Copy,
  ChevronRight,
} from 'lucide-react';
import { EventRegistration, TeklozyEvent } from '../../types/events';

interface StudentEventsDashboardViewProps {
  registrations: EventRegistration[];
  events: TeklozyEvent[];
  onOpenEvent: (slug: string) => void;
  onBrowseEvents: () => void;
}

export const StudentEventsDashboardView: React.FC<StudentEventsDashboardViewProps> = ({
  registrations,
  events,
  onOpenEvent,
  onBrowseEvents,
}) => {
  const [selectedReg, setSelectedReg] = useState<EventRegistration | null>(
    registrations[0] || null
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyId = (id: string) => {
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(id);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const getStatusBadge = (status: EventRegistration['status']) => {
    switch (status) {
      case 'Confirmed':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
            <CheckCircle2 size={13} /> Confirmed
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
          <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1.5">
            Waitlisted
          </span>
        );
      case 'Rejected':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-black bg-red-100 text-red-800 border border-red-200">
            Rejected
          </span>
        );
      case 'Cancelled':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-black bg-slate-100 text-slate-600 border border-slate-200">
            Cancelled
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

  if (registrations.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-sky-100 p-8 sm:p-12 text-center max-w-xl mx-auto my-8 font-manrope shadow-sm">
        <div className="w-14 h-14 mx-auto rounded-full bg-sky-50 text-[#0088E0] flex items-center justify-center mb-4">
          <Calendar size={28} />
        </div>
        <h3 className="text-xl font-black text-slate-900 tracking-tight">
          No Registered Events Yet
        </h3>
        <p className="mt-2 text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
          You haven't signed up for any events or hackathons yet. Explore upcoming hackathons, bootcamps, and workshops.
        </p>
        <button
          type="button"
          onClick={onBrowseEvents}
          className="mt-6 px-6 py-2.5 rounded-full bg-[#0088E0] hover:bg-[#0077CC] text-white font-bold text-sm shadow transition-all cursor-pointer"
        >
          Discover Events & Programs
        </button>
      </div>
    );
  }

  return (
    <div className="font-manrope text-slate-800 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#10233F] tracking-tight">
            My Event Registrations
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Track your registrations, review statuses, and access your event passes.
          </p>
        </div>
        <button
          type="button"
          onClick={onBrowseEvents}
          className="self-start sm:self-auto px-4 py-2 rounded-full border border-sky-200 text-[#0088E0] hover:bg-sky-50 font-bold text-xs"
        >
          + Register for Another Event
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (5 cols): List of registrations */}
        <div className="lg:col-span-5 space-y-3">
          {registrations.map((reg) => {
            const isSelected = selectedReg?.id === reg.id;
            return (
              <div
                key={reg.id}
                onClick={() => setSelectedReg(reg)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer text-left ${
                  isSelected
                    ? 'bg-sky-50/70 border-[#0088E0] shadow-sm'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-slate-400">
                    {reg.id}
                  </span>
                  {getStatusBadge(reg.status)}
                </div>

                <h3 className="text-base font-black text-slate-900 mt-2 truncate">
                  {reg.eventTitle}
                </h3>

                <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                  <span>Format: {reg.participationType}</span>
                  <span>{new Date(reg.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column (7 cols): Selected registration details pass */}
        {selectedReg && (
          <div className="lg:col-span-7 bg-white rounded-3xl border border-sky-100 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-5">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0088E0]">
                  Official Registration Pass
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-0.5">
                  {selectedReg.eventTitle}
                </h3>
              </div>
              <div>{getStatusBadge(selectedReg.status)}</div>
            </div>

            {/* Registration Summary Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-sky-950 text-white space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400">
                    Registration ID
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-base font-mono font-black text-sky-300">
                      {selectedReg.id}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyId(selectedReg.id)}
                      className="p-1 text-slate-400 hover:text-white rounded"
                      title="Copy ID"
                    >
                      <Copy size={13} />
                    </button>
                    {copiedId === selectedReg.id && (
                      <span className="text-[10px] text-emerald-400 font-bold">Copied</span>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase text-slate-400">
                    Format
                  </span>
                  <span className="block text-sm font-bold text-white mt-0.5">
                    {selectedReg.participationType}{' '}
                    {selectedReg.teamName ? `(${selectedReg.teamName})` : ''}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block">Participant</span>
                  <span className="font-bold text-white">{selectedReg.fullName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Email</span>
                  <span className="font-bold text-white truncate block">{selectedReg.email}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Institution</span>
                  <span className="font-bold text-white truncate block">{selectedReg.college}</span>
                </div>
              </div>
            </div>

            {/* Team details if applicable */}
            {selectedReg.participationType === 'Team' &&
              selectedReg.teamMembers &&
              selectedReg.teamMembers.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Team Members ({selectedReg.teamMembers.length + 1})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="font-bold text-slate-900 block">{selectedReg.fullName}</span>
                      <span className="text-slate-500 text-[11px]">Leader / Primary Contact</span>
                    </div>
                    {selectedReg.teamMembers.map((m, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                        <span className="font-bold text-slate-900 block">{m.name}</span>
                        <span className="text-slate-500 text-[11px] truncate block">
                          {m.email} {m.role ? `• ${m.role}` : ''}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Domain & Skills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">
                  Chosen Domain Track
                </span>
                <span className="font-bold text-slate-800 mt-0.5 block">
                  {selectedReg.preferredDomain}
                </span>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">
                  Reported Skills
                </span>
                <span className="font-bold text-slate-800 mt-0.5 block truncate">
                  {(selectedReg.technicalSkills || []).join(', ') || 'General Development'}
                </span>
              </div>
            </div>

            {/* Reviewer notes / notice */}
            {selectedReg.reviewerNotes && (
              <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 text-xs text-sky-900">
                <span className="font-bold block">Organizer Notice:</span>
                <span className="mt-1 block">{selectedReg.reviewerNotes}</span>
              </div>
            )}

            {/* Links & CTA */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <span className="text-xs text-slate-400">
                Registered on {new Date(selectedReg.createdAt).toLocaleString()}
              </span>
              <button
                type="button"
                onClick={() => onOpenEvent(selectedReg.eventId)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0088E0] hover:underline"
              >
                View Full Event Page <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
