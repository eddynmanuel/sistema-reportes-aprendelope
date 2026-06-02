import { useState } from 'react';
import PropTypes from 'prop-types';
import MainLayout from '../layouts/MainLayout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import {
  FileSpreadsheet, FileText, Download, Calendar,
  Filter, X, Eye, ChevronDown,
} from 'lucide-react';

// ── Datos de reportes (listos para reemplazar con endpoint real) ──
const ALL_REPORTS = [
  {
    id: 1,
    title:    'Reporte Mensual de Conversión',
    date:     'Junio 2026',
    period:   'last_30',
    channel:  'all',
    size:     '2.4 MB',
    type:     'PDF',
    rows: [
      { asesor: 'Carlos Mendoza', ventas: 48, conversión: '74%', ingresos: 'S/ 3,840' },
      { asesor: 'Ana Gómez',      ventas: 35, conversión: '68%', ingresos: 'S/ 2,800' },
      { asesor: 'Luis Ríos',      ventas: 42, conversión: '71%', ingresos: 'S/ 3,360' },
      { asesor: 'María Torres',   ventas: 35, conversión: '69%', ingresos: 'S/ 2,750' },
    ],
  },
  {
    id: 2,
    title:    'Auditoría de Canales Digitales',
    date:     'Mayo 2026',
    period:   'last_3m',
    channel:  'whatsapp',
    size:     '15.8 MB',
    type:     'XLSX',
    rows: [
      { canal: 'WhatsApp Business', mensajes: 1240, respondidos: 1198, tasa: '96.6%' },
      { canal: 'Instagram Direct',  mensajes: 680,  respondidos: 651,  tasa: '95.7%' },
      { canal: 'Facebook Messenger',mensajes: 420,  respondidos: 398,  tasa: '94.8%' },
    ],
  },
  {
    id: 3,
    title:    'Análisis de Rendimiento de Asesores',
    date:     'Abril 2026',
    period:   'last_3m',
    channel:  'all',
    size:     '1.2 MB',
    type:     'PDF',
    rows: [
      { asesor: 'Carlos Mendoza', leads: 65, cerrados: 48, pendientes: 12, perdidos: 5 },
      { asesor: 'Ana Gómez',      leads: 52, cerrados: 35, pendientes: 10, perdidos: 7 },
      { asesor: 'Luis Ríos',      leads: 59, cerrados: 42, pendientes: 11, perdidos: 6 },
    ],
  },
  {
    id: 4,
    title:    'KPIs de Tráfico y Mensajería',
    date:     'Q1 2026',
    period:   'this_year',
    channel:  'instagram',
    size:     '8.4 MB',
    type:     'XLSX',
    rows: [
      { mes: 'Enero',   mensajes: 980,  leads: 120, conversión: '12.2%' },
      { mes: 'Febrero', mensajes: 1050, leads: 138, conversión: '13.1%' },
      { mes: 'Marzo',   mensajes: 1180, leads: 155, conversión: '13.1%' },
    ],
  },
];

const PERIOD_OPTIONS = [
  { value: 'all',       label: 'Todos los períodos'  },
  { value: 'last_30',   label: 'Últimos 30 días'     },
  { value: 'last_3m',   label: 'Últimos 3 meses'     },
  { value: 'this_year', label: 'Este año (2026)'      },
];

const CHANNEL_OPTIONS = [
  { value: 'all',       label: 'Todos los canales'   },
  { value: 'whatsapp',  label: 'WhatsApp Business'   },
  { value: 'instagram', label: 'Instagram Direct'    },
  { value: 'facebook',  label: 'Facebook Messenger'  },
  { value: 'email',     label: 'Email'               },
];

