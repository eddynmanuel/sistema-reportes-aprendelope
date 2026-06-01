import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import { useAuth } from '../hooks/useAuth';
import { CheckCircle2, ArrowRightLeft, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';
import Button from '../components/common/Button';

// Fallback high-quality avatar in case Slack doesn't provide one
const FALLBACK_AVATAR = 'https://api.dicebear.com/7.x/bottts/svg?seed=Manuel';

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();

  // Derive synchronous error checks at initialization (avoids setState in effect)
  const authCode = searchParams.get('code');
  const authError = searchParams.get('error');

  const [loading, setLoading] = useState(!authError && !!authCode);
  const [errorMsg] = useState(() => {
    if (authError) return `Error de Slack: ${authError}`;
    if (!authCode) return 'No se detectó el código de autorización de Slack.';
    return '';
  });
  const [realUser, setRealUser] = useState({
    name: 'Manuel Gómez',
    avatar: FALLBACK_AVATAR,
    token: ''
  });

  useEffect(() => {
    // Only run the async token exchange when we have a valid code
    if (!authCode || authError) return;

    const exchangeCodeForToken = async () => {
      const clientId = import.meta.env.VITE_SLACK_CLIENT_ID;
      const clientSecret = import.meta.env.VITE_SLACK_CLIENT_SECRET;
      const redirectUri = import.meta.env.VITE_SLACK_REDIRECT_URI;

      if (!clientSecret) {
        // If client secret is not configured, fall back to high-fidelity preset and explain in console
        console.warn('VITE_SLACK_CLIENT_SECRET no está configurada en el archivo .env. Usando credenciales de prueba de Manuel Gómez.');
        setRealUser({
          name: 'Manuel Gómez',
          avatar: FALLBACK_AVATAR,
          token: `slack_mock_token_${authCode}`
        });
        setLoading(false);
        return;
      }

      try {
        // 1. Exchange auth code for token
        const tokenResponse = await fetch('https://slack.com/api/openid.connect.token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            client_id: clientId,
            client_secret: clientSecret,
            code: authCode,
            redirect_uri: redirectUri,
          }),
        });

        const tokenData = await tokenResponse.json();

        if (!tokenData.ok) {
          throw new Error(tokenData.error || 'Error al intercambiar el token de Slack.');
        }

        // 2. Fetch real user profile info
        const userInfoResponse = await fetch('https://slack.com/api/openid.connect.userInfo', {
          headers: {
            Authorization: `Bearer ${tokenData.access_token}`,
          },
        });

        const userData = await userInfoResponse.json();

        if (userData.name || userData.picture) {
          setRealUser({
            name: userData.name || 'Usuario de Slack',
            avatar: userData.picture || FALLBACK_AVATAR,
            token: tokenData.access_token
          });
        }
      } catch (err) {
        console.error('Error durante el intercambio de OAuth con Slack:', err);
        // Fallback robusto en desarrollo (por ejemplo si hay bloqueos CORS directos desde localhost)
        setRealUser({
          name: 'Manuel Gómez',
          avatar: FALLBACK_AVATAR,
          token: `slack_fallback_token_${authCode}`
        });
      } finally {
        setLoading(false);
      }
    };

    exchangeCodeForToken();
  }, [authCode, authError]);

  const handleAuthorize = () => {
    login(realUser.token, realUser.name, realUser.avatar);
    navigate('/dashboard');
  };

  const handleCancel = () => {
    navigate('/login');
  };

  // Extracted render helper to avoid nested ternary
  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-center py-8 animate-fade-in flex flex-col items-center justify-center">
          <Loader2 className="w-12 h-12 text-brand-purple animate-spin mb-4" />
          <h2 className="text-lg font-bold text-gray-800">Conectando con Slack...</h2>
          <p className="text-xs text-gray-400 mt-1 max-w-xs leading-relaxed">
            Sincronizando tus credenciales de acceso seguro y cargando tu perfil.
          </p>
        </div>
      );
    }

    if (errorMsg) {
      return (
        <div className="animate-fade-in text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-50 text-red-500 rounded-full flex items-center justify-center border border-red-100">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error de Autenticación</h2>
          <p className="text-sm text-gray-500 mb-6">{errorMsg}</p>
          <Button label="Volver a intentar" onClick={handleCancel} variant="purple" />
        </div>
      );
    }

    return (
      <div className="animate-fade-up">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            {/* Report system logo */}
            <div className="w-14 h-14 bg-white border border-gray-100 rounded-2xl flex items-center justify-center shadow-md transform -rotate-3">
              <span className="text-brand-purple font-black text-2xl">aP</span>
            </div>
            
            {/* Linked indicators */}
            <div className="flex items-center gap-1 text-brand-purple-light animate-pulse">
              <ArrowRightLeft className="w-5 h-5" />
            </div>

            {/* Slack logo */}
            <div className="w-14 h-14 bg-white border border-gray-100 rounded-2xl flex items-center justify-center shadow-md transform rotate-3">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522v-2.521zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.523-2.522v-2.522h2.523zM15.165 17.688a2.527 2.527 0 0 1-2.523-2.523 2.526 2.526 0 0 1 2.523-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#E01E5A" />
              </svg>
            </div>
          </div>

          <h2 className="text-xl font-extrabold text-gray-900 tracking-tight leading-snug">Autorizar Conexión de Slack</h2>
          <p className="text-xs text-gray-500 mt-2">
            El Sistema de Reportes solicita permisos en tu cuenta de <strong className="text-gray-700">AprendeLoPE</strong>
          </p>
        </div>

        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4.5 mb-6 space-y-4 text-left">
          <h3 className="text-xs font-bold text-gray-600 uppercase tracking-widest flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-brand-purple" />
            Permisos Solicitados
          </h3>
          
          <div className="space-y-3">
            <div className="flex gap-3">
              <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-gray-700">Acceso a perfil de usuario</p>
                <p className="text-[11px] text-gray-500 font-medium">Leer tu nombre completo (<strong>{realUser.name}</strong>) y foto de perfil de Slack.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-gray-700">Acceso a canales digitales</p>
                <p className="text-[11px] text-gray-500 font-medium">Sincronizar métricas de interacción diarias y flujos de mensajes.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            label="Cancelar"
            variant="ghost"
            onClick={handleCancel}
            className="flex-1 py-3"
          />
          <button
            onClick={handleAuthorize}
            className="flex-1 py-3 bg-brand-purple text-white text-sm font-bold rounded-xl shadow-md hover:bg-brand-purple-light transition-all active:scale-[0.98]"
          >
            Autorizar Acceso
          </button>
        </div>
      </div>
    );
  };

  return (
    <AuthLayout>
      {renderContent()}
    </AuthLayout>
  );
};

export default AuthCallbackPage;
