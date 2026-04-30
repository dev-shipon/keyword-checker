import React from 'react';
import { FileText, Key, RotateCcw, Zap, ClipboardPaste, Trash2 } from 'lucide-react';

const InputSection = ({ 
  keywordsRaw, 
  setKeywordsRaw, 
  content, 
  setContent, 
  handleCheck, 
  handleClear 
}) => {
  
  const insertSample = () => {
    setKeywordsRaw("Seed Keyword	Focus Keywords	LSI Keywords\nSEO Tips	Keyword Research	Search Engine Optimization, Meta Tags, Backlinks");
    setContent("Keyword research is the first step of Search Engine Optimization. You should focus on meta tags and building high-quality backlinks to rank higher.");
  };

  const clearContentOnly = () => {
    setContent('');
  };

  return (
    <div className="space-y-8">
      {/* Keyword Input */}
      <div className="space-y-3 group">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] group-focus-within:text-indigo-500 transition-colors">
            <Key className="w-3.5 h-3.5" />
            1. Keywords (Tab/Excel)
          </label>
          <button 
            onClick={insertSample}
            className="text-[10px] text-indigo-500 font-bold hover:underline"
          >
            Load Sample Data
          </button>
        </div>
        <textarea
          value={keywordsRaw}
          onChange={(e) => setKeywordsRaw(e.target.value)}
          className="w-full h-40 p-5 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-300 outline-none font-mono text-[13px] transition-all duration-300 resize-none shadow-sm placeholder:text-slate-300"
          placeholder="Paste keywords from Excel or Google Sheets..."
        />
      </div>

      {/* Content Input */}
      <div className="space-y-3 group">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] group-focus-within:text-indigo-500 transition-colors">
            <FileText className="w-3.5 h-3.5" />
            2. Analysis Content
          </label>
          {content && (
            <button 
              onClick={clearContentOnly}
              className="text-[10px] text-rose-500 font-bold flex items-center gap-1 hover:text-rose-600"
            >
              <Trash2 className="w-3 h-3" />
              Clear Content
            </button>
          )}
        </div>
        <div className="relative">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-[360px] p-5 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-300 outline-none transition-all duration-300 resize-none shadow-sm placeholder:text-slate-300 leading-relaxed"
            placeholder="Paste your content here. We will analyze it instantly..."
          />
          {!content && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
              <ClipboardPaste className="w-12 h-12 text-slate-400" />
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={handleCheck}
          className="flex-[4] bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-5 rounded-2xl shadow-xl shadow-indigo-100 transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-3 text-sm uppercase tracking-widest"
        >
          <Zap className="w-4 h-4 fill-current" />
          Analyze Now
        </button>
        <button
          onClick={handleClear}
          className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-400 hover:text-rose-500 hover:border-rose-100 transition-all duration-300 flex items-center justify-center rounded-2xl group"
          title="Reset All"
        >
          <RotateCcw className="w-5 h-5 group-hover:rotate-[-45deg] transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default InputSection;
