import MainLayout from '../layouts/MainLayout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { FileSpreadsheet, FileText, Download, Calendar, Filter } from 'lucide-react';

const ReportsPage = () => {
  const reportsList = [
    { id: 1, title: 'Reporte Mensual de Conversión', date: 'Junio 2026', size: '2.4 MB', type: 'PDF' },
    { id: 2, title: 'Auditoría de Canales Digitales', date: 'Mayo 2026', size: '15.8 MB', type: 'XLSX' },
    { id: 3, title: 'Análisis de Rendimiento de Asesores', date: 'Abril 2026', size: '1.2 MB', type: 'PDF' },
    { id: 4, title: 'KPIs de Tráfico y Mensajería', date: 'Q1 2026', size: '8.4 MB', type: 'XLSX' },
  ];

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Módulo de Reportes</h1>
        <p className="text-sm text-gray-500">Descarga y filtra los informes de desempeño de AprendeLoPE</p>
      </div>

      {/* Filtros rápidos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-100 rounded-2xl shadow-card">
          <Calendar className="w-5 h-5 text-brand-purple" />
          <div className="text-left flex-1">
            <p className="text-[10px] font-bold text-gray-400 uppercase">Periodo</p>
            <p className="text-xs font-semibold text-gray-700">Últimos 30 días</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-100 rounded-2xl shadow-card">
          <Filter className="w-5 h-5 text-brand-orange" />
          <div className="text-left flex-1">
            <p className="text-[10px] font-bold text-gray-400 uppercase">Canal de Origen</p>
            <p className="text-xs font-semibold text-gray-700">Todos los canales</p>
          </div>
        </div>
        <div className="flex items-center justify-end">
          <Button label="Filtrar Reportes" icon={Filter} variant="purple" />
        </div>
      </div>

      {/* Lista de reportes */}
      <div className="grid grid-cols-1 gap-4">
        {reportsList.map((report) => (
          <Card key={report.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 hover:border-brand-purple/20 transition-all">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${report.type === 'PDF' ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-600'}`}>
                {report.type === 'PDF' ? <FileText className="w-6 h-6" /> : <FileSpreadsheet className="w-6 h-6" />}
              </div>
              <div className="text-left">
                <h3 className="font-bold text-gray-800 text-sm">{report.title}</h3>
                <p className="text-xs text-gray-400 font-medium">Generado el: {report.date} • {report.size}</p>
              </div>
            </div>
            <div className="flex gap-2 mt-4 sm:mt-0">
              <Button label="Ver Online" variant="ghost" className="text-xs py-2" />
              <Button label="Descargar" icon={Download} variant={report.type === 'PDF' ? 'danger' : 'purple'} className="text-xs py-2 px-3" />
            </div>
          </Card>
        ))}
      </div>
    </MainLayout>
  );
};

export default ReportsPage;
