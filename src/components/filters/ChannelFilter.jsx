import { useDashboard }    from '../../hooks/useDashboard';
import { CHANNEL_OPTIONS } from '../../constants/dashboardConfig';

// ============================================================
// ChannelFilter — Selector de canal digital (RF03)
// Lee y escribe en DashboardContext mediante useDashboard.
// ============================================================
const ChannelFilter = () => {
  const { filters, updateFilter } = useDashboard();

  return (
    <div className="flex flex-col gap-1.5 flex-1">
      <label
        htmlFor="channel-select"
        className="text-xs font-bold text-gray-400 uppercase tracking-wider"
      >
        Canal Digital
      </label>
      <select
        id="channel-select"
        value={filters.channel}
        onChange={(e) => updateFilter('channel', e.target.value)}
        className="
          w-full bg-gray-50 border border-gray-200 rounded-xl
          px-4 py-2.5 text-sm text-gray-700
          focus:ring-2 focus:ring-[#34155E]/30 focus:border-[#34155E] focus:outline-none
          transition-all duration-200 cursor-pointer
        "
      >
        {CHANNEL_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ChannelFilter;