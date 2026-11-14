/**
 * Indicador de carga compartido.
 * `inline` lo deja dentro del área de resultados (listados);
 * por defecto ocupa la pantalla completa (vistas de detalle).
 */
export default function PageLoader({
  message = "CARGANDO MULTIVERSO...",
  inline = false,
}) {
  const indicador = (
    <span
      aria-hidden="true"
      className="relative flex h-10 w-10 items-center justify-center"
    >
      <span className="absolute inset-0 rounded-full border border-line" />
      <span className="absolute inset-0 rounded-full border-2 border-transparent border-t-acid motion-safe:animate-spin" />
      <span className="h-1 w-1 rounded-full bg-acid" />
    </span>
  );

  const texto = (
    <span className="font-mono text-label uppercase tracking-[0.24em] text-muted">
      {message}
    </span>
  );

  if (inline) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="mt-10 flex flex-wrap items-center justify-center gap-4 border border-line bg-ink-soft/30 py-14"
      >
        {indicador}
        {texto}
      </div>
    );
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[100svh] flex-1 items-center justify-center gap-4 bg-ink py-24"
    >
      {indicador}
      {texto}
    </div>
  );
}
