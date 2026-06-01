import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import { Home } from 'lucide-react';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-[#34155E]/10 via-white to-[#EE531F]/10 text-center p-6 font-sans relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#34155E]/10 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#EE531F]/10 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="max-w-md w-full bg-white/70 backdrop-blur-md border border-white/50 p-8 rounded-3xl shadow-elevated animate-fade-up">
        {/* Large 404 badge */}
        <div className="relative mb-6 inline-block">
          <span className="text-9xl font-black bg-gradient-to-r from-[#34155E] via-[#EE531F] to-[#F9A825] bg-clip-text text-transparent opacity-80 leading-none select-none">
            404
          </span>
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white px-3 py-0.5 rounded-full border border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-widest shadow-sm">
            Ruta Inexistente
          </span>
        </div>

        <h2 className="text-2xl font-black text-gray-900 mb-2">
          ¿Te has perdido?
        </h2>
        <p className="text-gray-500 mb-8 text-sm leading-relaxed">
          Lo sentimos, la página que buscas no existe o fue movida en el sistema de reportes de <strong className="text-gray-700">AprendeLoPE</strong>.
        </p>

        <div className="flex justify-center">
          <Button
            label="Volver al Inicio"
            icon={Home}
            onClick={() => navigate('/')}
            variant="purple"
            className="shadow-md hover:shadow-lg transition-all"
          />
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;