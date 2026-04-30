'use client';

import Header from '@/components/KeywordChecker/Header';
import InputSection from '@/components/KeywordChecker/InputSection';
import Dashboard from '@/components/KeywordChecker/Dashboard';
import { useKeywordChecker } from '@/hooks/useKeywordChecker';

export default function KeywordCheckerPage() {
  const {
    keywordsRaw,
    setKeywordsRaw,
    content,
    setContent,
    results,
    stats,
    handleCheck,
    handleClear
  } = useKeywordChecker();

  return (
    <main className="min-h-screen bg-[#fafafa] selection:bg-indigo-100 selection:text-indigo-900">
      <div className="max-w-[1280px] mx-auto px-6 py-12 md:py-20">
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Side: Inputs */}
          <div className="lg:col-span-5 sticky top-10">
            <InputSection 
              keywordsRaw={keywordsRaw}
              setKeywordsRaw={setKeywordsRaw}
              content={content}
              setContent={setContent}
              handleCheck={handleCheck}
              handleClear={handleClear}
            />
          </div>

          {/* Right Side: Results */}
          <div className="lg:col-span-7">
            <Dashboard results={results} stats={stats} />
          </div>
        </div>

        {/* Footer info */}
        <footer className="mt-24 pt-8 border-t border-slate-100 text-center">
          <p className="text-slate-300 text-[11px] font-bold uppercase tracking-[0.3em]">
            © {new Date().getFullYear()} Keyword Usage Checker • Shipon Talukdar
          </p>
        </footer>
      </div>
    </main>
  );
}
