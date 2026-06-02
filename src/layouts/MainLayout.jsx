import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileBarChart2,
  Settings,
  LogOut,
  Bell,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { APP_ROUTES } from '../constants/routes';

const NAV_ITEMS = [
  { label: 'Dashboard',     path: APP_ROUTES.DASHBOARD, icon: LayoutDashboard },
  { label: 'Reportes',      path: APP_ROUTES.REPORTS,   icon: FileBarChart2   },
  { label: 'Configuración', path: '/configuracion',      icon: Settings        },
];

// ── SidebarNavItem ──────────────────────────────────────────────
const SidebarNavItem = ({ item, isActive, onClick }) => {
  const Icon = item.icon;
  return (
    <Link
      to={item.path}
      onClick={onClick}
      className={`
        group flex items-center gap-3 px-4 py-3 rounded-xl
        font-medium text-sm transition-all duration-200
        ${isActive ? 'nav-active text-white' : 'text-white/60 hover:text-white hover:bg-white/10'}
      `}
    >
      <Icon className={`w-5 h-5 shrink-0 transition-transform duration-200 ${isActive ? 'text-brand-yellow' : 'group-hover:scale-110'}`} />
      <span className="flex-1">{item.label}</span>
      {isActive && <ChevronRight className="w-4 h-4 text-brand-orange opacity-70" />}
    </Link>
  );
};

SidebarNavItem.propTypes = {
  item:     PropTypes.shape({ label: PropTypes.string, path: PropTypes.string, icon: PropTypes.elementType }).isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick:  PropTypes.func,
};

// ── SidebarContent — Contenido compartido del sidebar ─────────
const SidebarContent = ({ location, userName, userAvatar, logout, onNavClick }) => (
  <>
    {/* Orbe decorativo */}
    <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-orange rounded-full opacity-10 blur-[60px] pointer-events-none" />

    {/* Logo */}
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

    {/* Navegación */}
    <nav className="flex-1 px-3 py-6 space-y-1">
      <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest px-4 mb-3">Menú Principal</p>
      {NAV_ITEMS.map((item) => (
        <SidebarNavItem
          key={item.path}
          item={item}
          isActive={location.pathname === item.path}
          onClick={onNavClick}
        />
      ))}
    </nav>

    {/* Slack Status Badge */}
    <div className="mx-3 mb-3 px-4 py-3 rounded-xl glass">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
        <p className="text-white/80 text-xs font-semibold">Slack conectado</p>
      </div>
      <p className="text-white/40 text-[10px] mt-0.5">Autenticación activa · RF01</p>
    </div>

    {/* Footer: Usuario + Logout */}
    <div className="px-3 py-4 border-t border-white/10">
      <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer">
        <div className="w-9 h-9 rounded-xl bg-linear-to-br from-brand-orange to-brand-yellow flex items-center justify-center shrink-0 overflow-hidden">
          {userAvatar
            ? <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
            : <span className="text-white text-sm font-bold">{userName.charAt(0).toUpperCase()}</span>
          }
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
  </>
);

SidebarContent.propTypes = {
  location:    PropTypes.object.isRequired,
  userName:    PropTypes.string.isRequired,
  userAvatar:  PropTypes.string,
  logout:      PropTypes.func.isRequired,
  onNavClick:  PropTypes.func,
};

// ── MainLayout ─────────────────────────────────────────────────
const MainLayout = ({ children }) => {
  const location = useLocation();
  const { logout, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const currentPage = NAV_ITEMS.find((item) => location.pathname === item.path)?.label ?? 'Dashboard';
  const userName    = user?.name   || 'Usuario';
  const userAvatar  = user?.avatar || null;

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen flex bg-surface-alt font-sans">

      {/* ── SIDEBAR DESKTOP (lg+): siempre visible, igual que antes ── */}
      <aside className="hidden lg:flex w-64 h-screen bg-brand-purple flex-col shrink-0 sticky top-0 overflow-y-auto">
        <SidebarContent
          location={location}
          userName={userName}
          userAvatar={userAvatar}
          logout={logout}
        />
      </aside>

      {/* ── SIDEBAR MÓVIL: overlay + drawer desde la izquierda ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        >
          {/* Overlay oscuro */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        </div>
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen w-64 bg-brand-purple flex flex-col
          transition-transform duration-300 ease-in-out overflow-y-auto
          lg:hidden
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Botón cerrar en móvil */}
        <button
          onClick={closeSidebar}
          className="absolute top-4 right-4 z-10 text-white/60 hover:text-white transition-colors"
          aria-label="Cerrar menú"
        >
          <X className="w-5 h-5" />
        </button>
        <SidebarContent
          location={location}
          userName={userName}
          userAvatar={userAvatar}
          logout={logout}
          onNavClick={closeSidebar}
        />
      </aside>

      {/* ── ÁREA DE CONTENIDO ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Topbar */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 sm:px-8 h-16 flex items-center justify-between">

          {/* Izquierda: hamburguesa (móvil) + breadcrumb */}
          <div className="flex items-center gap-3">
            {/* Botón hamburguesa — solo en móvil */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              aria-label="Abrir menú"
            >
              <Menu className="w-4 h-4 text-gray-600" />
            </button>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="font-medium text-gray-400 hidden sm:inline">AprendeLoPE</span>
              <ChevronRight className="w-3.5 h-3.5 text-gray-300 hidden sm:inline" />
              <span className="font-semibold text-brand-purple">{currentPage}</span>
            </div>
          </div>

          {/* Derecha: notificaciones + avatar */}
          <div className="flex items-center gap-3 relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <Bell className="w-4 h-4 text-gray-500" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-orange" />
            </button>

            {notifOpen && (
              <div className="absolute top-12 right-12 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-50 animate-fade-up">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-bold text-gray-800 text-sm">Notificaciones</h4>
                  <span className="text-[10px] font-bold bg-brand-orange/10 text-brand-orange px-2 py-0.5 rounded-full">1 Nueva</span>
                </div>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <p className="text-xs font-semibold text-gray-800">Reporte mensual listo</p>
                    <p className="text-[10px] text-gray-400 mt-1">El reporte de conversión de Mayo ha sido generado exitosamente.</p>
                  </div>
                </div>
                <button
                  onClick={() => setNotifOpen(false)}
                  className="w-full mt-3 text-center text-xs font-semibold text-brand-purple hover:underline"
                >
                  Marcar como leído
                </button>
              </div>
            )}

            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-brand-purple to-brand-purple-light flex items-center justify-center overflow-hidden">
              {userAvatar
                ? <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
                : <span className="text-white text-xs font-bold">{userName.charAt(0).toUpperCase()}</span>
              }
            </div>
          </div>
        </header>

        {/* Contenido principal */}
        <main className="flex-1 p-4 sm:p-8 overflow-auto">
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