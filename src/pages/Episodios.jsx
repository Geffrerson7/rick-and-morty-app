import { useState, useEffect } from "react";
import { obtenerAPI } from "../helpers/api";
import { Link } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";

export default function Episodios() {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  useEffect(() => {
    const fetchEpisodes = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          page: String(pagina),
        });
        const response = await obtenerAPI(
          `https://rickandmortyapi.com/api/episode?${params}`,
        );
        setEpisodes(response.results);
        setTotalPaginas(response.info.pages);
      } catch (err) {
        setError(err.message);
        setTotalPaginas(1);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, [pagina]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></div>
          <div className="relative inline-flex rounded-full h-12 w-12 bg-green-500"></div>
        </div>
        <span className="ml-4 text-xl font-bold tracking-widest text-green-400 animate-pulse">
          CARGANDO MULTIVERSO...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
        <div className="max-w-md rounded-2xl bg-red-950/20 p-8 text-center border border-red-500/40 backdrop-blur-sm">
          <p className="text-2xl font-black text-red-500 tracking-wide">
            💥 ¡WUBBA LUBBA DUB DUB!
          </p>
          <p className="mt-3 text-slate-400 font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Breadcrumbs items={[{ label: "Episodios", to: "/episodios" }]} />
      <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 px-4 py-12 text-slate-100 sm:px-6 lg:px-8">
        {/* Encabezado Principal */}

        <div className="mx-auto mb-16 max-w-7xl text-center">
          <h1 className="bg-linear-to-r from-lime-400 via-green-400 to-emerald-500 bg-clip-text text-5xl font-black tracking-tight text-transparent drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] sm:text-6xl">
            ARCHIVO DE EPISODIOS
          </h1>

          <p className="mx-auto mt-4 max-w-md text-lg font-medium tracking-wide text-slate-400">
            Explora aventuras, temporadas y viajes a través del multiverso.
          </p>
        </div>

        {/* Paginacion */}
        {episodes.length > 0 && (
          <div className="mx-auto mt-10 flex max-w-7xl flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setPagina((actual) => actual - 1)}
              disabled={pagina === 1}
              className="rounded-lg border border-slate-700 bg-slate-900 px-5 py-2 font-semibold text-slate-200 transition-colors hover:border-green-500 hover:text-green-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ← Previous
            </button>

            <span className="text-sm font-medium text-slate-300">
              Page {pagina} of {totalPaginas}
            </span>

            <button
              type="button"
              onClick={() => setPagina((actual) => actual + 1)}
              disabled={pagina === totalPaginas}
              className="rounded-lg border border-slate-700 bg-slate-900 px-5 py-2 font-semibold text-slate-200 transition-colors hover:border-green-500 hover:text-green-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next →
            </button>
          </div>
        )}

        {/* Grid de Tarjetas Avanzadas */}
        <div className="mx-auto max-w-7xl grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {episodes.map((episode) => (
            <div
              key={episode.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-md shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-lime-500/30 hover:shadow-lime-950/30"
            >
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
          ))}
        </div>
      </div>
    </>
  );
}
