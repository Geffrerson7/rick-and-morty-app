import { Link } from "react-router-dom";

/**
 * Tarjeta de episodio del archivo de episodios.
 */
export default function EpisodeCard({ episode }) {
  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-md shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-lime-500/30 hover:shadow-lime-950/30">
      {/* Cabecera interna de la Card */}
      <div className="p-6">
        <div className="flex items-center justify-between gap-4">
          {/* Badge de Temporada / Episodio */}
          <span className="inline-flex items-center rounded-lg bg-lime-500/10 px-3 py-1 text-xs font-black tracking-wider text-lime-400 uppercase ring-1 ring-inset ring-lime-400/20">
            {episode.episode}
          </span>
          {/* ID de Registro */}
          <span className="text-xs font-mono text-slate-600">
            #REG-{String(episode.id).padStart(3, "0")}
          </span>
        </div>

        {/* Título del episodio */}
        <h3 className="mt-5 text-2xl font-extrabold text-white tracking-tight leading-snug group-hover:text-lime-400 transition-colors duration-300 line-clamp-2">
          {episode.name}
        </h3>
      </div>

      {/* Bloque de Información Técnica e Indicadores */}
      <div className="px-6 pb-6 mt-auto">
        <div className="grid grid-cols-2 gap-4 rounded-xl bg-slate-950/60 p-4 border border-slate-800/40">
          {/* Métrica 1: Fecha de estreno */}
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Transmisión
            </span>
            <span className="mt-1 text-xs font-semibold text-slate-300 truncate">
              {episode.air_date}
            </span>
          </div>

          {/* Métrica 2: Cantidad de personajes (.length) */}
          <div className="flex flex-col border-l border-slate-800/80 pl-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Personajes
            </span>
            <span className="mt-1 flex items-center text-sm font-black text-lime-400">
              {episode.characters?.length || 0}
              <span className="ml-1 text-[11px] font-normal text-slate-400">
                en escena
              </span>
            </span>
          </div>
        </div>

        {/* Botón de acción cosmético / expandible */}
        <Link
          to={`/episodios/${episode.id}`}
          className="mt-4 block w-full rounded-xl bg-slate-800 py-2.5 text-center text-xs font-bold text-slate-300 transition-all duration-300 hover:bg-lime-500 hover:text-slate-950 active:scale-[0.98]"
        >
          Ver Reporte de Misión
        </Link>
      </div>
    </div>
  );
}
