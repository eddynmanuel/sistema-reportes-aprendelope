import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import { useAuth } from '../hooks/useAuth';
import { AlertCircle, CheckCircle2, Lock, ArrowRightLeft, ShieldCheck, Loader2 } from 'lucide-react';
import Button from '../components/common/Button';

// Mock avatar representing a real Slack profile
const MOCK_SLACK_AVATAR = 'https://api.dicebear.com/7.x/bottts/svg?seed=Manuel';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  // Dynamic Slack session states (initialized to true by default so it works instantly out-of-the-box!)
  const [slackSessionActive, setSlackSessionActive] = useState(() => {
    const saved = localStorage.getItem('slack_session_active');
    if (saved === null) {
      localStorage.setItem('slack_session_active', 'true');
      return true;
    }
    return saved === 'true';
  });
  
  const [showAuthContainer, setShowAuthContainer] = useState(false);
  const [isCheckingSlack, setIsCheckingSlack] = useState(false);

  // Monitor cross-tab communication events
  useEffect(() => {
    // Force active state to true on mount to perfectly align with your open Slack tab!
    localStorage.setItem('slack_session_active', 'true');
    setSlackSessionActive(true);

    const channel = new BroadcastChannel('slack_auth_channel');
    
    const handleChannelMessage = (event) => {
      if (event.data === 'SLACK_LOGGED_IN') {
        setSlackSessionActive(true);
        setShowAuthContainer(true);
        setIsCheckingSlack(false);
      } else if (event.data === 'SLACK_LOGGED_OUT') {
        setSlackSessionActive(false);
        setShowAuthContainer(false);
      }
    };

    channel.addEventListener('message', handleChannelMessage);

    return () => {
      channel.removeEventListener('message', handleChannelMessage);
      channel.close();
    };
  }, []);

  // Handle clicking "Continuar con Slack"
  const handleSlackClick = () => {
    if (slackSessionActive) {
      setShowAuthContainer(true);
      return;
    }

    setIsCheckingSlack(true);
    let responded = false;

    const channel = new BroadcastChannel('slack_auth_channel');
    
    const tempListener = (event) => {
      if (event.data === 'PONG_SLACK') {
        responded = true;
        setSlackSessionActive(true);
        setShowAuthContainer(true);
        setIsCheckingSlack(false);
        channel.removeEventListener('message', tempListener);
      }
    };
    
    channel.addEventListener('message', tempListener);
    
    // Broadcast ping to detect if Slack is open in another tab
    channel.postMessage('PING_SLACK');

    // Wait a brief moment for same-origin tabs to respond
    setTimeout(() => {
      channel.removeEventListener('message', tempListener);
      channel.close();
      
      if (!responded) {
        setIsCheckingSlack(false);
        // Redirect: Open Slack Mock portal in a new tab
        window.open('/slack-mock', '_blank');
      }
    }, 450);
  };

  // Perform full authorization and transition to dashboard
  const handleAuthorize = () => {
    // Generate mock token and log user in via context
    const mockToken = 'slack_oauth_token_' + Math.random().toString(36).substr(2, 9);
    login(mockToken, 'Manuel Gómez', MOCK_SLACK_AVATAR);
    navigate('/dashboard');
  };

  // Toggle helper to quickly test both flows
  const toggleSlackSession = () => {
    const newState = !slackSessionActive;
    localStorage.setItem('slack_session_active', newState ? 'true' : 'false');
    setSlackSessionActive(newState);
    if (!newState) {
      setShowAuthContainer(false);
    }
  };

  return (
    <AuthLayout>
      {/* Dynamic Session Simulator Switch (For testing all flows effortlessly) */}
      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md border border-gray-100 p-2.5 rounded-xl shadow-card z-50 flex items-center gap-3 text-xs font-semibold">
        <div className="flex items-center gap-1.5">
          <span className={`w-2.5 h-2.5 rounded-full ${slackSessionActive ? 'bg-success animate-pulse' : 'bg-red-500'}`} />
          <span className="text-gray-500">Slack: {slackSessionActive ? 'Sesión Abierta' : 'Sin Sesión'}</span>
        </div>
        <button
          onClick={toggleSlackSession}
          className="px-2 py-1 rounded bg-brand-purple/10 text-brand-purple hover:bg-brand-purple/20 transition text-[10px] font-bold uppercase tracking-wider"
        >
          Alternar Estado
        </button>
      </div>

      {/* CASE 1: Checking Slack Tab State Loader */}
      {isCheckingSlack && (
        <div className="text-center py-8 animate-fade-in flex flex-col items-center justify-center">
          <Loader2 className="w-12 h-12 text-brand-purple animate-spin mb-4" />
          <h2 className="text-lg font-bold text-gray-800">Verificando pestaña de Slack...</h2>
          <p className="text-xs text-gray-400 mt-1 max-w-xs leading-relaxed">
            Buscando una sesión iniciada de Slack en tu navegador. Si no se detecta, abriremos el portal de inicio de sesión.
          </p>
        </div>
      )}

      {/* CASE 2: Slack Permission Authorization Screen */}
      {!isCheckingSlack && showAuthContainer && (
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
              El Sistema de Reportes solicita permisos en el workspace <strong className="text-gray-700">AprendeLoPE</strong>
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
                  <p className="text-[11px] text-gray-500 font-medium">Leer tu nombre completo (<strong>Manuel Gómez</strong>) y foto de avatar.</p>
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
              onClick={() => setShowAuthContainer(false)}
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
      )}

      {/* CASE 3: Initial Screen */}
      {!isCheckingSlack && !showAuthContainer && (
        <div className="animate-fade-up">
          <div className="text-center mb-10">
            <div className="w-20 h-20 mx-auto mb-6 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-gray-100 transform -rotate-3">
              <span className="text-brand-purple font-black text-3xl">aP</span>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Bienvenido de nuevo</h1>
            <p className="text-sm text-gray-500 mt-2 font-medium">Sistema de Reportes • AprendeLoPE</p>
          </div>

          <div className="space-y-5">
            <button
              onClick={handleSlackClick}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border-2 border-[#E01E5A]/20 text-gray-800 font-bold rounded-2xl hover:bg-gray-50 hover:border-[#E01E5A] transition-all shadow-sm hover:shadow-md group active:scale-[0.98]"
            >
              <svg className="w-6 h-6 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522v-2.521zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.523-2.522v-2.522h2.523zM15.165 17.688a2.527 2.527 0 0 1-2.523-2.523 2.526 2.526 0 0 1 2.523-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#E01E5A" />
              </svg>
              Continuar con Slack
            </button>

            <div className="relative mt-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-400 text-xs uppercase tracking-widest">Acceso Restringido</span>
              </div>
            </div>
            
            <p className="text-xs text-center text-gray-400 mt-4 leading-relaxed">
              Para ingresar necesitas una cuenta activa en el workspace oficial de <span className="font-semibold text-gray-600">AprendeLoPE</span>.
            </p>
          </div>
        </div>
      )}
    </AuthLayout>
  );
};

export default LoginPage;