import PropTypes from 'prop-types';
import { RefreshCw } from 'lucide-react';

// ============================================================
// SummarySection — Banner de resumen ejecutivo (RF04)
// Muestra una descripción del período y chips de métricas clave.
// ============================================================
const SummarySection = ({ text, metrics = [] }) => {
  // Hora de última actualización (simulada)
  const lastUpdated = new Date().toLocaleTimeString('es-PE', {
    hour:   '2-digit',
    minute: '2-digit',
  });

  return (
    <div
      className="
        flex flex-col sm:flex-row sm:items-center gap-4
        bg-white border-l-4 border-[#EE531F]
        px-5 py-4 rounded-r-2xl mb-7
        shadow-card
      "
      style={{ animation: 'fade-up 0.4s 50ms ease both' }}
    >
      {/* Texto descriptivo */}
      <div className="flex-1">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
          Resumen Ejecutivo
        </p>
        <p className="text-sm font-medium text-gray-700 leading-snug">
          {text || 'Visualizando el estado actual de los canales digitales y rendimiento comercial.'}
        </p>
      </div>

      {/* Chips de métricas rápidas */}
      {metrics.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {metrics.map((m) => (
            <span
              key={m.label}
              className="
                inline-flex items-center gap-1.5 px-3 py-1.5
                bg-gray-50 border border-gray-100
                rounded-xl text-xs font-semibold text-gray-600
              "
            >
              <span style={{ color: m.color }}>●</span>
              {m.label}:&nbsp;
              <strong className="text-gray-900">{m.value}</strong>
            </span>
          ))}
        </div>
      )}

      {/* Última actualización */}
      <div className="flex items-center gap-1.5 text-gray-400 text-xs flex-shrink-0">
        <RefreshCw className="w-3 h-3" />
        <span>Actualizado: <strong className="text-gray-500">{lastUpdated}</strong></span>
      </div>
    </div>
  );
};

SummarySection.propTypes = {
  text:    PropTypes.string,
  metrics: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      color: PropTypes.string,
    })
  ),
};

export default SummarySection;