// ── Descarga el reporte como CSV ──────────────────────────────
const downloadCsv = (report) => {
  if (!report.rows || report.rows.length === 0) return;
  const headers = Object.keys(report.rows[0]);
  const csv = [
    headers.join(','),
    ...report.rows.map((row) => headers.map((h) => `"${row[h]}"`).join(',')),
  ].join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url  = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href     = url;
  link.download = `${report.title.replace(/\s+/g, '_')}_${report.date}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};

// ── Modal de vista previa ─────────────────────────────────────
const PreviewModal = ({ report, onClose }) => {
  if (!report) return null;
  const headers = report.rows?.length ? Object.keys(report.rows[0]) : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <button
        type="button"
        className="absolute inset-0 w-full h-full bg-black/50 backdrop-blur-sm cursor-default border-none focus:outline-none"
        onClick={onClose}
        aria-label="Cerrar vista previa"
      />

      {/* Panel */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col animate-fade-up">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="font-bold text-gray-900 text-base leading-tight">{report.title}</h2>
            <p className="text-xs text-gray-400 mt-1">Generado: {report.date} · {report.size}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors shrink-0 ml-4"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Tabla de datos */}
        <div className="overflow-auto flex-1 p-6">
          {headers.length > 0 ? (
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr>
                  {headers.map((h) => (
                    <th
                      key={h}
                      className="px-3 py-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider bg-gray-50 border-b border-gray-100"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {report.rows.map((row) => (
                  <tr key={JSON.stringify(row)} className="border-b border-gray-50 hover:bg-gray-50/50">
                    {headers.map((h) => (
                      <td key={h} className="px-3 py-2.5 text-gray-700 font-medium">{row[h]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-400 text-sm text-center py-8">Sin datos disponibles</p>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-100">
          <Button label="Cerrar" variant="ghost" onClick={onClose} />
          <Button label="Descargar CSV" icon={Download} variant="purple" onClick={() => { downloadCsv(report); onClose(); }} />
        </div>
      </div>
    </div>
  );
};

PreviewModal.propTypes = {
  report:  PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

// ── ReportsPage ───────────────────────────────────────────────
const ReportsPage = () => {
  const [period,      setPeriod]      = useState('all');
  const [channel,     setChannel]     = useState('all');
  const [previewOpen, setPreviewOpen] = useState(null); // report object | null
  const [filtered,    setFiltered]    = useState(ALL_REPORTS);

  const handleFilter = () => {
    setFiltered(
      ALL_REPORTS.filter((r) => {
        const matchPeriod  = period  === 'all' || r.period  === period;
        const matchChannel = channel === 'all' || r.channel === channel;
        return matchPeriod && matchChannel;
      })
    );
  };

  const selectClass = 'w-full bg-transparent border-0 outline-none text-xs font-semibold text-gray-700 cursor-pointer appearance-none pr-6';

  return (
    <MainLayout>
      {/* Encabezado */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">Módulo de Reportes</h1>
        <p className="text-sm text-gray-500 mt-1">Descarga y filtra los informes de desempeño de AprendeLoPE</p>
      </div>

      {/* Filtros funcionales */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {/* Filtro Período */}
        <div className="flex items-center gap-3 px-4 py-3 bg-white border border-gray-100 rounded-2xl shadow-card">
          <Calendar className="w-5 h-5 text-brand-purple shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold text-gray-400 uppercase">Período</p>
            <div className="relative">
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className={selectClass}
              >
                {PERIOD_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-0 top-0.5 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Filtro Canal */}
        <div className="flex items-center gap-3 px-4 py-3 bg-white border border-gray-100 rounded-2xl shadow-card">
          <Filter className="w-5 h-5 text-brand-orange shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold text-gray-400 uppercase">Canal de Origen</p>
            <div className="relative">
              <select
                value={channel}
                onChange={(e) => setChannel(e.target.value)}
                className={selectClass}
              >
                {CHANNEL_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-0 top-0.5 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Botón filtrar */}
        <div className="flex items-center justify-end">
          <Button label="Filtrar Reportes" icon={Filter} variant="purple" onClick={handleFilter} className="w-full sm:w-auto justify-center" />
        </div>
      </div>

      {/* Lista de reportes */}
      <div className="grid grid-cols-1 gap-4">
        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <FileText className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm font-medium">No hay reportes para los filtros seleccionados.</p>
            <button onClick={() => { setPeriod('all'); setChannel('all'); setFiltered(ALL_REPORTS); }} className="text-xs text-brand-purple hover:underline mt-2">
              Limpiar filtros
            </button>
          </div>
        )}

        {filtered.map((report) => (
          <Card
            key={report.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-5 hover:border-brand-purple/20 transition-all gap-4"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${report.type === 'PDF' ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-600'}`}>
                {report.type === 'PDF'
                  ? <FileText className="w-6 h-6" />
                  : <FileSpreadsheet className="w-6 h-6" />
                }
              </div>
              <div className="text-left min-w-0">
                <h3 className="font-bold text-gray-800 text-sm leading-snug">{report.title}</h3>
                <p className="text-xs text-gray-400 font-medium mt-0.5">
                  Generado: {report.date} &nbsp;·&nbsp; {report.size} &nbsp;·&nbsp;
                  <span className={`font-bold ${report.type === 'PDF' ? 'text-red-500' : 'text-emerald-600'}`}>{report.type}</span>
                </p>
              </div>
            </div>

            <div className="flex gap-2 shrink-0">
              <Button
                label="Ver Online"
                icon={Eye}
                variant="ghost"
                className="text-xs py-2"
                onClick={() => setPreviewOpen(report)}
              />
              <Button
                label="Descargar"
                icon={Download}
                variant={report.type === 'PDF' ? 'danger' : 'purple'}
                className="text-xs py-2 px-3"
                onClick={() => downloadCsv(report)}
              />
            </div>
          </Card>
        ))}
      </div>

      {/* Modal de vista previa */}
      {previewOpen && (
        <PreviewModal report={previewOpen} onClose={() => setPreviewOpen(null)} />
      )}
    </MainLayout>
  );
};

export default ReportsPage;
