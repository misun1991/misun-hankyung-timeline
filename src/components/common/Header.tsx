'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTimelineData } from '../../context/TimelineDataContext';
import { CategoryType } from '../../types/timeline';
import { Menu, Search, Sparkles } from 'lucide-react';

const CATEGORIES: CategoryType[] = [
  '전체',
  '정치',
  '경제',
  '산업',
  '증권',
  '부동산',
  'IT/테크',
  '국제',
  '사회',
  '문화'
];

export const Header: React.FC = () => {
  const router = useRouter();
  const {
    activeCategory,
    setActiveCategory,
    setIsInjectionModalOpen,
    setViewMode,
    selectedClusterId
  } = useTimelineData();

  const handleLogoClick = () => {
    setActiveCategory('전체');
    setViewMode('grid');
    router.push('/');
  };

  const handleSelectCategory = (cat: CategoryType) => {
    setActiveCategory(cat);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-2xs">
      {/* 1. Hankyung Common Standard GNB (Height: 60px) */}
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

      {/* 2. Hankyung Common Category Subnav (GNB 직하단 카테고리 탭) */}
      <nav className="bg-white border-b border-gray-200 px-4 sm:px-8">
        <div className="flex items-center justify-start md:justify-center gap-6 sm:gap-7 overflow-x-auto py-2.5 scrollbar-none">
          {CATEGORIES.map(cat => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleSelectCategory(cat)}
                className={`text-[0.93rem] sm:text-[0.95rem] transition-all relative py-1 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'text-blue-600 font-bold after:content-[""] after:absolute after:bottom-[-10px] after:left-0 after:right-0 after:h-[2px] after:bg-blue-600'
                    : 'text-slate-700 font-medium hover:text-blue-600'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
};
