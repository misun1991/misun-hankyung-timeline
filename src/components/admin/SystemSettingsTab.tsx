'use client';

import React from 'react';
import { Database, Cpu, HardDrive, Shield, CheckCircle, Info } from 'lucide-react';

export const SystemSettingsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Database className="w-5 h-5 text-blue-700" />
          데이터베이스 및 인프라 사양 (기획서 4.2)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
            <span className="font-bold text-slate-800 block mb-1">독립 PostgreSQL 격리</span>
            <p className="text-slate-600 mb-2">포트 5435 구동으로 기존 한경 타 시스템 및 외부 서비스와의 포트 충돌 원천 차단.</p>
            <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              <CheckCircle className="w-3.5 h-3.5" />
              포트 5435 바인딩 완료
            </span>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
            <span className="font-bold text-slate-800 block mb-1">인공지능 분석 엔진</span>
            <p className="text-slate-600 mb-2">Google Gemini 1.5 Pro / Flash 융합 파이프라인 (심사·인과 요약·타임라인 자동 빌드).</p>
            <span className="inline-flex items-center gap-1 text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              <Cpu className="w-3.5 h-3.5" />
              Gemini API 커넥터 활성
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
          <Shield className="w-5 h-5 text-indigo-700" />
          예외 처리 및 무중단 서빙 정책 (기획서 6.0)
        </h3>
        <ul className="text-xs text-slate-600 space-y-2.5 list-disc list-inside">
          <li>
            <strong>섹션별 이슈 미달 시:</strong> 정성 조건을 통과하지 못한 섹션은 무리한 수집을 지양하고 비워둔 채 통과된 이슈만 수집 및 발행.
          </li>
          <li>
            <strong>AI API 통신 장애 발생 시:</strong> 무인 수집 작업을 즉시 중단하고 시스템 관리자 알림 발송, 기존 DB 데이터 및 라이브 화면 안전 유지.
          </li>
          <li>
            <strong>데이터 주입 검증(Injection Mode):</strong> 외부 프롬프트 테스트 결과 JSON을 라이브 변경 없이 사전 시뮬레이션 지원.
          </li>
        </ul>
      </div>
    </div>
  );
};
