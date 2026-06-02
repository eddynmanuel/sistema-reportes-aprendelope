import PropTypes   from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileBarChart2,
  Settings,
  LogOut,
  Bell,
  ChevronRight,
} from 'lucide-react';
import { useAuth }  from '../hooks/useAuth';
import { APP_ROUTES } from '../constants/routes';

// ============================================================
// Configuración de navegación del sidebar
// ============================================================
const NAV_ITEMS = [
  {
    label: 'Dashboard',
    path:  APP_ROUTES.DASHBOARD,
    icon:  LayoutDashboard,
  },
  {
    label: 'Reportes',
    path:  APP_ROUTES.REPORTS,
    icon:  FileBarChart2,
  },
  {
    label: 'Configuración',
    path:  '/configuracion',
    icon:  Settings,
  },
];

// ============================================================
// SidebarNavItem — Ítem de navegación individual
// ============================================================
const SidebarNavItem = ({ item, isActive }) => {
  const Icon = item.icon;

  return (
    <Link
      to={item.path}
      className={`
        group flex items-center gap-3 px-4 py-3 rounded-xl
        font-medium text-sm transition-all duration-200
        ${isActive
          ? 'nav-active text-white'
          : 'text-white/60 hover:text-white hover:bg-white/10'
        }
      `}
    >
      <Icon
        className={`w-5 h-5 shrink-0 transition-transform duration-200
          ${isActive ? 'text-brand-yellow' : 'group-hover:scale-110'}`}
      />
      <span className="flex-1">{item.label}</span>
      {isActive && (
        <ChevronRight className="w-4 h-4 text-brand-orange opacity-70" />
      )}
    </Link>
  );
};

SidebarNavItem.propTypes = {
  item:     PropTypes.shape({ label: PropTypes.string, path: PropTypes.string, icon: PropTypes.elementType }).isRequired,
  isActive: PropTypes.bool.isRequired,
};

// ============================================================
// MainLayout — Layout principal de la aplicación (RF04)
// Sidebar fijo a la izquierda + área de contenido scrollable.
// ============================================================
const MainLayout = ({ children }) => {
  const location = useLocation();
  const { logout, user } = useAuth();

  const currentPage = NAV_ITEMS.find((item) => location.pathname === item.path)?.label ?? 'Dashboard';
  const userName = user?.name || 'Usuario';
  const userAvatar = user?.avatar;

  return (
    <div className="min-h-screen flex bg-surface-alt font-sans">

      {/* ─────────────────────────────
          SIDEBAR
      ───────────────────────────── */}
      <aside className="w-64 h-screen bg-brand-purple flex flex-col shrink-0 sticky top-0 overflow-y-auto">

        {/* Orbe decorativo sutil */}
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-orange rounded-full opacity-10 blur-[60px] pointer-events-none" />

        {/* ── Logo & Nombre ── */}
        <div className="px-6 py-8 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl overflow-hidden bg-white shrink-0 shadow-lg">
              <img src="/logo.svg" alt="AprendeLoPE Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">AprendeLoPE</p>
              <p className="text-white/50 text-xs">Sistema de Reportes</p>
            </div>
          </div>
        </div>

        {/* ── Navegación ── */}
        <nav className="flex-1 px-3 py-6 space-y-1">
          <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest px-4 mb-3">
            Menú Principal
          </p>
          {NAV_ITEMS.map((item) => (
            <SidebarNavItem
              key={item.path}
              item={item}
              isActive={location.pathname === item.path}
            />
          ))}
        </nav>

        {/* ── Slack Status Badge ── */}
        <div className="mx-3 mb-3 px-4 py-3 rounded-xl glass">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <p className="text-white/80 text-xs font-semibold">Slack conectado</p>
          </div>
          <p className="text-white/40 text-[10px] mt-0.5">Autenticación activa · RF01</p>
        </div>

        {/* ── Footer: Usuario + Logout ── */}
        <div className="px-3 py-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer">
            {/* Avatar */}
            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-brand-orange to-brand-yellow flex items-center justify-center shrink-0 overflow-hidden">
              {userAvatar ? (
                <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
              ) : (
                <span className="text-white text-sm font-bold">{userName.charAt(0).toUpperCase()}</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-semibold truncate">{userName}</p>
              <p className="text-white/40 text-[10px] truncate">Administrador</p>
            </div>
            <button
              onClick={logout}
              title="Cerrar sesión"
              className="text-white/30 hover:text-brand-orange transition-colors shrink-0"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ─────────────────────────────
          ÁREA DE CONTENIDO
      ───────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* ── Topbar ── */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-100 px-8 h-16 flex items-center justify-between">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="font-medium text-gray-400">AprendeLoPE</span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
            <span className="font-semibold text-brand-purple">{currentPage}</span>
          </div>

          {/* Acciones topbar */}
          <div className="flex items-center gap-3">
            {/* Botón de notificaciones */}
            <button className="relative w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
              <Bell className="w-4 h-4 text-gray-500" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-orange" />
            </button>

            {/* Avatar en topbar */}
            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-brand-purple to-brand-purple-light flex items-center justify-center overflow-hidden">
              {userAvatar ? (
                <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
              ) : (
                <span className="text-white text-xs font-bold">{userName.charAt(0).toUpperCase()}</span>
              )}
            </div>
          </div>
        </header>

        {/* ── Contenido principal ── */}
        <main className="flex-1 p-8 overflow-auto">
          {children}
        </main>
      </div>

    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;