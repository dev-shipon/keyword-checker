import React from 'react';
import KeywordCard from './KeywordCard';

const CategoryGroup = ({ title, items }) => {
  const usedCount = items.filter(i => i.isFound).length;
  const totalCount = items.length;
  const missingCount = totalCount - usedCount;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em]">
          {title}
        </h3>
        <div className="flex gap-3">
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
            {usedCount} Used
          </span>
          {missingCount > 0 && (
            <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100">
              {missingCount} Missing
            </span>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
        {items.map((item, idx) => (
          <KeywordCard key={`${item.text}-${idx}`} text={item.text} isFound={item.isFound} />
        ))}
      </div>
    </div>
  );
};

export default CategoryGroup;
