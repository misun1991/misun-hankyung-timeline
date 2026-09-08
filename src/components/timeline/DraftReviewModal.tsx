'use client';

import React, { useState } from 'react';
import { ClusterTopic, TimelineEvent } from '../../types/timeline';
import { useTimelineData } from '../../context/TimelineDataContext';
import { X, Check, RefreshCw, Sparkles, ArrowRight, ShieldCheck, AlertTriangle } from 'lucide-react';

interface DraftReviewModalProps {
  cluster: ClusterTopic;
  isOpen: boolean;
  onClose: () => void;
}

export const DraftReviewModal: React.FC<DraftReviewModalProps> = ({ cluster, isOpen, onClose }) => {
  const { approveClusterDraft } = useTimelineData();

  // Create realistic AI revised draft content based on current cluster
  const draftSummary = `${cluster.topicSummary} \n\n[AI 실시간 추가 보완] 방금 수집된 2건의 속보를 반영하여 당사자 간의 최근 입장 표명과 시장 예상치를 추가 분석했으며, 단기 타결 가능성보다는 구조적 대립이 지속될 것으로 전망됩니다.`;

  const draftNewEvent: TimelineEvent = {
    id: `evt-draft-${Date.now()}`,
    date: '2026년 9월 8일 (속보)',
    rawDate: '2026-09-08',
    headline: `[AI 실시간 재수집 속보] ${cluster.title.split(' ')[0]} 관련 긴급 브리핑 및 당사자 2차 입장 발표`,
    description: `주요 관계 기관과 협상단이 8일 오후 비공개 회동을 갖고 핵심 쟁점에 대한 절충안을 모색 중입니다. AI 종합 분석 결과 해당 이벤트는 기존 서사의 연속선상에서 중요한 분기점이 될 것으로 평가되었습니다.`,
    isGapBridge: false,
    sources: [
      { name: '한국경제', title: '실시간 속보 집계', publishedAt: '2026.09.08' },
      { name: '매일경제', title: '현장 실무접촉 확인', publishedAt: '2026.09.08' }
    ],
    significance: 'critical'
  };

  const handleApprove = () => {
    approveClusterDraft(cluster.id, draftSummary, draftNewEvent);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30">
                  DRAFT (초안 검토 정책)
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Human-in-the-Loop 검토 단계
                </span>
              </div>
              <h3 className="text-base font-bold text-white tracking-tight mt-0.5">
                AI 재수집·개작 초안 비교 검토 및 발행 승인
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info banner */}
        <div className="px-6 py-2.5 bg-amber-50 border-b border-amber-100 flex items-center justify-between text-xs text-amber-900">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              AI가 작성한 개작 초안은 <strong>[최종 승인 및 발행]</strong> 버튼을 누르기 전까지 라이브 화면에 노출되지 않습니다.
            </span>
          </div>
          <span className="font-semibold text-amber-800">타겟 클러스터: {cluster.id}</span>
        </div>

        {/* Comparison Body: Existing vs Draft */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50">
          {/* Current Live State */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
              <span className="text-xs font-bold text-slate-500 uppercase">
                현재 라이브 반영 상태
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                사건 {cluster.eventCount}건
              </span>
            </div>

            <div className="space-y-4 flex-1">
              <div>
                <span className="text-xs font-bold text-slate-600 block mb-1">
                  현재 서사 요약
                </span>
                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                  {cluster.topicSummary}
                </p>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-600 block mb-1">
                  현재 최신 사건 이정표
                </span>
                {cluster.events[0] && (
                  <div className="p-3 rounded-lg border border-slate-200 bg-white text-xs">
                    <span className="font-bold text-slate-900 block mb-1">
                      {cluster.events[0].headline}
                    </span>
                    <p className="text-slate-600 line-clamp-3">{cluster.events[0].description}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* AI New Draft */}
          <div className="bg-white rounded-xl border-2 border-blue-400 p-5 shadow-sm flex flex-col relative">
            <div className="absolute top-2.5 right-3">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                AI 개작 추천안
              </span>
            </div>

            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
              <span className="text-xs font-bold text-blue-700 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                신규 개작 초안 (Draft)
              </span>
            </div>

            <div className="space-y-4 flex-1">
              <div>
                <span className="text-xs font-bold text-blue-900 block mb-1">
                  개작된 서사 요약 (신규 기사 2건 반영)
                </span>
                <p className="text-xs text-slate-800 leading-relaxed bg-blue-50/50 p-3 rounded-lg border border-blue-100">
                  {draftSummary}
                </p>
              </div>

              <div>
                <span className="text-xs font-bold text-blue-900 block mb-1">
                  최상단에 추가될 신규 이정표
                </span>
                <div className="p-3 rounded-lg border border-blue-200 bg-blue-50/30 text-xs">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[11px] px-1.5 py-0.2 rounded bg-blue-700 text-white font-bold">
                      {draftNewEvent.date}
                    </span>
                    <span className="font-bold text-blue-950">{draftNewEvent.headline}</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{draftNewEvent.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-white border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>승인 시 라이브 화면에 즉시 노출되고 최종 동기화 시각이 갱신됩니다.</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
            >
              닫기 (반려)
            </button>
            <button
              onClick={handleApprove}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 shadow-md shadow-blue-700/30 cursor-pointer active:scale-95 transition-all"
            >
              <Check className="w-4 h-4" />
              <span>최종 승인 및 라이브 발행</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
