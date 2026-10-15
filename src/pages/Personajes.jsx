import { useState, useEffect, useId } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";

export default function Personajes() {
  const [personajes, setPersonajes] = useState([]);
  const [loading, setLoading] = useState(true); // ← arranca cargando
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const idText = useId();
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  useEffect(() => {
    const controller = new AbortController();

    const timeoutId = setTimeout(async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          page: String(pagina),
        });

        if (search.trim()) {
          params.set("name", search.trim());
        }

        const url = `https://rickandmortyapi.com/api/character/?${params}`;

        const respuesta = await fetch(url, {
          signal: controller.signal,
        });

        if (!respuesta.ok) {
          throw new Error(
            respuesta.status === 404
              ? "No se encontraron personajes."
              : `Error HTTP ${respuesta.status}`,
          );
        }

        const datos = await respuesta.json();

        setPersonajes(datos.results);
        setTotalPaginas(datos.info.pages);
      } catch (err) {
        if (err.name === "AbortError") return;

        setPersonajes([]);
        setTotalPaginas(1);
        setError(err.message);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [search, pagina]);

  function handleChange(event) {
    setSearch(event.target.value);
    setPagina(1);
  }

  function handleClearInput(event) {
    event.preventDefault();
    setSearch("");
    setPagina(1);
  }

  if (error)
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
        <div className="max-w-md rounded-2xl bg-red-950/20 p-8 text-center border border-red-500/40 backdrop-blur-sm">
          <p className="text-2xl font-black text-red-500 tracking-wide">
            💥 ¡WUBBA LUBBA DUB DUB!
          </p>
          <p className="mt-3 text-slate-400 font-medium">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 inline-block rounded-lg bg-green-500 px-5 py-2 font-bold text-slate-950 hover:bg-green-400 transition-colors duration-300"
          >
            ↻ Reintentar
          </button>
        </div>
      </div>
    );

  // Si está cargando, mostrá esto y listo
  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></div>
          <div className="relative inline-flex rounded-full h-12 w-12 bg-green-500"></div>
        </div>
        <span className="ml-4 text-xl font-bold tracking-widest text-green-400 animate-pulse">
          CARGANDO PERSONAJES...
        </span>
      </div>
    );

  // Si no, mostrá los personajes
  return (
    <>
      <Breadcrumbs items={[{ label: "Personajes", to: "/" }]} />
      <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 px-4 py-12 text-slate-100 sm:px-6 lg:px-8">
        {/* Encabezado Principal */}

        <div className="mx-auto mb-16 max-w-7xl text-center">
          <h1 className="bg-linear-to-r from-lime-400 via-green-400 to-emerald-500 bg-clip-text text-5xl font-black tracking-tight text-transparent drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] sm:text-6xl">
            EXPLORADOR DIMENSIONAL
          </h1>

          <p className="mx-auto mt-4 max-w-md text-lg font-medium tracking-wide text-slate-400">
            Descubre personajes de todos los rincones del multiverso.
          </p>
        </div>

        {/* Buscador de perosnajes */}

        <div className="mx-auto max-w-7xl mb-16 flex justify-center">
          <div className="relative w-64 sm:w-80">
            {/* Icono de búsqueda */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            >
              <circle cx="10" cy="10" r="7" />
              <path d="m21 21-6-6" />
            </svg>

            {/* Input */}
            <input
              id={idText}
              type="text"
              value={search}
              onChange={handleChange}
              placeholder="Buscar personaje..."
              autoComplete="off"
              aria-label="Buscar personajes por nombre"
              className="w-full bg-slate-950 text-slate-100 placeholder:text-slate-500 border border-slate-600 rounded-lg py-3 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-300 focus:bg-slate-900"
            />

            {/* Botón para limpiar */}
            {search && (
              <button
                type="button"
                onClick={handleClearInput}
                aria-label="Limpiar búsqueda"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-green-400 transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-x"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M18 6l-12 12" />
                  <path d="M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Grid de Tarjetas Avanzadas */}
        {error ? (
          <p className="text-center text-red-400">{error}</p>
        ) : loading ? (
          <p className="text-center text-green-400">Buscando personajes...</p>
        ) : personajes.length === 0 ? (
          <p className="text-center text-slate-400">
            No se encontraron personajes.
          </p>
        ) : (
          <>
            {personajes.length > 0 && (
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
            <div className="mx-auto mt-10 max-w-7xl grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {personajes.map((p) => (
                <Link
                  to={`/personaje/${p.id}`}
                  key={p.id}
                  className="flex flex-col items-center rounded-2xl bg-slate-950/20 p-6 shadow-sm border border-slate-800 hover:shadow-md transition-shadow duration-300"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-auto rounded-lg mb-4 transition-transform duration-300 transform hover:scale-105"
                  />
                  <p className="text-lg font-semibold text-slate-100 text-center hover:text-green-400 transition-colors duration-300">
                    {p.name} — {p.species}
                  </p>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
