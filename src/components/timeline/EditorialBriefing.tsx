'use client';

import React from 'react';
import { ClusterTopic } from '../../types/timeline';
import { CategoryBadge, StatusBadge } from '../common/Badge';
import { Sparkles, Tag, Clock } from 'lucide-react';

interface EditorialBriefingProps {
  cluster: ClusterTopic;
}

export const EditorialBriefing: React.FC<EditorialBriefingProps> = ({ cluster }) => {
  return (
    <div className="bg-gradient-to-b from-white to-slate-50/80 rounded-2xl border border-slate-200/90 p-6 shadow-xs relative overflow-hidden">
      {/* Decorative subtle backdrop accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />

      {/* Top Meta Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center flex-wrap gap-2">
          <CategoryBadge category={cluster.category} className="text-xs px-2.5 py-1" />
          <StatusBadge badge={cluster.statusBadge} />
          {cluster.subCategories?.map(sub => (
            <span
              key={sub}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs text-slate-500 bg-slate-100 font-medium"
            >
              <Tag className="w-3 h-3 text-slate-400" />
              {sub}
            </span>
          ))}
          <span className="text-slate-300">|</span>
          <span className="text-xs text-slate-500 flex items-center gap-1 font-mono">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            최종 업데이트: {cluster.updatedAt}
          </span>
        </div>
      </div>

      {/* Macro Topic Headline */}
      <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-snug mb-4">
        {cluster.title}
      </h2>

      {/* AI Editorial Briefing Box */}
      <div className="bg-slate-900 text-slate-100 rounded-xl p-5 shadow-sm border border-slate-800 relative">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-400">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-bold tracking-wide uppercase text-blue-300">
              AI 에디토리얼 브리핑
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">이슈 맥락 종합 분석</span>
        </div>

        {/* 3~4 Sentences Topic Summary */}
        <p className="text-sm sm:text-[14px] text-slate-200 leading-relaxed font-normal antialiased mb-4">
          {cluster.topicSummary}
        </p>

        {/* Current Status Box */}
        <div className="pt-3 border-t border-slate-800 flex items-start sm:items-center gap-3">
          <div className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
            <span>최신 현황</span>
          </div>
          <p className="text-xs sm:text-sm font-medium text-slate-100 leading-snug">
            {cluster.currentStatus}
          </p>
        </div>
      </div>
    </div>
  );
};
