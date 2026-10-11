export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-800 bg-slate-950 px-4 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <p className="text-sm text-slate-400">
          © {new Date().getFullYear()} Gefferson Casasola
        </p>

        <p className="text-sm text-slate-500">
          Proyecto desarrollado con React y Tailwind CSS
        </p>

        <a
          href="https://rickandmortyapi.com/"
          target="_blank"
          rel="noreferrer"
          className="text-sm text-green-400 transition-colors hover:text-green-300"
        >
          Datos proporcionados por Rick and Morty API
        </a>
      </div>
    </footer>
  );
}
