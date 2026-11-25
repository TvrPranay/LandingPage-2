import React, { useState, useEffect } from 'react';
import { Calendar, ChevronRight, X, Sparkles } from 'lucide-react';

interface HackathonFloatingNotificationProps {
  onRegister: () => void;
}

export const HackathonFloatingNotification: React.FC<HackathonFloatingNotificationProps> = ({
  onRegister,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Pops up on every single page load / reload / refresh
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
    setIsDismissed(true);
  };

  if (isDismissed || !isVisible) return null;

  return (
    <div
      onClick={onRegister}
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 max-w-[340px] sm:max-w-[360px] w-[calc(100%-2.5rem)] bg-[#0B1528]/95 hover:bg-[#0B1528] text-white border border-sky-400/30 rounded-2xl p-4 sm:p-5 shadow-[0_16px_45px_rgba(0,0,0,0.38)] backdrop-blur-xl transition-all duration-300 hover:shadow-sky-500/20 hover:-translate-y-1 cursor-pointer group animate-in fade-in slide-in-from-bottom-5"
      role="alert"
      aria-live="polite"
    >
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 -mr-10 -mt-10 w-32 h-32 rounded-full bg-[#0088E0]/20 blur-2xl pointer-events-none" />

      {/* Top row: Status pill + close button */}
      <div className="flex items-center justify-between gap-2 relative z-10">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[10px] font-black uppercase tracking-[0.16em] text-sky-400">
            HACKATHON SOON
          </span>
        </div>
        <button
          type="button"
          onClick={handleDismiss}
          className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          title="Dismiss notification"
          aria-label="Dismiss"
        >
          <X size={15} />
        </button>
      </div>

      {/* Main Content */}
      <div className="space-y-1 mt-2 relative z-10">
        <div className="flex items-center gap-1.5">
          <h4 className="font-extrabold text-sm sm:text-base text-white tracking-tight group-hover:text-sky-300 transition-colors">
            Teklozy Hackathon 2026
          </h4>
          <Sparkles size={14} className="text-amber-400 shrink-0" />
        </div>
        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-300 font-medium">
          <Calendar size={12} className="text-sky-400 shrink-0" />
          <span>19–20 Dec 2026 • 48H Sprint</span>
        </div>
        <p className="text-[11px] sm:text-xs text-slate-400 leading-snug pt-0.5">
          Free registration, verified certificates & real-world problem domains.
        </p>
      </div>

      {/* Action Button */}
      <div className="mt-3.5 relative z-10">
        <button
          type="button"
          onClick={onRegister}
          className="w-full py-2.5 px-4 rounded-xl bg-[#0088E0] group-hover:bg-[#0077CC] text-white font-extrabold text-xs shadow-md shadow-sky-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Register Now</span>
          <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
