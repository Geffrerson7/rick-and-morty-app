import { Link, useParams } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import { CharacterRow } from "../components/CharacterCard";
import ErrorState from "../components/ErrorState";
import PageLoader from "../components/PageLoader";
import { useEpisode } from "../hooks/useEpisode";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function EpisodioDetalle() {
  const { episodioId } = useParams();
  const { episode, characters, loading, error, notFound } =
    useEpisode(episodioId);
  useDocumentTitle(episode?.name ?? "Episodio");

  const volverAction = (
    <Link
      to="/episodios"
      className="mt-4 inline-block text-green-400 hover:text-green-500 transition-colors duration-300"
    >
      ← Volver al listado
    </Link>
  );

  if (loading) return <PageLoader message="CARGANDO EPISODIO..." />;

  if (error) return <ErrorState message={error} action={volverAction} />;

  if (notFound || !episode) {
    return (
      <ErrorState message="Episodio no encontrado" action={volverAction} />
    );
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Episodios", to: "/episodios" },
          { label: episode.name, to: `/episodios/${episode.id}` },
        ]}
      />
      <div className="flex-1 bg-slate-950 px-4 py-12 text-slate-100 sm:px-6 lg:px-8">
        {/* Información del episodio */}
        <div className="mx-auto mb-12 max-w-7xl text-center">
          <h1 className="bg-linear-to-r from-lime-400 via-green-400 to-emerald-500 bg-clip-text text-4xl font-black text-transparent sm:text-5xl lg:text-6xl p-3">
            {episode.name}
          </h1>

          <p className="mt-4 text-lg font-bold text-green-400">
            {episode.episode}
          </p>

          <p className="mt-2 text-slate-400">
            Fecha de emisión: {episode.air_date}
          </p>

          <p className="mt-2 text-sm text-slate-400">
            Personajes: {characters.length}
          </p>
        </div>

        {/* Lista de personajes */}
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-6 text-2xl font-bold text-slate-100">
            Personajes del episodio
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {characters.map((character) => (
              <CharacterRow
                key={character.id}
                character={character}
                episodeId={episode.id}
              />
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/episodios"
            className="inline-block text-green-400 transition-colors hover:text-green-300"
          >
            ← Volver a episodios
          </Link>
        </div>
      </div>
    </>
  );
}
