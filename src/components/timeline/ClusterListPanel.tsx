'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useTimelineData } from '../../context/TimelineDataContext';
import { CategoryType, LifecycleStatus } from '../../types/timeline';
import { CategoryBadge, StatusBadge, AuditBadge } from '../common/Badge';
import { Search, Filter, Calendar, FileText, ExternalLink, ChevronRight, CheckCircle2 } from 'lucide-react';

const CATEGORIES: CategoryType[] = ['전체', '국제', '경제', '부동산', '사회', '산업', '문화'];

export const ClusterListPanel: React.FC = () => {
  const router = useRouter();
  const {
    clusters,
    selectedClusterId,
    setSelectedClusterId,
    activeCategory,
    setActiveCategory,
    lifecycleFilter,
    setLifecycleFilter,
    searchQuery,
    setSearchQuery
  } = useTimelineData();

  // Filter clusters
  const filteredClusters = clusters.filter(cluster => {
    // Category filter
    if (activeCategory !== '전체' && cluster.category !== activeCategory) {
      return false;
    }
    // Lifecycle filter
    if (lifecycleFilter !== 'ALL' && cluster.lifecycleStatus !== lifecycleFilter) {
      return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = cluster.title.toLowerCase().includes(q);
      const matchSummary = cluster.topicSummary.toLowerCase().includes(q);
      const matchCategory = cluster.category.toLowerCase().includes(q);
      if (!matchTitle && !matchSummary && !matchCategory) return false;
    }
    return true;
  });

  const handleSelectCluster = (id: string) => {
    setSelectedClusterId(id);
    router.push(`/clusters/${id}`);
  };

  return (
    <aside className="w-full h-full flex flex-col bg-slate-50/50 border-r border-slate-200 overflow-hidden">
      {/* Category filter tabs */}
      <div className="p-3 bg-white border-b border-slate-200">
        <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
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
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-blue-800 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-blue-900/60 text-blue-100' : 'bg-slate-200/80 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & lifecycle secondary filter */}
        <div className="mt-2.5 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="주제 키워드 또는 서사 검색..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-100 hover:bg-slate-50 focus:bg-white text-xs text-slate-800 placeholder-slate-400 rounded-md border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-600 transition-colors"
            />
          </div>
          <select
            value={lifecycleFilter}
            onChange={e => setLifecycleFilter(e.target.value as LifecycleStatus | 'ALL')}
            className="px-2 py-1.5 bg-white border border-slate-200 text-slate-700 text-xs rounded-md focus:outline-none font-medium cursor-pointer"
          >
            <option value="ALL">전체 상태</option>
            <option value="ACTIVE">진행 중인 이슈</option>
            <option value="COMPLETED">종료/보관 이슈</option>
            <option value="DISCOVERED">AI 발견 후보</option>
          </select>
        </div>
      </div>

      {/* Cluster Topic Card List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
        <div className="flex items-center justify-between px-1 text-xs text-slate-500 font-medium">
          <span>타임라인 주제 ({filteredClusters.length}건)</span>
          <span className="text-[11px] text-slate-400">최신 업데이트 순</span>
        </div>

        {filteredClusters.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-xs">
            <Filter className="w-8 h-8 mx-auto mb-2 text-slate-300" />
            <p>해당 조건에 부합하는 타임라인 주제가 없습니다.</p>
          </div>
        ) : (
          filteredClusters.map(cluster => {
            const isSelected = cluster.id === selectedClusterId;
            return (
              <div
                key={cluster.id}
                onClick={() => handleSelectCluster(cluster.id)}
                className={`group relative p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white border-blue-600 shadow-md ring-1 ring-blue-600/30'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                {/* Active indicator bar */}
                {isSelected && (
                  <div className="absolute left-0 top-3 bottom-3 w-1 bg-blue-700 rounded-r-full" />
                )}

                {/* Top Badges */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5">
                    <CategoryBadge category={cluster.category} />
                    <StatusBadge badge={cluster.statusBadge} />
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {cluster.updatedAt.split(' ')[0]}
                  </span>
                </div>

                {/* Macro Topic Title */}
                <h3
                  className={`text-sm font-bold tracking-tight line-clamp-2 leading-snug mb-2 ${
                    isSelected ? 'text-blue-950' : 'text-slate-900 group-hover:text-blue-800'
                  }`}
                >
                  {cluster.title}
                </h3>

                {/* Bottom Stats & Audit badge */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-0.5 font-semibold text-slate-700">
                      <FileText className="w-3 h-3 text-slate-400" />
                      사건 {cluster.eventCount}건
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="inline-flex items-center gap-0.5 text-slate-500">
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                      출처 {cluster.sourceCount}건
                    </span>
                  </div>

                  <AuditBadge status={cluster.auditStatus} />
                </div>
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
};
