'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTimelineData } from '../../context/TimelineDataContext';
import { Sparkles, LayoutGrid, Columns, RotateCcw, Clock, ShieldCheck, Newspaper } from 'lucide-react';

export const Header: React.FC = () => {
  const router = useRouter();
  const {
    setIsInjectionModalOpen,
    resetToDefaultData,
    clusters,
    viewMode,
    setViewMode,
    selectedClusterId
  } = useTimelineData();

  const handleGoGrid = () => {
    setViewMode('grid');
    router.push('/');
  };

  const handleGoSplit = () => {
    setViewMode('split');
    router.push(`/clusters/${selectedClusterId || 'cluster-01'}`);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Top micro bar for editorial status */}
      <div className="bg-slate-900 text-slate-300 text-xs px-4 py-1.5 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-blue-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            실시간 AI 이슈 브리핑 가동
          </span>
          <span className="hidden sm:inline text-slate-500">|</span>
          <span className="hidden sm:inline-flex items-center gap-1 text-slate-400">
            <Clock className="w-3.5 h-3.5" />
            주요 이슈 타임라인 총 {clusters.length}건
          </span>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <span className="hidden md:inline-flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            한국경제 정성 분석 검증
          </span>
          <button
            onClick={resetToDefaultData}
            title="기본 시나리오 데이터로 복원"
            className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer text-slate-300 bg-slate-800 hover:bg-slate-700 px-2 py-0.5 rounded text-[11px]"
          >
            <RotateCcw className="w-3 h-3" />
            기본 데이터 복원
          </button>
        </div>
      </div>

      {/* Main GNB */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-6">
          <Link href="/" onClick={handleGoGrid} className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-700 to-indigo-900 flex items-center justify-center text-white shadow-sm shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Newspaper className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-blue-700">HANKYUNG AI</span>
                <span className="text-[10px] px-1.5 py-0.2 bg-blue-100 text-blue-800 rounded font-bold">서비스단</span>
              </div>
              <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-none group-hover:text-blue-700 transition-colors">
                한경 AI이슈 타임라인(가제)
              </h1>
            </div>
          </Link>

          {/* Service Navigation Tabs: 1st '주제 모아 보기', 2nd '2분할 상세 보기' */}
          <nav className="hidden sm:flex items-center gap-1 pl-4 border-l border-slate-200">
            <button
              onClick={handleGoGrid}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-blue-50 text-blue-800 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>주제 모아 보기</span>
            </button>
            <button
              onClick={handleGoSplit}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'split'
                  ? 'bg-blue-50 text-blue-800 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Columns className="w-4 h-4" />
              <span>2분할 상세 보기</span>
            </button>
          </nav>
        </div>

        {/* CTA: Data Injection Button for Testing */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsInjectionModalOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs rounded-lg shadow-sm shadow-blue-500/30 hover:shadow-md hover:shadow-blue-500/40 transition-all cursor-pointer active:scale-95"
            title="외부 생성 JSON 데이터를 주입하여 화면 렌더링 즉시 검증"
          >
            <Sparkles className="w-4 h-4 text-blue-200 animate-spin-slow" />
            <span>+ 테스트 JSON 데이터 직접 주입</span>
          </button>
        </div>
      </div>
    </header>
  );
};
