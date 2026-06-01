import PropTypes from 'prop-types';
import { TrendingUp, TrendingDown } from 'lucide-react';

// ============================================================
// Paleta de variantes por KPI (RF02)
// Cada variante define el gradiente, el color del ícono
// y el fondo del contenedor del ícono.
// ============================================================
const VARIANT_STYLES = {
  purple:  {
    iconBg:   'bg-[#34155E]/10',
    iconColor: 'text-[#34155E]',
    accent:   '#34155E',
  },
  orange:  {
    iconBg:   'bg-[#EE531F]/10',
    iconColor: 'text-[#EE531F]',
    accent:   '#EE531F',
  },
  yellow:  {
    iconBg:   'bg-[#F9A825]/15',
    iconColor: 'text-[#F9A825]',
    accent:   '#F9A825',
  },
  success: {
    iconBg:   'bg-emerald-50',
    iconColor: 'text-emerald-600',
    accent:   '#10B981',
  },
  danger:  {
    iconBg:   'bg-red-50',
    iconColor: 'text-red-500',
    accent:   '#EF4444',
  },
  warning: {
    iconBg:   'bg-amber-50',
    iconColor: 'text-amber-500',
    accent:   '#F59E0B',
  },
  info:    {
    iconBg:   'bg-blue-50',
    iconColor: 'text-blue-500',
    accent:   '#3B82F6',
  },
};

// ============================================================
// KpiCard — Tarjeta individual de indicador clave (RF02)
//
// Props:
//   title        → Nombre del KPI
//   value        → Valor formateado a mostrar
//   unit         → Prefijo/sufijo (ej. "S/", "%")
//   change       → Variación porcentual respecto al período anterior
//   icon         → Componente de ícono Lucide
//   colorVariant → Nombre de la variante de color
//   animDelay    → Delay CSS para animación escalonada (ms)
// ============================================================
const KpiCard = ({
  title,
  value,
  unit,
  change,
  icon: Icon,
  colorVariant = 'purple',
  animDelay    = 0,
}) => {
  const styles = VARIANT_STYLES[colorVariant] ?? VARIANT_STYLES.purple;

  const isPositive = change >= 0;
  const hasChange  = change !== undefined && change !== null;

  return (
    <div
      className="
        bg-white rounded-2xl p-5 border border-gray-100
        shadow-card hover:shadow-card-hover
        transition-all duration-300 hover:-translate-y-0.5
        animate-fade-up
      "
      style={{ animationDelay: `${animDelay}ms` }}
    >
      {/* ── Encabezado: título + ícono ── */}
      <div className="flex items-start justify-between mb-4">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider leading-tight pr-2">
          {title}
        </p>
        {Icon && (
          <div className={`w-9 h-9 rounded-xl ${styles.iconBg} flex items-center justify-center shrink-0`}>
            <Icon className={`w-5 h-5 ${styles.iconColor}`} />
          </div>
        )}
      </div>

      {/* ── Valor principal ── */}
      <div className="mb-3">
        <div className="flex items-baseline gap-1">
          {unit && (
            <span className="text-sm font-semibold text-gray-400">{unit}</span>
          )}
          <span className="text-3xl font-black text-gray-900 leading-none tracking-tight">
            {value}
          </span>
        </div>
      </div>

      {/* ── Badge de variación ── */}
      {hasChange ? (
        <div
          className={`
            inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold
            ${isPositive
              ? 'bg-emerald-50 text-emerald-600'
              : 'bg-red-50 text-red-500'
            }
          `}
        >
          {isPositive
            ? <TrendingUp  className="w-3 h-3" />
            : <TrendingDown className="w-3 h-3" />
          }
          {isPositive ? '+' : ''}{change}% vs. anterior
        </div>
      ) : (
        <p className="text-xs text-gray-400 font-medium">Sin variación registrada</p>
      )}

      {/* ── Línea de acento inferior ── */}
      <div
        className="mt-4 h-0.5 rounded-full opacity-30"
        style={{ backgroundColor: styles.accent }}
      />
    </div>
  );
};

KpiCard.propTypes = {
  title:        PropTypes.string.isRequired,
  value:        PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  unit:         PropTypes.string,
  change:       PropTypes.number,
  icon:         PropTypes.elementType,
  colorVariant: PropTypes.oneOf(['purple', 'orange', 'yellow', 'success', 'danger', 'warning', 'info']),
  animDelay:    PropTypes.number,
};

export default KpiCard;