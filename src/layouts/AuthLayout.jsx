import PropTypes from 'prop-types';

// ============================================================
// AuthLayout — Layout de autenticación (RF01)
// Diseño de dos paneles: izquierdo (branding) + derecho (form).
// En pantallas pequeñas muestra solo el panel del formulario.
// ============================================================
const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex font-sans">

      {/* ── Panel Izquierdo: Branding ── */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative overflow-hidden bg-brand-purple flex-col items-center justify-center p-16">

        {/* Orbes decorativos de fondo */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-brand-orange rounded-full opacity-20 blur-[80px] animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-brand-yellow rounded-full opacity-15 blur-[80px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-purple-light rounded-full opacity-30 blur-[100px]" />

        {/* Contenido de marca */}
        <div className="relative z-10 text-center max-w-md">
          {/* Logo */}
          <div className="w-28 h-28 mx-auto mb-8 bg-white rounded-3xl flex items-center justify-center shadow-2xl overflow-hidden">
            <img src="/logo.svg" alt="AprendeLoPE" className="w-full h-full object-cover" />
          </div>

          <h1 className="text-4xl font-black text-white mb-4 leading-tight">
            Sistema de<br />
            <span className="text-brand-yellow">Reportes</span>
          </h1>

          <p className="text-white/70 text-lg leading-relaxed mb-10">
            Plataforma centralizada de KPIs y métricas para la gestión de canales digitales.
          </p>

          {/* Feature highlights */}
          <div className="space-y-3 text-left">
            {[
              { icon: '📊', text: 'Dashboard de KPIs en tiempo real' },
              { icon: '🔍', text: 'Filtros dinámicos por canal y asesor' },
              { icon: '📈', text: 'Reportes de conversión y ventas' },
              { icon: '🔒', text: 'Acceso seguro vía Slack' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3 text-white/80">
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer de la marca */}
        <p className="absolute bottom-6 text-white/30 text-xs font-medium tracking-widest uppercase">
          AprendeLoPE © 2026
        </p>
      </div>

      {/* ── Panel Derecho: Formulario ── */}
      <div className="flex-1 flex items-center justify-center bg-surface-alt p-8 relative overflow-hidden">
        {/* Orbe decorativo sutil */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-purple rounded-full opacity-5 blur-[60px]" />

        {/* Card del formulario */}
        <div
          className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-[0_20px_60px_-10px_rgba(52,21,94,0.15)] border border-gray-100 p-10"
          style={{ animation: 'fade-up 0.5s ease both' }}
        >
          {/* Logo mobile (visible solo en pantallas pequeñas) */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-brand-purple flex items-center justify-center">
              <img src="/logo.svg" alt="AprendeLoPE" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-brand-purple text-lg">AprendeLoPE</span>
          </div>

          {children}
        </div>
      </div>

    </div>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthLayout;