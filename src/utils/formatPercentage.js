export const formatPercentage = (value) => {
  if (value === undefined || value === null) return '0%';
  return `${value.toFixed(1)}%`;
};