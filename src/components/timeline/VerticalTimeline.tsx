'use client';

import React from 'react';
import { TimelineEvent } from '../../types/timeline';
import { useTimelineData } from '../../context/TimelineDataContext';
import {
  Calendar,
  ExternalLink,
  Link2,
  ArrowUpDown
} from 'lucide-react';

interface VerticalTimelineProps {
  events: TimelineEvent[];
}

export const VerticalTimeline: React.FC<VerticalTimelineProps> = ({ events }) => {
  const { sortDirection, setSortDirection } = useTimelineData();

  // Sort events based on direction
  const sortedEvents = [...events].sort((a, b) => {
    const timeA = new Date(a.rawDate || a.date.replace(/[^0-9]/g, '')).getTime() || 0;
    const timeB = new Date(b.rawDate || b.date.replace(/[^0-9]/g, '')).getTime() || 0;
    return sortDirection === 'desc' ? timeB - timeA : timeA - timeB;
  });

  return (
    <div className="mt-8">
      {/* Timeline Controls Header */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-600 ring-4 ring-blue-100" />
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            주요 사건 흐름 (타임라인)
          </h3>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
            총 {events.length}개 주요 사건
          </span>
        </div>

        {/* Sort toggle */}
        <button
          onClick={() => setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs font-semibold rounded-md shadow-2xs transition-colors cursor-pointer"
        >
          <ArrowUpDown className="w-3.5 h-3.5 text-blue-600" />
          <span>{sortDirection === 'desc' ? '최신순 정렬' : '과거순 정렬'}</span>
        </button>
      </div>

      {/* Timeline Stream */}
      <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2.5 sm:before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-blue-600 before:via-slate-300 before:to-slate-200">
        {sortedEvents.map((event, idx) => {
          const isLatest = idx === 0 && sortDirection === 'desc';

          return (
            <div key={event.id || idx} className="relative group">
              {/* Timeline Node Dot */}
              <div
                className={`absolute -left-6 sm:-left-8 top-1.5 w-5 h-5 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 shadow-xs ${
                  isLatest
                    ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                    : 'bg-white border-2 border-slate-400 group-hover:border-blue-600 text-slate-600'
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    isLatest ? 'bg-white' : 'bg-slate-500 group-hover:bg-blue-600'
                  }`}
                />
              </div>

              {/* Event Card Container */}
              <div
                className={`bg-white rounded-xl border p-5 transition-all shadow-xs hover:shadow-md ${
                  isLatest
                    ? 'border-blue-300 ring-1 ring-blue-200/50 bg-gradient-to-br from-white to-blue-50/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Date & Node Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold font-mono tracking-tight ${
                        isLatest
                          ? 'bg-blue-800 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-800 border border-slate-200'
                      }`}
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      {event.date}
                    </span>
                    {isLatest && (
                      <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        최근 사건
                      </span>
                    )}
                  </div>

                  {event.significance === 'critical' && (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                      핵심 국면
                    </span>
                  )}
                </div>

                {/* Headline: 인과 맥락 표제어 */}
                <h4 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-snug mb-2 group-hover:text-blue-900 transition-colors">
                  {event.headline}
                </h4>

                {/* Context connection bridge box */}
                {(event.isGapBridge || event.causalBridge) && (
                  <div className="mb-3 p-3 rounded-lg bg-amber-50/80 border border-amber-200/80 text-amber-950 text-xs leading-relaxed flex items-start gap-2.5">
                    <div className="mt-0.5 p-1 rounded bg-amber-200/70 text-amber-900 shrink-0">
                      <Link2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="font-bold text-amber-900 mr-1.5">
                        [이전 사건과의 맥락 연결]
                      </span>
                      <span>{event.causalBridge}</span>
                    </div>
                  </div>
                )}

                {/* Description Body */}
                <p className="text-sm text-slate-700 leading-relaxed font-normal mb-4">
                  {event.description}
                </p>

                {/* Sources & Publisher tags */}
                {event.sources && event.sources.length > 0 && (
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-slate-400 font-medium">보도 출처:</span>
                      {event.sources.map((src, sIdx) => (
                        <span
                          key={sIdx}
                          className="inline-flex items-center px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium border border-slate-200/80"
                        >
                          {src.name}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      {event.sources.map((src, sIdx) => {
                        if (!src.url && !src.title) return null;
                        return (
                          <a
                            key={sIdx}
                            href={src.url || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-slate-600 hover:text-blue-700 font-medium hover:underline text-[11px]"
                            title={src.title || src.name}
                          >
                            <span>{src.name} 기사 원문</span>
                            <ExternalLink className="w-3 h-3 text-slate-400" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
