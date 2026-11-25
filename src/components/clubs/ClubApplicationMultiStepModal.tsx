import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
  UploadCloud,
  FileText,
  Trash2,
  Plus,
  Sparkles,
  ShieldCheck,
  User,
  GraduationCap,
  Heart,
  Wrench,
  FolderGit2,
  Clock,
  Send,
} from 'lucide-react';
import { TeklozyClub, ClubApplication, ApplicantSkill, ApplicantProject, SkillProficiency } from '../../types/clubs';
import { submitClubApplication } from '../../lib/clubsService';
import { uploadResume, validateResumeFile } from '../../lib/storageService';

interface ClubApplicationMultiStepModalProps {
  club: TeklozyClub;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (app: ClubApplication) => void;
}

export const ClubApplicationMultiStepModal: React.FC<ClubApplicationMultiStepModalProps> = ({
  club,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedApp, setSubmittedApp] = useState<ClubApplication | null>(null);

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

  // STEP 1: Personal Information
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [college, setCollege] = useState('');
  const [degree, setDegree] = useState('B.Tech');
  const [branch, setBranch] = useState('Computer Science');
  const [currentYear, setCurrentYear] = useState('2nd Year');
  const [graduationYear, setGraduationYear] = useState('2028');
  const [location, setLocation] = useState('');

  // STEP 2: Academic Information
  const [currentCourse, setCurrentCourse] = useState('Computer Science & Engineering');
  const [specialization, setSpecialization] = useState('');
  const [relevantCoursework, setRelevantCoursework] = useState('Data Structures, DBMS, OOP');
  const [cgpaOrPercentage, setCgpaOrPercentage] = useState('');
  const [academicProjectsSummary, setAcademicProjectsSummary] = useState('');
  const [certifications, setCertifications] = useState('');

  // STEP 3: Interests & Preferences (Tailored based on club)
  const clubInterestOptionsMap: Record<string, string[]> = {
    'dev-club': ['Frontend Development', 'Backend Engineering', 'Full-Stack Development', 'Mobile App Development', 'Open-Source Contributions', 'DevOps & Tooling'],
    'ai-data-club': ['Machine Learning', 'Deep Learning', 'Generative AI & LLMs', 'Data Analytics & Pipelines', 'Computer Vision', 'NLP & Speech'],
    'design-creative-club': ['UI/UX Design', 'Design Systems', 'Product Design', 'Visual Branding', 'Figma Prototyping', 'Motion Design'],
    'cyber-cloud-club': ['Web Application Security', 'Cloud Infrastructure (AWS/GCP)', 'DevOps & Docker', 'Ethical Hacking / CTFs', 'Network Defense', 'Cryptography'],
    'innovation-club': ['Startup Development', 'Product Management', 'Go-To-Market & Growth', 'Hackathons & Competitions', 'User Research', 'Venture Strategy'],
  };

  const defaultInterests = clubInterestOptionsMap[club.id] || [
    'Software Development',
    'Open Source',
    'Design',
    'AI & Automation',
  ];

  const [clubSpecificInterests, setClubSpecificInterests] = useState<string[]>([defaultInterests[0]]);
  const [primaryInterest, setPrimaryInterest] = useState(defaultInterests[0]);
  const [secondaryInterests, setSecondaryInterests] = useState<string[]>([]);
  const [reasonForJoining, setReasonForJoining] = useState('');
  const [learningGoals, setLearningGoals] = useState('');
  const [expectedContributions, setExpectedContributions] = useState('');

  // STEP 4: Technical & Practical Skills
  const [skills, setSkills] = useState<ApplicantSkill[]>([
    { name: 'JavaScript / TypeScript', proficiency: 'Intermediate' },
    { name: 'Git & GitHub', proficiency: 'Intermediate' },
  ]);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillProficiency, setNewSkillProficiency] = useState<SkillProficiency>('Beginner');

  // STEP 5: Experience & Projects
  const [projects, setProjects] = useState<ApplicantProject[]>([
    {
      title: 'Student Productivity Dashboard',
      description: 'Web application organizing assignments, exams, and peer notes with instant search.',
      technologies: 'React, Tailwind, Supabase',
      type: 'Individual',
      githubUrl: 'https://github.com/example/student-dashboard',
    },
  ]);
  const [hackathonExperience, setHackathonExperience] = useState('1–2 Hackathons');
  const [communityExperience, setCommunityExperience] = useState('');
  const [leadershipExperience, setLeadershipExperience] = useState('');

  // STEP 6: Resume & Supporting Documents
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeFileName, setResumeFileName] = useState<string>('');
  const [resumeFileSize, setResumeFileSize] = useState<number>(0);
  const [resumeBase64Url, setResumeBase64Url] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploadingFile, setIsUploadingFile] = useState<boolean>(false);

  // STEP 7: Availability & Commitment
  const [hoursPerWeek, setHoursPerWeek] = useState('4–6 hours/week');
  const [preferredDays, setPreferredDays] = useState<string[]>(['Saturday', 'Sunday']);
  const [workModePreference, setWorkModePreference] = useState('Hybrid (Online sync + Meetups)');
  const [willingnessMeetings, setWillingnessMeetings] = useState(true);
  const [willingnessCollaboration, setWillingnessCollaboration] = useState(true);
  const [availabilityNotes, setAvailabilityNotes] = useState('');

  // STEP 8: Consent
  const [consentGiven, setConsentGiven] = useState(false);

  if (!isOpen) return null;

  // Step navigation validation
  const validateStep = (step: number): boolean => {
    setErrorMessage('');
    if (step === 1) {
      if (!fullName.trim() || !email.trim() || !phone.trim() || !college.trim()) {
        setErrorMessage('Please complete all required personal details (Name, Email, Phone, College).');
        return false;
      }
    } else if (step === 2) {
      if (!currentCourse.trim()) {
        setErrorMessage('Please provide your current course and relevant academic details.');
        return false;
      }
    } else if (step === 3) {
      if (clubSpecificInterests.length === 0) {
        setErrorMessage('Please select at least one area of interest.');
        return false;
      }
      if (!reasonForJoining.trim()) {
        setErrorMessage('Please tell us briefly why you want to join this club.');
        return false;
      }
    } else if (step === 4) {
      if (skills.length === 0) {
        setErrorMessage('Please add at least one technical or design skill (Beginners are welcome!).');
        return false;
      }
    } else if (step === 6) {
      if (!resumeFile && !resumeFileName) {
        setErrorMessage('Please upload your resume in PDF format (Max 5MB).');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(8, prev + 1));
    }
  };

  const handlePrev = () => {
    setErrorMessage('');
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleJumpToStep = (step: number) => {
    setErrorMessage('');
    setCurrentStep(step);
  };

  // Step 3 helper
  const toggleInterest = (interest: string) => {
    if (clubSpecificInterests.includes(interest)) {
      setClubSpecificInterests(clubSpecificInterests.filter((i) => i !== interest));
    } else {
      setClubSpecificInterests([...clubSpecificInterests, interest]);
    }
  };

  // Step 4 helper: Add Skill
  const handleAddSkill = () => {
    if (!newSkillName.trim()) return;
    setSkills([...skills, { name: newSkillName.trim(), proficiency: newSkillProficiency }]);
    setNewSkillName('');
    setNewSkillProficiency('Beginner');
  };

  const handleRemoveSkill = (idx: number) => {
    setSkills(skills.filter((_, i) => i !== idx));
  };

  // Step 5 helper: Add Project
  const handleAddProject = () => {
    setProjects([
      ...projects,
      {
        title: '',
        description: '',
        technologies: '',
        type: 'Individual',
      },
    ]);
  };

  const handleUpdateProject = (index: number, field: keyof ApplicantProject, value: any) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    setProjects(updated);
  };

  const handleRemoveProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  // Step 6: File Upload Handler
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateResumeFile(file);
    if (!validation.valid) {
      setErrorMessage(validation.error || 'Invalid file.');
      return;
    }

    setErrorMessage('');
    setIsUploadingFile(true);
    setUploadProgress(20);

    try {
      const tempId = `temp-${Date.now()}`;
      const uploadResult = await uploadResume(file, tempId, (p) => setUploadProgress(p));
      setResumeFile(file);
      setResumeFileName(uploadResult.fileName);
      setResumeFileSize(uploadResult.fileSize);
      setResumeBase64Url(uploadResult.base64Data || '');
    } catch (err: any) {
      setErrorMessage(err.message || 'File upload failed.');
    } finally {
      setIsUploadingFile(false);
    }
  };

  const handleRemoveResume = () => {
    setResumeFile(null);
    setResumeFileName('');
    setResumeFileSize(0);
    setResumeBase64Url('');
    setUploadProgress(0);
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentGiven) {
      setErrorMessage('Please confirm the consent declaration before submitting.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const app = await submitClubApplication({
        clubId: club.id,
        clubName: club.name,
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        dateOfBirth: dateOfBirth || undefined,
        college: college.trim(),
        degree,
        branch,
        currentYear,
        graduationYear,
        location: location.trim() || 'Online',
        currentCourse,
        specialization: specialization.trim() || 'General Track',
        relevantCoursework: relevantCoursework.trim(),
        cgpaOrPercentage: cgpaOrPercentage.trim() || undefined,
        academicProjectsSummary: academicProjectsSummary.trim() || 'N/A',
        certifications: certifications.trim() || 'N/A',
        clubSpecificInterests,
        primaryInterest: primaryInterest || clubSpecificInterests[0] || 'General',
        secondaryInterests,
        reasonForJoining: reasonForJoining.trim(),
        learningGoals: learningGoals.trim() || 'Grow technical and collaboration skills.',
        expectedContributions: expectedContributions.trim() || 'Active participation in sprint projects.',
        skills,
        projects: projects.filter((p) => p.title.trim()),
        hackathonExperience,
        communityExperience: communityExperience.trim() || undefined,
        leadershipExperience: leadershipExperience.trim() || undefined,
        resumeFileName,
        resumeFileSize,
        resumeBase64Url,
        hoursPerWeek,
        preferredDays,
        workModePreference,
        willingnessMeetings,
        willingnessCollaboration,
        availabilityNotes: availabilityNotes.trim() || undefined,
        consentGiven: true,
      });

      setSubmittedApp(app);
      onSuccess(app);
    } catch (err: any) {
      setErrorMessage(err.message || 'Application submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepLabels = [
    'Personal Info',
    'Academics',
    'Interests',
    'Skills',
    'Projects',
    'Resume',
    'Commitment',
    'Review & Submit',
  ];

  const modalContent = (
    <div
      className="fixed inset-0 z-[100] w-screen h-screen flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-hidden top-0 left-0 right-0 bottom-0 m-0"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-sky-100 flex flex-col font-manrope overflow-hidden my-auto">
        {/* Modal Header */}
        <div className="shrink-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#0088E0] bg-sky-50 px-2.5 py-0.5 rounded-full">
                Club Membership
              </span>
              <span className="text-xs text-slate-400 font-bold">
                Step {currentStep} of 8
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-[#10233F] mt-0.5">
              Apply to {club.name}
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

        {/* Step Progress Bar - shrink-0 with Segmented Track so it NEVER cuts off */}
        {!submittedApp && (
          <div className="shrink-0 px-6 py-3.5 bg-slate-50/90 border-b border-slate-100">
            <div className="flex items-center justify-between text-xs font-bold mb-2">
              <span className="text-[#10233F] font-extrabold flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#0088E0] text-white text-[10px] flex items-center justify-center font-bold">
                  {currentStep}
                </span>
                <span>{stepLabels[currentStep - 1]}</span>
              </span>
              <span className="text-slate-400 font-medium">
                Step {currentStep} of 8 ({Math.round((currentStep / 8) * 100)}%)
              </span>
            </div>

            {/* Segmented Progress Track */}
            <div className="w-full flex items-center gap-1.5">
              {stepLabels.map((label, idx) => {
                const stepNum = idx + 1;
                const isCurrent = currentStep === stepNum;
                const isPast = currentStep > stepNum;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      if (isPast) handleJumpToStep(stepNum);
                    }}
                    title={`Step ${stepNum}: ${label}`}
                    className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                      isCurrent
                        ? 'bg-[#0088E0] ring-2 ring-sky-300/50'
                        : isPast
                        ? 'bg-emerald-500 cursor-pointer hover:opacity-80'
                        : 'bg-slate-200 cursor-default'
                    }`}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          {submittedApp ? (
            /* Post-Submission View */
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 size={36} />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Application Submitted!
                </h3>
                <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto">
                  Thank you for applying to <span className="font-bold text-slate-900">{club.name}</span>. Your application is now in the review queue.
                </p>
              </div>

              {/* ID & Details Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-sky-950 text-white max-w-md mx-auto text-left shadow-xl space-y-4">
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-sky-400">
                      Application ID
                    </span>
                    <span className="font-mono font-bold text-lg text-white block">
                      {submittedApp.id}
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold border border-sky-400/30">
                    {submittedApp.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block">Applicant</span>
                    <span className="font-bold text-white truncate block">{submittedApp.fullName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Club Track</span>
                    <span className="font-bold text-white truncate block">{submittedApp.clubName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Submitted On</span>
                    <span className="text-slate-200">
                      {new Date(submittedApp.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Primary Focus</span>
                    <span className="text-slate-200 truncate block">{submittedApp.primaryInterest}</span>
                  </div>
                </div>

                <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-[11px] text-slate-300">
                  <span className="font-bold text-white block mb-0.5">What happens next?</span>
                  Club reviewers will evaluate your portfolio and interests. Check the Student Clubs Dashboard for review updates.
                </div>
              </div>

              <div className="pt-4 flex justify-center">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-8 py-3 rounded-full bg-[#0088E0] hover:bg-[#0077CC] text-white font-bold text-sm shadow-md"
                >
                  Go to Clubs Dashboard
                </button>
              </div>
            </div>
          ) : (
            /* Multi-Step Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMessage && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2.5">
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* STEP 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                    <User size={18} className="text-[#0088E0]" />
                    <h3 className="text-base font-bold text-slate-900">
                      Step 1 — Personal Details
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Priyanshu Roy"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0088E0]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="priyanshu@college.edu"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0088E0]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0088E0]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                        Date of Birth (Optional)
                      </label>
                      <input
                        type="date"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0088E0]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                        College / University *
                      </label>
                      <input
                        type="text"
                        required
                        value={college}
                        onChange={(e) => setCollege(e.target.value)}
                        placeholder="e.g. National Institute of Technology, Warangal"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0088E0]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                        Degree & Department / Branch
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <select
                          value={degree}
                          onChange={(e) => setDegree(e.target.value)}
                          className="px-3 py-2.5 rounded-xl border border-slate-200 bg-white"
                        >
                          <option value="B.Tech">B.Tech / B.E.</option>
                          <option value="BCA">BCA / B.Sc</option>
                          <option value="MCA">MCA / M.Tech</option>
                          <option value="B.Des">B.Des / M.Des</option>
                          <option value="Other">Other</option>
                        </select>
                        <input
                          type="text"
                          value={branch}
                          onChange={(e) => setBranch(e.target.value)}
                          placeholder="CSE / IT / ECE"
                          className="px-3 py-2.5 rounded-xl border border-slate-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                        Academic Year & Graduation
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <select
                          value={currentYear}
                          onChange={(e) => setCurrentYear(e.target.value)}
                          className="px-3 py-2.5 rounded-xl border border-slate-200 bg-white"
                        >
                          <option value="1st Year">1st Year</option>
                          <option value="2nd Year">2nd Year</option>
                          <option value="3rd Year">3rd Year</option>
                          <option value="4th Year">4th Year</option>
                          <option value="Postgraduate">Postgraduate</option>
                        </select>
                        <input
                          type="text"
                          value={graduationYear}
                          onChange={(e) => setGraduationYear(e.target.value)}
                          placeholder="e.g. 2028"
                          className="px-3 py-2.5 rounded-xl border border-slate-200"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                        Current City & State
                      </label>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. Hyderabad, Telangana"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0088E0]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Academic Information */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                    <GraduationCap size={18} className="text-[#0088E0]" />
                    <h3 className="text-base font-bold text-slate-900">
                      Step 2 — Academic Background
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                        Current Course
                      </label>
                      <input
                        type="text"
                        value={currentCourse}
                        onChange={(e) => setCurrentCourse(e.target.value)}
                        placeholder="e.g. Bachelor of Technology in CS"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0088E0]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                        Academic Specialization (if any)
                      </label>
                      <input
                        type="text"
                        value={specialization}
                        onChange={(e) => setSpecialization(e.target.value)}
                        placeholder="e.g. Artificial Intelligence, Cloud, Design"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0088E0]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                        Relevant Coursework Completed
                      </label>
                      <input
                        type="text"
                        value={relevantCoursework}
                        onChange={(e) => setRelevantCoursework(e.target.value)}
                        placeholder="e.g. Algorithms, Web Tech, Database Systems"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0088E0]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                        CGPA or Percentage (Optional)
                      </label>
                      <input
                        type="text"
                        value={cgpaOrPercentage}
                        onChange={(e) => setCgpaOrPercentage(e.target.value)}
                        placeholder="e.g. 8.4 / 10 or 82%"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0088E0]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                        Academic Coursework Projects Summary
                      </label>
                      <textarea
                        rows={2}
                        value={academicProjectsSummary}
                        onChange={(e) => setAcademicProjectsSummary(e.target.value)}
                        placeholder="Highlight 1 or 2 projects built as part of your lab or coursework..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0088E0]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                        Relevant Certifications / Online Courses
                      </label>
                      <input
                        type="text"
                        value={certifications}
                        onChange={(e) => setCertifications(e.target.value)}
                        placeholder="e.g. CS50x, Coursera Deep Learning, AWS Cloud Practitioner"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0088E0]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Interests & Preferences */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                    <Heart size={18} className="text-[#0088E0]" />
                    <h3 className="text-base font-bold text-slate-900">
                      Step 3 — Interests & Aspirations in {club.name}
                    </h3>
                  </div>

                  <div className="space-y-4 text-xs sm:text-sm">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">
                        Select topics you want to explore in this club (Multi-select)
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {defaultInterests.map((interest) => {
                          const isChecked = clubSpecificInterests.includes(interest);
                          return (
                            <button
                              key={interest}
                              type="button"
                              onClick={() => toggleInterest(interest)}
                              className={`p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                                isChecked
                                  ? 'border-[#0088E0] bg-sky-50 text-[#0088E0]'
                                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span>{interest}</span>
                                {isChecked && <CheckCircle2 size={14} className="text-[#0088E0]" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                        Primary Interest Track
                      </label>
                      <select
                        value={primaryInterest}
                        onChange={(e) => setPrimaryInterest(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#0088E0]"
                      >
                        {defaultInterests.map((interest) => (
                          <option key={interest} value={interest}>
                            {interest}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                        Why are you excited to join {club.name}? *
                      </label>
                      <textarea
                        rows={2}
                        required
                        value={reasonForJoining}
                        onChange={(e) => setReasonForJoining(e.target.value)}
                        placeholder="Tell us what drives your passion for this domain..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0088E0]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                        What do you hope to learn or accomplish this year?
                      </label>
                      <textarea
                        rows={2}
                        value={learningGoals}
                        onChange={(e) => setLearningGoals(e.target.value)}
                        placeholder="Specific technologies, capstone projects, or leadership goals..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0088E0]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Technical & Practical Skills */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                    <Wrench size={18} className="text-[#0088E0]" />
                    <h3 className="text-base font-bold text-slate-900">
                      Step 4 — Skills & Self-Assessed Proficiency
                    </h3>
                  </div>

                  <div className="p-3 bg-sky-50 rounded-xl border border-sky-100 text-xs text-sky-900 flex items-center gap-2">
                    <Sparkles size={16} className="text-[#0088E0] shrink-0" />
                    <span>
                      Beginners are enthusiastically encouraged to apply! We prioritize enthusiasm and learning speed over existing mastery.
                    </span>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-slate-700">
                      Your Skills Roster ({skills.length})
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {skills.map((s, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between"
                        >
                          <div>
                            <span className="font-bold text-slate-900 block">{s.name}</span>
                            <span
                              className={`text-[10px] font-bold ${
                                s.proficiency === 'Advanced'
                                  ? 'text-purple-600'
                                  : s.proficiency === 'Intermediate'
                                  ? 'text-[#0088E0]'
                                  : 'text-emerald-600'
                              }`}
                            >
                              {s.proficiency}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveSkill(idx)}
                            className="p-1 text-slate-400 hover:text-red-500 rounded"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Add Skill form */}
                    <div className="p-3.5 bg-white rounded-xl border border-dashed border-sky-200 flex flex-col sm:flex-row gap-2 items-center">
                      <input
                        type="text"
                        value={newSkillName}
                        onChange={(e) => setNewSkillName(e.target.value)}
                        placeholder="Add skill (e.g. Python, Docker, Figma, React)"
                        className="w-full sm:flex-1 px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#0088E0]"
                      />
                      <select
                        value={newSkillProficiency}
                        onChange={(e) => setNewSkillProficiency(e.target.value as SkillProficiency)}
                        className="px-3 py-2 border border-slate-200 rounded-xl text-xs bg-white"
                      >
                        <option value="Beginner">Beginner (Learning)</option>
                        <option value="Intermediate">Intermediate (Built projects)</option>
                        <option value="Advanced">Advanced (Production experience)</option>
                      </select>
                      <button
                        type="button"
                        onClick={handleAddSkill}
                        className="px-4 py-2 bg-[#0088E0] hover:bg-[#0077CC] text-white font-bold text-xs rounded-xl cursor-pointer"
                      >
                        + Add Skill
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: Experience & Projects */}
              {currentStep === 5 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                    <FolderGit2 size={18} className="text-[#0088E0]" />
                    <h3 className="text-base font-bold text-slate-900">
                      Step 5 — Projects & Practical Experience
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">
                        Showcase Projects (Add 1 or more projects)
                      </span>
                      <button
                        type="button"
                        onClick={handleAddProject}
                        className="text-xs font-bold text-[#0088E0] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Plus size={14} /> Add Another Project
                      </button>
                    </div>

                    {projects.map((proj, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-slate-800">Project #{idx + 1}</span>
                          {projects.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveProject(idx)}
                              className="text-red-500 hover:text-red-700"
                            >
                              Remove
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                              Project Title
                            </label>
                            <input
                              type="text"
                              value={proj.title}
                              onChange={(e) => handleUpdateProject(idx, 'title', e.target.value)}
                              placeholder="e.g. Micro-SaaS Analytics"
                              className="w-full p-2 rounded-lg border border-slate-200 bg-white"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                              Tech Stack Used
                            </label>
                            <input
                              type="text"
                              value={proj.technologies}
                              onChange={(e) => handleUpdateProject(idx, 'technologies', e.target.value)}
                              placeholder="e.g. Next.js, Postgres, Tailwind"
                              className="w-full p-2 rounded-lg border border-slate-200 bg-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                            Description & Problem Solved
                          </label>
                          <textarea
                            rows={2}
                            value={proj.description}
                            onChange={(e) => handleUpdateProject(idx, 'description', e.target.value)}
                            placeholder="What did this project do and what was your role?"
                            className="w-full p-2 rounded-lg border border-slate-200 bg-white"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                              GitHub Repository URL
                            </label>
                            <input
                              type="url"
                              value={proj.githubUrl || ''}
                              onChange={(e) => handleUpdateProject(idx, 'githubUrl', e.target.value)}
                              placeholder="https://github.com/..."
                              className="w-full p-2 rounded-lg border border-slate-200 bg-white"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                              Live Demo or Presentation Link
                            </label>
                            <input
                              type="url"
                              value={proj.liveDemoUrl || ''}
                              onChange={(e) => handleUpdateProject(idx, 'liveDemoUrl', e.target.value)}
                              placeholder="https://..."
                              className="w-full p-2 rounded-lg border border-slate-200 bg-white"
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                          Previous Hackathon Experience
                        </label>
                        <select
                          value={hackathonExperience}
                          onChange={(e) => setHackathonExperience(e.target.value)}
                          className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                        >
                          <option value="None (Excited for first)">None (Excited for first)</option>
                          <option value="1–2 Hackathons">1–2 Hackathons</option>
                          <option value="3+ Hackathons">3+ Hackathons</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                          Previous Community or Club Experience
                        </label>
                        <input
                          type="text"
                          value={communityExperience}
                          onChange={(e) => setCommunityExperience(e.target.value)}
                          placeholder="e.g. GDSC Member, ACM Club, College Tech Team"
                          className="w-full p-2.5 rounded-xl border border-slate-200"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 6: Resume & Supporting Documents */}
              {currentStep === 6 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                    <FileText size={18} className="text-[#0088E0]" />
                    <h3 className="text-base font-bold text-slate-900">
                      Step 6 — Resume Upload (PDF)
                    </h3>
                  </div>

                  <div className="p-3 bg-sky-50 rounded-xl border border-sky-100 text-xs text-sky-900 flex items-start gap-2">
                    <ShieldCheck size={16} className="text-[#0088E0] shrink-0 mt-0.5" />
                    <span>
                      Private Storage Guarantee: Your resume is kept private and accessible strictly by authorized club admission reviewers. Public access is prevented via Supabase Storage Row Level Security.
                    </span>
                  </div>

                  {/* Upload Box */}
                  <div className="p-6 rounded-2xl border-2 border-dashed border-sky-200 bg-sky-50/40 text-center space-y-3">
                    {resumeFileName ? (
                      <div className="p-4 bg-white rounded-2xl border border-sky-200 flex items-center justify-between max-w-md mx-auto text-left shadow-xs">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#0088E0] flex items-center justify-center font-bold text-xs">
                            PDF
                          </div>
                          <div>
                            <span className="font-bold text-xs text-slate-900 block truncate max-w-[200px]">
                              {resumeFileName}
                            </span>
                            <span className="text-[10px] text-slate-500">
                              {(resumeFileSize / (1024 * 1024)).toFixed(2)} MB • Uploaded & Verified
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={handleRemoveResume}
                          className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-slate-100 transition-colors"
                          title="Remove Resume"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="w-12 h-12 mx-auto rounded-full bg-white text-[#0088E0] shadow-xs flex items-center justify-center">
                          <UploadCloud size={24} />
                        </div>
                        <div>
                          <label className="inline-block px-5 py-2.5 rounded-full bg-[#0088E0] hover:bg-[#0077CC] text-white font-bold text-xs cursor-pointer shadow-sm transition-all">
                            Choose PDF Resume
                            <input
                              type="file"
                              accept="application/pdf,.pdf"
                              onChange={handleFileChange}
                              className="hidden"
                            />
                          </label>
                          <p className="mt-2 text-xs text-slate-500">
                            PDF format only (Maximum file size: 5 MB)
                          </p>
                        </div>
                      </>
                    )}

                    {isUploadingFile && (
                      <div className="max-w-xs mx-auto space-y-1">
                        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-[#0088E0] h-2 transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-slate-500 font-bold">
                          Uploading... {uploadProgress}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 7: Availability & Commitment */}
              {currentStep === 7 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                    <Clock size={18} className="text-[#0088E0]" />
                    <h3 className="text-base font-bold text-slate-900">
                      Step 7 — Availability & Commitment
                    </h3>
                  </div>

                  <div className="space-y-4 text-xs sm:text-sm">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                        How many hours per week can you actively dedicate to club sprints?
                      </label>
                      <select
                        value={hoursPerWeek}
                        onChange={(e) => setHoursPerWeek(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                      >
                        <option value="2–4 hours/week">2–4 hours/week (Standard track)</option>
                        <option value="4–6 hours/week">4–6 hours/week (Active builder track)</option>
                        <option value="8+ hours/week">8+ hours/week (Intensive sprint lead track)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                        Preferred Work Mode
                      </label>
                      <select
                        value={workModePreference}
                        onChange={(e) => setWorkModePreference(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                      >
                        <option value="Hybrid (Online sync + Meetups)">
                          Hybrid (Online Discord sync + Meetups)
                        </option>
                        <option value="100% Online Remote">100% Online Remote</option>
                      </select>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={willingnessMeetings}
                          onChange={(e) => setWillingnessMeetings(e.target.checked)}
                          className="h-4 w-4 rounded border-slate-300 text-[#0088E0]"
                        />
                        <span className="text-xs text-slate-700">
                          I am willing to participate in bi-weekly project reviews and group syncs.
                        </span>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={willingnessCollaboration}
                          onChange={(e) => setWillingnessCollaboration(e.target.checked)}
                          className="h-4 w-4 rounded border-slate-300 text-[#0088E0]"
                        />
                        <span className="text-xs text-slate-700">
                          I agree to contribute openly and constructively with teammates on shared deliverables.
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 8: Final Review & Submission */}
              {currentStep === 8 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                    <Send size={18} className="text-[#0088E0]" />
                    <h3 className="text-base font-bold text-slate-900">
                      Step 8 — Final Review & Confirmation
                    </h3>
                  </div>

                  <p className="text-xs text-slate-500">
                    Please review your application summary. You can jump back to edit any section before final submission.
                  </p>

                  <div className="space-y-3 text-xs">
                    {/* Summary Card 1 */}
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex justify-between items-start">
                      <div>
                        <span className="font-bold text-slate-900 block">Personal & Academics</span>
                        <span className="text-slate-600 block mt-0.5">
                          {fullName} • {email} • {phone}
                        </span>
                        <span className="text-slate-500 block">
                          {college} ({degree} - {branch}, {currentYear})
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleJumpToStep(1)}
                        className="text-[#0088E0] font-bold hover:underline"
                      >
                        Edit
                      </button>
                    </div>

                    {/* Summary Card 2 */}
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex justify-between items-start">
                      <div>
                        <span className="font-bold text-slate-900 block">
                          Club Target & Interests
                        </span>
                        <span className="text-slate-600 block mt-0.5">
                          Target Club: <strong className="text-slate-900">{club.name}</strong>
                        </span>
                        <span className="text-slate-500 block">
                          Primary: {primaryInterest} • Topics: {clubSpecificInterests.join(', ')}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleJumpToStep(3)}
                        className="text-[#0088E0] font-bold hover:underline"
                      >
                        Edit
                      </button>
                    </div>

                    {/* Summary Card 3 */}
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex justify-between items-start">
                      <div>
                        <span className="font-bold text-slate-900 block">Skills & Resume</span>
                        <span className="text-slate-600 block mt-0.5">
                          {skills.map((s) => `${s.name} (${s.proficiency})`).join(' • ')}
                        </span>
                        <span className="text-slate-500 block">
                          Resume File: {resumeFileName || 'None uploaded'}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleJumpToStep(4)}
                        className="text-[#0088E0] font-bold hover:underline"
                      >
                        Edit
                      </button>
                    </div>

                    {/* Consent */}
                    <div className="pt-2">
                      <label className="flex items-start gap-3 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          required
                          checked={consentGiven}
                          onChange={(e) => setConsentGiven(e.target.checked)}
                          className="mt-1 h-4 w-4 rounded border-slate-300 text-[#0088E0]"
                        />
                        <span className="text-xs text-slate-600 leading-relaxed">
                          I declare that the information provided in this application is accurate and true. I understand this information will be reviewed by the Teklozy admissions committee for student community placement.
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={currentStep === 1 ? onClose : handlePrev}
                  className="px-5 py-2.5 rounded-full border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft size={16} />
                  <span>{currentStep === 1 ? 'Cancel' : 'Previous'}</span>
                </button>

                {currentStep < 8 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-full bg-[#0088E0] hover:bg-[#0077CC] text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Next Step</span>
                    <ChevronRight size={16} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send size={14} />
                    <span>{isSubmitting ? 'Submitting Application...' : 'Submit Application'}</span>
                  </button>
                )}
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
