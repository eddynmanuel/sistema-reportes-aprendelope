import axiosClient from './axiosClient';
import { ENDPOINTS } from '../constants/apiEndpoints';

export const dashboardApi = {
  /**
   * Obtiene los KPIs generales filtrados
   */
  fetchKpis: (filters) => {
    return axiosClient.get(ENDPOINTS.DASHBOARD.KPIS, { params: filters });
  },

  /**
   * Obtiene la data para el gráfico de ventas
   */
  fetchSalesChart: (filters) => {
    return axiosClient.get(ENDPOINTS.DASHBOARD.CHART_SALES, { params: filters });
  },

  /**
   * Obtiene la data para el gráfico de mensajes
   */
  fetchMessagesChart: (filters) => {
    return axiosClient.get(ENDPOINTS.DASHBOARD.CHART_MESSAGES, { params: filters });
  }
};