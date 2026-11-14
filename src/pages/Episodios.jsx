import Breadcrumbs from "../components/Breadcrumbs";
import EpisodeCard from "../components/EpisodeCard";
import ErrorState from "../components/ErrorState";
import PageLoader from "../components/PageLoader";
import Pagination from "../components/Pagination";
import { useEpisodes } from "../hooks/useEpisodes";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useListParams } from "../hooks/useListParams";

export default function Episodios() {
  useDocumentTitle("Episodios");
  const { pagina, setPagina, reajustarPagina } = useListParams();

  const { episodes, loading, error, totalPages, retry } = useEpisodes(pagina, {
    onPageOutOfRange: reajustarPagina,
  });

  if (error) {
    return <ErrorState message={error} onRetry={retry} />;
  }

  return (
    <>
      <Breadcrumbs items={[{ label: "Episodios", to: "/episodios" }]} />
      <div className="flex-1 bg-[radial-gradient(120%_80%_at_50%_-10%,var(--color-ink-soft),var(--color-ink)_70%)] px-4 pb-20 pt-8 text-paper sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          {/* Cinta de archivo */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-line pb-3 font-mono text-label uppercase tracking-[0.24em] text-muted">
            <span className="inline-flex items-center gap-2 text-acid">
              <span aria-hidden="true" className="h-1.5 w-1.5 bg-acid" />
              Archivo 002
            </span>
            <span>Registro de episodios</span>
            <span aria-hidden="true" className="ml-auto hidden sm:inline">
              Emisiones / Multiverso
            </span>
          </div>

          {/* Portada editorial */}
          <div className="grid gap-10 pt-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-8">
              <h1 className="reveal font-display text-display uppercase text-paper">
                ARCHIVO DE{" "}
                <span className="block text-acid">EPISODIOS</span>
              </h1>
            </div>

            <div className="flex flex-col justify-end gap-6 lg:col-span-4">
              <p
                className="reveal max-w-sm text-base leading-relaxed text-muted"
                style={{ "--reveal-index": 1 }}
              >
                Explora aventuras, temporadas y viajes a través del multiverso.
              </p>

              <div
                className="reveal border border-line bg-ink px-4 py-3 font-mono text-label uppercase tracking-[0.18em]"
                style={{ "--reveal-index": 2 }}
              >
                <p className="text-muted">Página</p>
                <p className="mt-1 text-base text-acid tabular-nums">
                  {pagina} / {totalPages || "—"}
                </p>
              </div>
            </div>
          </div>

          {/* Paginación: visible también durante la carga, pero deshabilitada */}
          <div className="mt-12 border-y border-line py-5">
            <Pagination
              page={pagina}
              totalPages={totalPages}
              onChange={setPagina}
              disabled={loading}
              contexto="episodios"
            />
          </div>

          {loading ? (
            <PageLoader inline />
          ) : (
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {episodes.map((episode) => (
                <EpisodeCard key={episode.id} episode={episode} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
