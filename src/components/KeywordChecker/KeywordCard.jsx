import React from 'react';
import { motion } from 'framer-motion';

const KeywordCard = ({ text, isFound }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -2 }}
      className={`
        px-4 py-3.5 rounded-2xl border flex justify-between items-center transition-all duration-300 group
        ${isFound 
          ? 'bg-white border-emerald-100 text-slate-700 shadow-[0_4px_20px_-10px_rgba(16,185,129,0.15)] hover:border-emerald-200' 
          : 'bg-rose-50/30 border-rose-100 text-rose-700 shadow-[0_4px_20px_-10px_rgba(244,63,94,0.1)] hover:border-rose-200'}
      `}
    >
      <div className="flex flex-col">
        <span className={`text-[14px] font-bold tracking-tight ${isFound ? 'text-slate-800' : 'text-rose-700'}`}>
          {text}
        </span>
        <span className={`text-[9px] font-black uppercase tracking-wider ${isFound ? 'text-emerald-500' : 'text-rose-500'}`}>
          {isFound ? 'Optimized' : 'Missing'}
        </span>
      </div>
      
      <div className={`
        w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300
        ${isFound 
          ? 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white' 
          : 'bg-rose-100 text-rose-600 group-hover:bg-rose-500 group-hover:text-white'}
      `}>
        <span className="text-[10px] font-black">{isFound ? '✓' : '✕'}</span>
      </div>
    </motion.div>
  );
};

export default KeywordCard;
