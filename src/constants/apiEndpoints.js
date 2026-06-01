export const API_BASE_URL = 'https://api.aprendelope.pe/v1'; // Ajustar URL real de la empresa

export const ENDPOINTS = {
  AUTH: {
    SLACK_LOGIN: `${API_BASE_URL}/auth/slack`,
    SESSION_VERIFY: `${API_BASE_URL}/auth/verify`,
  },
  DASHBOARD: {
    KPIS: `${API_BASE_URL}/dashboard/kpis`,
    CHART_SALES: `${API_BASE_URL}/dashboard/charts/sales`,
    CHART_MESSAGES: `${API_BASE_URL}/dashboard/charts/messages`,
  },
  FILTERS: {
    ADVISORS: `${API_BASE_URL}/filters/advisors`,
    CHANNELS: `${API_BASE_URL}/filters/channels`,
  }
};