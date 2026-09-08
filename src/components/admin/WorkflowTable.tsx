'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTimelineData } from '../../context/TimelineDataContext';
import { WorkflowItem } from '../../types/timeline';
import { CategoryBadge, ModeBadge, AuditBadge } from '../common/Badge';
import { WorkflowDrawer } from './WorkflowDrawer';
import { Search, ExternalLink, Filter, Code2, ArrowUpRight } from 'lucide-react';

export const WorkflowTable: React.FC = () => {
  const { workflows } = useTimelineData();
  const [selectedWorkflow, setSelectedWorkflow] = useState<WorkflowItem | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [search, setSearch] = useState<string>('');

  const filtered = workflows.filter(wf => {
    if (filterCategory !== 'ALL' && wf.category !== filterCategory) return false;
    if (filterStatus !== 'ALL' && wf.auditStatus !== filterStatus) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      if (
        !wf.topicName.toLowerCase().includes(q) &&
        !wf.id.toLowerCase().includes(q) &&
        !wf.category.toLowerCase().includes(q)
      ) {
        return false;
      }
    }
    return true;
  });

  return (
    <div>
      {/* Filters and search row */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="워크플로 ID 또는 주제명 검색..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <select
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-700 focus:outline-none"
          >
            <option value="ALL">전체 분야</option>
            <option value="국제">국제</option>
            <option value="경제">경제</option>
            <option value="부동산">부동산</option>
            <option value="사회">사회</option>
            <option value="산업">산업</option>
            <option value="문화">문화</option>
          </select>

          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-700 focus:outline-none"
          >
            <option value="ALL">전체 감사상태</option>
            <option value="approved">승인완료 (approved)</option>
            <option value="revision_required">보완검토 (revision)</option>
            <option value="do_not_publish">발행금지 (rejected)</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 border-collapse">
            <thead className="bg-slate-50/80 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">워크플로 ID</th>
                <th className="py-3 px-3">분야</th>
                <th className="py-3 px-4">주제명 (거시 서사)</th>
                <th className="py-3 px-3">동작 모드</th>
                <th className="py-3 px-3 text-right">유사도</th>
                <th className="py-3 px-4">감사 상태</th>
                <th className="py-3 px-3 text-center">사건/출처</th>
                <th className="py-3 px-4">생성 시각</th>
                <th className="py-3 px-4 text-center">액션</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-normal">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-400">
                    검색 조건에 맞는 워크플로 기록이 없습니다.
                  </td>
                </tr>
              ) : (
                filtered.map(wf => (
                  <tr
                    key={wf.id}
                    onClick={() => setSelectedWorkflow(wf)}
                    className="hover:bg-blue-50/40 transition-colors cursor-pointer group"
                  >
                    <td className="py-3 px-4 font-mono text-blue-900 font-semibold whitespace-nowrap">
                      {wf.id}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <CategoryBadge category={wf.category} />
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900 group-hover:text-blue-800 transition-colors max-w-xs truncate">
                      {wf.topicName}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <ModeBadge mode={wf.mode} />
                    </td>
                    <td className="py-3 px-3 font-mono font-semibold text-right text-slate-700 whitespace-nowrap">
                      {(wf.similarityScore * 100).toFixed(0)}%
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <AuditBadge status={wf.auditStatus} />
                    </td>
                    <td className="py-3 px-3 text-center font-mono whitespace-nowrap">
                      <span className="font-semibold text-slate-800">{wf.eventsCount}</span>
                      <span className="text-slate-300"> / </span>
                      <span className="text-slate-500">{wf.sourcesCount}</span>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-500 text-[11px] whitespace-nowrap">
                      {wf.createdAt}
                    </td>
                    <td
                      className="py-3 px-4 text-center whitespace-nowrap"
                      onClick={e => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => setSelectedWorkflow(wf)}
                          title="원본 JSON 열람"
                          className="p-1.5 rounded-md hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                        >
                          <Code2 className="w-4 h-4" />
                        </button>
                        <Link
                          href={`/clusters/${wf.clusterId}`}
                          title="사용자 2분할 뷰로 이동"
                          className="p-1.5 rounded-md hover:bg-blue-100 text-blue-700 hover:text-blue-900 transition-colors inline-flex items-center"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Raw JSON Drawer */}
      <WorkflowDrawer
        workflow={selectedWorkflow}
        onClose={() => setSelectedWorkflow(null)}
      />
    </div>
  );
};
