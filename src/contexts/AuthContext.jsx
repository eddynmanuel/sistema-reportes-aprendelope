import { createContext, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { authService } from '../services/authService';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const session = await authService.verifySession();
      setIsAuthenticated(session.isValid);
      setUser(session.user || null);
      setLoading(false);
    };
    checkAuth();
  }, []);

  const value = useMemo(() => ({
    isAuthenticated,
    user,
    loading,

    /**
     * Guarda la sesión real de Slack en el contexto y en localStorage.
     * Todos los campos vienen 100% del OAuth — ninguno es simulado.
     *
     * @param {string}      token  - access_token de Slack
     * @param {string}      name   - Nombre real del usuario (de openid.connect.userInfo)
     * @param {string|null} avatar - URL de la foto de perfil de Slack (puede ser null)
     * @param {string|null} email  - Correo electrónico de Slack (puede ser null)
     */
    login: (token, name, avatar, email) => {
      localStorage.setItem('slack_token',       token);
      localStorage.setItem('slack_user_name',   name);
      localStorage.setItem('slack_user_avatar', avatar  ?? '');
      localStorage.setItem('slack_user_email',  email   ?? '');
      setIsAuthenticated(true);
      setUser({ name, avatar: avatar ?? null, email: email ?? null });
    },

    logout: () => {
      authService.logout();
      setIsAuthenticated(false);
      setUser(null);
    },
  }), [isAuthenticated, user, loading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};