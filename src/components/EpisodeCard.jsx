import { Link } from "react-router-dom";

/**
 * Tarjeta de episodio del archivo de episodios.
 */
export default function EpisodeCard({ episode }) {
  return (
    <article className="group relative flex flex-col justify-between border border-line bg-ink-soft/40 transition-colors duration-300 hover:border-acid/60">
      {/* Cabecera interna de la Card */}
      <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-3 font-mono text-label uppercase tracking-[0.2em]">
        {/* Badge de Temporada / Episodio */}
        <span className="text-acid">{episode.episode}</span>
        {/* ID de Registro */}
        <span className="text-muted">
          #REG-{String(episode.id).padStart(3, "0")}
        </span>
      </div>

      {/* Título del episodio */}
      <div className="p-5">
        <h2 className="font-display text-2xl uppercase leading-tight text-paper transition-colors duration-300 group-hover:text-acid line-clamp-2">
          {episode.name}
        </h2>
      </div>

      {/* Bloque de Información Técnica e Indicadores */}
      <div className="px-5 pb-5">
        <dl className="grid grid-cols-2 gap-4 border-t border-line pt-4 font-mono text-label uppercase tracking-[0.16em]">
          {/* Métrica 1: Fecha de estreno */}
          <div className="flex flex-col">
            <dt className="text-muted">Transmisión</dt>
            <dd className="mt-1 truncate text-paper">{episode.air_date}</dd>
          </div>

          {/* Métrica 2: Cantidad de personajes (.length) */}
          <div className="flex flex-col border-l border-line pl-4">
            <dt className="text-muted">Personajes</dt>
            <dd className="mt-1 flex items-baseline gap-1 text-acid">
              {episode.characters?.length || 0}
              <span className="text-label font-normal tracking-[0.16em] text-muted">
                en escena
              </span>
            </dd>
          </div>
        </dl>

        {/* Acción principal */}
        <Link
          to={`/episodios/${episode.id}`}
          viewTransition
          className="mt-5 flex items-center justify-between gap-3 border border-line px-4 py-2.5 font-mono text-label uppercase tracking-[0.2em] text-muted transition-colors duration-300 hover:border-acid hover:text-acid focus-visible:ring-2 focus-visible:ring-acid focus-visible:ring-offset-2 focus-visible:ring-offset-ink active:scale-[0.98]"
        >
          <span>Ver Reporte de Misión</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
