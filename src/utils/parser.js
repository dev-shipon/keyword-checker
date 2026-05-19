export const parseCategorizedKeywords = (text) => {
  const lines = text.trim().split('\n');
  if (lines.length === 0) return [];

  const firstLineCells = lines[0].split('\t');
  let keywordMap = [];

  if (lines.length === 1) {
    // Single line - split by tab and treat as simple keywords under 'Keyword'
    return firstLineCells
      .flatMap(k => k.split(',').map(subVal => subVal.trim()))
      .filter(Boolean)
      .map(text => ({ category: 'Keyword', text }));
  }

  lines.forEach((line, rowIndex) => {
    // Skip the header row entirely from being added as keywords
    if (rowIndex === 0) return;

    const cells = line.split('\t');
    cells.forEach((cell, colIndex) => {
      const value = cell.trim();
      if (!value) return;

      const category = firstLineCells[colIndex] ? firstLineCells[colIndex].trim() : `Column ${colIndex + 1}`;
      // Skip remark columns
      if (category.toLowerCase().includes('remark')) return;

      // Split by comma if the cell has comma-separated keywords (e.g. "Meta Tags, Backlinks")
      const subValues = value.split(',').map(v => v.trim()).filter(Boolean);
      subValues.forEach(subVal => {
        keywordMap.push({ category: category, text: subVal });
      });
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
    // Using Unicode property escapes for accurate word boundaries across all languages (like English & Bengali)
    // (?<![\p{L}\p{N}_]) matches when NOT preceded by any letter, number, or underscore
    // (?![\p{L}\p{N}_]) matches when NOT followed by any letter, number, or underscore
    const regex = new RegExp(`(?<![\\p{L}\\p{N}_])${escapedKeyword}(?![\\p{L}\\p{N}_])`, 'ui');
    const isFound = regex.test(content);
    
    const newItem = { ...item, isFound };
    groups[item.category].push(newItem);
    
    if (isFound) totalUsed++;
    else totalMissing++;
  });

  return { groups, totalUsed, totalMissing };
};

