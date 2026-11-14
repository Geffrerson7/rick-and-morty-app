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
      className="mt-4 inline-block font-mono text-label uppercase tracking-[0.2em] text-acid transition-colors duration-300 hover:text-paper"
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
      <div className="flex-1 bg-[radial-gradient(120%_80%_at_50%_-10%,var(--color-ink-soft),var(--color-ink)_70%)] px-4 pb-24 pt-8 text-paper sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          {/* Información del episodio */}
          <div className="grid gap-10 border-b border-line pb-10 lg:grid-cols-12 lg:items-end lg:gap-8">
            <div className="lg:col-span-8">
              <p className="font-mono text-label uppercase tracking-[0.28em] text-acid">
                {episode.episode} / Registro de misión
              </p>

              <h1 className="mt-4 font-display text-display uppercase leading-[0.9] text-paper">
                {episode.name}
              </h1>
            </div>

            <dl className="grid grid-cols-2 gap-px border border-line bg-line font-mono text-label uppercase tracking-[0.18em] lg:col-span-4">
              <div className="bg-ink px-4 py-3">
                <dt className="text-muted">Emisión</dt>
                <dd className="mt-1 text-paper">{episode.air_date}</dd>
              </div>
              <div className="bg-ink px-4 py-3">
                <dt className="text-muted">Personajes</dt>
                <dd className="mt-1 text-acid tabular-nums">
                  {characters.length}
                </dd>
              </div>
            </dl>
          </div>

          {/* Lista de personajes */}
          <div className="mt-12 flex items-end justify-between gap-4">
            <h2 className="font-display text-2xl uppercase text-paper">
              Personajes del episodio
            </h2>
            <span
              aria-hidden="true"
              className="mb-2 hidden h-px flex-1 bg-line sm:block"
            />
            <span className="font-mono text-label uppercase tracking-[0.2em] text-muted">
              {characters.length} fichas
            </span>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {characters.map((character) => (
              <CharacterRow
                key={character.id}
                character={character}
                episodeId={episode.id}
              />
            ))}
          </div>

          <div className="mt-12 border-t border-line pt-6">
            <Link
              to="/episodios"
              viewTransition
              className="inline-flex items-center gap-2 font-mono text-label uppercase tracking-[0.2em] text-muted transition-colors duration-300 hover:text-acid"
            >
              <span aria-hidden="true">←</span>
              Volver a episodios
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
