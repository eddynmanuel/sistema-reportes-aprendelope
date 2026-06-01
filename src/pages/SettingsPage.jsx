import MainLayout from '../layouts/MainLayout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { Settings, Lock, Bell, Users, Globe, Save } from 'lucide-react';

const SettingsPage = () => {
  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Configuración del Sistema</h1>
        <p className="text-sm text-gray-500">Administra los parámetros globales y preferencias de los reportes</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Navegación lateral de configuraciones */}
        <div className="xl:col-span-1 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-brand-purple text-white font-bold rounded-2xl shadow-md transition-all text-sm text-left">
            <Settings className="w-5 h-5" />
            General
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-white text-gray-600 hover:bg-gray-50 font-semibold rounded-2xl transition-all text-sm text-left border border-transparent hover:border-gray-100">
            <Lock className="w-5 h-5" />
            Seguridad
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-white text-gray-600 hover:bg-gray-50 font-semibold rounded-2xl transition-all text-sm text-left border border-transparent hover:border-gray-100">
            <Bell className="w-5 h-5" />
            Notificaciones
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-white text-gray-600 hover:bg-gray-50 font-semibold rounded-2xl transition-all text-sm text-left border border-transparent hover:border-gray-100">
            <Users className="w-5 h-5" />
            Asesores y Roles
          </button>
        </div>

        {/* Panel de contenido de configuración */}
        <div className="xl:col-span-3">
          <Card className="p-6 space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Globe className="w-5 h-5 text-brand-purple" />
                Ajustes Generales del Sitio
              </h3>
              <p className="text-xs text-gray-400">Parámetros del workspace corporativo y zona horaria</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="settings-company-name" className="text-xs font-bold text-gray-500 uppercase pl-1">Nombre de la Empresa</label>
                <input
                  type="text"
                  defaultValue="AprendeLoPE"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="settings-currency" className="text-xs font-bold text-gray-500 uppercase pl-1">Moneda del Sistema</label>
                <select id="settings-currency" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple">
                  <option value="PEN">Soles (S/)</option>
                  <option value="USD">Dólares ($)</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
              <Button label="Cancelar" variant="ghost" />
              <Button label="Guardar Configuración" icon={Save} variant="purple" />
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default SettingsPage;
