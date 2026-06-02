import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import { useAuth } from '../hooks/useAuth';

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Si ya tiene sesión activa, redirigir al dashboard directamente
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Redirige al flujo real de OAuth con Slack
  const handleSlackClick = () => {
    const clientId = import.meta.env.VITE_SLACK_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_SLACK_REDIRECT_URI;

    if (!clientId) {
      alert('Falta configurar VITE_SLACK_CLIENT_ID en el archivo .env');
      return;
    }

    // URL oficial de autorización de Slack — Sign in with Slack (OpenID Connect)
    const slackAuthUrl =
      `https://slack.com/openid/connect/authorize` +
      `?response_type=code` +
      `&scope=openid%20profile%20email` +
      `&client_id=${clientId}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}`;

    globalThis.location.href = slackAuthUrl;
  };

  return (
    <AuthLayout>
      <div className="animate-fade-up">
        {/* Encabezado */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 mx-auto mb-6 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-gray-100 transform -rotate-3 overflow-hidden">
            <img src="/logo.svg" alt="AprendeLoPE" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Bienvenido de nuevo</h1>
          <p className="text-sm text-gray-500 mt-2 font-medium">Sistema de Reportes · AprendeLoPE</p>
        </div>

        <div className="space-y-5">
          {/* Botón principal de acceso con Slack */}
          <button
            onClick={handleSlackClick}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border-2 border-[#E01E5A]/20 text-gray-800 font-bold rounded-2xl hover:bg-gray-50 hover:border-[#E01E5A] transition-all shadow-sm hover:shadow-md group active:scale-[0.98]"
          >
            {/* Slack logo */}
            <svg className="w-6 h-6 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522v-2.521zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.523-2.522v-2.522h2.523zM15.165 17.688a2.527 2.527 0 0 1-2.523-2.523 2.526 2.526 0 0 1 2.523-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#E01E5A" />
            </svg>
            Continuar con Slack
          </button>

          {/* Separador */}
          <div className="relative mt-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-400 text-xs uppercase tracking-widest">Acceso Restringido</span>
            </div>
          </div>

          <p className="text-xs text-center text-gray-400 leading-relaxed">
            Para ingresar necesitas una cuenta activa en el workspace oficial de{' '}
            <span className="font-semibold text-gray-600">AprendeLoPE</span>.
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;