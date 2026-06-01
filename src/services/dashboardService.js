import { dashboardApi } from '../api/dashboardApi';

export const dashboardService = {
  getSummaryKpis: async (filters) => {
    try {
      const response = await dashboardApi.fetchKpis(filters);
      return response.data;
    } catch (error) {
      console.error('Error al obtener KPIs:', error);
      throw error;
    }
  },
  getSalesChartData: async (filters) => {
    const response = await dashboardApi.fetchSalesChart(filters);
    return response.data;
  },
  getMessagesChartData: async (filters) => {
    const response = await dashboardApi.fetchMessagesChart(filters);
    return response.data;
  }
};