export const calculateConversionRate = (interested, sales) => {
  if (!interested || interested === 0) return "0.00"; // Antes devolvía 0 (número), ahora "0.00" (string) igual que el toFixed
  return ((sales / interested) * 100).toFixed(2);
};

export const calculateGrowth = (currentValue, previousValue) => {
  if (!previousValue) return "0.0"; // Consistencia de tipo
  return (((currentValue - previousValue) / previousValue) * 100).toFixed(1);
};