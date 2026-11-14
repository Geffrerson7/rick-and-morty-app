import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    `rounded-md py-1 transition-colors duration-300 ${
      isActive
        ? "text-green-400"
        : "text-slate-300 hover:text-green-400"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <nav
        aria-label="Principal"
        className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-3 sm:px-6 sm:py-4 lg:px-8"
      >
        {/* Logo */}
        <Link
          to="/"
          className="text-lg font-black tracking-wide text-green-400 sm:text-2xl"
        >
          RICK<span className="text-slate-100"> & </span>MORTY
        </Link>

        {/* Navegación */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold sm:gap-8 sm:text-base">
          <NavLink to="/" end className={linkClass}>
            Personajes
          </NavLink>
          <NavLink to="/episodios" end className={linkClass}>
            Episodios
          </NavLink>

          <a
            href="https://rickandmortyapi.com/"
            target="_blank"
            rel="noreferrer"
            className="rounded-md py-1 text-slate-300 transition-colors duration-300 hover:text-green-400"
          >
            API oficial ↗
          </a>
        </div>
      </nav>
    </header>
  );
}
