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

  // useMemo para que el valor no cambie en cada render
  const value = useMemo(() => ({
    isAuthenticated,
    user,
    loading,
    login: (token, name, avatar) => {
      localStorage.setItem('slack_token', token);
      localStorage.setItem('slack_user_name', name);
      localStorage.setItem('slack_user_avatar', avatar);
      setIsAuthenticated(true);
      setUser({ name, avatar });
    },
    logout: () => {
      authService.logout();
      setIsAuthenticated(false);
      setUser(null);
    }
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