import { useId } from "react";

/**
 * Buscador de personajes. El input se mantiene montado durante las cargas;
 * la limpieza devuelve el foco al campo desde la página.
 */
export default function CharacterSearch({
  value,
  onChange,
  onClear,
  inputRef,
}) {
  const idText = useId();

  return (
    <div className="w-full">
      <div className="group relative border border-line bg-ink-soft/50 transition-colors duration-300 focus-within:border-acid focus-within:ring-1 focus-within:ring-acid">
        {/* Icono de búsqueda */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted transition-colors duration-300 group-focus-within:text-acid"
        >
          <circle cx="10" cy="10" r="7" />
          <path d="m21 21-6-6" />
        </svg>

        {/* Input */}
        <label htmlFor={idText} className="sr-only">
          Buscar personajes por nombre
        </label>
        <input
          id={idText}
          ref={inputRef}
          type="search"
          value={value}
          onChange={onChange}
          placeholder="Buscar personaje..."
          autoComplete="off"
          className="w-full bg-transparent py-4 pl-12 pr-12 font-mono text-base tracking-wide text-paper placeholder:text-muted focus:outline-none"
        />

        {/* Botón para limpiar */}
        {value && (
          <button
            type="button"
            onClick={onClear}
            aria-label="Limpiar búsqueda"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted transition-colors duration-200 hover:text-acid focus-visible:ring-2 focus-visible:ring-acid"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M18 6l-12 12" />
              <path d="M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
