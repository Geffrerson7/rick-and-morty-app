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
  const boton =
    "border border-line px-4 py-2 font-mono text-label uppercase tracking-[0.2em] text-muted transition-colors duration-300 hover:border-acid hover:text-acid focus-visible:ring-2 focus-visible:ring-acid focus-visible:ring-offset-2 focus-visible:ring-offset-ink active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div
      role="group"
      aria-label={`Paginación de ${contexto}`}
      className="flex flex-wrap items-center justify-center gap-2 sm:justify-start"
    >
      <button
        type="button"
        onClick={() => onChange((actual) => actual - 1)}
        disabled={disabled || page === 1}
        aria-label={`Página anterior de ${contexto}`}
        className={boton}
      >
        ← Anterior
      </button>

      <span
        aria-live="polite"
        className="min-w-28 px-2 text-center font-mono text-label uppercase tracking-[0.18em] text-paper tabular-nums"
      >
        Página {page} de {totalPages}
      </span>

      <button
        type="button"
        onClick={() => onChange((actual) => actual + 1)}
        disabled={disabled || page === totalPages}
        aria-label={`Página siguiente de ${contexto}`}
        className={boton}
      >
        Siguiente →
      </button>
    </div>
  );
}
