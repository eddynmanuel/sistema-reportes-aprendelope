import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import NotFoundPage from '../pages/NotFoundPage';
import SlackMockPage from '../pages/SlackMockPage';
import AuthCallbackPage from '../pages/AuthCallbackPage';
import ReportsPage from '../pages/ReportsPage';
import SettingsPage from '../pages/SettingsPage';
import PropTypes from 'prop-types';

import { useAuth } from '../hooks/useAuth';
import Loader from '../components/common/Loader';

// Componente para proteger rutas usando autenticación real
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader />
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/slack-mock" element={<SlackMockPage />} />
        <Route path="/auth/callback" element={<AuthCallbackPage />} />
        
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/reportes" 
          element={
            <PrivateRoute>
              <ReportsPage />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/configuracion" 
          element={
            <PrivateRoute>
              <SettingsPage />
            </PrivateRoute>
          } 
        />
        
        {/* Redirección por defecto */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        {/* Ruta 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppRoutes;