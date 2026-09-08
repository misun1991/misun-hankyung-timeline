'use client';

import React, { useState } from 'react';
import { useTimelineData } from '../../context/TimelineDataContext';
import { ClusterListPanel } from './ClusterListPanel';
import { EditorialBriefing } from './EditorialBriefing';
import { VerticalTimeline } from './VerticalTimeline';
import { MergeHistoryAccordion } from './MergeHistoryAccordion';
import { CategoryBadge, StatusBadge } from '../common/Badge';
import { CategoryType } from '../../types/timeline';
import { LayoutGrid, Columns, Calendar, ArrowRight, Search, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CATEGORIES: CategoryType[] = ['전체', '국제', '경제', '부동산', '사회', '산업', '문화'];

interface SplitViewLayoutProps {
  initialMode?: 'split' | 'grid';
}

export const SplitViewLayout: React.FC<SplitViewLayoutProps> = ({ initialMode }) => {
  const router = useRouter();
  const {
    selectedCluster,
    clusters,
    viewMode,
    setViewMode,
    setSelectedClusterId,
    activeCategory,
    setActiveCategory
  } = useTimelineData();

  const currentMode = initialMode || viewMode;
  const [gridSearch, setGridSearch] = useState<string>('');

  const filteredClusters = clusters.filter(c => {
    if (activeCategory !== '전체' && c.category !== activeCategory) return false;
    if (gridSearch.trim()) {
      const q = gridSearch.toLowerCase();
      return (
        c.title.toLowerCase().includes(q) ||
        c.topicSummary.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-slate-100/60">
      {/* Top View Mode Control Bar */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-800">화면 레이아웃:</span>
          {/* Tab order: 1st '주제 모아 보기', 2nd '2분할 상세 보기' */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-medium">
            <button
              onClick={() => {
                setViewMode('grid');
                if (initialMode && initialMode !== 'grid') {
                  router.push('/');
                }
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                currentMode === 'grid'
                  ? 'bg-white text-blue-800 font-bold shadow-2xs ring-1 ring-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>주제 모아 보기</span>
            </button>
            <button
              onClick={() => setViewMode('split')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                currentMode === 'split'
                  ? 'bg-white text-blue-800 font-bold shadow-2xs ring-1 ring-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>2분할 상세 보기</span>
            </button>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          <span>한경 AI이슈 타임라인 서비스</span>
        </div>
      </div>

      {/* Main Content Area */}
      {currentMode === 'grid' ? (
        /* 1st Tab: 주제 모아 보기 (Grid View) */
        <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full overflow-y-auto">
          {/* Section Header */}
          <div className="mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                  한경 AI 에디토리얼
                </span>
                <span className="text-xs text-slate-400 font-medium">실시간 이슈 타임라인</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                주제 모아 보기
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                주요 거시 이슈의 과거 기원부터 최근 경과까지 인과 맥락을 시간순으로 구조화한 타임라인입니다.
              </p>
            </div>

            {/* Grid Search */}
            <div className="relative w-full md:w-72">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={gridSearch}
                onChange={e => setGridSearch(e.target.value)}
                placeholder="관심 이슈 검색..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 shadow-2xs"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-6 scrollbar-none">
            {CATEGORIES.map(cat => {
              const count =
                cat === '전체'
                  ? clusters.length
                  : clusters.filter(c => c.category === cat).length;
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-blue-800 text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-blue-900/60 text-blue-100' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredClusters.map(c => (
              <div
                key={c.id}
                onClick={() => {
                  setSelectedClusterId(c.id);
                  setViewMode('split');
                  router.push(`/clusters/${c.id}`);
                }}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md hover:border-blue-500 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5">
                      <CategoryBadge category={c.category} />
                      <StatusBadge badge={c.statusBadge} />
                    </div>
                    <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {c.updatedAt.split(' ')[0]}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 tracking-tight leading-snug group-hover:text-blue-700 transition-colors mb-3 line-clamp-2">
                    {c.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                    {c.topicSummary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-slate-700">주요 사건 {c.eventCount}건</span>
                    <span>보도 {c.sourceCount}건</span>
                  </div>
                  <div className="flex items-center gap-1 text-blue-700 font-semibold group-hover:translate-x-1 transition-transform">
                    <span>타임라인 상세</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      ) : (
        /* 2nd Tab: 2분할 상세 보기 (Split View) */
        <div className="flex-1 flex flex-col md:flex-row min-h-[calc(100vh-112px)] overflow-hidden">
          {/* Left Navigation Panel (너비 30~35%) */}
          <div className="w-full md:w-[32%] lg:w-[30%] shrink-0 h-auto md:h-full border-r border-slate-200 bg-white">
            <ClusterListPanel />
          </div>

          {/* Right Timeline Detail Panel (너비 65~70%) */}
          <main className="flex-1 h-full overflow-y-auto p-4 sm:p-8 bg-slate-50">
            {selectedCluster ? (
              <div className="max-w-4xl mx-auto space-y-6">
                {/* Upper AI Editorial Briefing */}
                <EditorialBriefing cluster={selectedCluster} />

                {/* Vertical Continuous Timeline */}
                <VerticalTimeline events={selectedCluster.events} />

                {/* Bottom AI Similar Topic Merge History Accordion */}
                <MergeHistoryAccordion mergeHistory={selectedCluster.mergeHistory} />
              </div>
            ) : (
              <div className="h-full flex items-center justify-center p-12 text-center text-slate-400">
                <p>선택된 이슈가 없습니다. 좌측에서 주제를 선택해주세요.</p>
              </div>
            )}
          </main>
        </div>
      )}
    </div>
  );
};
