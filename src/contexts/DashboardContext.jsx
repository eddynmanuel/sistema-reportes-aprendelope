import { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react-refresh/only-export-components
export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    dateRange: 'this_month',
    advisor: 'all',
    channel: 'all',
  });

  const value = useMemo(() => ({
    filters,
    updateFilter: (key, val) => {
      setFilters(prev => ({ ...prev, [key]: val }));
    }
  }), [filters]);

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

DashboardProvider.propTypes = {
  children: PropTypes.node.isRequired,
};