import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Search,
  Filter,
  Download,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  FileText,
  ExternalLink,
  ChevronRight,
  Megaphone,
  UserCheck,
  Tag,
  BookOpen,
} from 'lucide-react';
import {
  TeklozyClub,
  ClubApplication,
  ClubMembership,
  ClubApplicationStatus,
  SkillProficiency,
} from '../../types/clubs';
import {
  getAllClubApplications,
  updateClubApplicationStatus,
  addClubReviewerNote,
  filterApplicants,
  computeApplicantSegregationTags,
  exportApplicantsToCsv,
  addClubAnnouncement,
} from '../../lib/clubsService';
import { getSecureResumeViewUrl } from '../../lib/storageService';

interface ClubAdminPortalProps {
  clubs: TeklozyClub[];
  onRefreshClubs: () => void;
  onClose: () => void;
}

export const ClubAdminPortal: React.FC<ClubAdminPortalProps> = ({
  clubs,
  onRefreshClubs,
  onClose,
}) => {
  const [applications, setApplications] = useState<ClubApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Segregation Filters
  const [selectedClubId, setSelectedClubId] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [yearFilter, setYearFilter] = useState<string>('all');
  const [skillFilter, setSkillFilter] = useState<string>('all');
  const [proficiencyFilter, setProficiencyFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Active applicant drawer
  const [activeApp, setActiveApp] = useState<ClubApplication | null>(null);
  const [newNote, setNewNote] = useState('');
  const [reviewerName, setReviewerName] = useState('Admissions Committee');
  const [isUpdating, setIsUpdating] = useState(false);
  const [resumeDownloadUrl, setResumeDownloadUrl] = useState<string | null>(null);

  // Tab: 'applicants' | 'memberships' | 'announcements'
  const [viewTab, setViewTab] = useState<'applicants' | 'announcements'>('applicants');

  // Announcement state
  const [annClubId, setAnnClubId] = useState(clubs[0]?.id || 'dev-club');
  const [annTitle, setAnnTitle] = useState('');
  const [annContent, setAnnContent] = useState('');

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await getAllClubApplications();
      setApplications(data);
    } catch {
      // fallback
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // When active app changes, prepare secure resume view URL
  useEffect(() => {
    if (activeApp) {
      getSecureResumeViewUrl(activeApp.resumeStoragePath, activeApp.resumeBase64Url).then((url) => {
        setResumeDownloadUrl(url);
      });
    } else {
      setResumeDownloadUrl(null);
    }
  }, [activeApp]);

  const handleStatusChange = async (
    appId: string,
    newStatus: ClubApplicationStatus
  ) => {
    setIsUpdating(true);
    try {
      const updated = await updateClubApplicationStatus(
        appId,
        newStatus,
        newNote,
        reviewerName
      );
      setApplications((prev) => prev.map((a) => (a.id === appId ? updated : a)));
      setActiveApp(updated);
      setNewNote('');
    } catch (err: any) {
      alert(err.message || 'Status update failed.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAddNoteOnly = async () => {
    if (!activeApp || !newNote.trim()) return;
    setIsUpdating(true);
    try {
      const updated = await addClubReviewerNote(activeApp.id, newNote.trim(), reviewerName);
      setApplications((prev) => prev.map((a) => (a.id === activeApp.id ? updated : a)));
      setActiveApp(updated);
      setNewNote('');
    } catch (err: any) {
      alert(err.message || 'Failed to save note.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePublishAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle.trim() || !annContent.trim()) return;
    await addClubAnnouncement(annClubId, annTitle.trim(), annContent.trim(), true);
    setAnnTitle('');
    setAnnContent('');
    onRefreshClubs();
    alert('Club announcement published successfully.');
  };

  // Run student segregation filter engine
  const filteredApplicants = filterApplicants(applications, {
    clubId: selectedClubId,
    status: statusFilter as any,
    currentYear: yearFilter,
    skillName: skillFilter,
    proficiency: proficiencyFilter as any,
    searchQuery,
  });

  const handleExportCsv = () => {
    const csvData = exportApplicantsToCsv(filteredApplicants);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Teklozy_Club_Applicants_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 font-manrope space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#0088E0] text-white flex items-center justify-center">
            <ShieldCheck size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                Club Administration & Reviewer Desk
              </h2>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-900 text-sky-300">
                Authorized Reviewer
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Intelligent applicant classification, portfolio evaluation, status updates, and roster management.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setViewTab(viewTab === 'applicants' ? 'announcements' : 'applicants')}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Megaphone size={14} className="text-[#0088E0]" />
            <span>{viewTab === 'applicants' ? 'Post Announcement' : 'View Applicants'}</span>
          </button>
          <button
            type="button"
            onClick={handleExportCsv}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Download size={14} className="text-emerald-600" />
            <span>Export CSV</span>
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

      {viewTab === 'announcements' ? (
        /* Announcement composer */
        <div className="bg-white rounded-2xl p-6 border border-slate-200 max-w-xl mx-auto space-y-4 text-xs">
          <h3 className="text-base font-black text-slate-900">Publish Club Announcement</h3>
          <form onSubmit={handlePublishAnnouncement} className="space-y-3">
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                Select Club
              </label>
              <select
                value={annClubId}
                onChange={(e) => setAnnClubId(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium"
              >
                {clubs.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                Title
              </label>
              <input
                type="text"
                required
                value={annTitle}
                onChange={(e) => setAnnTitle(e.target.value)}
                placeholder="e.g. First Sprint Kick-off meeting date"
                className="w-full p-2.5 rounded-xl border border-slate-200"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                Content
              </label>
              <textarea
                rows={3}
                required
                value={annContent}
                onChange={(e) => setAnnContent(e.target.value)}
                placeholder="Announcement message for club members..."
                className="w-full p-2.5 rounded-xl border border-slate-200"
              />
            </div>
            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setViewTab('applicants')}
                className="px-4 py-2 border rounded-xl font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#0088E0] text-white rounded-xl font-bold"
              >
                Publish
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Segregation Filter Engine & Table */
        <div className="space-y-4">
          {/* Intelligent Segregation Filter Toolbar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-6 gap-3 text-xs">
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                Club Community
              </label>
              <select
                value={selectedClubId}
                onChange={(e) => setSelectedClubId(e.target.value)}
                className="w-full p-2 rounded-xl border border-slate-200 bg-white font-medium focus:border-[#0088E0]"
              >
                <option value="all">All Clubs ({applications.length})</option>
                {clubs.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                Application Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full p-2 rounded-xl border border-slate-200 bg-white font-medium focus:border-[#0088E0]"
              >
                <option value="all">All Statuses</option>
                <option value="Submitted">Submitted</option>
                <option value="Under Review">Under Review</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Interview Scheduled">Interview Scheduled</option>
                <option value="Accepted">Accepted (Members)</option>
                <option value="Waitlisted">Waitlisted</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                Academic Year
              </label>
              <select
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                className="w-full p-2 rounded-xl border border-slate-200 bg-white font-medium focus:border-[#0088E0]"
              >
                <option value="all">All Years</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
                <option value="Postgraduate">Postgraduate</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                Skill Filter
              </label>
              <input
                type="text"
                value={skillFilter === 'all' ? '' : skillFilter}
                onChange={(e) => setSkillFilter(e.target.value.trim() ? e.target.value : 'all')}
                placeholder="e.g. React, Python, Figma"
                className="w-full p-2 rounded-xl border border-slate-200"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                Search Applicant
              </label>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, college, email or ID..."
                  className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0088E0]"
                />
              </div>
            </div>
          </div>

          {/* Results count & intelligent active segregation pill */}
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>
              Showing <strong>{filteredApplicants.length}</strong> matching applicants
            </span>
            <span className="text-[11px] text-slate-400">
              Rule-based classification active • Transparent non-automated decisions
            </span>
          </div>

          {/* Applications Data Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                    <th className="p-3.5">ID & Club</th>
                    <th className="p-3.5">Applicant</th>
                    <th className="p-3.5">Institution & Year</th>
                    <th className="p-3.5">Intelligent Classification Tags</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredApplicants.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-slate-400">
                        No applicants found matching the current segregation filters.
                      </td>
                    </tr>
                  ) : (
                    filteredApplicants.map((app) => {
                      const tags = computeApplicantSegregationTags(app);
                      return (
                        <tr key={app.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="p-3.5">
                            <span className="font-mono font-bold text-[#0088E0] block">
                              {app.id}
                            </span>
                            <span className="text-[11px] text-slate-500 truncate block max-w-[130px]">
                              {app.clubName}
                            </span>
                          </td>
                          <td className="p-3.5">
                            <span className="font-bold text-slate-900 block">{app.fullName}</span>
                            <span className="text-slate-400 text-[11px] block">{app.email}</span>
                          </td>
                          <td className="p-3.5">
                            <span className="font-medium text-slate-800 block truncate max-w-[140px]">
                              {app.college}
                            </span>
                            <span className="text-slate-400 text-[10px] block">
                              {app.degree} • {app.currentYear}
                            </span>
                          </td>
                          <td className="p-3.5">
                            <div className="flex flex-wrap gap-1 max-w-[240px]">
                              {tags.map((tag, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="px-2 py-0.5 rounded-full bg-sky-50 text-[#0088E0] text-[10px] font-bold border border-sky-100"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="p-3.5">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                app.status === 'Accepted'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : app.status === 'Shortlisted'
                                  ? 'bg-purple-100 text-purple-800'
                                  : app.status === 'Under Review'
                                  ? 'bg-sky-100 text-sky-800'
                                  : app.status === 'Waitlisted'
                                  ? 'bg-amber-100 text-amber-800'
                                  : app.status === 'Rejected'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-blue-50 text-blue-700'
                              }`}
                            >
                              {app.status}
                            </span>
                          </td>
                          <td className="p-3.5 text-right">
                            <button
                              type="button"
                              onClick={() => {
                                setActiveApp(app);
                                setNewNote('');
                              }}
                              className="px-3 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-[#0088E0] font-bold text-xs"
                            >
                              Evaluate Profile
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Complete Student Profile Evaluation Drawer */}
      {activeApp && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 space-y-6 text-xs sm:text-sm">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#0088E0]">
                  {activeApp.id}
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-0.5">
                  Applicant Profile — {activeApp.fullName}
                </h3>
                <span className="text-xs text-slate-500">
                  Target Club: <strong>{activeApp.clubName}</strong>
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveApp(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full"
              >
                ✕
              </button>
            </div>

            {/* Smart Classification Badges */}
            <div className="p-3 bg-sky-50/70 rounded-2xl border border-sky-100 flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold uppercase text-[#0088E0]">
                Segregation Tags:
              </span>
              {computeApplicantSegregationTags(activeApp).map((tag, i) => (
                <span
                  key={i}
                  className="px-2.5 py-0.5 rounded-full bg-white text-[#0088E0] font-bold text-xs shadow-xs border border-sky-200"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Personal & Academic Details */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Email</span>
                <span className="font-bold text-slate-800">{activeApp.email}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Phone</span>
                <span className="font-bold text-slate-800">{activeApp.phone}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Location</span>
                <span className="text-slate-800">{activeApp.location}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block">College</span>
                <span className="text-slate-800 truncate block">{activeApp.college}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Degree & Year</span>
                <span className="text-slate-800">
                  {activeApp.degree} ({activeApp.currentYear})
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Graduation</span>
                <span className="text-slate-800">{activeApp.graduationYear}</span>
              </div>
            </div>

            {/* Interests & Goals */}
            <div className="space-y-2 text-xs">
              <span className="font-bold text-slate-800 block">Interests & Aspirations</span>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                <div>
                  <span className="text-slate-500">Primary Track:</span>{' '}
                  <strong className="text-slate-900">{activeApp.primaryInterest}</strong>
                </div>
                <div>
                  <span className="text-slate-500">Topics:</span>{' '}
                  <span className="text-slate-800">{activeApp.clubSpecificInterests.join(', ')}</span>
                </div>
                <div>
                  <span className="text-slate-500">Motivation:</span>{' '}
                  <span className="text-slate-800">{activeApp.reasonForJoining}</span>
                </div>
                {activeApp.learningGoals && (
                  <div>
                    <span className="text-slate-500">Goals:</span>{' '}
                    <span className="text-slate-800">{activeApp.learningGoals}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Skills Roster */}
            <div className="space-y-2 text-xs">
              <span className="font-bold text-slate-800 block">Reported Skills</span>
              <div className="flex flex-wrap gap-1.5">
                {(activeApp.skills || []).map((s, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 font-medium"
                  >
                    {s.name}{' '}
                    <strong
                      className={
                        s.proficiency === 'Advanced'
                          ? 'text-purple-600'
                          : s.proficiency === 'Intermediate'
                          ? 'text-[#0088E0]'
                          : 'text-emerald-600'
                      }
                    >
                      ({s.proficiency})
                    </strong>
                  </span>
                ))}
              </div>
            </div>

            {/* Projects Portfolio */}
            {activeApp.projects && activeApp.projects.length > 0 && (
              <div className="space-y-2 text-xs">
                <span className="font-bold text-slate-800 block">
                  Projects Portfolio ({activeApp.projects.length})
                </span>
                <div className="space-y-2">
                  {activeApp.projects.map((proj, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-black text-slate-900">{proj.title}</span>
                        <span className="text-[10px] text-slate-500 bg-white px-2 py-0.5 rounded border">
                          {proj.type}
                        </span>
                      </div>
                      <p className="text-slate-600">{proj.description}</p>
                      <span className="text-slate-500 block text-[11px]">
                        Stack: <strong>{proj.technologies}</strong>
                      </span>
                      <div className="flex gap-3 pt-1">
                        {proj.githubUrl && (
                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#0088E0] hover:underline flex items-center gap-1 font-bold"
                          >
                            GitHub <ExternalLink size={12} />
                          </a>
                        )}
                        {proj.liveDemoUrl && (
                          <a
                            href={proj.liveDemoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-600 hover:underline flex items-center gap-1 font-bold"
                          >
                            Live Demo <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Secure Resume Access */}
            <div className="p-4 bg-sky-50 rounded-2xl border border-sky-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <FileText size={20} className="text-[#0088E0]" />
                <div>
                  <span className="font-bold text-slate-900 block">
                    {activeApp.resumeFileName || 'Resume Document (PDF)'}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Protected storage • Authorized reviewer view
                  </span>
                </div>
              </div>

              {resumeDownloadUrl ? (
                <a
                  href={resumeDownloadUrl}
                  download={activeApp.resumeFileName || 'Resume.pdf'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#0088E0] hover:bg-[#0077CC] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs"
                >
                  <Download size={13} /> View Resume
                </a>
              ) : (
                <span className="text-xs text-slate-400 italic">Resume pending upload</span>
              )}
            </div>

            {/* Reviewer Notes Section */}
            <div className="space-y-3">
              <span className="font-bold text-slate-800 block text-xs">
                Internal Review Committee Log
              </span>
              {activeApp.reviewerNotes && activeApp.reviewerNotes.length > 0 ? (
                <div className="space-y-2">
                  {activeApp.reviewerNotes.map((note) => (
                    <div
                      key={note.id}
                      className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs"
                    >
                      <div className="flex justify-between items-center text-[10px] text-slate-400 mb-0.5">
                        <strong className="text-slate-700">{note.authorName}</strong>
                        <span>{new Date(note.createdAt).toLocaleString()}</span>
                      </div>
                      <p className="text-slate-800">{note.note}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">No reviewer notes logged yet.</p>
              )}

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add internal evaluation note or feedback..."
                  className="flex-1 p-2 rounded-xl border border-slate-200 text-xs"
                />
                <button
                  type="button"
                  onClick={handleAddNoteOnly}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                >
                  Save Note
                </button>
              </div>
            </div>

            {/* Status Change Action Bar */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-500">
                Current Status: <strong className="text-slate-900">{activeApp.status}</strong>
              </span>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled={isUpdating}
                  onClick={() => handleStatusChange(activeApp.id, 'Under Review')}
                  className="px-3 py-1.5 rounded-lg bg-sky-100 hover:bg-sky-200 text-sky-800 font-bold text-xs"
                >
                  Under Review
                </button>
                <button
                  type="button"
                  disabled={isUpdating}
                  onClick={() => handleStatusChange(activeApp.id, 'Shortlisted')}
                  className="px-3 py-1.5 rounded-lg bg-purple-100 hover:bg-purple-200 text-purple-800 font-bold text-xs"
                >
                  Shortlist
                </button>
                <button
                  type="button"
                  disabled={isUpdating}
                  onClick={() => handleStatusChange(activeApp.id, 'Waitlisted')}
                  className="px-3 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-800 font-bold text-xs"
                >
                  Waitlist
                </button>
                <button
                  type="button"
                  disabled={isUpdating}
                  onClick={() => handleStatusChange(activeApp.id, 'Rejected')}
                  className="px-3 py-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-800 font-bold text-xs"
                >
                  Reject
                </button>
                <button
                  type="button"
                  disabled={isUpdating}
                  onClick={() => handleStatusChange(activeApp.id, 'Accepted')}
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5"
                >
                  <UserCheck size={14} /> Accept & Issue Membership
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
