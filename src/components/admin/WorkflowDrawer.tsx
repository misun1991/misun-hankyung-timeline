'use client';

import React, { useState } from 'react';
import { WorkflowItem } from '../../types/timeline';
import { AuditBadge, ModeBadge, CategoryBadge } from '../common/Badge';
import { X, Copy, Check, FileJson, ArrowRight, ShieldCheck, Database, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface WorkflowDrawerProps {
  workflow: WorkflowItem | null;
  onClose: () => void;
}

export const WorkflowDrawer: React.FC<WorkflowDrawerProps> = ({ workflow, onClose }) => {
  const [activeJsonTab, setActiveJsonTab] = useState<'input' | 'timeline' | 'audit'>('timeline');
  const [copied, setCopied] = useState<boolean>(false);

  if (!workflow) return null;

  const getJsonContent = () => {
    if (activeJsonTab === 'input') {
      return JSON.stringify(workflow.inputResearchData || { note: '입력 조사 데이터' }, null, 2);
    }
    if (activeJsonTab === 'audit') {
      return JSON.stringify(workflow.auditLog || { note: '감사 결과' }, null, 2);
    }
    return JSON.stringify(workflow.finalTimelineData || workflow, null, 2);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getJsonContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs">
      <div className="w-full max-w-2xl bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs text-blue-400 font-bold">{workflow.id}</span>
              <span className="text-slate-500">•</span>
              <span className="text-xs text-slate-400">{workflow.createdAt}</span>
            </div>
            <h3 className="text-base font-bold text-white tracking-tight line-clamp-1">
              {workflow.topicName}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Workflow Summary Strip */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <CategoryBadge category={workflow.category} />
            <ModeBadge mode={workflow.mode} />
            <AuditBadge status={workflow.auditStatus} />
          </div>

          <Link
            href={`/clusters/${workflow.clusterId}`}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-md shadow-2xs transition-colors cursor-pointer"
          >
            <span>사용자 2분할 뷰 바로가기</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Audit Log Box */}
        {workflow.auditLog && (
          <div className="p-4 mx-6 mt-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div className="flex items-center justify-between font-bold text-slate-800 mb-1.5">
              <span className="flex items-center gap-1.5 text-blue-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                AI 정성 심사 결과 ({workflow.auditLog.passedCount}/{workflow.auditLog.totalCriteria} 통과)
              </span>
              <span className="text-slate-500">
                영향력: {workflow.auditLog.macroImpactScore}점 | 지속성: {workflow.auditLog.continuityScore}점
              </span>
            </div>
            <p className="text-slate-600 leading-relaxed">{workflow.auditLog.reason}</p>
          </div>
        )}

        {/* JSON Tabs */}
        <div className="px-6 pt-4 flex items-center justify-between border-b border-slate-200">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveJsonTab('timeline')}
              className={`pb-2.5 px-2 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
                activeJsonTab === 'timeline'
                  ? 'border-blue-700 text-blue-800'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              1. 최종 타임라인 JSON
            </button>
            <button
              onClick={() => setActiveJsonTab('input')}
              className={`pb-2.5 px-2 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
                activeJsonTab === 'input'
                  ? 'border-blue-700 text-blue-800'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              2. 입력 조사 데이터
            </button>
            <button
              onClick={() => setActiveJsonTab('audit')}
              className={`pb-2.5 px-2 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
                activeJsonTab === 'audit'
                  ? 'border-blue-700 text-blue-800'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              3. 감사 결과 데이터
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 pb-2 cursor-pointer font-medium"
          >
            {copied ? <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? '복사됨!' : 'JSON 복사'}</span>
          </button>
        </div>

        {/* JSON Viewer */}
        <div className="flex-1 p-6 overflow-y-auto bg-slate-950 font-mono text-xs text-slate-200 leading-relaxed">
          <pre className="whitespace-pre-wrap">{getJsonContent()}</pre>
        </div>
      </div>
    </div>
  );
};
