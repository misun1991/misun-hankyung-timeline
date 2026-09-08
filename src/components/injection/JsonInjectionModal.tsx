'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTimelineData } from '../../context/TimelineDataContext';
import { SAMPLE_INJECTION_TEMPLATE } from '../../data/mockData';
import { X, Sparkles, Check, AlertCircle, Copy, FileJson, CheckCircle } from 'lucide-react';

export const JsonInjectionModal: React.FC = () => {
  const router = useRouter();
  const { isInjectionModalOpen, setIsInjectionModalOpen, injectJsonData } = useTimelineData();
  const [jsonInput, setJsonInput] = useState<string>(
    JSON.stringify(SAMPLE_INJECTION_TEMPLATE, null, 2)
  );
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  if (!isInjectionModalOpen) return null;

  const handleApply = () => {
    setValidationError(null);
    try {
      const parsed = JSON.parse(jsonInput);
      if (!parsed.title) {
        setValidationError('❌ "title"(주제명) 필드가 누락되었습니다.');
        return;
      }
      if (!parsed.category) {
        setValidationError('❌ "category"(분야: 경제, 국제, 부동산, 사회, 산업, 문화) 필드가 누락되었습니다.');
        return;
      }

      const result = injectJsonData(parsed);
      if (result.success) {
        setIsInjectionModalOpen(false);
        if (result.clusterId) {
          router.push(`/clusters/${result.clusterId}`);
        }
      } else {
        setValidationError(`❌ 주입 실패: ${result.error}`);
      }
    } catch (err: any) {
      setValidationError(`❌ 유효한 JSON 포맷이 아닙니다: ${err.message}`);
    }
  };

  const handleLoadSample = (sampleType: 'hbm' | 'kim' | 'empty') => {
    setValidationError(null);
    if (sampleType === 'hbm') {
      setJsonInput(JSON.stringify(SAMPLE_INJECTION_TEMPLATE, null, 2));
    } else if (sampleType === 'empty') {
      const emptyTemplate = {
        title: '신규 검증할 뉴스 거시 주제명 (15~25자)',
        category: '경제',
        subCategories: ['금융', '환율'],
        topic_summary:
          '첫 번째 문장으로 이슈의 배경을 설명합니다. 두 번째 문장으로 현재 진행되는 핵심 전개 양상을 서술합니다. 세 번째 문장으로 시장 및 사회에 미치는 파급 효과를 총평합니다.',
        current_status: '현재 주요 당국과 시장 참가자들이 후속 정책 결정을 예의주시하고 있는 국면입니다.',
        audit_status: 'approved',
        status_badge: 'NEW',
        action_mode: 'CREATE',
        similarity_score: 0.9,
        events: [
          {
            date: '2026년 9월 8일',
            headline: '[표제어] 사건의 인과 맥락이 드러나는 핵심 표제어',
            description: '사건의 구체적인 경과 및 팩트를 객관적으로 기술합니다.',
            causal_bridge: '이전 사건과의 시간적 공백 시 인과 관계를 이어주는 브릿지 문장입니다.',
            sources: [
              { name: '한국경제', title: '관련 기사 제목 예시', url: 'https://www.hankyung.com' }
            ]
          }
        ]
      };
      setJsonInput(JSON.stringify(emptyTemplate, null, 2));
    }
  };

  const handleCopyTemplate = () => {
    navigator.clipboard.writeText(jsonInput);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                테스트 JSON 데이터 직접 주입 (Data Injection)
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 font-medium">
                  실시간 검증용
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                외부 프롬프트에서 생성된 최종 JSON 결과를 붙여넣어 화면 렌더링 및 인과 맥락을 즉시 검증합니다.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsInjectionModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="px-6 py-2.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-600">프리셋 템플릿:</span>
            <button
              onClick={() => handleLoadSample('hbm')}
              className="px-2.5 py-1 bg-white border border-slate-300 rounded hover:bg-slate-100 text-slate-700 font-medium cursor-pointer transition-colors"
            >
              HBM4 반도체 공급전 (산업)
            </button>
            <button
              onClick={() => handleLoadSample('empty')}
              className="px-2.5 py-1 bg-white border border-slate-300 rounded hover:bg-slate-100 text-slate-700 font-medium cursor-pointer transition-colors"
            >
              빈 표준 템플릿
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyTemplate}
              className="flex items-center gap-1 px-2.5 py-1 text-slate-600 hover:text-slate-900 cursor-pointer font-medium"
            >
              {isCopied ? <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{isCopied ? '복사됨!' : '클립보드 복사'}</span>
            </button>
          </div>
        </div>

        {/* JSON Editor Box */}
        <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-3">
          {validationError && (
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{validationError}</span>
            </div>
          )}

          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between pb-1.5 text-xs font-semibold text-slate-700">
              <span className="flex items-center gap-1.5">
                <FileJson className="w-4 h-4 text-blue-600" />
                최종 타임라인 결과 JSON 붙여넣기
              </span>
              <span className="text-slate-400 font-normal">
                필수: title, category, topic_summary, current_status, events
              </span>
            </div>
            <textarea
              value={jsonInput}
              onChange={e => {
                setJsonInput(e.target.value);
                if (validationError) setValidationError(null);
              }}
              className="w-full flex-1 min-h-[300px] p-4 font-mono text-xs text-slate-800 bg-slate-900 text-slate-100 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none leading-relaxed"
              placeholder="여기에 JSON 데이터를 붙여넣으세요..."
              spellCheck={false}
            />
          </div>

          <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-100 text-xs text-blue-900 leading-relaxed">
            <p className="font-semibold mb-1 text-blue-950">💡 안내 사항</p>
            <ul className="list-disc list-inside space-y-0.5 text-blue-800">
              <li>적용 즉시 <strong>주제 모아 보기</strong> 및 <strong>2분할 상세 보기</strong>에 반영됩니다.</li>
              <li>데이터는 브라우저의 <strong>LocalStorage</strong>에 자동 보존되어 새로고침 후에도 안전하게 유지됩니다.</li>
              <li>상단 바의 <strong>[기본 데이터 복원]</strong> 버튼을 누르면 언제든지 초기 상태로 되돌릴 수 있습니다.</li>
            </ul>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            onClick={() => setIsInjectionModalOpen(false)}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            취소
          </button>
          <button
            onClick={handleApply}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 shadow-md shadow-blue-600/30 transition-all cursor-pointer active:scale-95"
          >
            <Check className="w-4 h-4" />
            <span>데이터 주입 및 화면에 적용하기</span>
          </button>
        </div>
      </div>
    </div>
  );
};
