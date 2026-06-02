import { useState } from 'react';
import PropTypes from 'prop-types';
import MainLayout from '../layouts/MainLayout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import {
  Lock, Bell, Users, Globe, Save,
  CheckCircle2, Eye, EyeOff, ChevronRight,
} from 'lucide-react';

// ── Toast de confirmación ─────────────────────────────────────
const Toast = ({ message, onClose }) => (
  <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-brand-purple text-white px-5 py-3.5 rounded-2xl shadow-2xl animate-fade-up">
    <CheckCircle2 className="w-5 h-5 text-brand-yellow shrink-0" />
    <span className="text-sm font-semibold">{message}</span>
    <button onClick={onClose} className="ml-2 text-white/50 hover:text-white text-lg leading-none">×</button>
  </div>
);

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

// ── Tabs de navegación ────────────────────────────────────────
const TABS = [
  { id: 'general',       label: 'General',         icon: Globe  },
  { id: 'security',      label: 'Seguridad',        icon: Lock   },
  { id: 'notifications', label: 'Notificaciones',   icon: Bell   },
  { id: 'advisors',      label: 'Asesores y Roles', icon: Users  },
];

// ── Panel General ─────────────────────────────────────────────
const GeneralPanel = ({ onSave }) => {
  const saved  = JSON.parse(localStorage.getItem('settings_general') || '{}');
  const [name,     setName]     = useState(saved.name     ?? 'AprendeLoPE');
  const [currency, setCurrency] = useState(saved.currency ?? 'PEN');
  const [timezone, setTimezone] = useState(saved.timezone ?? 'America/Lima');

  const handleSave = () => {
    localStorage.setItem('settings_general', JSON.stringify({ name, currency, timezone }));
    onSave('Configuración general guardada correctamente.');
  };

  const handleCancel = () => {
    setName(saved.name         ?? 'AprendeLoPE');
    setCurrency(saved.currency ?? 'PEN');
    setTimezone(saved.timezone ?? 'America/Lima');
  };

  const inputClass = 'w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple transition-colors';

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-100 pb-4">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Globe className="w-5 h-5 text-brand-purple" />
          Ajustes Generales del Sitio
        </h3>
        <p className="text-xs text-gray-400 mt-1">Parámetros del workspace corporativo y zona horaria</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label htmlFor="settings-company-name" className="text-xs font-bold text-gray-500 uppercase pl-1">Nombre de la Empresa</label>
          <input
            id="settings-company-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="settings-currency" className="text-xs font-bold text-gray-500 uppercase pl-1">Moneda del Sistema</label>
          <select
            id="settings-currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className={inputClass}
          >
            <option value="PEN">Soles (S/)</option>
            <option value="USD">Dólares ($)</option>
            <option value="EUR">Euros (€)</option>
          </select>
        </div>
        <div className="space-y-1 md:col-span-2">
          <label htmlFor="settings-timezone" className="text-xs font-bold text-gray-500 uppercase pl-1">Zona Horaria</label>
          <select
            id="settings-timezone"
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className={inputClass}
          >
            <option value="America/Lima">América / Lima (GMT-5)</option>
            <option value="America/Bogota">América / Bogotá (GMT-5)</option>
            <option value="America/Mexico_City">América / Ciudad de México (GMT-6)</option>
            <option value="America/Santiago">América / Santiago (GMT-4)</option>
            <option value="America/Buenos_Aires">América / Buenos Aires (GMT-3)</option>
          </select>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row justify-end gap-3">
        <Button label="Cancelar" variant="ghost" onClick={handleCancel} className="w-full sm:w-auto" />
        <Button label="Guardar Configuración" icon={Save} variant="purple" onClick={handleSave} className="w-full sm:w-auto" />
      </div>
    </div>
  );
};

GeneralPanel.propTypes = {
  onSave: PropTypes.func.isRequired,
};

