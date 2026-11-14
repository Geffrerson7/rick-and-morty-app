import { useRef } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import CharacterSearch from "../components/CharacterSearch";
import { CharacterCard } from "../components/CharacterCard";
import ErrorState from "../components/ErrorState";
import PageLoader from "../components/PageLoader";
import Pagination from "../components/Pagination";
import { useCharacters } from "../hooks/useCharacters";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useListParams } from "../hooks/useListParams";

export default function Personajes() {
  useDocumentTitle("Personajes");
  const { pagina, busqueda, setPagina, buscar, reajustarPagina } =
    useListParams();
  const inputRef = useRef(null);

  const { characters, loading, error, totalPages, retry } = useCharacters({
    page: pagina,
    search: busqueda,
    onPageOutOfRange: reajustarPagina,
  });

  function handleChange(event) {
    buscar(event.target.value);
  }

  function handleClearInput(event) {
    event.preventDefault();
    buscar("");
    inputRef.current?.focus();
  }

  if (error) {
    return <ErrorState message={error} onRetry={retry} />;
  }

  // El buscador, los breadcrumbs y la paginación se mantienen montados
  // durante la carga: el loader vive solo en la zona de resultados.
  return (
    <>
      <Breadcrumbs items={[{ label: "Personajes", to: "/" }]} />
      <div className="flex-1 bg-[radial-gradient(120%_80%_at_50%_-10%,var(--color-ink-soft),var(--color-ink)_70%)] px-4 pb-20 pt-8 text-paper sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          {/* Cinta de archivo */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-line pb-3 font-mono text-label uppercase tracking-[0.24em] text-muted">
            <span className="inline-flex items-center gap-2 text-acid">
              <span aria-hidden="true" className="h-1.5 w-1.5 bg-acid" />
              Archivo 001
            </span>
            <span>Catálogo de personajes</span>
            <span aria-hidden="true" className="ml-auto hidden sm:inline">
              C-137 / Multiverso
            </span>
          </div>

          {/* Portada editorial */}
          <div className="grid gap-10 pt-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-8">
              <h1 className="reveal font-display text-display uppercase text-paper">
                EXPLORADOR{" "}
                <span className="block text-acid">DIMENSIONAL</span>
              </h1>
            </div>

            <div className="flex flex-col justify-end gap-6 lg:col-span-4">
              <p
                className="reveal max-w-sm text-base leading-relaxed text-muted"
                style={{ "--reveal-index": 1 }}
              >
                Descubre personajes de todos los rincones del multiverso.
              </p>

              <dl
                className="reveal grid grid-cols-2 gap-px border border-line bg-line font-mono text-label uppercase tracking-[0.18em]"
                style={{ "--reveal-index": 2 }}
              >
                <div className="bg-ink px-4 py-3">
                  <dt className="text-muted">Página</dt>
                  <dd className="mt-1 text-base text-paper tabular-nums">
                    {pagina} / {totalPages || "—"}
                  </dd>
                </div>
                <div className="bg-ink px-4 py-3">
                  <dt className="text-muted">En pantalla</dt>
                  <dd className="mt-1 text-base text-acid tabular-nums">
                    {loading ? "—" : characters.length}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Herramientas del listado */}
          <div className="mt-12 grid gap-4 border-y border-line py-5 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6 xl:col-span-7">
              <CharacterSearch
                value={busqueda}
                onChange={handleChange}
                onClear={handleClearInput}
                inputRef={inputRef}
              />
            </div>

            <div className="lg:col-span-6 lg:justify-self-end xl:col-span-5">
              <Pagination
                page={pagina}
                totalPages={totalPages}
                onChange={setPagina}
                disabled={loading || characters.length === 0}
                contexto="personajes"
              />
            </div>
          </div>

          {loading ? (
            <PageLoader inline message="CARGANDO PERSONAJES..." />
          ) : characters.length === 0 ? (
            <div className="mt-10 border border-line bg-ink-soft/40 p-8 sm:p-12">
              <p className="font-mono text-label uppercase tracking-[0.28em] text-acid">
                Sin resultados
              </p>

              <p className="mt-3 font-display text-3xl uppercase leading-tight text-paper">
                No se encontraron personajes
                {busqueda.trim() && (
                  <>
                    {" "}
                    para{" "}
                    <span className="text-acid">«{busqueda.trim()}»</span>
                  </>
                )}
                .
              </p>

              <p className="mt-3 text-base text-muted">
                Prueba con otro nombre o revisa la ortografía.
              </p>

              {busqueda && (
                <button
                  type="button"
                  onClick={handleClearInput}
                  className="mt-6 border border-line px-5 py-2 font-mono text-label uppercase tracking-[0.2em] text-paper transition-colors duration-300 hover:border-acid hover:text-acid focus-visible:ring-2 focus-visible:ring-acid focus-visible:ring-offset-2 focus-visible:ring-offset-ink active:scale-[0.98]"
                >
                  Limpiar búsqueda
                </button>
              )}
            </div>
          ) : (
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {characters.map((character, index) => (
                <CharacterCard
                  key={character.id}
                  character={character}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
