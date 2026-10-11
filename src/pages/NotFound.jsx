import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-slate-950 text-white">
      <div className="max-w-md rounded-2xl bg-red-950/20 p-8 text-center border border-red-500/40 backdrop-blur-sm">
        <p className="text-2xl font-black text-red-500 tracking-wide mb-1">
          💥 ¡WUBBA LUBBA DUB DUB!
        </p>
        <h1 className="text-4xl font-bold text-red-500 mb-1">404</h1>
        <p className="ml-4 text-xl font-medium mb-2">Página no encontrada</p>
        <Link
          to="/"
          className="ml-4 text-green-400 hover:text-green-500 transition-colors duration-300"
        >
          ← Volver al listado
        </Link>
      </div>
    </div>
  );
}
