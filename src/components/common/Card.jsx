import PropTypes from 'prop-types';

// ============================================================
// Card — Componente de tarjeta base reutilizable
//
// Variantes:
//   default  → sombra sutil, borde gris claro
//   elevated → sombra pronunciada (para gráficos/secciones)
//   flat     → sin sombra, solo borde
// ============================================================
const Card = ({ children, className = '', variant = 'default' }) => {
  const variantStyles = {
    default:  'bg-white shadow-card border border-gray-100 hover:shadow-card-hover',
    elevated: 'bg-white shadow-elevated border border-gray-100',
    flat:     'bg-white border border-gray-200',
  };

  return (
    <div
      className={`
        rounded-2xl p-6 transition-shadow duration-300
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children:  PropTypes.node.isRequired,
  className: PropTypes.string,
  variant:   PropTypes.oneOf(['default', 'elevated', 'flat']),
};

export default Card;