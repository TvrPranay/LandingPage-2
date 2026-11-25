import React from 'react';
import {
  Code2,
  Terminal,
  BrainCircuit,
  Cpu,
  Layers,
  Palette,
  Layout,
  ShieldCheck,
  Lock,
  Cloud,
  Rocket,
  TrendingUp,
  Flame,
  Monitor,
  GitBranch,
  Sparkles,
} from 'lucide-react';

interface VisualProps {
  className?: string;
  variant?: 'card' | 'hero';
}

/**
 * 1. Development Club Visual
 * Modern 3D isometric code cube with glowing brackets.
 */
export const DevClubVisual: React.FC<VisualProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 flex items-center justify-center select-none ${className}`}>
      <div className="absolute inset-0 bg-sky-400/20 rounded-full blur-xl pointer-events-none" />
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_8px_16px_rgba(0,136,224,0.35)]" fill="none">
        <defs>
          <linearGradient id="devCubeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0066CC" />
          </linearGradient>
          <linearGradient id="devCubeSide" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#0369A1" />
          </linearGradient>
        </defs>
        <polygon points="50,15 85,32 50,49 15,32" fill="url(#devCubeGrad)" stroke="#7DD3FC" strokeWidth="1.5" />
        <polygon points="15,32 50,49 50,85 15,68" fill="url(#devCubeSide)" stroke="#38BDF8" strokeWidth="1.5" />
        <polygon points="85,32 50,49 50,85 85,68" fill="#0C4A6E" stroke="#38BDF8" strokeWidth="1.5" />
        <path d="M38 52 L32 58 L38 64" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M62 52 L68 58 L62 64" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="53" y1="50" x2="47" y2="66" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  );
};

/**
 * 2. AI & Data Science Club Visual
 * 3D glowing neural microchip with AI core.
 */
export const AiClubVisual: React.FC<VisualProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 flex items-center justify-center select-none ${className}`}>
      <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl pointer-events-none" />
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_8px_16px_rgba(139,92,246,0.35)]" fill="none">
        <defs>
          <linearGradient id="aiChipGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#6366F1" />
          </linearGradient>
          <radialGradient id="aiCoreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#C084FC" />
            <stop offset="100%" stopColor="#7E22CE" />
          </radialGradient>
        </defs>
        <g stroke="#818CF8" strokeWidth="2" strokeLinecap="round">
          <line x1="28" y1="12" x2="28" y2="24" />
          <line x1="50" y1="12" x2="50" y2="24" />
          <line x1="72" y1="12" x2="72" y2="24" />
          <line x1="28" y1="76" x2="28" y2="88" />
          <line x1="50" y1="76" x2="50" y2="88" />
          <line x1="72" y1="76" x2="72" y2="88" />
          <line x1="12" y1="28" x2="24" y2="28" />
          <line x1="12" y1="50" x2="24" y2="50" />
          <line x1="12" y1="72" x2="24" y2="72" />
          <line x1="76" y1="28" x2="88" y2="28" />
          <line x1="76" y1="50" x2="88" y2="50" />
          <line x1="76" y1="72" x2="88" y2="72" />
        </g>
        <rect x="22" y="22" width="56" height="56" rx="14" fill="url(#aiChipGrad)" stroke="#C084FC" strokeWidth="2" />
        <circle cx="50" cy="50" r="16" fill="url(#aiCoreGlow)" />
        <text x="50" y="55" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="900" fontFamily="sans-serif">
          AI
        </text>
      </svg>
    </div>
  );
};

/**
 * 3. Design & Creative Club Visual
 * 3D isometric layered canvas with creative palette.
 */
