export const formatCurrency = (amount) => {
  if (amount === undefined || amount === null) return 'S/ 0.00';
  
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

// Utilidad extra para números grandes (ej: 12.7k)
export const formatCompactNumber = (number) => {
  return new Intl.NumberFormat('es-PE', {
    notation: "compact",
    compactDisplay: "short"
  }).format(number);
};