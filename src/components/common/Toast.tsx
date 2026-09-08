'use client';

import React from 'react';
import { useTimelineData } from '../../context/TimelineDataContext';
import { CheckCircle2 } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useTimelineData();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-slate-900/95 backdrop-blur-md text-white text-sm font-medium rounded-xl shadow-xl border border-slate-700/60 animate-in fade-in slide-in-from-bottom-5 duration-200">
      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
      <span>{toastMessage}</span>
    </div>
  );
};
