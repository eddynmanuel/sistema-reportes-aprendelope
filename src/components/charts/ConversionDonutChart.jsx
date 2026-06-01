import PropTypes from 'prop-types';
import Card from '../common/Card';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { MOCK_CONVERSION_DATA } from '../../constants/dashboardConfig';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white/95 backdrop-blur-md border border-gray-100 p-4 rounded-xl shadow-elevated">
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: data.color }} />
          <span className="text-gray-600">{data.name}:</span>
          <span className="text-gray-900 font-bold">{data.value} prospectos</span>
        </div>
      </div>
    );
  }
  return null;
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      payload: PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired,
      }).isRequired,
    })
  ),
};

const ConversionDonutChart = () => {
  return (
    <Card className="h-[400px] flex flex-col">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-800">Distribución de Leads</h3>
        <p className="text-xs text-gray-400">Estado de los prospectos en el periodo actual</p>
      </div>
      <div className="flex-1 w-full min-h-0 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
            <Pie
              data={MOCK_CONVERSION_DATA.map((entry) => ({ ...entry, fill: entry.color }))}
              cx="50%"
              cy="45%"
              innerRadius={60}
              outerRadius={85}
              paddingAngle={5}
              dataKey="value"
            />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Total overlay in center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-9">
          <span className="text-2xl font-black text-gray-800">
            {MOCK_CONVERSION_DATA.reduce((acc, curr) => acc + curr.value, 0)}
          </span>
          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Leads Totales</span>
        </div>
      </div>
    </Card>
  );
};

export default ConversionDonutChart;