export const DesignClubVisual: React.FC<VisualProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 flex items-center justify-center select-none ${className}`}>
      <div className="absolute inset-0 bg-pink-500/20 rounded-full blur-xl pointer-events-none" />
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_8px_16px_rgba(244,63,94,0.35)]" fill="none">
        <defs>
          <linearGradient id="designGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FB7185" />
            <stop offset="100%" stopColor="#E11D48" />
          </linearGradient>
          <linearGradient id="designGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F472B6" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>
        </defs>
        <polygon points="50,16 80,38 50,60 20,38" fill="url(#designGrad2)" opacity="0.6" stroke="#F472B6" strokeWidth="1.5" />
        <polygon points="50,38 80,60 50,82 20,60" fill="url(#designGrad1)" stroke="#FDA4AF" strokeWidth="2" />
        <circle cx="50" cy="60" r="4.5" fill="#FFFFFF" />
        <circle cx="40" cy="52" r="2.5" fill="#FFE4E6" />
        <circle cx="60" cy="52" r="2.5" fill="#FFE4E6" />
      </svg>
    </div>
  );
};

/**
 * 4. Cybersecurity & Cloud Club Visual
 * 3D security shield with cloud and verified lock.
 */
export const CyberClubVisual: React.FC<VisualProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 flex items-center justify-center select-none ${className}`}>
      <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl pointer-events-none" />
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_8px_16px_rgba(16,185,129,0.35)]" fill="none">
        <defs>
          <linearGradient id="cyberShieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>
        <path
          d="M50 16 L78 28 C78 54 66 74 50 84 C34 74 22 54 22 28 Z"
          fill="url(#cyberShieldGrad)"
          stroke="#6EE7B7"
          strokeWidth="2"
        />
        <path
          d="M42 56 C39 56 37 54 37 51 C37 48 39 46 42 46 C42.5 43 45 40 49 40 C53 40 56 42.5 56.5 45 C59 45 61 47 61 50 C61 53 59 56 56 56 Z"
          fill="#FFFFFF"
          opacity="0.95"
        />
        <circle cx="49" cy="48" r="2" fill="#047857" />
      </svg>
    </div>
  );
};

/**
 * 5. Innovation & Entrepreneurship Club Visual
 * 3D launch rocket & innovation emblem.
 */
