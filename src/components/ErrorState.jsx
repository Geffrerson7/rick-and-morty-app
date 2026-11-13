/**
 * Estado de error compartido.
 * `onRetry` muestra el botón estándar de reintento; `action` permite añadir
 * cualquier otro control (volver al listado, etc.).
 * `role="alert"` anuncia el error a los lectores de pantalla.
 */
export default function ErrorState({
  title = "💥 ¡WUBBA LUBBA DUB DUB!",
  message,
  action = null,
  onRetry,
}) {
  return (
    <div
      role="alert"
      className="flex min-h-[60vh] items-center justify-center px-4 py-20"
    >
      <div className="max-w-md rounded-2xl bg-red-950/20 p-8 text-center border border-red-500/40 backdrop-blur-sm">
        <h1 className="text-2xl font-black text-red-500 tracking-wide">
          {title}
        </h1>
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
