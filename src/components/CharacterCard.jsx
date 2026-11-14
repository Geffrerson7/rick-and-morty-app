import { Link, useLocation } from "react-router-dom";
import { traducirEspecie, traducirEstado } from "../helpers/textos";

/**
 * Tarjeta de personaje del listado principal.
 * El enlace guarda la URL del listado (página y búsqueda incluidas) para que la
 * ficha pueda ofrecer una vuelta exacta al punto de partida.
 */
export function CharacterCard({ character, index }) {
  const { pathname, search } = useLocation();

  return (
    <Link
      to={`/personaje/${character.id}`}
      state={{ desde: `${pathname}${search}` }}
      viewTransition
      className="group relative flex flex-col border border-line bg-ink-soft/40 p-3 transition-colors duration-300 hover:border-acid/60 focus-visible:ring-2 focus-visible:ring-acid focus-visible:ring-offset-2 focus-visible:ring-offset-ink active:scale-[0.99]"
    >
      {Number.isInteger(index) && (
        <span
          aria-hidden="true"
          className="absolute right-3 top-3 z-10 bg-ink/85 px-1.5 py-0.5 font-mono text-micro tracking-[0.18em] text-muted"
        >
          {String(index + 1).padStart(3, "0")}
        </span>
      )}

      <div className="overflow-hidden bg-ink">
        <img
          src={character.image}
          alt={character.name}
          width="300"
          height="300"
          loading="lazy"
          decoding="async"
          className="aspect-square w-full object-cover grayscale-[35%] transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
        />
      </div>

      <div className="flex flex-1 flex-col pt-4">
        <h2 className="font-display text-2xl uppercase leading-tight text-paper transition-colors duration-300 group-hover:text-acid">
          {character.name}
        </h2>

        <div className="mt-auto flex items-baseline justify-between gap-2 pt-3 font-mono text-label uppercase tracking-[0.16em] text-muted">
          <span>{traducirEspecie(character.species)}</span>
          <span className="text-paper/70">
            {traducirEstado(character.status)}
          </span>
        </div>
      </div>
    </Link>
  );
}

/**
 * Fila de personaje dentro del detalle de un episodio.
 * Conserva el contexto del episodio en el enlace.
 */
export function CharacterRow({ character, episodeId }) {
  return (
    <Link
      to={`/episodios/${episodeId}/personaje/${character.id}`}
      viewTransition
      className="group flex items-center gap-4 border border-line bg-ink-soft/30 p-3 transition-colors duration-300 hover:border-acid/60 focus-visible:ring-2 focus-visible:ring-acid focus-visible:ring-offset-2 focus-visible:ring-offset-ink active:scale-[0.99]"
    >
      <img
        src={character.image}
        alt={character.name}
        width="300"
        height="300"
        loading="lazy"
        decoding="async"
        className="h-20 w-20 shrink-0 border border-line object-cover grayscale-[25%] transition duration-500 group-hover:grayscale-0"
      />

      <div className="min-w-0 flex-1">
        <h3 className="truncate font-display text-xl uppercase leading-tight text-paper transition-colors duration-300 group-hover:text-acid">
          {character.name}
        </h3>

        <p className="mt-1 font-mono text-label uppercase tracking-[0.16em] text-muted">
          Especie: {traducirEspecie(character.species)}
        </p>

        <p className="mt-0.5 font-mono text-label uppercase tracking-[0.16em] text-muted">
          Estado: {traducirEstado(character.status)}
        </p>

        <span className="mt-2 inline-block font-mono text-label uppercase tracking-[0.2em] text-acid">
          Ver expediente →
        </span>
      </div>
    </Link>
  );
}
