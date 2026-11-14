/**
 * Paginación compartida por los listados.
 * `onChange` recibe el setter de la página para conservar las actualizaciones
 * funcionales (imprescindibles si se pulsa dos veces antes de re-renderizar).
 * `contexto` da nombre a los botones para los lectores de pantalla y el
 * contador se anuncia al cambiar de página.
 */
export default function Pagination({
  page,
  totalPages,
  onChange,
  disabled = false,
  contexto = "resultados",
}) {
  return (
    <div
      role="group"
      aria-label={`Paginación de ${contexto}`}
      className="mx-auto mt-10 flex max-w-7xl flex-wrap items-center justify-center gap-4"
    >
      <button
        type="button"
        onClick={() => onChange((actual) => actual - 1)}
        disabled={disabled || page === 1}
        aria-label={`Página anterior de ${contexto}`}
        className="rounded-lg border border-slate-700 bg-slate-900 px-5 py-2 font-semibold text-slate-200 transition-all duration-300 hover:border-green-500 hover:text-green-400 focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
      >
        ← Anterior
      </button>

      <span aria-live="polite" className="text-sm font-medium text-slate-300">
        Página {page} de {totalPages}
      </span>

      <button
        type="button"
        onClick={() => onChange((actual) => actual + 1)}
        disabled={disabled || page === totalPages}
        aria-label={`Página siguiente de ${contexto}`}
        className="rounded-lg border border-slate-700 bg-slate-900 px-5 py-2 font-semibold text-slate-200 transition-all duration-300 hover:border-green-500 hover:text-green-400 focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Siguiente →
      </button>
    </div>
  );
}
