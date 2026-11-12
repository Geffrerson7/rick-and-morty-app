/**
 * Estado de error compartido.
 * `onRetry` muestra el botón estándar de reintento; `action` permite añadir
 * cualquier otro control (volver al listado, etc.).
 */
export default function ErrorState({
  title = "💥 ¡WUBBA LUBBA DUB DUB!",
  message,
  action = null,
  onRetry,
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="max-w-md rounded-2xl bg-red-950/20 p-8 text-center border border-red-500/40 backdrop-blur-sm">
        <p className="text-2xl font-black text-red-500 tracking-wide">
          {title}
        </p>
        <p className="mt-3 text-slate-400 font-medium">{message}</p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-6 inline-block rounded-lg bg-green-500 px-5 py-2 font-bold text-slate-950 hover:bg-green-400 transition-colors duration-300"
          >
            ↻ Reintentar
          </button>
        )}
        {action}
      </div>
    </div>
  );
}
