import MainLayout from '../layouts/MainLayout';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import SummarySection from '../components/dashboard/SummarySection';
import KpiCard from '../components/dashboard/KpiCard';
import SalesChart from '../components/charts/SalesChart';
import MessagesChart from '../components/charts/MessagesChart';
import FunnelChart from '../components/charts/FunnelChart';
import ConversionDonutChart from '../components/charts/ConversionDonutChart';

import { KPI_CONFIG, MOCK_KPI_VALUES, BRAND_COLORS } from '../constants/dashboardConfig';

const DashboardPage = () => {
  // Construct metrics for the SummarySection component dynamically
  const summaryMetrics = [
    { label: 'Ingresos', value: `S/ ${MOCK_KPI_VALUES.totalRevenue.value}`, color: BRAND_COLORS.PRIMARY },
    { label: 'Conversión', value: `${MOCK_KPI_VALUES.conversionRate.value}%`, color: BRAND_COLORS.YELLOW },
    { label: 'Mensajes', value: MOCK_KPI_VALUES.messageMetrics.value, color: BRAND_COLORS.SUCCESS },
  ];

  return (
    <MainLayout>
      {/* Encabezado con filtros */}
      <DashboardHeader />
      
      {/* Banner de resumen ejecutivo con métricas rápidas */}
      <SummarySection 
        text="Vista general del rendimiento de canales digitales y conversiones comerciales para AprendeLoPE." 
        metrics={summaryMetrics}
      />
      
      {/* Grid de 9 KPIs principal */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5 gap-6 mb-8">
        {KPI_CONFIG.map((kpi, idx) => {
          const mockData = MOCK_KPI_VALUES[kpi.key] || { value: '0', change: null };
          return (
            <KpiCard
              key={kpi.key}
              title={kpi.title}
              value={mockData.value}
              unit={kpi.unit}
              change={mockData.change}
              icon={kpi.icon}
              colorVariant={kpi.colorVariant}
              animDelay={idx * 75}
            />
          );
        })}
      </section>

      {/* Grid de reportes gráficos detallados */}
      <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 gap-6">
        <div>
          <SalesChart />
        </div>
        <div>
          <MessagesChart />
        </div>
        <div>
          <FunnelChart />
        </div>
        <div>
          <ConversionDonutChart />
        </div>
      </section>
    </MainLayout>
  );
};

export default DashboardPage;