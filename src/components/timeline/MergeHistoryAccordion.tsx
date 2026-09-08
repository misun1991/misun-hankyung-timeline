'use client';

import React, { useState } from 'react';
import { MergeHistoryItem } from '../../types/timeline';
import { GitMerge, ChevronDown, ChevronUp } from 'lucide-react';

interface MergeHistoryAccordionProps {
  mergeHistory?: MergeHistoryItem[];
}

export const MergeHistoryAccordion: React.FC<MergeHistoryAccordionProps> = ({ mergeHistory }) => {
  // Service-facing UI: Editorial Merge History (default open)
  const [isOpen, setIsOpen] = useState<boolean>(true);

  if (!mergeHistory || mergeHistory.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-3.5 bg-slate-50/80 hover:bg-slate-100/80 flex items-center justify-between border-b border-slate-200/80 transition-colors cursor-pointer text-left"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
            <GitMerge className="w-4 h-4" />
          </div>
          <div>
            <span className="text-sm font-bold text-slate-800">
              관련 이슈 연계 및 통합 내역
            </span>
            <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              {mergeHistory.length}건 연계
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <span>{isOpen ? '접기' : '상세보기'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {isOpen && (
        <div className="p-5 space-y-3 bg-white divide-y divide-slate-100">
          {mergeHistory.map((item, idx) => (
            <div key={item.id || idx} className="pt-3 first:pt-0">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                    연계된 세부 이슈
                  </span>
                  <span className="text-sm font-bold text-slate-900">{item.sourceClusterName}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-mono text-slate-400">{item.mergedAt}</span>
                  <span className="text-slate-300">•</span>
                  <span>관련 기사 {item.articlesCount}건 통합</span>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-3 text-xs text-slate-700 leading-relaxed border border-slate-200/60 flex items-start gap-2">
                <span className="shrink-0 font-bold text-slate-500">통합 맥락:</span>
                <p>{item.reason}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
