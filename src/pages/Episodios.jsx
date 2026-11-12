import { useState } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import EpisodeCard from "../components/EpisodeCard";
import ErrorState from "../components/ErrorState";
import PageLoader from "../components/PageLoader";
import Pagination from "../components/Pagination";
import { useEpisodes } from "../hooks/useEpisodes";

export default function Episodios() {
  const [pagina, setPagina] = useState(1);
  const { episodes, loading, error, totalPages } = useEpisodes(pagina);

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <>
      <Breadcrumbs items={[{ label: "Episodios", to: "/episodios" }]} />
      <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 px-4 py-12 text-slate-100 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-7xl text-center">
          <h1 className="bg-linear-to-r from-lime-400 via-green-400 to-emerald-500 bg-clip-text text-5xl font-black tracking-tight text-transparent drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] sm:text-6xl">
            ARCHIVO DE EPISODIOS
          </h1>

          <p className="mx-auto mt-4 max-w-md text-lg font-medium tracking-wide text-slate-400">
            Explora aventuras, temporadas y viajes a través del multiverso.
          </p>
        </div>

        {/* Visible también durante la carga, pero deshabilitada */}
        <Pagination
          page={pagina}
          totalPages={totalPages}
          onChange={setPagina}
          disabled={loading}
        />

        {loading ? (
          <PageLoader inline />
        ) : (
          <div className="mx-auto max-w-7xl grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {episodes.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
