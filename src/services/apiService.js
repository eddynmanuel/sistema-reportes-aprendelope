// ============================================================
// apiService.js — Capa de servicios para datos del Dashboard
//
// INSTRUCCIONES PARA CONECTAR ENDPOINTS REALES:
//   1. Agrega VITE_API_BASE_URL en el archivo .env con la URL
//      base de tu backend (ej: https://api.aprendelope.com)
//   2. Reemplaza los datos MOCK de cada función por la llamada
//      real a fetch() que ya está preparada (descomenta y
//      comenta el bloque MOCK).
//   3. Si tu API requiere autenticación, el token de Slack
//      ya se pasa automáticamente desde localStorage.
// ============================================================

import {
  MOCK_KPI_VALUES,
  MOCK_SALES_DATA,
  MOCK_MESSAGES_DATA,
  MOCK_FUNNEL_DATA,
  MOCK_CONVERSION_DATA,
} from '../constants/dashboardConfig';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

/**
 * Genera los headers de autenticación usando el token de Slack
 * almacenado en la sesión activa.
 */
const getAuthHeaders = () => {
  const token = localStorage.getItem('slack_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

/**
 * Función auxiliar para hacer peticiones GET con manejo de errores.
 */
// eslint-disable-next-line no-unused-vars
const apiFetch = async (endpoint, params = {}) => {
  const url = new URL(`${BASE_URL}${endpoint}`, globalThis.location.origin);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  return response.json();
};

// ============================================================
// KPIs DEL DASHBOARD (RF02)
// ============================================================

/**
 * Obtiene todos los KPIs del período seleccionado.
 *
 * ENDPOINT ESPERADO:
 *   GET /api/dashboard/kpis?dateRange=this_month&advisor=all&channel=all
 *
 * RESPUESTA ESPERADA:
 *   {
 *     totalRevenue:      { value: "12,750", change: 10.1 },
 *     totalSales:        { value: "160",    change: 14.8 },
 *     conversionRate:    { value: "72.7",   change: -3.2 },
 *     interestedClients: { value: "38",     change: 5.3  },
 *     inNegotiation:     { value: "12",     change: null },
 *     pendingPayments:   { value: "3,200",  change: null },
 *     lostOpportunities: { value: "7",      change: -12.5 },
 *     avgConversionTime: { value: "4.2",    change: -8.0 },
 *     messageMetrics:    { value: "96.4%",  change: 2.1  },
 *   }
 *
 * @param {{ dateRange: string, advisor: string, channel: string }} filters
 */
// eslint-disable-next-line no-unused-vars
export const fetchKpiData = async (filters = {}) => {
  // ── DATOS MOCK (eliminar cuando haya endpoint real) ──────────
  return MOCK_KPI_VALUES;
  // ────────────────────────────────────────────────────────────

  // ── ENDPOINT REAL (descomentar cuando esté disponible) ──────
  // return apiFetch('/api/dashboard/kpis', {
  //   dateRange: filters.dateRange ?? 'this_month',
  //   advisor:   filters.advisor   ?? 'all',
  //   channel:   filters.channel   ?? 'all',
  // });
  // ────────────────────────────────────────────────────────────
};

// ============================================================
// GRÁFICO DE VENTAS (RF05)
// ============================================================

/**
 * Obtiene los datos de evolución de ventas por semana.
 *
 * ENDPOINT ESPERADO:
 *   GET /api/dashboard/sales-chart?dateRange=this_month
 *
 * RESPUESTA ESPERADA:
 *   [{ name: "Sem 1", monto: 2400, ventas: 30 }, ...]
 */
// eslint-disable-next-line no-unused-vars
export const fetchSalesData = async (filters = {}) => {
  // ── DATOS MOCK ──────────────────────────────────────────────
  return MOCK_SALES_DATA;
  // ────────────────────────────────────────────────────────────

  // ── ENDPOINT REAL ────────────────────────────────────────────
  // return apiFetch('/api/dashboard/sales-chart', {
  //   dateRange: filters.dateRange ?? 'this_month',
  // });
  // ────────────────────────────────────────────────────────────
};

// ============================================================
// GRÁFICO DE MENSAJES (RF05)
// ============================================================

/**
 * Obtiene los datos de mensajes recibidos vs respondidos por día.
 *
 * ENDPOINT ESPERADO:
 *   GET /api/dashboard/messages-chart?dateRange=this_month
 *
 * RESPUESTA ESPERADA:
 *   [{ name: "Lun", recibidos: 120, respondidos: 115 }, ...]
 */
// eslint-disable-next-line no-unused-vars
export const fetchMessagesData = async (filters = {}) => {
  // ── DATOS MOCK ──────────────────────────────────────────────
  return MOCK_MESSAGES_DATA;
  // ────────────────────────────────────────────────────────────

  // ── ENDPOINT REAL ────────────────────────────────────────────
  // return apiFetch('/api/dashboard/messages-chart', {
  //   dateRange: filters.dateRange ?? 'this_month',
  // });
  // ────────────────────────────────────────────────────────────
};

// ============================================================
// EMBUDO DE CONVERSIÓN (RF05)
// ============================================================

/**
 * Obtiene los datos del embudo de conversión.
 *
 * ENDPOINT ESPERADO:
 *   GET /api/dashboard/funnel?dateRange=this_month
 *
 * RESPUESTA ESPERADA:
 *   [{ label: "Clientes Interesados", count: 120, percentage: 100 }, ...]
 */
// eslint-disable-next-line no-unused-vars
export const fetchFunnelData = async (filters = {}) => {
  // ── DATOS MOCK ──────────────────────────────────────────────
  return MOCK_FUNNEL_DATA;
  // ────────────────────────────────────────────────────────────

  // ── ENDPOINT REAL ────────────────────────────────────────────
  // return apiFetch('/api/dashboard/funnel', {
  //   dateRange: filters.dateRange ?? 'this_month',
  // });
  // ────────────────────────────────────────────────────────────
};

// ============================================================
// DISTRIBUCIÓN DE LEADS (RF05)
// ============================================================

/**
 * Obtiene la distribución de leads por estado.
 *
 * ENDPOINT ESPERADO:
 *   GET /api/dashboard/lead-distribution?dateRange=this_month
 *
 * RESPUESTA ESPERADA:
 *   [{ name: "Convertidos", value: 42, color: "#34155E" }, ...]
 */
// eslint-disable-next-line no-unused-vars
export const fetchConversionData = async (filters = {}) => {
  // ── DATOS MOCK ──────────────────────────────────────────────
  return MOCK_CONVERSION_DATA;
  // ────────────────────────────────────────────────────────────

  // ── ENDPOINT REAL ────────────────────────────────────────────
  // return apiFetch('/api/dashboard/lead-distribution', {
  //   dateRange: filters.dateRange ?? 'this_month',
  // });
  // ────────────────────────────────────────────────────────────
};
