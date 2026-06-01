import { useState, useCallback } from 'react';

export const useFilters = (initialState = {}) => {
  const [filters, setFilters] = useState(initialState);

  const handleFilterChange = useCallback((key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialState);
  }, [initialState]);

  return { filters, handleFilterChange, resetFilters };
};