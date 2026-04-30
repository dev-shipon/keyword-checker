import { useState, useCallback, useEffect } from 'react';
import { parseCategorizedKeywords, checkKeywordUsage } from '../utils/parser';

export const useKeywordChecker = () => {
  const [keywordsRaw, setKeywordsRaw] = useState('');
  const [content, setContent] = useState('');
  const [results, setResults] = useState(null);
  const [stats, setStats] = useState({ totalUsed: 0, totalMissing: 0 });

  const handleCheck = useCallback(() => {
    if (!keywordsRaw.trim()) return;

    const keywordData = parseCategorizedKeywords(keywordsRaw);
    const { groups, totalUsed, totalMissing } = checkKeywordUsage(keywordData, content);

    setResults(groups);
    setStats({ totalUsed, totalMissing });
  }, [keywordsRaw, content]);

  const handleClear = useCallback(() => {
    setKeywordsRaw('');
    setContent('');
    setResults(null);
    setStats({ totalUsed: 0, totalMissing: 0 });
  }, []);

  // Auto-check with debounce
  useEffect(() => {
    if (!keywordsRaw.trim()) return;
    
    const timeout = setTimeout(() => {
      handleCheck();
    }, 800);

    return () => clearTimeout(timeout);
  }, [content, keywordsRaw, handleCheck]);

  return {
    keywordsRaw,
    setKeywordsRaw,
    content,
    setContent,
    results,
    stats,
    handleCheck,
    handleClear
  };
};
