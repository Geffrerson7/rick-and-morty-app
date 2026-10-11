import { useParams } from "react-router-dom";
import { obtenerAPI } from "../helpers/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";

export default function EpisodioDetalle() {
  const { episodioId } = useParams();
  const [episodio, setEpisodio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [personajes, setPersonajes] = useState([]);

  useEffect(() => {
    async function fetchEpisode() {
      try {
        setLoading(true);
        setError(null);
        setEpisodio(null);
        setPersonajes([]);

        const response = await obtenerAPI(
          `https://rickandmortyapi.com/api/episode/${episodioId}`,
        );

        setEpisodio(response);

        const personajesData = await Promise.all(
          response.characters.map((url) => obtenerAPI(url)),
        );

        setPersonajes(personajesData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchEpisode();
  }, [episodioId]);

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></div>
          <div className="relative inline-flex rounded-full h-12 w-12 bg-green-500"></div>
        </div>
        <span className="ml-4 text-xl font-bold tracking-widest text-green-400 animate-pulse">
          CARGANDO EPISODIO...
        </span>
      </div>
    );
  if (error)
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
        <div className="max-w-md rounded-2xl bg-red-950/20 p-8 text-center border border-red-500/40 backdrop-blur-sm">
          <p className="text-2xl font-black text-red-500 tracking-wide">
            💥 ¡WUBBA LUBBA DUB DUB!
          </p>
          <p className="mt-3 text-slate-400 font-medium">{error}</p>
          <Link
            to="/episosdios"
            className="mt-4 inline-block text-green-400 hover:text-green-500 transition-colors duration-300"
          >
            ← Volver al listado
          </Link>
        </div>
      </div>
    );

  if (!episodio)
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
        <div className="max-w-md rounded-2xl bg-red-950/20 p-8 text-center border border-red-500/40 backdrop-blur-sm">
          <p className="text-2xl font-black text-red-500 tracking-wide">
            💥 ¡WUBBA LUBBA DUB DUB!
          </p>
          <p className="mt-3 text-slate-400 font-medium">
            Episodio no encontrado
          </p>
          <Link
            to="/episodios"
            className="mt-4 inline-block text-green-400 hover:text-green-500 transition-colors duration-300"
          >
            ← Volver al listado
          </Link>
        </div>
      </div>
    );

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Episodios", to: "/episodios" },
          {
            label: episodio.name,
            to: `/episodios/${episodio.id}`,
          },
        ]}
      />
      <div className="min-h-screen bg-slate-950 px-4 py-12 text-slate-100 sm:px-6 lg:px-8">
        {/* Información del episodio */}
        <div className="mx-auto mb-12 max-w-7xl text-center">
          <h1 className="bg-linear-to-r from-lime-400 via-green-400 to-emerald-500 bg-clip-text text-4xl font-black text-transparent sm:text-5xl p-3">
            {episodio.name}
          </h1>

          <p className="mt-4 text-lg font-bold text-green-400">
            {episodio.episode}
          </p>

          <p className="mt-2 text-slate-400">
            Fecha de emisión: {episodio.air_date}
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Personajes: {personajes.length}
          </p>
        </div>

        {/* Lista de personajes */}
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-6 text-2xl font-bold text-slate-100">
            Personajes del episodio
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {personajes.map((personaje) => (
              <Link
                key={personaje.id}
                to={`/episodios/${episodio.id}/personaje/${personaje.id}`}
                className="flex items-center gap-4 overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition-all duration-300 hover:border-green-500 hover:bg-slate-900"
              >
                <img
                  src={personaje.image}
                  alt={personaje.name}
                  className="h-24 w-24 shrink-0 rounded-lg object-cover"
                />

                <div className="min-w-0">
                  <h3 className="truncate text-lg font-bold text-green-400">
                    {personaje.name}
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    Especie: {personaje.species}
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    Estado: {personaje.status}
                  </p>

                  <span className="mt-3 inline-block text-xs font-bold text-slate-300">
                    Ver expediente →
                  </span>
                </div>
              </Link>
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
