import { useDashboard }     from '../../hooks/useDashboard';
import { DATE_RANGE_OPTIONS } from '../../constants/dashboardConfig';

// ============================================================
// DateFilter — Selector de período (RF03)
// Lee y escribe en DashboardContext mediante useDashboard.
// ============================================================
const DateFilter = () => {
  const { filters, updateFilter } = useDashboard();

  return (
    <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-gray-200 shadow-sm text-sm">
      <span className="text-gray-400 font-medium whitespace-nowrap">Período:</span>
      <select
        id="date-range-select"
        value={filters.dateRange}
        onChange={(e) => updateFilter('dateRange', e.target.value)}
        className="bg-transparent font-semibold text-[#34155E] focus:outline-none cursor-pointer"
      >
        {DATE_RANGE_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DateFilter;