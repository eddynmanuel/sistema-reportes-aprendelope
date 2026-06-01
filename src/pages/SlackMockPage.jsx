import { useState, useEffect } from 'react';
import { ShieldCheck, Check } from 'lucide-react';

const SlackMockPage = () => {
  const [workspace, setWorkspace] = useState('aprendelope');
  const [email, setEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('slack_session_active') === 'true';
  });

  useEffect(() => {
    // Channel to communicate with the main Login Page
    const channel = new BroadcastChannel('slack_auth_channel');

    // Listen for ping requests from the reports dashboard tab
    channel.onmessage = (event) => {
      if (event.data === 'PING_SLACK') {
        channel.postMessage('PONG_SLACK');
      }
    };

    return () => {
      channel.close();
    };
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    localStorage.setItem('slack_session_active', 'true');
    setIsLoggedIn(true);

    // Notify the main reports login tab that we just logged in
    const channel = new BroadcastChannel('slack_auth_channel');
    channel.postMessage('SLACK_LOGGED_IN');
    channel.close();
  };

  const handleLogout = () => {
    localStorage.setItem('slack_session_active', 'false');
    setIsLoggedIn(false);
    
    const channel = new BroadcastChannel('slack_auth_channel');
    channel.postMessage('SLACK_LOGGED_OUT');
    channel.close();
  };

  return (
    <div className="min-h-screen bg-[#1A1D21] text-[#D1D2D3] font-sans flex flex-col items-center justify-center p-6">
      
      {/* Slack Header Logo */}
      <div className="flex items-center gap-3 mb-10 select-none">
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
          <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522v-2.521zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.523-2.522v-2.522h2.523zM15.165 17.688a2.527 2.527 0 0 1-2.523-2.523 2.526 2.526 0 0 1 2.523-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#fff" />
        </svg>
        <span className="text-2xl font-black text-white tracking-tight">slack</span>
      </div>

      {isLoggedIn ? (
        /* LOGGED IN VIEW */
        <div className="max-w-md w-full bg-[#222529] border border-white/10 rounded-2xl p-8 shadow-2xl text-center animate-fade-in">
          <div className="w-16 h-16 bg-[#2EB67D]/10 text-[#2EB67D] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#2EB67D]/20">
            <Check className="w-8 h-8" />
          </div>
          
          <h1 className="text-xl font-bold text-white mb-2">Sesión Abierta en Slack</h1>
          <p className="text-sm text-[#ABACAD] mb-6">
            Tienes una sesión iniciada con <strong className="text-white">Manuel Gómez</strong> en el espacio <strong className="text-white">{workspace}.slack.com</strong>.
          </p>

          <div className="p-4 bg-[#1A1D21] border border-white/5 rounded-xl text-xs space-y-2 mb-8 text-left">
            <div className="flex items-center gap-2 text-white font-semibold mb-1">
              <ShieldCheck className="w-4 h-4 text-[#ECB22E]" />
              <span>Verificación de Pestaña Activa</span>
            </div>
            <p className="text-[#ABACAD] leading-relaxed">
              Esta pestaña responderá automáticamente a la verificación del Sistema de Reportes cuando intentes conectarte.
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleLogout}
              className="flex-1 py-3 border border-white/10 text-white hover:bg-white/5 rounded-xl font-semibold text-sm transition-all"
            >
              Cerrar Sesión
            </button>
            <button
              onClick={() => window.close()}
              className="flex-1 py-3 bg-[#3F0E40] text-white hover:bg-[#350d36] rounded-xl font-bold text-sm transition-all border border-[#522653]"
            >
              Cerrar Pestaña
            </button>
          </div>
        </div>
      ) : (
        /* LOGGED OUT SIGN-IN VIEW */
        <div className="max-w-md w-full bg-[#222529] border border-white/10 rounded-2xl p-8 shadow-2xl animate-fade-up">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-white tracking-tight">Iniciar sesión en Slack</h1>
            <p className="text-sm text-[#ABACAD] mt-1">
              Ingresa al espacio de <strong className="text-white">{workspace}.slack.com</strong>
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#ABACAD] uppercase tracking-wider pl-1">Espacio de Slack</label>
              <div className="flex bg-[#1A1D21] border border-white/10 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#3F0E40]">
                <input
                  type="text"
                  value={workspace}
                  onChange={(e) => setWorkspace(e.target.value)}
                  className="bg-transparent border-0 outline-hidden px-4 py-3 flex-1 text-sm font-semibold text-white text-right"
                />
                <span className="bg-white/5 px-3 py-3 text-sm font-bold border-l border-white/10 text-[#ABACAD]">.slack.com</span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#ABACAD] uppercase tracking-wider pl-1">Correo Electrónico</label>
              <input
                type="email"
                required
                placeholder="nombre@aprendelope.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#1A1D21] border border-white/10 rounded-xl text-sm font-semibold text-white focus:outline-hidden focus:ring-2 focus:ring-[#3F0E40]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#ABACAD] uppercase tracking-wider pl-1">Contraseña</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-[#1A1D21] border border-white/10 rounded-xl text-sm font-semibold text-white focus:outline-hidden focus:ring-2 focus:ring-[#3F0E40]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#3F0E40] text-white hover:bg-[#350d36] rounded-xl font-black text-sm transition-all border border-[#522653] shadow-md active:scale-[0.98] mt-2"
            >
              Continuar con Correo
            </button>
          </form>

          <div className="relative mt-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-4 bg-[#222529] text-[#ABACAD] uppercase font-bold tracking-widest text-[10px]">Acceso Seguro</span>
            </div>
          </div>

          <p className="text-xs text-center text-[#ABACAD] mt-4 leading-relaxed">
            Al continuar, confirmas que eres miembro autorizado de AprendeLoPE.
          </p>
        </div>
      )}
    </div>
  );
};

export default SlackMockPage;
