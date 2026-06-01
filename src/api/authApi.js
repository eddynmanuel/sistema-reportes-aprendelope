import axiosClient from './axiosClient';
import { ENDPOINTS } from '../constants/apiEndpoints';

export const authApi = {
  /**
   * Envía el código de autorización de Slack al backend
   */
  loginWithSlack: (code) => {
    return axiosClient.post(ENDPOINTS.AUTH.SLACK_LOGIN, { code });
  },

  /**
   * Verifica si el token actual sigue siendo válido
   */
  verifySession: () => {
    return axiosClient.get(ENDPOINTS.AUTH.SESSION_VERIFY);
  }
};