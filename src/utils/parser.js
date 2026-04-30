export const parseCategorizedKeywords = (text) => {
  const lines = text.trim().split('\n');
  if (lines.length === 0) return [];

  const firstLineCells = lines[0].split('\t');
  let keywordMap = [];

  if (lines.length === 1) {
    return firstLineCells.map(k => ({ category: 'Keyword', text: k.trim() })).filter(k => k.text);
  }

  lines.forEach((line, rowIndex) => {
    const cells = line.split('\t');
    cells.forEach((cell, colIndex) => {
      const value = cell.trim();
      if (!value) return;

      // Skip common headers if they appear as values in the first row
      if (rowIndex === 0 && (value.toLowerCase().includes('keyword') || value.toLowerCase().includes('entity') || value.toLowerCase().includes('remark'))) {
        return;
      }

      let category = firstLineCells[colIndex] ? firstLineCells[colIndex].trim() : `Column ${colIndex + 1}`;
      // Skip remark columns
      if (category.toLowerCase().includes('remark')) return;

      keywordMap.push({ category: category, text: value });
    });
  });

  return keywordMap;
};

export const checkKeywordUsage = (keywordData, content) => {
  const groups = {};
  let totalUsed = 0;
  let totalMissing = 0;

  keywordData.forEach(item => {
    if (!groups[item.category]) groups[item.category] = [];
    
    const escapedKeyword = item.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escapedKeyword}\\b`, 'gi');
    const isFound = regex.test(content);
    
    const newItem = { ...item, isFound };
    groups[item.category].push(newItem);
    
    if (isFound) totalUsed++;
    else totalMissing++;
  });

  return { groups, totalUsed, totalMissing };
};
