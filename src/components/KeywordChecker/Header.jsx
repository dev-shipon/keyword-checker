import React from 'react';
import { Rocket } from 'lucide-react';

const Header = () => {
  return (
    <header className="mb-12 text-center">
      <div className="inline-flex items-center gap-3 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
        <Rocket className="w-3.5 h-3.5" />
        Shipon Talukdar
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
        Keyword Usage <span className="text-indigo-600">Checker</span>
      </h1>
      <p className="text-slate-500 max-w-xl mx-auto text-base leading-relaxed">
        Analyze your content's keyword optimization with precision.
        Minimalist, fast, and professional reporting.
      </p>
    </header>
  );
};

export default Header;
