import { Link, useLocation } from "react-router-dom";
import { traducirEspecie, traducirEstado } from "../helpers/textos";

/**
 * Tarjeta de personaje del listado principal.
 * El enlace guarda la URL del listado (página y búsqueda incluidas) para que la
 * ficha pueda ofrecer una vuelta exacta al punto de partida.
 */
export function CharacterCard({ character }) {
  const { pathname, search } = useLocation();

  return (
    <Link
      to={`/personaje/${character.id}`}
      state={{ desde: `${pathname}${search}` }}
      className="group flex flex-col items-center rounded-2xl bg-slate-950/20 p-6 shadow-sm border border-slate-800 transition-all duration-300 hover:shadow-md focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 active:scale-[0.99]"
    >
      <img
        src={character.image}
        alt={character.name}
        width="300"
        height="300"
        loading="lazy"
        decoding="async"
        className="w-full h-auto rounded-lg mb-4 transition-transform duration-300 transform hover:scale-105"
      />
      <h2 className="text-lg font-semibold text-slate-100 text-center transition-colors duration-300 group-hover:text-green-400">
        {character.name}
      </h2>
      <p className="mt-1 text-sm text-slate-400 text-center">
        {traducirEspecie(character.species)}
      </p>
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
      className="flex items-center gap-4 overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition-all duration-300 hover:border-green-500 hover:bg-slate-900 focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 active:scale-[0.99]"
    >
      <img
        src={character.image}
        alt={character.name}
        className="h-24 w-24 shrink-0 rounded-lg object-cover"
      />

      <div className="min-w-0">
        <h3 className="truncate text-lg font-bold text-green-400">
          {character.name}
        </h3>

        <p className="mt-1 text-sm text-slate-400">
          Especie: {traducirEspecie(character.species)}
        </p>

        <p className="mt-1 text-sm text-slate-400">
          Estado: {traducirEstado(character.status)}
        </p>

        <span className="mt-3 inline-block text-xs font-bold text-slate-300">
          Ver expediente →
        </span>
      </div>
    </Link>
  );
}
