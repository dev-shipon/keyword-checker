import React, { useState } from 'react';
import CategoryGroup from './CategoryGroup';
import DataPreview from './DataPreview';
import { Download, LayoutDashboard, Search, Eye, EyeOff, BarChart3, Copy, CheckCheck } from 'lucide-react';
import { generatePDFReport } from '@/utils/pdfExport';

const Dashboard = ({ results, stats }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!results) {
    return (
      <div className="bg-slate-50/50 p-16 rounded-[2rem] border-2 border-dashed border-slate-200 h-full flex flex-col items-center justify-center text-center space-y-5">
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100">
          <Search className="w-8 h-8 text-slate-200" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-600">Analyze Content</h3>
          <p className="text-slate-400 text-sm max-w-[240px] mx-auto mt-1 leading-relaxed">
            Your results will appear here in real-time as you paste content.
          </p>
        </div>
      </div>
    );
  }

  const score = Math.round((stats.totalUsed / (stats.totalUsed + stats.totalMissing)) * 100) || 0;

  const copyMissing = () => {
    const missing = Object.values(results)
      .flat()
      .filter(i => !i.isFound)
      .map(i => i.text)
      .join(', ');
    
    navigator.clipboard.writeText(missing);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm space-y-10 min-h-[600px]">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-slate-100">
        <div className="flex items-center gap-4">
          <div className="relative">
            <svg className="w-16 h-16 transform -rotate-90">
              <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-slate-100" />
              <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="transparent" 
                strokeDasharray={175.9} 
                strokeDashoffset={175.9 - (175.9 * score) / 100}
                className="text-indigo-600 transition-all duration-1000 ease-out" />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-black text-slate-700">{score}%</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Optimization Score</h2>
            <p className="text-xs text-slate-400 font-medium">Based on {stats.totalUsed + stats.totalMissing} keywords</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button 
            onClick={copyMissing}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all duration-300 ${copied ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'}`}
          >
            {copied ? <CheckCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied!' : 'Copy Missing'}
          </button>
          
          <button 
            onClick={() => setShowPreview(!showPreview)}
            className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-slate-500"
            title="Preview Mapping"
          >
            {showPreview ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {showPreview && <DataPreview results={results} />}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
          <span className="block text-[10px] text-emerald-600 font-black uppercase tracking-wider mb-1">Found</span>
          <span className="text-2xl font-black text-emerald-700">{stats.totalUsed}</span>
        </div>
        <div className="p-4 bg-rose-50/50 rounded-2xl border border-rose-100">
          <span className="block text-[10px] text-rose-600 font-black uppercase tracking-wider mb-1">Missing</span>
          <span className="text-2xl font-black text-rose-700">{stats.totalMissing}</span>
        </div>
      </div>

      {/* Results Grid */}
      <div className="space-y-12">
        {Object.entries(results).map(([category, items]) => (
          <CategoryGroup key={category} title={category} items={items} />
        ))}
      </div>

      {/* Export Action */}
      <div className="pt-8 border-t border-slate-100">
        <button
          onClick={() => generatePDFReport(results, stats)}
          className="w-full flex items-center justify-center gap-3 bg-slate-900 hover:bg-black text-white font-bold py-5 rounded-2xl transition-all duration-300 shadow-xl shadow-slate-200 group active:scale-[0.98]"
        >
          <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          Download Professional Report
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