// ── Panel Seguridad ───────────────────────────────────────────
const SecurityPanel = ({ onSave }) => {
  const [current,   setCurrent]   = useState('');
  const [next,      setNext]      = useState('');
  const [confirm,   setConfirm]   = useState('');
  const [showPwd,   setShowPwd]   = useState(false);
  const [error,     setError]     = useState('');

  const handleSave = () => {
    setError('');
    if (!current.trim()) { setError('Ingresa tu contraseña actual.'); return; }
    if (next.length < 8)  { setError('La nueva contraseña debe tener al menos 8 caracteres.'); return; }
    if (next !== confirm)  { setError('Las contraseñas no coinciden.'); return; }
    setCurrent(''); setNext(''); setConfirm('');
    onSave('Contraseña actualizada correctamente.');
  };

  const inputClass = 'w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple transition-colors';

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-100 pb-4">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Lock className="w-5 h-5 text-brand-purple" />
          Seguridad de la Cuenta
        </h3>
        <p className="text-xs text-gray-400 mt-1">Actualiza tus credenciales de acceso</p>
      </div>

      <div className="space-y-4 max-w-md">
        <div className="space-y-1">
          <label htmlFor="sec-current" className="text-xs font-bold text-gray-500 uppercase pl-1">Contraseña Actual</label>
          <div className="relative">
            <input
              id="sec-current"
              type={showPwd ? 'text' : 'password'}
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              placeholder="••••••••"
              className={`${inputClass} pr-10`}
            />
            <button
              type="button"
              onClick={() => setShowPwd(!showPwd)}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            >
              {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="space-y-1">
          <label htmlFor="sec-new" className="text-xs font-bold text-gray-500 uppercase pl-1">Nueva Contraseña</label>
          <input
            id="sec-new"
            type={showPwd ? 'text' : 'password'}
            value={next}
            onChange={(e) => setNext(e.target.value)}
            placeholder="Mín. 8 caracteres"
            className={inputClass}
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="sec-confirm" className="text-xs font-bold text-gray-500 uppercase pl-1">Confirmar Nueva Contraseña</label>
          <input
            id="sec-confirm"
            type={showPwd ? 'text' : 'password'}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Repite la nueva contraseña"
            className={inputClass}
          />
        </div>

        {error && (
          <p className="text-xs text-red-500 font-semibold bg-red-50 border border-red-100 px-4 py-2.5 rounded-xl">{error}</p>
        )}
      </div>

      <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row justify-end gap-3">
        <Button label="Cancelar" variant="ghost" onClick={() => { setCurrent(''); setNext(''); setConfirm(''); setError(''); }} className="w-full sm:w-auto" />
        <Button label="Actualizar Contraseña" icon={Save} variant="purple" onClick={handleSave} className="w-full sm:w-auto" />
      </div>
    </div>
  );
};

SecurityPanel.propTypes = {
  onSave: PropTypes.func.isRequired,
};

