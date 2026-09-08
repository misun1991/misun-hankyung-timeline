import React from 'react';
import { AuditStatus, CategoryType, StatusBadgeType, ActionMode } from '../../types/timeline';

export const CategoryBadge: React.FC<{ category: CategoryType | string; className?: string }> = ({
  category,
  className = ''
}) => {
  const colorMap: Record<string, string> = {
    국제: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    경제: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    부동산: 'bg-amber-50 text-amber-700 border-amber-200',
    사회: 'bg-rose-50 text-rose-700 border-rose-200',
    산업: 'bg-blue-50 text-blue-700 border-blue-200',
    문화: 'bg-purple-50 text-purple-700 border-purple-200',
    전체: 'bg-slate-100 text-slate-700 border-slate-200'
  };

  const style = colorMap[category] || 'bg-slate-50 text-slate-700 border-slate-200';

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border tracking-tight ${style} ${className}`}
    >
      {category}
    </span>
  );
};

export const AuditBadge: React.FC<{ status: AuditStatus; className?: string }> = ({
  status,
  className = ''
}) => {
  switch (status) {
    case 'approved':
      return (
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 ${className}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          승인완료 (approved)
        </span>
      );
    case 'revision_required':
      return (
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 ${className}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          보완검토 (revision)
        </span>
      );
    case 'do_not_publish':
      return (
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 ${className}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
          발행금지 (rejected)
        </span>
      );
    default:
      return null;
  }
};

export const StatusBadge: React.FC<{ badge?: StatusBadgeType | string; className?: string }> = ({
  badge,
  className = ''
}) => {
  if (!badge) return null;

  if (badge === 'NEW' || badge === '신규') {
    return (
      <span
        className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-blue-600 text-white shadow-xs ${className}`}
      >
        NEW 신규
      </span>
    );
  }
  if (badge === '기사추가' || badge.includes('추가')) {
    return (
      <span
        className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-sky-100 text-sky-800 border border-sky-200 ${className}`}
      >
        기사 추가
      </span>
    );
  }
  if (badge === '서사변경' || badge === '주제병합' || badge.includes('병합')) {
    return (
      <span
        className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-violet-100 text-violet-800 border border-violet-200 ${className}`}
      >
        서사 구성 변경
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700 ${className}`}>
      {badge}
    </span>
  );
};

export const ModeBadge: React.FC<{ mode: ActionMode; className?: string }> = ({ mode, className = '' }) => {
  switch (mode) {
    case 'CREATE':
      return (
        <span className={`px-2 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 ${className}`}>
          CREATE
        </span>
      );
    case 'EVOLVE':
      return (
        <span className={`px-2 py-0.5 rounded text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200 ${className}`}>
          EVOLVE (병합)
        </span>
      );
    case 'APPEND':
      return (
        <span className={`px-2 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 ${className}`}>
          APPEND (추가)
        </span>
      );
    default:
      return null;
  }
};
