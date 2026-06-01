import { AuthProvider }     from './contexts/AuthContext';
import { DashboardProvider } from './contexts/DashboardContext';
import AppRoutes             from './routes/AppRoutes';

// ============================================================
// App — Raíz de la aplicación
// Envuelve toda la app con los providers globales de contexto:
//   1. AuthProvider     → gestión de sesión (RF01)
//   2. DashboardProvider → filtros y estado del dashboard (RF03/RF04)
// ============================================================
const App = () => {
  return (
    <AuthProvider>
      <DashboardProvider>
        <AppRoutes />
      </DashboardProvider>
    </AuthProvider>
  );
};

export default App;