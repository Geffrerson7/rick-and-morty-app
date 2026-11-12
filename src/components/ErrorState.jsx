/**
 * Estado de error compartido. `action` recibe el control que corresponda a
 * cada vista (reintentar, volver al listado, etc.).
 */
export default function ErrorState({
  title = "💥 ¡WUBBA LUBBA DUB DUB!",
  message,
  action = null,
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="max-w-md rounded-2xl bg-red-950/20 p-8 text-center border border-red-500/40 backdrop-blur-sm">
        <p className="text-2xl font-black text-red-500 tracking-wide">
          {title}
        </p>
        <p className="mt-3 text-slate-400 font-medium">{message}</p>
        {action}
      </div>
    </div>
  );
}
