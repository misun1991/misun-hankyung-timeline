'use client';

import React, { useState } from 'react';
import { useTimelineData } from '../../context/TimelineDataContext';
import { WorkflowTable } from '../../components/admin/WorkflowTable';
import { CurationStatusTab } from '../../components/admin/CurationStatusTab';
import { SystemSettingsTab } from '../../components/admin/SystemSettingsTab';
import {
  Sliders,
  Sparkles,
  FileText,
  CheckCircle,
  GitMerge,
  Layers,
  Settings,
  Activity,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function AdminPage() {
  const { workflows, clusters, setIsInjectionModalOpen } = useTimelineData();
  const [activeTab, setActiveTab] = useState<'workflows' | 'curation' | 'settings'>('workflows');

  const approvedCount = workflows.filter(w => w.auditStatus === 'approved').length;
  const evolveCount = workflows.filter(w => w.mode === 'EVOLVE').length;

  return (
    <div className="min-h-screen bg-slate-100/70">
      {/* Top Admin Banner */}
      <div className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-600/40 text-blue-300 border border-blue-400/30">
                  ADMIN CONSOLE
                </span>
                <span className="text-xs text-slate-400">timeline-admin.html 포팅 시스템</span>
              </div>
              <h1 className="text-2xl font-black text-white tracking-tight">
                타임라인 워크플로 관리자 대시보드
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                AI 뉴스 클러스터링 워크플로 실행 이력 조회, 정성 심사 결과 검증 및 JSON 직접 주입
              </p>
            </div>

            {/* Core Action: Direct JSON Injection */}
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>사용자 2분할 뷰</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={() => setIsInjectionModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold rounded-lg shadow-sm shadow-blue-500/30 transition-all cursor-pointer active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-blue-200" />
                <span>+ 테스트 JSON 데이터 직접 주입</span>
              </button>
            </div>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            <div className="bg-slate-800/80 rounded-xl p-3.5 border border-slate-700/60">
              <span className="text-[11px] text-slate-400 font-semibold block">누적 워크플로</span>
              <span className="text-xl font-black text-white font-mono mt-0.5 block">
                {workflows.length}건
              </span>
            </div>

            <div className="bg-slate-800/80 rounded-xl p-3.5 border border-slate-700/60">
              <span className="text-[11px] text-slate-400 font-semibold block">활성 타임라인</span>
              <span className="text-xl font-black text-blue-400 font-mono mt-0.5 block">
                {clusters.length}건
              </span>
            </div>

            <div className="bg-slate-800/80 rounded-xl p-3.5 border border-slate-700/60">
              <span className="text-[11px] text-slate-400 font-semibold block">정성 심사 승인율</span>
              <span className="text-xl font-black text-emerald-400 font-mono mt-0.5 block">
                {workflows.length > 0 ? Math.round((approvedCount / workflows.length) * 100) : 100}%
              </span>
            </div>

            <div className="bg-slate-800/80 rounded-xl p-3.5 border border-slate-700/60">
              <span className="text-[11px] text-slate-400 font-semibold block">서사 병합(EVOLVE)</span>
              <span className="text-xl font-black text-purple-400 font-mono mt-0.5 block">
                {evolveCount}건
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tab Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-px mb-6">
          <button
            onClick={() => setActiveTab('workflows')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'workflows'
                ? 'border-blue-700 text-blue-800 bg-white rounded-t-lg shadow-2xs'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>워크플로 목록 ({workflows.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('curation')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'curation'
                ? 'border-blue-700 text-blue-800 bg-white rounded-t-lg shadow-2xs'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>실시간 큐레이션 현황</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'settings'
                ? 'border-blue-700 text-blue-800 bg-white rounded-t-lg shadow-2xs'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>시스템 설정 & 스케줄러</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="pb-16">
          {activeTab === 'workflows' && <WorkflowTable />}
          {activeTab === 'curation' && <CurationStatusTab />}
          {activeTab === 'settings' && <SystemSettingsTab />}
        </div>
      </div>
    </div>
  );
}
