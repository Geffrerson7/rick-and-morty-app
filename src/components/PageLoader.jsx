/**
 * Indicador de carga compartido.
 * `inline` lo deja dentro del área de resultados (listados);
 * por defecto ocupa la pantalla completa (vistas de detalle).
 */
export default function PageLoader({
  message = "CARGANDO MULTIVERSO...",
  inline = false,
}) {
  if (inline) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="mt-10 flex flex-wrap items-center justify-center gap-3 py-16"
      >
        <div className="relative flex h-12 w-12 items-center justify-center">
          <div className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></div>
          <div className="relative inline-flex h-8 w-8 rounded-full bg-green-500"></div>
        </div>
        <span className="text-lg font-bold tracking-widest text-green-400 motion-safe:animate-pulse">
          {message}
        </span>
      </div>
    );
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-screen items-center justify-center bg-slate-950 text-white"
    >
      <div className="relative flex h-16 w-16 items-center justify-center">
        <div className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></div>
        <div className="relative inline-flex rounded-full h-12 w-12 bg-green-500"></div>
      </div>
      <span className="ml-4 text-xl font-bold tracking-widest text-green-400 motion-safe:animate-pulse">
        {message}
      </span>
    </div>
  );
}
