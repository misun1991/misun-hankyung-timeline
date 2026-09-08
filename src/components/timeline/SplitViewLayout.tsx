'use client';

import React, { useState } from 'react';
import { useTimelineData } from '../../context/TimelineDataContext';
import { ClusterListPanel } from './ClusterListPanel';
import { EditorialBriefing } from './EditorialBriefing';
import { VerticalTimeline } from './VerticalTimeline';
import { CategoryType } from '../../types/timeline';
import { CategoryBadge, StatusBadge } from '../common/Badge';
import { LayoutGrid, Columns, Calendar, ArrowRight, Search } from 'lucide-react';
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
    setActiveCategory,
    isLiveConnected
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

  const totalEvents = clusters.reduce((acc, c) => acc + (c.events?.length || c.eventCount || 0), 0);

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#f0f4f9]">
      {/* View Mode Switching Sub-bar */}
      <div className="bg-white/80 backdrop-blur-xs border-b border-gray-200 px-4 sm:px-8 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">화면 레이아웃:</span>
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
                  ? 'bg-white text-blue-800 font-bold shadow-2xs ring-1 ring-slate-200/80'
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
                  ? 'bg-white text-blue-800 font-bold shadow-2xs ring-1 ring-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>2분할 상세 보기</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {currentMode === 'grid' ? (
        /* 1st Tab: 주제 모아 보기 (Grid View) */
        <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full overflow-y-auto">
          {/* Service Banner: Service Intro & KPI Chips */}
          <section className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 pb-5 border-b border-slate-200/90">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                주요 이슈 타임라인 모아보기
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                AI가 전 세계 이슈를 심층 탐색하여 사건의 기원과 전개 맥락을 서사 구조의 타임라인으로 제공합니다.
              </p>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              <div className="bg-white border border-slate-200 rounded-lg px-3.5 py-2 flex items-center gap-2 text-xs text-slate-600 shadow-2xs">
                <span>등록 이슈</span>
                <span className="font-extrabold text-blue-700 text-sm">{clusters.length}개</span>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg px-3.5 py-2 flex items-center gap-2 text-xs text-slate-600 shadow-2xs">
                <span>누적 주요 사건</span>
                <span className="font-extrabold text-slate-900 text-sm">{totalEvents}건</span>
              </div>

              {/* Grid Search */}
              <div className="relative w-48 sm:w-56">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={gridSearch}
                  onChange={e => setGridSearch(e.target.value)}
                  placeholder="이슈 키워드 검색..."
                  className="w-full pl-8 pr-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 shadow-2xs"
                />
              </div>
            </div>
          </section>

          {/* 주제 탭 (Topic Category Tabs) */}
          <div className="mb-6 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
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
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-blue-800 text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? 'bg-blue-900 text-blue-100' : 'bg-slate-100 text-slate-500'
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
                className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md hover:border-blue-400 transition-all cursor-pointer flex flex-col justify-between group"
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

                  {/* 200자 이내 요약 설명 */}
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                    {c.topicSummary && c.topicSummary.length > 200
                      ? `${c.topicSummary.slice(0, 197)}...`
                      : c.topicSummary || '사건의 기원과 전개 맥락을 서사 구조의 타임라인으로 제공합니다.'}
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
