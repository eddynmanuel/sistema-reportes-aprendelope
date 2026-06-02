import { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import SummarySection from '../components/dashboard/SummarySection';
import KpiCard from '../components/dashboard/KpiCard';
import SalesChart from '../components/charts/SalesChart';
import MessagesChart from '../components/charts/MessagesChart';
import FunnelChart from '../components/charts/FunnelChart';
import ConversionDonutChart from '../components/charts/ConversionDonutChart';
import Loader from '../components/common/Loader';

import { KPI_CONFIG, BRAND_COLORS } from '../constants/dashboardConfig';
import { fetchKpiData } from '../services/apiService';
import { useDashboard } from '../hooks/useDashboard';

const DashboardPage = () => {
  const { filters } = useDashboard();

  const [kpiValues, setKpiValues] = useState(null);
  const [kpiLoading, setKpiLoading] = useState(true);

  // Carga los KPIs desde el servicio (mock ahora, endpoint real cuando esté disponible)
  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (!cancelled) setKpiLoading(true);
    });

    fetchKpiData(filters)
      .then((data) => {
        if (!cancelled) {
          setKpiValues(data);
          setKpiLoading(false);
        }
      })
      .catch((err) => {
        console.error('Error cargando KPIs:', err);
        if (!cancelled) setKpiLoading(false);
      });

    return () => { cancelled = true; };
  }, [filters]);

  // Métricas resumen para el banner ejecutivo
  const summaryMetrics = kpiValues
    ? [
        { label: 'Ingresos',    value: `S/ ${kpiValues.totalRevenue.value}`,    color: BRAND_COLORS.PRIMARY },
        { label: 'Conversión',  value: `${kpiValues.conversionRate.value}%`,    color: BRAND_COLORS.YELLOW  },
        { label: 'Mensajes',    value: kpiValues.messageMetrics.value,           color: BRAND_COLORS.SUCCESS },
      ]
    : [];

  return (
    <MainLayout>
      {/* Encabezado con filtros */}
      <DashboardHeader />

      {/* Banner de resumen ejecutivo */}
      <SummarySection
        text="Vista general del rendimiento de canales digitales y conversiones comerciales para AprendeLoPE."
        metrics={summaryMetrics}
      />

      {/* Grid de 9 KPIs principal */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5 gap-6 mb-8">
        {kpiLoading
          ? (
            <div className="col-span-full flex items-center justify-center py-12">
              <Loader />
            </div>
          )
          : KPI_CONFIG.map((kpi, idx) => {
              const data = kpiValues?.[kpi.key] ?? { value: '—', change: null };
              return (
                <KpiCard
                  key={kpi.key}
                  title={kpi.title}
                  value={data.value}
                  unit={kpi.unit}
                  change={data.change}
                  icon={kpi.icon}
                  colorVariant={kpi.colorVariant}
                  animDelay={idx * 75}
                />
              );
            })
        }
      </section>

      {/* Grid de gráficos detallados */}
      <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 gap-6">
        <div><SalesChart /></div>
        <div><MessagesChart /></div>
        <div><FunnelChart /></div>
        <div><ConversionDonutChart /></div>
      </section>
    </MainLayout>
  );
};

export default DashboardPage;