import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    `transition-colors duration-300 ${
      isActive
        ? "text-green-400"
        : "text-slate-300 hover:text-green-400"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-black tracking-wide text-green-400 sm:text-2xl"
        >
          RICK<span className="text-slate-100"> & </span>MORTY
        </Link>

        {/* Navegación */}
        <div className="flex items-center gap-5 text-sm font-semibold sm:gap-8 sm:text-base">
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
            className="text-slate-300 transition-colors duration-300 hover:text-green-400"
          >
            API oficial ↗
          </a>
        </div>
      </nav>
    </header>
  );
}

