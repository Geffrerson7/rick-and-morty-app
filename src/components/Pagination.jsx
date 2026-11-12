/**
 * Paginación compartida por los listados.
 * `onChange` recibe el setter de la página para conservar las actualizaciones
 * funcionales (imprescindibles si se pulsa dos veces antes de re-renderizar).
 */
export default function Pagination({
  page,
  totalPages,
  onChange,
  disabled = false,
}) {
  return (
    <div className="mx-auto mt-10 flex max-w-7xl flex-wrap items-center justify-center gap-4">
      <button
        type="button"
        onClick={() => onChange((actual) => actual - 1)}
        disabled={disabled || page === 1}
        className="rounded-lg border border-slate-700 bg-slate-900 px-5 py-2 font-semibold text-slate-200 transition-colors hover:border-green-500 hover:text-green-400 disabled:cursor-not-allowed disabled:opacity-40"
      >
        ← Previous
      </button>

      <span className="text-sm font-medium text-slate-300">
        Page {page} of {totalPages}
      </span>

      <button
        type="button"
        onClick={() => onChange((actual) => actual + 1)}
        disabled={disabled || page === totalPages}
        className="rounded-lg border border-slate-700 bg-slate-900 px-5 py-2 font-semibold text-slate-200 transition-colors hover:border-green-500 hover:text-green-400 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next →
      </button>
    </div>
  );
}
