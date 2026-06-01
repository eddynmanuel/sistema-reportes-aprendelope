import { RotateCcw, SlidersHorizontal } from 'lucide-react';
import AdvisorFilter from '../filters/AdvisorFilter';
import ChannelFilter from '../filters/ChannelFilter';
import DateFilter    from '../filters/DateFilter';
import Button        from '../common/Button';
import { useDashboard }         from '../../hooks/useDashboard';
import { DASHBOARD_CONFIG }     from '../../constants/dashboardConfig';

// ============================================================
// DashboardHeader — Encabezado del dashboard con filtros (RF03)
// Conectado al DashboardContext para leer y resetear filtros.
// ============================================================
const DashboardHeader = () => {
  const { filters, updateFilter } = useDashboard();

  const handleResetFilters = () => {
    updateFilter('dateRange', DASHBOARD_CONFIG.DEFAULT_DATE_RANGE);
    updateFilter('advisor',   'all');
    updateFilter('channel',   'all');
  };

  const hasActiveFilters =
    filters.advisor !== 'all' || filters.channel !== 'all';

  return (
    <header className="mb-8" style={{ animation: 'fade-up 0.4s ease both' }}>

      {/* ── Título de sección ── */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            Dashboard General
          </h2>
          <p className="text-sm text-gray-400 mt-0.5 font-medium">
            Indicadores clave de desempeño · Canales digitales
          </p>
        </div>

        {/* Filtro de período (visible en el encabezado) */}
        <DateFilter />
      </div>

      {/* ── Panel de filtros ── */}
      <div className="p-5 bg-white rounded-2xl shadow-card border border-gray-100 flex flex-wrap items-end gap-4">
        <div className="flex items-center gap-2 text-gray-400 mr-1 flex-shrink-0">
          <SlidersHorizontal className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">Filtros</span>
        </div>

        {/* Filtros dinámicos (RF03) */}
        <AdvisorFilter />
        <ChannelFilter />

        {/* Acciones */}
        <div className="flex items-end gap-2 ml-auto flex-shrink-0">
          {hasActiveFilters && (
            <Button
              label="Limpiar"
              variant="ghost"
              icon={RotateCcw}
              onClick={handleResetFilters}
            />
          )}
          <Button
            label="Aplicar filtros"
            variant="primary"
            onClick={() => {
              // TODO: trigger refetch con los filtros actuales del contexto
              console.log('Filtros aplicados:', filters);
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;