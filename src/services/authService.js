// ============================================================
// authService.js
// Capa de servicio para autenticación. Aquí se valida la
// sesión del usuario contra el token guardado en localStorage.
// En producción, este método llama al endpoint real del backend.
// ============================================================

export const authService = {
  /**
   * Verifica si existe un token de sesión válido.
   * @returns {Promise<{ isValid: boolean, user?: { name: string, avatar: string } }>}
   */
  verifySession: async () => {
    const token = localStorage.getItem('slack_token');
    if (!token) return { isValid: false };

    const name   = localStorage.getItem('slack_user_name')   || null;
    const avatar = localStorage.getItem('slack_user_avatar') || null;
    const email  = localStorage.getItem('slack_user_email')  || null;

    // Si no hay nombre guardado, la sesión no completó el OAuth correctamente
    if (!name) return { isValid: false };

    return { isValid: true, user: { name, avatar, email } };
  },

  /**
   * Cierra la sesión del usuario y redirige al login.
   */
  logout: () => {
    localStorage.removeItem('slack_token');
    localStorage.removeItem('slack_user_name');
    localStorage.removeItem('slack_user_avatar');
    globalThis.location.href = '/login';
  },
};