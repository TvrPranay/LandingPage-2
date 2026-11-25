import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  CheckCircle2,
  Users,
  User,
  Plus,
  Trash2,
  AlertCircle,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Calendar,
} from 'lucide-react';
import { TeklozyEvent, EventRegistration, TeamMemberInput } from '../../types/events';
import { registerForEvent } from '../../lib/eventsService';

interface EventRegistrationModalProps {
  event: TeklozyEvent;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (registration: EventRegistration) => void;
}

export const EventRegistrationModal: React.FC<EventRegistrationModalProps> = ({
  event,
  isOpen,
  onClose,
  onSuccess,
}) => {
  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [college, setCollege] = useState('');
  const [degree, setDegree] = useState('B.Tech');
  const [branch, setBranch] = useState('Computer Science & Engineering');
  const [currentYear, setCurrentYear] = useState('2nd Year');
  const [location, setLocation] = useState('');

  const [participationType, setParticipationType] = useState<'Individual' | 'Team'>('Individual');
  const [teamName, setTeamName] = useState('');
  const [teamMembers, setTeamMembers] = useState<TeamMemberInput[]>([]);

  const [preferredDomain, setPreferredDomain] = useState(
    event.themes[0]?.title || 'EdTech & Adaptive Learning Systems'
  );
  const [skillInput, setSkillInput] = useState('');
  const [technicalSkills, setTechnicalSkills] = useState<string[]>([
    'JavaScript',
    'React',
    'Python',
  ]);
  const [experienceLevel, setExperienceLevel] = useState('1–2 Hackathons');

  const [githubUrl, setGithubUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [projectHighlight, setProjectHighlight] = useState('');
  const [motivation, setMotivation] = useState('');
  const [consentGiven, setConsentGiven] = useState(false);

  // Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedRegistration, setSubmittedRegistration] = useState<EventRegistration | null>(null);

  // Lock background body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAddSkill = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ('key' in e && e.key !== 'Enter') return;
    e.preventDefault();
    const trimmed = skillInput.trim();
    if (trimmed && !technicalSkills.includes(trimmed)) {
      setTechnicalSkills([...technicalSkills, trimmed]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setTechnicalSkills(technicalSkills.filter((s) => s !== skillToRemove));
  };

  const handleAddTeamMember = () => {
    if (teamMembers.length >= (event.teamConfig.maxTeamSize - 1)) return;
    setTeamMembers([
      ...teamMembers,
      { name: '', email: '', phone: '', college: '', role: 'Frontend Developer' },
    ]);
  };

  const handleUpdateTeamMember = (index: number, field: keyof TeamMemberInput, val: string) => {
    const updated = [...teamMembers];
    updated[index] = { ...updated[index], [field]: val };
    setTeamMembers(updated);
  };

  const handleRemoveTeamMember = (index: number) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Validation
    if (!fullName.trim() || !email.trim() || !phone.trim() || !college.trim()) {
      setErrorMessage('Please fill in all required personal details.');
      return;
    }
    if (!consentGiven) {
      setErrorMessage('Please accept the participation terms and code of conduct.');
      return;
    }
    if (participationType === 'Team' && !teamName.trim()) {
      setErrorMessage('Please enter a team name for your group registration.');
      return;
    }

    setIsSubmitting(true);
    try {
      const reg = await registerForEvent({
        eventId: event.id,
        eventTitle: event.title,
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        college: college.trim(),
        degree,
        branch,
        currentYear,
        location: location.trim(),
        participationType,
        teamName: participationType === 'Team' ? teamName.trim() : undefined,
        teamMembers: participationType === 'Team' ? teamMembers : undefined,
        preferredDomain,
        technicalSkills,
        experienceLevel,
        githubUrl: githubUrl.trim() || undefined,
        linkedinUrl: linkedinUrl.trim() || undefined,
        portfolioUrl: portfolioUrl.trim() || undefined,
        projectHighlight: projectHighlight.trim() || undefined,
        motivation: motivation.trim() || undefined,
      });

      setSubmittedRegistration(reg);
      onSuccess(reg);
    } catch (err: any) {
      setErrorMessage(err.message || 'Registration could not be completed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[100] w-screen h-screen flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-hidden top-0 left-0 right-0 bottom-0 m-0"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-sky-100 flex flex-col font-manrope overflow-hidden my-auto">
        {/* Modal Header */}
        <div className="shrink-0 flex items-center justify-between px-6 sm:px-8 py-5 bg-white border-b border-slate-100">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0088E0] bg-sky-50 px-2.5 py-0.5 rounded-full">
              Registration Desk
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#10233F] tracking-tight mt-1">
              {event.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto max-h-[calc(90vh-80px)]">
          {submittedRegistration ? (
            /* Confirmation View */
            <div className="text-center py-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Registration Confirmed!
              </h3>
              <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-md mx-auto">
                Your application for <span className="font-bold text-slate-900">{event.title}</span> has been successfully received.
              </p>

              {/* Pass / Card Ticket */}
              <div className="mt-6 max-w-md mx-auto p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 text-white text-left shadow-xl border border-sky-500/20 relative overflow-hidden">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-sky-400">
                      Teklozy Digital Pass
                    </span>
                    <h4 className="text-lg font-black text-white mt-0.5">{event.title}</h4>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    {submittedRegistration.status}
                  </span>
                </div>

                <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block">Registration ID</span>
                    <span className="font-mono font-bold text-sky-300 text-sm">
                      {submittedRegistration.id}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Participant</span>
                    <span className="font-bold text-white truncate block">
                      {submittedRegistration.fullName}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Format</span>
                    <span className="text-slate-200">
                      {submittedRegistration.participationType}{' '}
                      {submittedRegistration.teamName ? `(${submittedRegistration.teamName})` : ''}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Dates</span>
                    <span className="text-slate-200">{event.dates}</span>
                  </div>
                </div>

                <div className="mt-5 text-[11px] text-slate-400 flex items-center gap-1.5 bg-white/5 p-2.5 rounded-lg border border-white/5">
                  <ShieldCheck size={14} className="text-sky-400 shrink-0" />
                  <span>Organizers are reviewing applications. Check your dashboard for official updates.</span>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#0088E0] hover:bg-[#0077CC] text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  Return to Events
                </button>
              </div>
            </div>
          ) : (
            /* Registration Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMessage && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-2.5">
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* 1. Personal Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                  <User size={18} className="text-[#0088E0]" />
                  <h3 className="text-base font-bold text-slate-800">1. Personal Information</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Alex Sharma"
                      className="w-full h-11 px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0088E0] focus:ring-2 focus:ring-sky-100"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@college.edu"
                      className="w-full h-11 px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0088E0] focus:ring-2 focus:ring-sky-100"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full h-11 px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0088E0] focus:ring-2 focus:ring-sky-100"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      College / University *
                    </label>
                    <input
                      type="text"
                      required
                      value={college}
                      onChange={(e) => setCollege(e.target.value)}
                      placeholder="e.g. National Institute of Technology"
                      className="w-full h-11 px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0088E0] focus:ring-2 focus:ring-sky-100"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Degree & Branch
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      <select
                        value={degree}
                        onChange={(e) => setDegree(e.target.value)}
                        className="w-full h-11 px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white focus:outline-none focus:border-[#0088E0] focus:ring-2 focus:ring-sky-100"
                      >
                        <option value="B.Tech">B.Tech / B.E.</option>
                        <option value="BCA">BCA / B.Sc CS</option>
                        <option value="MCA">MCA / M.Tech</option>
                        <option value="Other">Other Degree</option>
                      </select>
                      <input
                        type="text"
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                        placeholder="Branch (e.g. CSE)"
                        className="w-full h-11 px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#0088E0] focus:ring-2 focus:ring-sky-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Academic Year & Location
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      <select
                        value={currentYear}
                        onChange={(e) => setCurrentYear(e.target.value)}
                        className="w-full h-11 px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white focus:outline-none focus:border-[#0088E0] focus:ring-2 focus:ring-sky-100"
                      >
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="4th Year">4th Year</option>
                        <option value="Postgraduate">Postgraduate</option>
                      </select>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="City, State"
                        className="w-full h-11 px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#0088E0] focus:ring-2 focus:ring-sky-100"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Participation Mode & Team Formation */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                  <Users size={18} className="text-[#0088E0]" />
                  <h3 className="text-base font-bold text-slate-800">2. Participation Format</h3>
                </div>

                <div className="grid grid-cols-2 gap-3 max-w-md">
                  <button
                    type="button"
                    onClick={() => setParticipationType('Individual')}
                    className={`h-11 px-4 rounded-xl border text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      participationType === 'Individual'
                        ? 'border-[#0088E0] bg-sky-50 text-[#0088E0]'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <User size={16} /> Individual Solo
                  </button>
                  <button
                    type="button"
                    onClick={() => setParticipationType('Team')}
                    className={`h-11 px-4 rounded-xl border text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      participationType === 'Team'
                        ? 'border-[#0088E0] bg-sky-50 text-[#0088E0]'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Users size={16} /> Team (2–4)
                  </button>
                </div>

                {participationType === 'Team' && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                        Team Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        placeholder="e.g. ByteCrafters"
                        className="w-full h-11 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-[#0088E0]"
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-700">
                          Team Members (You are Member 1 / Leader)
                        </span>
                        {teamMembers.length < event.teamConfig.maxTeamSize - 1 && (
                          <button
                            type="button"
                            onClick={handleAddTeamMember}
                            className="inline-flex items-center gap-1 text-xs font-bold text-[#0088E0] hover:underline cursor-pointer"
                          >
                            <Plus size={14} /> Add Teammate
                          </button>
                        )}
                      </div>

                      {teamMembers.map((member, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-white rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-4 gap-2.5 text-xs relative"
                        >
                          <input
                            type="text"
                            required
                            placeholder="Teammate Name"
                            value={member.name}
                            onChange={(e) => handleUpdateTeamMember(idx, 'name', e.target.value)}
                            className="h-10 px-3 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0088E0]"
                          />
                          <input
                            type="email"
                            required
                            placeholder="Teammate Email"
                            value={member.email}
                            onChange={(e) => handleUpdateTeamMember(idx, 'email', e.target.value)}
                            className="h-10 px-3 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0088E0]"
                          />
                          <input
                            type="text"
                            placeholder="College / Role"
                            value={member.role}
                            onChange={(e) => handleUpdateTeamMember(idx, 'role', e.target.value)}
                            className="h-10 px-3 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0088E0]"
                          />
                          <div className="flex items-center gap-2">
                            <input
                              type="tel"
                              placeholder="Phone (optional)"
                              value={member.phone}
                              onChange={(e) => handleUpdateTeamMember(idx, 'phone', e.target.value)}
                              className="h-10 px-3 py-1.5 border border-slate-200 rounded-lg w-full focus:outline-none focus:border-[#0088E0]"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveTeamMember(idx)}
                              className="p-2 text-slate-400 hover:text-red-500 rounded cursor-pointer"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Domain & Technical Skills */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                  <Sparkles size={18} className="text-[#0088E0]" />
                  <h3 className="text-base font-bold text-slate-800">
                    3. Problem Domain & Technical Skills
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Preferred Problem Track
                    </label>
                    <select
                      value={preferredDomain}
                      onChange={(e) => setPreferredDomain(e.target.value)}
                      className="w-full h-11 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-[#0088E0]"
                    >
                      {event.themes.map((theme, i) => (
                        <option key={i} value={theme.title}>
                          {theme.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Previous Hackathon Experience
                    </label>
                    <select
                      value={experienceLevel}
                      onChange={(e) => setExperienceLevel(e.target.value)}
                      className="w-full h-11 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-[#0088E0]"
                    >
                      <option value="First-time Hacker">First-time Hacker</option>
                      <option value="1–2 Hackathons">1–2 Hackathons</option>
                      <option value="3+ Hackathons (Experienced)">3+ Hackathons (Experienced)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Technical Skills & Tools
                  </label>
                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                    {technicalSkills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-[#0088E0] text-xs font-bold border border-sky-100"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                          className="hover:text-red-500 cursor-pointer font-bold ml-0.5"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={handleAddSkill}
                      placeholder="Type a skill and press Enter (e.g. Next.js, Figma, PyTorch)"
                      className="flex-1 h-11 px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0088E0]"
                    />
                    <button
                      type="button"
                      onClick={handleAddSkill}
                      className="h-11 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* 4. Links & Motivation */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                  <ExternalLink size={18} className="text-[#0088E0]" />
                  <h3 className="text-base font-bold text-slate-800">4. Profiles & Motivation</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      GitHub Profile
                    </label>
                    <input
                      type="url"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      placeholder="https://github.com/..."
                      className="w-full h-11 px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#0088E0]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      LinkedIn Profile
                    </label>
                    <input
                      type="url"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      placeholder="https://linkedin.com/in/..."
                      className="w-full h-11 px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#0088E0]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Portfolio / Demo
                    </label>
                    <input
                      type="url"
                      value={portfolioUrl}
                      onChange={(e) => setPortfolioUrl(e.target.value)}
                      placeholder="https://myportfolio.dev"
                      className="w-full h-11 px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#0088E0]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    What motivates you to build at this hackathon?
                  </label>
                  <textarea
                    rows={2}
                    value={motivation}
                    onChange={(e) => setMotivation(e.target.value)}
                    placeholder="Briefly describe what you aim to create and learn during the 48-hour sprint..."
                    className="w-full p-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0088E0] min-h-[85px]"
                  />
                </div>
              </div>

              {/* Consent & Submit */}
              <div className="pt-3 border-t border-slate-100 space-y-4">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={consentGiven}
                    onChange={(e) => setConsentGiven(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-[#0088E0] focus:ring-[#0088E0]"
                  />
                  <span className="text-xs text-slate-600 leading-relaxed">
                    I confirm that the submitted details are accurate, and I agree to follow the Teklozy Code of Conduct and hackathon collaboration guidelines.
                  </span>
                </label>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-full border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-7 py-2.5 rounded-full bg-[#0088E0] hover:bg-[#0077CC] text-white font-bold text-sm shadow-md transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? 'Submitting Registration...' : 'Complete Registration'}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : modalContent;
};
