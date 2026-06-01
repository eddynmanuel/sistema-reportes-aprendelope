// ============================================================
// Loader — Indicador de carga premium
// Muestra tres puntos pulsantes con los colores de la marca.
// ============================================================
const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full py-16 gap-4">
      {/* Tres puntos animados */}
      <div className="flex items-center gap-2">
        <span className="dot-1 w-3 h-3 rounded-full bg-[#34155E] inline-block" />
        <span className="dot-2 w-3 h-3 rounded-full bg-[#EE531F] inline-block" />
        <span className="dot-3 w-3 h-3 rounded-full bg-[#F9A825] inline-block" />
      </div>
      <p className="text-sm text-gray-400 font-medium animate-pulse">Cargando datos...</p>
    </div>
  );
};

export default Loader;