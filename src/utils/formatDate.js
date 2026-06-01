export const formatDate = (dateString, format = 'short') => {
  if (!dateString) return 'N/A';
  
  const date = new Date(dateString);
  const options = format === 'short' 
    ? { day: '2-digit', month: 'short' }
    : { year: 'numeric', month: 'long', day: 'numeric' };
    
  return date.toLocaleDateString('es-PE', options);
};