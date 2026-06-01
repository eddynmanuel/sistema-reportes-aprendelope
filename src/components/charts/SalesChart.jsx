import PropTypes from 'prop-types';
import Card from '../common/Card';
import { Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Bar, ComposedChart, Legend } from 'recharts';
import { MOCK_SALES_DATA, BRAND_COLORS } from '../../constants/dashboardConfig';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white/95 backdrop-blur-md border border-gray-100 p-4 rounded-xl shadow-elevated">
        <p className="text-xs font-bold text-gray-500 mb-2">{label}</p>
        {payload.map((item) => (
          <div key={item.name} className="flex items-center gap-2 text-xs font-semibold py-0.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-gray-600">{item.name}:</span>
            <span className="text-gray-900">
              {item.name === 'Monto' ? `S/ ${item.value.toLocaleString()}` : item.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
    })
  ),
  label: PropTypes.string,
};

const SalesChart = () => {
  return (
    <Card className="h-[400px] flex flex-col">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-800">Evolución de Ventas</h3>
        <p className="text-xs text-gray-400">Relación entre el monto total (S/) y volumen de cierres</p>
      </div>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={MOCK_SALES_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
            <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} tickLine={false} />
            <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" height={36} iconType="circle" />
            {/* Área morada para el monto */}
            <Area
              type="monotone"
              dataKey="monto"
              name="Monto"
              fill={BRAND_COLORS.PRIMARY}
              fillOpacity={0.1}
              stroke={BRAND_COLORS.PRIMARY}
              strokeWidth={2.5}
            />
            {/* Barras naranjas para la cantidad de ventas */}
            <Bar
              dataKey="ventas"
              name="Ventas"
              barSize={20}
              fill={BRAND_COLORS.ORANGE}
              radius={[4, 4, 0, 0]}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default SalesChart;