export const InnovationClubVisual: React.FC<VisualProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 flex items-center justify-center select-none ${className}`}>
      <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl pointer-events-none" />
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_8px_16px_rgba(245,158,11,0.35)]" fill="none">
        <defs>
          <linearGradient id="rocketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>
        <path
          d="M50 16 C60 26 66 42 66 58 L34 58 C34 42 40 26 50 16 Z"
          fill="url(#rocketGrad)"
          stroke="#FDE68A"
          strokeWidth="2"
        />
        <path d="M34 48 L22 64 L34 60 Z" fill="#B45309" stroke="#FDE68A" strokeWidth="1" />
        <path d="M66 48 L78 64 L66 60 Z" fill="#B45309" stroke="#FDE68A" strokeWidth="1" />
        <circle cx="50" cy="38" r="6" fill="#FFFFFF" stroke="#D97706" strokeWidth="1.5" />
        <polygon points="44,58 50,78 56,58" fill="#EF4444" opacity="0.9" />
        <polygon points="46,58 50,70 54,58" fill="#FDE047" />
      </svg>
    </div>
  );
};

/**
 * 6. Teklozy Hackathon 2026 Visual
 * Coding environments, dual screens displaying code, real-time terminal output, and 48-hour digital sprint beacon.
 */
export const HackathonVisual: React.FC<VisualProps> = ({ className = '', variant = 'card' }) => {
  return (
    <div
      className={`relative w-full h-full overflow-hidden bg-gradient-to-br from-[#051024] via-[#081B38] to-[#0A264F] flex items-center justify-center select-none ${className}`}
    >
      {/* High-tech circuit grid */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(#38BDF8 1px, transparent 1px), linear-gradient(to right, #0284C7 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      {/* Powerful blue and cyan pulse glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-[#0088E0]/25 rounded-full blur-3xl pointer-events-none" />

      {/* Battle Station Multiple Displays Layout */}
      <div className="relative z-10 w-[92%] max-w-[360px] rounded-2xl bg-[#061226]/90 border border-sky-400/35 shadow-2xl p-4 backdrop-blur-md space-y-3">
        {/* Header telemetry */}
        <div className="flex items-center justify-between pb-2 border-b border-sky-400/20">
          <div className="flex items-center gap-2">
            <Monitor size={15} className="text-[#38BDF8]" />
            <span className="text-xs font-black text-white tracking-wide">
              48H SPRINT ENVIRONMENT
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-[10px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>LIVE ARENA</span>
          </div>
        </div>

        {/* Dual Screen Simulator */}
        <div className="grid grid-cols-2 gap-2">
          {/* Screen 1: Terminal & Git commits */}
          <div className="p-2.5 rounded-xl bg-black/40 border border-sky-500/20 font-mono text-[9px] text-slate-300 space-y-1">
            <div className="text-sky-400 font-bold">~/tek-hackathon-2026</div>
            <div className="text-slate-400">$ git checkout -b feat/ai-core</div>
            <div className="text-emerald-400">✓ tests passed (12/12)</div>
            <div className="text-purple-300">✓ build deployed: 0.8s</div>
          </div>

          {/* Screen 2: System Architecture Diagram */}
          <div className="p-2.5 rounded-xl bg-black/40 border border-sky-500/20 flex flex-col justify-between">
            <span className="text-[10px] font-bold text-sky-200">System Pipeline</span>
            <div className="flex items-center justify-between text-[9px] text-slate-300 pt-1">
              <span className="px-1.5 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-500/30">Client</span>
              <span>→</span>
              <span className="px-1.5 py-0.5 rounded bg-sky-950 text-emerald-300 border border-emerald-500/30">API</span>
              <span>→</span>
              <span className="px-1.5 py-0.5 rounded bg-sky-950 text-purple-300 border border-purple-500/30">DB</span>
            </div>
          </div>
        </div>

        {/* Bottom Specs Bar */}
        <div className="pt-2 border-t border-sky-400/15 flex items-center justify-between text-[10px] text-slate-300">
          <span className="font-mono text-sky-300">19–20 Dec 2026</span>
          <span className="font-bold text-white bg-white/10 px-2 py-0.5 rounded">
            Two Days • Hybrid Arena
          </span>
        </div>
      </div>
    </div>
  );
};

/**
 * 7. Teklozy Hackathon Workspace Hero Visual (Matches Reference)
 * Sleek modern laptop with live code editor and </>, glowing glass lightbulb on desk,
 * aesthetic desk plant, and smooth sky-blue wave background. Strictly zero people.
 */
export const HackathonWorkspaceHeroVisual: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`relative w-full h-full overflow-hidden bg-gradient-to-br from-slate-50 via-sky-50/70 to-blue-50/90 flex items-center justify-center select-none ${className}`}
    >
      {/* Soft curved wave backdrop matching reference */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="none"
        viewBox="0 0 800 500"
        fill="none"
      >
        <path
          d="M0 0 C300 80 450 320 800 280 L800 500 L0 500 Z"
          fill="url(#blueWaveGrad)"
          opacity="0.35"
        />
        <path
          d="M200 0 C420 120 520 400 800 380 L800 500 L200 500 Z"
          fill="url(#deepBlueGrad)"
          opacity="0.18"
        />
        <defs>
          <linearGradient id="blueWaveGrad" x1="0" y1="0" x2="800" y2="500" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0088E0" stopOpacity="0.4" />
            <stop offset="1" stopColor="#38BDF8" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="deepBlueGrad" x1="0" y1="0" x2="800" y2="500" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0284C7" stopOpacity="0.5" />
            <stop offset="1" stopColor="#BAE6FD" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>

      {/* Ambient soft glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 bg-sky-300/30 rounded-full blur-3xl pointer-events-none" />

      {/* Composition Container */}
      <div className="relative z-10 w-full max-w-[560px] h-[85%] flex items-end justify-between px-4 sm:px-8 pb-3">
        {/* Glowing Glass Lightbulb Stand & Notepad (Left-Center) */}
        <div className="relative mb-4 hidden sm:flex flex-col items-center">
          {/* Glass Lightbulb Display */}
          <div className="relative w-20 h-28 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-[0_12px_28px_rgba(56,189,248,0.25)] flex flex-col items-center justify-center p-2">
            {/* Glowing Bulb Bulb */}
            <div className="relative w-12 h-12 rounded-full bg-gradient-to-tr from-amber-100 via-sky-50 to-white flex items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.6)]">
              <svg className="w-7 h-7 text-[#0088E0] drop-shadow-[0_0_8px_rgba(0,136,224,0.7)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            {/* Subtle base */}
            <div className="w-8 h-1 bg-sky-200/80 rounded-full mt-2" />
          </div>

          {/* Under-bulb Notebook Stack */}
          <div className="w-24 h-3 bg-white/80 rounded-sm shadow-sm border border-slate-200/60 mt-1" />
          <div className="w-26 h-3 bg-slate-100/90 rounded-sm shadow-md border border-slate-200/80 -mt-1" />
        </div>

        {/* Realistic Modern Laptop (Centerpiece) */}
        <div className="relative flex-1 max-w-[340px] sm:max-w-[380px] flex flex-col items-center mx-auto">
          {/* Laptop Screen Bezel */}
          <div className="relative w-full aspect-[16/10] bg-slate-900 rounded-t-xl p-2.5 shadow-2xl border-[3px] border-slate-800 flex flex-col">
            {/* Camera dot */}
            <div className="w-1.5 h-1.5 rounded-full bg-slate-700 mx-auto mb-1.5" />

            {/* Display / Code Editor Interface */}
            <div className="relative flex-1 w-full bg-[#070F1E] rounded-md overflow-hidden p-2.5 flex justify-between font-mono">
              {/* Code lines */}
              <div className="space-y-1.5 text-[9px] sm:text-[10px] text-slate-400 select-none max-w-[65%]">
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-600">01</span>
                  <span className="text-sky-400 font-bold">import</span>
                  <span className="text-slate-200">Teklozy</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-600">02</span>
                  <span className="text-purple-400 font-bold">const</span>
                  <span className="text-emerald-300">sprint</span> = <span className="text-amber-300">48h</span>;
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-600">03</span>
                  <span className="text-sky-300">buildFuture</span>(<span className="text-emerald-400">ideas</span>);
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-600">04</span>
                  <span className="text-emerald-400 font-semibold">deployProduction()</span>
                </div>
                {/* Visual line bars */}
                <div className="w-28 h-1 bg-sky-500/40 rounded-full mt-2" />
                <div className="w-20 h-1 bg-purple-500/30 rounded-full" />
              </div>

              {/* Large Glowing Code Bracket </> Symbol */}
              <div className="flex flex-col items-center justify-center pr-1 sm:pr-2">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-sky-500/10 border border-sky-400/40 backdrop-blur-sm flex items-center justify-center text-sky-300 font-mono font-black text-xl sm:text-2xl shadow-[0_0_24px_rgba(56,189,248,0.35)]">
                  &lt;/&gt;
                </div>
              </div>
            </div>
          </div>

          {/* Laptop Base / Keyboard deck */}
          <div className="relative w-[114%] -mt-0.5 h-3.5 bg-gradient-to-b from-slate-300 via-slate-200 to-slate-400 rounded-b-xl shadow-lg border-t border-white/60 flex items-center justify-center">
            {/* Opening groove */}
            <div className="w-12 h-1 bg-slate-400 rounded-full" />
          </div>
          {/* Desk shadow */}
          <div className="w-[110%] h-3 bg-slate-900/10 blur-sm rounded-full -mt-1" />
        </div>

        {/* Minimalist Desk Plant (Right) */}
        <div className="relative mb-2 hidden md:flex flex-col items-center">
          {/* Leaves */}
          <div className="relative w-12 h-14 flex items-end justify-center">
            <div className="absolute bottom-1 -left-1 w-4 h-9 bg-emerald-600 rounded-full -rotate-25 shadow-sm origin-bottom" />
            <div className="absolute bottom-1 left-2 w-4 h-12 bg-emerald-500 rounded-full rotate-6 shadow-sm origin-bottom" />
            <div className="absolute bottom-1 right-0 w-4 h-10 bg-emerald-600 rounded-full rotate-25 shadow-sm origin-bottom" />
            <div className="absolute bottom-1 left-4 w-3.5 h-8 bg-emerald-400 rounded-full rotate-15 shadow-sm origin-bottom" />
          </div>
          {/* Ceramic Pot */}
          <div className="w-9 h-10 bg-white rounded-b-lg border border-slate-200 shadow-md flex flex-col items-center justify-start pt-1">
            <div className="w-8 h-1 bg-slate-300 rounded-full" />
          </div>
          {/* Pot Shadow */}
          <div className="w-10 h-1.5 bg-slate-900/10 blur-xs rounded-full mt-0.5" />
        </div>
      </div>
    </div>
  );
};
