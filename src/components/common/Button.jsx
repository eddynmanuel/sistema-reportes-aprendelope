import PropTypes from 'prop-types';

// ============================================================
// Button — Componente de botón reutilizable
//
// Variantes:
//   primary → Naranja de marca (acción principal)
//   ghost   → Transparente con borde (acción secundaria)
//   danger  → Rojo (acciones destructivas)
// ============================================================
const Button = ({
  label,
  onClick,
  type      = 'button',
  variant   = 'primary',
  icon: Icon = null,
  disabled  = false,
  className = '',
}) => {
  const base = `
    inline-flex items-center justify-center gap-2
    px-5 py-2.5 rounded-xl font-semibold text-sm
    transition-all duration-200 select-none
    active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:pointer-events-none
  `;

  const variants = {
    primary: 'bg-[#EE531F] hover:bg-[#d84616] text-white shadow-sm hover:shadow focus:ring-[#EE531F]/50',
    ghost:   'bg-transparent border border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50 focus:ring-gray-300',
    danger:  'bg-red-500 hover:bg-red-600 text-white shadow-sm hover:shadow focus:ring-red-400',
    purple:  'bg-[#34155E] hover:bg-[#270e47] text-white shadow-sm hover:shadow focus:ring-[#34155E]/50',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {Icon && <Icon className="w-4 h-4 shrink-0" />}
      {label}
    </button>
  );
};

Button.propTypes = {
  label:     PropTypes.string.isRequired,
  onClick:   PropTypes.func,
  type:      PropTypes.string,
  variant:   PropTypes.oneOf(['primary', 'ghost', 'danger', 'purple']),
  icon:      PropTypes.elementType,
  disabled:  PropTypes.bool,
  className: PropTypes.string,
};

export default Button;