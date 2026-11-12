import { Link } from "react-router-dom";

/**
 * Tarjeta de personaje del listado principal.
 */
export function CharacterCard({ character }) {
  return (
    <Link
      to={`/personaje/${character.id}`}
      className="flex flex-col items-center rounded-2xl bg-slate-950/20 p-6 shadow-sm border border-slate-800 hover:shadow-md transition-shadow duration-300"
    >
      <img
        src={character.image}
        alt={character.name}
        className="w-full h-auto rounded-lg mb-4 transition-transform duration-300 transform hover:scale-105"
      />
      <p className="text-lg font-semibold text-slate-100 text-center hover:text-green-400 transition-colors duration-300">
        {character.name} — {character.species}
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
      className="flex items-center gap-4 overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition-all duration-300 hover:border-green-500 hover:bg-slate-900"
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
          Especie: {character.species}
        </p>

        <p className="mt-1 text-sm text-slate-400">
          Estado: {character.status}
        </p>

        <span className="mt-3 inline-block text-xs font-bold text-slate-300">
          Ver expediente →
        </span>
      </div>
    </Link>
  );
}
