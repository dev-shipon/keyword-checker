import React from 'react';
import { Table } from 'lucide-react';

const DataPreview = ({ results }) => {
  if (!results) return null;

  return (
    <div className="p-6 bg-slate-50/50 rounded-2xl border border-slate-100">
      <div className="flex items-center gap-2 mb-4">
        <Table className="w-4 h-4 text-slate-400" />
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          Mapping Preview
        </h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[11px] border-collapse">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="py-2 pr-4 font-bold text-slate-500 uppercase">Category</th>
              <th className="py-2 font-bold text-slate-500 uppercase">Keywords</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {Object.entries(results).map(([category, items]) => (
              <tr key={category}>
                <td className="py-3 pr-4 font-semibold text-indigo-600 align-top whitespace-nowrap">{category}</td>
                <td className="py-3 text-slate-500 leading-relaxed italic">
                  {items.map(i => i.text).join(', ')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataPreview;
