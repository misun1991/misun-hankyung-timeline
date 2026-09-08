'use client';

import React from 'react';
import { useTimelineData } from '../../context/TimelineDataContext';
import { CategoryBadge } from '../common/Badge';
import {
  CheckCircle2,
  Clock,
  Layers,
  ShieldCheck,
  AlertCircle,
  Database,
  Cpu,
  ArrowRight
} from 'lucide-react';

export const CurationStatusTab: React.FC = () => {
  const { clusters } = useTimelineData();

  const sections = [
    { name: '경제', quota: 1, active: clusters.filter(c => c.category === '경제').length, status: '정상 가동' },
    { name: '부동산', quota: 1, active: clusters.filter(c => c.category === '부동산').length, status: '기준 미달로 비워둠 (정책 준수)' },
    { name: '국제', quota: 1, active: clusters.filter(c => c.category === '국제').length, status: '정상 가동' },
    { name: '산업', quota: 1, active: clusters.filter(c => c.category === '산업').length, status: '정상 가동' },
    { name: '사회', quota: 1, active: clusters.filter(c => c.category === '사회').length, status: '정상 가동' },
    { name: '문화', quota: 1, active: clusters.filter(c => c.category === '문화').length, status: '포지티브 프롬프트 탐색 중' }
  ];

  return (
    <div className="space-y-6">
      {/* 6 Essential Section Quota Pipeline Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-700" />
              6대 필수 섹션 자율 탐색 파이프라인 (기획서 2.1)
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              뉴스 커버리지 쏠림 방지를 위해 매일 6개 분야별 독립 쿼리로 자율 탐색하며, 기준 미달 섹션은 무리하게 채우지 않고 비워둡니다 (일일 최대 6건).
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            자율 스케줄러 10:00 KST
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map(s => (
            <div
              key={s.name}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <CategoryBadge category={s.name as any} />
                <span className="text-xs font-mono font-bold text-slate-700">
                  {s.active}건 운영 중
                </span>
              </div>
              <p className="text-xs text-slate-600 font-medium">{s.status}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Autonomous Schedule Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            스케줄러 작업 명세 (기획서 4.1)
          </h4>
          <ul className="text-xs text-slate-600 space-y-2">
            <li className="flex items-start gap-2">
              <span className="font-mono text-slate-800 font-bold">0 10 * * *</span>
              <span>일별 활성 이슈 파이프라인 (매일 10:00 KST)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-mono text-slate-800 font-bold">0 10 1 * *</span>
              <span>종료 이슈 월간 재탐색 파이프라인 (매월 1일 10:00 KST)</span>
            </li>
            <li className="flex items-start gap-2 text-slate-500">
              <span className="font-semibold text-slate-700">자동 보관:</span>
              <span>60일간 관련 기사 미발생 시 COMPLETED 자동 전환</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            정성적 이중 검증 프롬프트 규칙
          </h4>
          <div className="text-xs text-slate-600 space-y-2 leading-relaxed">
            <p>
              <strong>1차 검증:</strong> ① 일회성 해프닝 제외, ② 시장/산업/사회적 영향력 보유, ③ 지속적 경과 추적 필요의 3대 조건 전원 충족.
            </p>
            <p>
              <strong>2차 검증:</strong> 조건 충족 후보군 중 거시적 맥락과 파급력이 가장 뛰어난 상위 이슈를 AI가 상대 평가하여 최종 선정.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
