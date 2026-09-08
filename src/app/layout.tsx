import type { Metadata } from 'next';
import './globals.css';
import { TimelineDataProvider } from '../context/TimelineDataContext';
import { Header } from '../components/common/Header';
import { JsonInjectionModal } from '../components/injection/JsonInjectionModal';
import { Toast } from '../components/common/Toast';

export const metadata: Metadata = {
  title: '한경 AI이슈 타임라인(가제)',
  description: '단발성 기사 나열을 지양하고 거시적 이슈의 과거 기원부터 최신 경과까지 인과 맥락을 자율 구조화하여 제공하는 뉴스 타임라인 서비스'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white">
        <TimelineDataProvider>
          <Header />
          <div className="flex-1 flex flex-col">{children}</div>
          <JsonInjectionModal />
          <Toast />
        </TimelineDataProvider>
      </body>
    </html>
  );
}
