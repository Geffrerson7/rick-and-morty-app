import { Link } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function NotFound() {
  useDocumentTitle("Página no encontrada");

  return (
    <div className="blueprint flex flex-1 flex-col items-center justify-center bg-ink px-4 py-24 text-paper">
      <p
        aria-hidden="true"
        className="font-display text-[clamp(5rem,22vw,11rem)] leading-none text-acid"
      >
        404
      </p>

      <p className="mt-2 font-mono text-label uppercase tracking-[0.28em] text-muted">
        💥 ¡WUBBA LUBBA DUB DUB!
      </p>

      <h1 className="mt-5 font-display text-3xl uppercase leading-tight sm:text-4xl">
        Página no encontrada
      </h1>

      <Link
        to="/"
        viewTransition
        className="mt-8 border border-line px-6 py-3 font-mono text-label uppercase tracking-[0.2em] text-paper transition-colors duration-300 hover:border-acid hover:text-acid focus-visible:ring-2 focus-visible:ring-acid focus-visible:ring-offset-2 focus-visible:ring-offset-ink active:scale-[0.98]"
      >
        ← Volver al listado
      </Link>
    </div>
  );
}
