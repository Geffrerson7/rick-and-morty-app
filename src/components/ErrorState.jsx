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
      className="flex flex-1 items-center justify-center px-4 py-24"
    >
      <div className="w-full max-w-md border border-danger/40 bg-danger/5 p-8 text-center">
        <p
          aria-hidden="true"
          className="font-mono text-label uppercase tracking-[0.3em] text-danger"
        >
          Señal perdida
        </p>
        <h1 className="mt-3 font-display text-3xl uppercase leading-tight text-danger">
          {title}
        </h1>
        <p className="mt-3 text-base text-muted">{message}</p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-6 inline-block border border-danger/60 px-5 py-2 font-mono text-label uppercase tracking-[0.2em] text-paper transition-colors duration-300 hover:border-acid hover:text-acid focus-visible:ring-2 focus-visible:ring-acid focus-visible:ring-offset-2 focus-visible:ring-offset-ink active:scale-[0.98]"
          >
            ↻ Reintentar
          </button>
        )}
        {action}
      </div>
    </div>
  );
}
