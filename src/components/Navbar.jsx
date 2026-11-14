import { Link, NavLink } from "react-router-dom";

const enlaceBase =
  "relative flex items-baseline gap-1.5 pb-1 font-mono text-label uppercase tracking-[0.14em] transition-colors duration-300 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:bg-acid after:transition-transform after:duration-300 sm:text-[11px] sm:tracking-[0.18em]";

function EnlaceNav({ to, numero, children }) {
  return (
    <NavLink
      to={to}
      end
      viewTransition
      className={({ isActive }) =>
        `${enlaceBase} ${
          isActive
            ? "text-acid after:scale-x-100"
            : "text-muted after:scale-x-0 hover:text-paper hover:after:scale-x-100"
        }`
      }
    >
      <span
        aria-hidden="true"
        className="hidden text-micro tracking-normal opacity-70 sm:inline"
      >
        {numero}
      </span>
      <span>{children}</span>
    </NavLink>
  );
}

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-ink/85 backdrop-blur-md">
      <nav
        aria-label="Principal"
        className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-x-5 gap-y-2 px-4 py-3 sm:px-6 sm:py-4 lg:px-10"
      >
        {/* Wordmark */}
        <Link
          to="/"
          viewTransition
          className="group flex items-baseline gap-2 text-paper"
        >
          <span className="font-display text-lg leading-none tracking-[0.04em] sm:text-2xl">
            RICK <span className="text-acid">&</span> MORTY
          </span>
          <span
            aria-hidden="true"
            className="hidden font-mono text-micro uppercase tracking-[0.3em] text-muted lg:inline"
          >
            Archivo C-137
          </span>
        </Link>

        {/* Navegación */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 sm:gap-x-7">
          <EnlaceNav to="/" numero="01">
            Personajes
          </EnlaceNav>
          <EnlaceNav to="/episodios" numero="02">
            Episodios
          </EnlaceNav>

          <a
            href="https://rickandmortyapi.com/"
            target="_blank"
            rel="noreferrer"
            className="group flex items-baseline gap-1.5 pb-1 font-mono text-label uppercase tracking-[0.14em] text-muted transition-colors duration-300 hover:text-acid sm:text-[11px] sm:tracking-[0.18em]"
          >
            <span aria-hidden="true" className="hidden text-micro opacity-70 sm:inline">
              03
            </span>
            <span>API oficial ↗</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