// ── Panel Notificaciones ──────────────────────────────────────
const NotificationsPanel = ({ onSave }) => {
  const saved = JSON.parse(localStorage.getItem('settings_notifications') || '{}');

  const [prefs, setPrefs] = useState({
    newLead:       saved.newLead       ?? true,
    closedSale:    saved.closedSale    ?? true,
    weeklyReport:  saved.weeklyReport  ?? false,
    slackMessages: saved.slackMessages ?? true,
    emailDigest:   saved.emailDigest   ?? false,
  });

  const toggle = (key) => setPrefs((p) => ({ ...p, [key]: !p[key] }));

  const handleSave = () => {
    localStorage.setItem('settings_notifications', JSON.stringify(prefs));
    onSave('Preferencias de notificación guardadas.');
  };

  const items = [
    { key: 'newLead',       label: 'Nuevo lead registrado',        desc: 'Recibir alerta cuando un asesor capture un nuevo lead.'     },
    { key: 'closedSale',    label: 'Venta cerrada',                 desc: 'Notificar al cerrar una oportunidad exitosamente.'          },
    { key: 'weeklyReport',  label: 'Reporte semanal automático',    desc: 'Enviar un resumen de KPIs cada lunes a las 8:00 a.m.'       },
    { key: 'slackMessages', label: 'Mensajes nuevos en Slack',      desc: 'Alertar cuando haya mensajes sin responder en más de 2h.'   },
    { key: 'emailDigest',   label: 'Digest diario por correo',      desc: 'Recibir un resumen de actividad al final del día laboral.'  },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-100 pb-4">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Bell className="w-5 h-5 text-brand-purple" />
          Preferencias de Notificación
        </h3>
        <p className="text-xs text-gray-400 mt-1">Controla qué alertas y reportes automáticos deseas recibir</p>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.key} className="flex items-center justify-between gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100/60 transition-colors">
            <div className="min-w-0">
              <p className="text-sm font-bold text-gray-800 leading-tight">{item.label}</p>
              <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{item.desc}</p>
            </div>
            {/* Toggle switch */}
            <button
              onClick={() => toggle(item.key)}
              className={`relative shrink-0 w-11 h-6 rounded-full transition-colors duration-200 ${prefs[item.key] ? 'bg-brand-purple' : 'bg-gray-300'}`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${prefs[item.key] ? 'translate-x-5' : 'translate-x-0'}`}
              />
            </button>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-gray-100 flex justify-end">
        <Button label="Guardar Preferencias" icon={Save} variant="purple" onClick={handleSave} className="w-full sm:w-auto" />
      </div>
    </div>
  );
};

NotificationsPanel.propTypes = {
  onSave: PropTypes.func.isRequired,
};

// ── Panel Asesores ────────────────────────────────────────────
const ADVISORS = [
  { id: 1, name: 'Carlos Mendoza', email: 'carlos@aprendelope.com', role: 'Asesor Senior',  status: 'Activo'    },
  { id: 2, name: 'Ana Gómez',      email: 'ana@aprendelope.com',    role: 'Asesor',          status: 'Activo'    },
  { id: 3, name: 'Luis Ríos',      email: 'luis@aprendelope.com',   role: 'Asesor',          status: 'Activo'    },
  { id: 4, name: 'María Torres',   email: 'maria@aprendelope.com',  role: 'Coordinadora',    status: 'Inactivo'  },
];

const AdvisorsPanel = () => {
  const [search, setSearch] = useState('');

  const visible = ADVISORS.filter(
    (a) => a.name.toLowerCase().includes(search.toLowerCase()) ||
           a.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <Users className="w-5 h-5 text-brand-purple" />
            Asesores y Roles
          </h3>
          <p className="text-xs text-gray-400 mt-1">Administra los usuarios del sistema y sus permisos</p>
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar asesor..."
          className="px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple w-full sm:w-52 font-medium"
        />
      </div>

      <div className="overflow-x-auto -mx-1">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="pb-3 px-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Asesor</th>
              <th className="pb-3 px-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider hidden sm:table-cell">Correo</th>
              <th className="pb-3 px-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Rol</th>
              <th className="pb-3 px-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {visible.map((a) => (
              <tr key={a.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="py-3 px-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-brand-purple/10 text-brand-purple font-bold text-xs flex items-center justify-center shrink-0">
                      {a.name.charAt(0)}
                    </div>
                    <span className="font-semibold text-gray-800 truncate max-w-[120px]">{a.name}</span>
                  </div>
                </td>
                <td className="py-3 px-2 text-gray-500 hidden sm:table-cell">{a.email}</td>
                <td className="py-3 px-2">
                  <span className="text-xs font-semibold bg-brand-purple/10 text-brand-purple px-2.5 py-1 rounded-full whitespace-nowrap">
                    {a.role}
                  </span>
                </td>
                <td className="py-3 px-2">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${a.status === 'Activo' ? 'bg-success/10 text-success' : 'bg-gray-100 text-gray-400'}`}>
                    {a.status}
                  </span>
                </td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr>
                <td colSpan={4} className="py-8 text-center text-sm text-gray-400">No se encontraron asesores.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ── SettingsPage ──────────────────────────────────────────────
const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [toast,     setToast]     = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  };

  const renderPanel = () => {
    switch (activeTab) {
      case 'general':       return <GeneralPanel       onSave={showToast} />;
      case 'security':      return <SecurityPanel      onSave={showToast} />;
      case 'notifications': return <NotificationsPanel onSave={showToast} />;
      case 'advisors':      return <AdvisorsPanel />;
      default:              return null;
    }
  };

  return (
    <MainLayout>
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">Configuración del Sistema</h1>
        <p className="text-sm text-gray-500 mt-1">Administra los parámetros globales y preferencias de los reportes</p>
      </div>

      <div className="flex flex-col xl:flex-row gap-6">
        {/* Nav lateral de tabs — horizontal en móvil, vertical en xl */}
        <nav className="flex xl:flex-col gap-1 overflow-x-auto pb-1 xl:pb-0 xl:w-52 shrink-0">
          {TABS.map((tab) => {
            const Icon    = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2.5 px-4 py-3 rounded-2xl text-sm font-semibold
                  whitespace-nowrap transition-all duration-150 text-left w-full
                  ${isActive
                    ? 'bg-brand-purple text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-transparent hover:border-gray-100'
                  }
                `}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-brand-yellow' : 'text-gray-400'}`} />
                <span className="flex-1">{tab.label}</span>
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-white/50 hidden xl:block" />}
              </button>
            );
          })}
        </nav>

        {/* Panel de contenido */}
        <div className="flex-1 min-w-0">
          <Card className="p-6">
            {renderPanel()}
          </Card>
        </div>
      </div>

      {/* Toast de confirmación */}
      {toast && <Toast message={toast} onClose={() => setToast('')} />}
    </MainLayout>
  );
};

export default SettingsPage;
