export default function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-ink px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <p className="font-display text-[clamp(1.75rem,6vw,3.5rem)] leading-none text-paper">
          EXPLORA EL <span className="text-acid">MULTIVERSO</span>
        </p>

        <div className="mt-8 flex flex-col gap-3 border-t border-line pt-6 font-mono text-label uppercase tracking-[0.2em] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Gefferson Casasola</p>

          <p>React · Tailwind CSS · Vite</p>

          <a
            href="https://rickandmortyapi.com/"
            target="_blank"
            rel="noreferrer"
            className="text-muted transition-colors duration-300 hover:text-acid"
          >
            Datos: Rick and Morty API ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
