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
    <div className="mx-auto max-w-7xl mb-16 flex justify-center">
      <div className="relative w-64 sm:w-80">
        {/* Icono de búsqueda */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        >
          <circle cx="10" cy="10" r="7" />
          <path d="m21 21-6-6" />
        </svg>

        {/* Input */}
        <input
          id={idText}
          ref={inputRef}
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Buscar personaje..."
          autoComplete="off"
          aria-label="Buscar personajes por nombre"
          className="w-full bg-slate-950 text-slate-100 placeholder:text-slate-500 border border-slate-600 rounded-lg py-3 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-300 focus:bg-slate-900"
        />

        {/* Botón para limpiar */}
        {value && (
          <button
            type="button"
            onClick={onClear}
            aria-label="Limpiar búsqueda"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-green-400 transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-x"
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
