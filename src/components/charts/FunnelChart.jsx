import Card from '../common/Card';
import { MOCK_FUNNEL_DATA } from '../../constants/dashboardConfig';

const FunnelChart = () => {
  // Map color variant for each stage
  const colors = [
    'bg-[#34155E]', // Primary Purple
    'bg-[#EE531F]', // Orange
    'bg-[#F9A825]', // Yellow
    'bg-red-500',   // Red/Danger
  ];

  return (
    <Card className="h-[400px] flex flex-col">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-800">Embudo de Conversión</h3>
        <p className="text-xs text-gray-400">Efectividad del proceso comercial actual</p>
      </div>
      <div className="flex-1 flex flex-col justify-center space-y-4">
        {MOCK_FUNNEL_DATA.map((stage, index) => {
          const barColor = colors[index] || 'bg-gray-500';
          return (
            <div key={stage.label} className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-gray-600 px-1">
                <span>{stage.label}</span>
                <span className="text-gray-400">{stage.count} ({stage.percentage}%)</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-7 overflow-hidden relative shadow-inner">
                <div 
                  className={`${barColor} h-full rounded-full transition-all duration-1000 flex items-center pl-4 animate-fill-bar`}
                  style={{ width: `${stage.percentage}%` }}
                >
                  <span className="text-[10px] text-white font-bold tracking-wider uppercase opacity-90">Etapa 0{index + 1}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default FunnelChart;