'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTimelineData } from '../../context/TimelineDataContext';
import { Menu, Search, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  const router = useRouter();
  const {
    setActiveCategory,
    setIsInjectionModalOpen,
    setViewMode
  } = useTimelineData();

  const handleLogoClick = () => {
    setActiveCategory('전체');
    setViewMode('grid');
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-2xs">
      {/* Hankyung Common Standard GNB (Height: 60px) */}
      <div className="h-[60px] px-4 sm:px-8 flex items-center justify-between border-b border-gray-200 relative bg-white">
        {/* Left: Menu icon, Search icon, Hankyung text logo */}
        <div className="flex items-center gap-4 sm:gap-5">
          <button
            type="button"
            className="text-slate-800 hover:text-blue-700 p-1 transition-colors cursor-pointer"
            title="전체 메뉴"
          >
            <Menu className="w-5 h-5 stroke-[2.2]" />
          </button>
          <button
            type="button"
            className="text-slate-800 hover:text-blue-700 p-1 transition-colors cursor-pointer"
            title="통합 검색"
          >
            <Search className="w-4.5 h-4.5 stroke-[2.2]" />
          </button>
          <Link
            href="/"
            onClick={handleLogoClick}
            className="text-[1.45rem] font-black text-slate-900 tracking-tighter leading-none hover:text-blue-900 transition-colors"
          >
            한경
          </Link>
        </div>

        {/* Center: Service Title */}
        <div className="absolute left-1/2 -translate-x-1/2 pointer-events-none sm:pointer-events-auto">
          <h1 className="text-[1.25rem] sm:text-[1.5rem] font-extrabold text-slate-900 tracking-tight whitespace-nowrap">
            AI이슈 타임라인
          </h1>
        </div>

        {/* Right: Hankyung common links + JSON Data Injection tool */}
        <div className="flex items-center gap-2.5 sm:gap-3 text-[0.82rem] text-slate-600 font-medium">
          <a
            href="https://plus.hankyung.com/apps/service.newspaper"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline hover:text-slate-900 transition-colors"
          >
            신문 구독
          </a>
          <span className="hidden md:inline text-slate-300">|</span>
          <a
            href="https://plus.hankyung.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline hover:text-slate-900 transition-colors"
          >
            한경 프리미엄9 구독
          </a>
          <span className="hidden lg:inline text-slate-300">|</span>
          <button
            type="button"
            onClick={() => alert('한경 회원 로그인 연동')}
            className="hidden sm:inline hover:text-slate-900 transition-colors cursor-pointer"
          >
            로그인
          </button>
          <span className="hidden sm:inline text-slate-300">|</span>

          {/* Test JSON Injection Button */}
          <button
            onClick={() => setIsInjectionModalOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-lg border border-blue-200 transition-all cursor-pointer active:scale-95 shadow-2xs"
            title="외부 프롬프트에서 생성된 테스트 JSON 데이터를 화면에 직접 주입"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden xs:inline">테스트 JSON 주입</span>
          </button>
        </div>
      </div>
    </header>
  );
};
