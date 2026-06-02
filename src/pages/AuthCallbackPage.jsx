import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import { useAuth } from '../hooks/useAuth';
import { CheckCircle2, ArrowRightLeft, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';
import Button from '../components/common/Button';

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();

  const authCode = searchParams.get('code');
  const authError = searchParams.get('error');

  // Si hay error o no hay código, ya sabemos el resultado desde el inicio
  const [loading, setLoading] = useState(!authError && !!authCode);
  const [errorMsg] = useState(() => {
    if (authError) return `Error de Slack: ${authError}`;
    if (!authCode) return 'No se recibió el código de autorización de Slack. Por favor intenta iniciar sesión nuevamente.';
    return '';
  });

  // El perfil real vendrá 100% de Slack — ningún campo tiene valor por defecto simulado
  const [realUser, setRealUser] = useState(null);

  useEffect(() => {
    if (!authCode || authError) return;

    const exchangeCodeForToken = async () => {
      const clientId     = import.meta.env.VITE_SLACK_CLIENT_ID;
      const clientSecret = import.meta.env.VITE_SLACK_CLIENT_SECRET;
      const redirectUri  = import.meta.env.VITE_SLACK_REDIRECT_URI;

      if (!clientSecret) {
        // El intercambio server-side no puede hacerse sin el Client Secret.
        // En lugar de simular datos, mostramos un error claro al desarrollador.
        console.error(
          '[AuthCallbackPage] VITE_SLACK_CLIENT_SECRET no está configurado en .env.\n' +
          'Sin este valor no es posible intercambiar el código de Slack por un token real.\n' +
          'Agrégalo en el archivo .env y reinicia el servidor de desarrollo.'
        );
        setLoading(false);
        // Forzamos un error descriptivo en la UI
        setRealUser({ __error: 'missing_secret' });
        return;
      }

      try {
        // 1. Intercambiar el código de autorización por un access_token real de Slack
        const tokenResponse = await fetch('/slack-api/openid.connect.token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            client_id:     clientId,
            client_secret: clientSecret,
            code:          authCode,
            redirect_uri:  redirectUri,
          }),
        });

        const tokenData = await tokenResponse.json();

        if (!tokenData.ok) {
          throw new Error(tokenData.error || 'Error al intercambiar el token con Slack.');
        }

        // 2. Obtener el perfil real del usuario con el access_token
        const userInfoResponse = await fetch('/slack-api/openid.connect.userInfo', {
          headers: { Authorization: `Bearer ${tokenData.access_token}` },
        });

        const userData = await userInfoResponse.json();

        if (!userData.name && !userData.given_name) {
          throw new Error('Slack no devolvió información de perfil. Verifica los scopes "profile" y "email".');
        }

        // Construir el nombre con prioridad: name > given_name + family_name
        const fullName = userData.name
          || `${userData.given_name ?? ''} ${userData.family_name ?? ''}`.trim()
          || userData.email?.split('@')[0]
          || 'Usuario';

        setRealUser({
          name:   fullName,
          avatar: userData.picture || null,   // null si Slack no envía foto
          email:  userData.email  || null,
          token:  tokenData.access_token,
        });
      } catch (err) {
        console.error('[AuthCallbackPage] Error en el intercambio OAuth con Slack:', err);
        // Mostramos el error real al usuario — no inventamos datos
        setRealUser({ __error: err.message });
      } finally {
        setLoading(false);
      }
    };

    exchangeCodeForToken();
  }, [authCode, authError]);

  const handleAuthorize = () => {
    login(realUser.token, realUser.name, realUser.avatar, realUser.email);
    navigate('/dashboard');
  };

  const handleCancel = () => {
    navigate('/login');
  };

  const renderContent = () => {
    // ── Estado de carga ────────────────────────────────────────
    if (loading) {
      return (
        <div className="text-center py-8 animate-fade-in flex flex-col items-center justify-center">
          <Loader2 className="w-12 h-12 text-brand-purple animate-spin mb-4" />
          <h2 className="text-lg font-bold text-gray-800">Conectando con Slack...</h2>
          <p className="text-xs text-gray-400 mt-1 max-w-xs leading-relaxed">
            Verificando tu identidad y cargando tu perfil de Slack.
          </p>
        </div>
      );
    }

    // ── Error de URL (Slack rechazó el acceso o no hay código) ──
    if (errorMsg) {
      return (
        <div className="animate-fade-in text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-50 text-red-500 rounded-full flex items-center justify-center border border-red-100">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error de Autenticación</h2>
          <p className="text-sm text-gray-500 mb-6">{errorMsg}</p>
          <Button label="Volver al Login" onClick={handleCancel} variant="purple" />
        </div>
      );
    }

    // ── Error del intercambio OAuth (Client Secret faltante o fallo de red) ─
    if (realUser?.__error) {
      const isSecretMissing = realUser.__error === 'missing_secret';
      return (
        <div className="animate-fade-in text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center border border-amber-100">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {isSecretMissing ? 'Configuración incompleta' : 'No se pudo obtener el perfil'}
          </h2>
          <p className="text-sm text-gray-500 mb-2 max-w-sm mx-auto">
            {isSecretMissing
              ? 'Falta la clave VITE_SLACK_CLIENT_SECRET en el archivo .env. Sin ella no es posible completar el login con Slack.'
              : realUser.__error}
          </p>
          {isSecretMissing && (
            <p className="text-xs text-gray-400 mb-6 font-mono bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 inline-block">
              Agrega VITE_SLACK_CLIENT_SECRET=tu_clave en .env
            </p>
          )}
          <Button label="Volver al Login" onClick={handleCancel} variant="purple" />
        </div>
      );
    }

    // ── Éxito: mostrar datos reales del perfil de Slack ─────────
    if (!realUser) return null;

    return (
      <div className="animate-fade-up">
        <div className="text-center mb-8">

          {/* Logos: AprendeLoPE ↔ Slack */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-14 h-14 bg-white border border-gray-100 rounded-2xl flex items-center justify-center shadow-md transform -rotate-3 overflow-hidden">
              <img src="/logo.svg" alt="AprendeLoPE" className="w-full h-full object-cover" />
            </div>
            <div className="flex items-center gap-1 text-brand-purple-light animate-pulse">
              <ArrowRightLeft className="w-5 h-5" />
            </div>
            <div className="w-14 h-14 bg-white border border-gray-100 rounded-2xl flex items-center justify-center shadow-md transform rotate-3">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522v-2.521zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.523-2.522v-2.522h2.523zM15.165 17.688a2.527 2.527 0 0 1-2.523-2.523 2.526 2.526 0 0 1 2.523-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#E01E5A" />
              </svg>
            </div>
          </div>

          {/* Avatar + nombre reales de Slack */}
          <div className="flex flex-col items-center gap-3 mb-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-brand-purple/20 shadow-md bg-gray-100 flex items-center justify-center">
              {realUser.avatar
                ? <img src={realUser.avatar} alt={realUser.name} className="w-full h-full object-cover" />
                : <span className="text-brand-purple font-black text-2xl">{realUser.name.charAt(0).toUpperCase()}</span>
              }
            </div>
            <div>
              <p className="font-extrabold text-gray-900 text-base leading-tight">{realUser.name}</p>
              {realUser.email && (
                <p className="text-xs text-gray-400 mt-0.5">{realUser.email}</p>
              )}
            </div>
          </div>

          <h2 className="text-lg font-extrabold text-gray-900 tracking-tight">Autorizar Conexión</h2>
          <p className="text-xs text-gray-500 mt-1">
            El Sistema de Reportes solicita acceso a tu cuenta de{' '}
            <strong className="text-gray-700">AprendeLoPE</strong> en Slack.
          </p>
        </div>

        {/* Permisos solicitados */}
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 mb-6 space-y-3 text-left">
          <h3 className="text-xs font-bold text-gray-600 uppercase tracking-widest flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-brand-purple" />
            Permisos Solicitados
          </h3>
          <div className="space-y-3">
            <div className="flex gap-3">
              <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-gray-700">Perfil de usuario</p>
                <p className="text-[11px] text-gray-500 font-medium">
                  Nombre completo (<strong>{realUser.name}</strong>), foto de perfil y correo.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-gray-700">Acceso a canales digitales</p>
                <p className="text-[11px] text-gray-500 font-medium">
                  Sincronizar métricas de interacción y flujos de mensajes.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex gap-3">
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
