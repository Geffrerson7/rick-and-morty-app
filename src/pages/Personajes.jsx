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
      <div className="flex-1 bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 px-4 py-12 text-slate-100 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-7xl text-center">
          <h1 className="bg-linear-to-r from-lime-400 via-green-400 to-emerald-500 bg-clip-text text-4xl font-black tracking-tight text-transparent drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] sm:text-5xl lg:text-6xl">
            EXPLORADOR DIMENSIONAL
          </h1>

          <p className="mx-auto mt-4 max-w-md text-lg font-medium tracking-wide text-slate-400">
            Descubre personajes de todos los rincones del multiverso.
          </p>
        </div>

        <CharacterSearch
          value={busqueda}
          onChange={handleChange}
          onClear={handleClearInput}
          inputRef={inputRef}
        />

        {/* La paginación se mantiene visible aunque la búsqueda no tenga resultados */}
        <Pagination
          page={pagina}
          totalPages={totalPages}
          onChange={setPagina}
          disabled={loading || characters.length === 0}
          contexto="personajes"
        />

        {loading ? (
          <PageLoader inline message="CARGANDO PERSONAJES..." />
        ) : characters.length === 0 ? (
          <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-slate-800 bg-slate-950/40 p-8 text-center">
            <p className="text-lg font-semibold text-slate-200">
              No se encontraron personajes
              {busqueda.trim() && (
                <>
                  {" "}
                  para{" "}
                  <span className="text-green-400">«{busqueda.trim()}»</span>
                </>
              )}
              .
            </p>

            <p className="mt-2 text-sm text-slate-400">
              Prueba con otro nombre o revisa la ortografía.
            </p>

            {busqueda && (
              <button
                type="button"
                onClick={handleClearInput}
                className="mt-6 rounded-lg bg-green-500 px-5 py-2 font-bold text-slate-950 transition-all duration-300 hover:bg-green-400 focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 active:scale-[0.98]"
              >
                Limpiar búsqueda
              </button>
            )}
          </div>
        ) : (
          <div className="mx-auto mt-10 max-w-7xl grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {characters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
