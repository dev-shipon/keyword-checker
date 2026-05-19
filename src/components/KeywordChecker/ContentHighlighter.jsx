import React, { useState, useMemo } from 'react';
import { Sparkles, Eye, Filter, Check } from 'lucide-react';

const getCategoryStyle = (categoryName) => {
  const name = categoryName.toLowerCase();
  if (name.includes('seed')) {
    return {
      bg: 'bg-indigo-50 border-indigo-200 text-indigo-900 hover:bg-indigo-100/80',
      badge: 'bg-indigo-600 text-white',
      label: 'Seed',
      dot: 'bg-indigo-600',
      border: 'border-indigo-300'
    };
  }
  if (name.includes('focus')) {
    return {
      bg: 'bg-cyan-50 border-cyan-200 text-cyan-900 hover:bg-cyan-100/80',
      badge: 'bg-cyan-600 text-white',
      label: 'Focus',
      dot: 'bg-cyan-600',
      border: 'border-cyan-300'
    };
  }
  if (name.includes('lsi')) {
    return {
      bg: 'bg-emerald-50 border-emerald-200 text-emerald-900 hover:bg-emerald-100/80',
      badge: 'bg-emerald-600 text-white',
      label: 'LSI',
      dot: 'bg-emerald-600',
      border: 'border-emerald-300'
    };
  }
  if (name.includes('entity') || name.includes('entities')) {
    return {
      bg: 'bg-amber-50 border-amber-200 text-amber-900 hover:bg-amber-100/80',
      badge: 'bg-amber-600 text-white',
      label: 'Entity',
      dot: 'bg-amber-600',
      border: 'border-amber-300'
    };
  }
  if (name.includes('info') || name.includes('informational')) {
    return {
      bg: 'bg-rose-50 border-rose-200 text-rose-900 hover:bg-rose-100/80',
      badge: 'bg-rose-600 text-white',
      label: 'Info',
      dot: 'bg-rose-600',
      border: 'border-rose-300'
    };
  }
  // Default fallback
  return {
    bg: 'bg-sky-50 border-sky-200 text-sky-900 hover:bg-sky-100/80',
    badge: 'bg-sky-600 text-white',
    label: categoryName,
    dot: 'bg-sky-600',
    border: 'border-sky-300'
  };
};

const ContentHighlighter = ({ results, content }) => {
  const [activeFilters, setActiveFilters] = useState({});

  // Get all unique categories
  const categories = useMemo(() => {
    if (!results) return [];
    return Object.keys(results);
  }, [results]);

  // Set initial filters to true for all categories if not set
  useMemo(() => {
    const filters = { ...activeFilters };
    let updated = false;
    categories.forEach(cat => {
      if (filters[cat] === undefined) {
        filters[cat] = true;
        updated = true;
      }
    });
    if (updated) {
      setActiveFilters(filters);
    }
  }, [categories]);

  // Flatten and filter only successfully matched keywords
  const foundKeywords = useMemo(() => {
    if (!results) return [];
    return Object.entries(results)
      .flatMap(([category, items]) => 
        items
          .filter(item => item.isFound)
          .map(item => ({ ...item, category }))
      )
      .sort((a, b) => b.text.length - a.text.length); // Sort descending to match longer phrases first
  }, [results]);

  // Toggle category filter
  const toggleFilter = (category) => {
    setActiveFilters(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Generate highlighted JSX elements
  const highlightedContent = useMemo(() => {
    if (!content) return null;
    
    // Filter active found keywords
    const activeKeywords = foundKeywords.filter(k => activeFilters[k.category]);
    
    if (activeKeywords.length === 0) {
      return <p className="whitespace-pre-wrap text-slate-600 leading-relaxed text-sm md:text-base">{content}</p>;
    }

    // Escape regex characters in keywords and join them with alternation
    const escaped = activeKeywords.map(k => k.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    
    // Regexp using Unicode property escapes to find keywords with strict boundaries
    const regex = new RegExp(`(?<![\\p{L}\\p{N}_])(${escaped.join('|')})(?![\\p{L}\\p{N}_])`, 'gui');

    // Split text by regex (capturing group keeps the matched terms in the array)
    const parts = content.split(regex);

    return (
      <p className="whitespace-pre-wrap text-slate-700 leading-relaxed text-sm md:text-base tracking-normal">
        {parts.map((part, index) => {
          // Even indexes are non-matched plain text
          if (index % 2 === 0) {
            return part;
          }

          // Odd indexes are matched keywords
          const matchedText = part;
          const lowerMatched = matchedText.toLowerCase();
          
          // Find matching keyword info case-insensitively
          const keywordInfo = activeKeywords.find(k => k.text.toLowerCase() === lowerMatched);
          
          if (!keywordInfo) {
            return matchedText; // Fallback
          }

          const style = getCategoryStyle(keywordInfo.category);

          return (
            <span
              key={index}
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 mx-0.5 rounded-lg border font-medium text-xs md:text-sm transition-all duration-200 cursor-default select-none ${style.bg} ${style.border}`}
              title={`${style.label} Keyword`}
            >
              {matchedText}
              <span className={`px-1 py-0.25 text-[8px] font-black tracking-widest uppercase rounded ${style.badge}`}>
                {style.label}
              </span>
            </span>
          );
        })}
      </p>
    );
  }, [content, foundKeywords, activeFilters]);

  if (!content || !results || foundKeywords.length === 0) {
    return null;
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200 shadow-sm space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 border border-indigo-100">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-800 tracking-tight">
              Interactive Content Visualizer
            </h3>
            <p className="text-xs text-slate-400 font-medium">
              Hover over highlighted words to see their specific categories
            </p>
          </div>
        </div>

        {/* Legend / Filter Controls */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mr-1">
            <Filter className="w-3 h-3" /> Filter Categories:
          </span>
          {categories.map(category => {
            const style = getCategoryStyle(category);
            const isActive = !!activeFilters[category];
            
            return (
              <button
                key={category}
                onClick={() => toggleFilter(category)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-[11px] font-bold transition-all duration-300 ${
                  isActive 
                    ? `${style.bg} ${style.border}` 
                    : 'bg-slate-50 border-slate-200 text-slate-400 hover:bg-slate-100 hover:text-slate-500'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${style.dot} ${!isActive && 'bg-slate-300'}`} />
                {style.label}
                {isActive && <Check className="w-3 h-3 stroke-[3px]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Highlighter Box */}
      <div className="p-6 md:p-8 bg-slate-50/50 rounded-2xl border border-slate-100 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
        <div className="flex items-center gap-2 mb-4 text-slate-400">
          <Eye className="w-4 h-4" />
          <span className="text-[10px] font-black uppercase tracking-widest">
            Visualizer Output
          </span>
        </div>
        <div className="min-w-0 font-normal leading-relaxed selection:bg-indigo-200/50">
          {highlightedContent}
        </div>
      </div>
    </div>
  );
};

export default ContentHighlighter;
