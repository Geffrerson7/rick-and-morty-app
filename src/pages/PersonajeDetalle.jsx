import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { obtenerAPI } from "../helpers/api";
import Breadcrumbs from "../components/Breadcrumbs";

export default function PersonajeDetalle() {
  const { id, episodioId, personajeId } = useParams();
  const idPersonaje = personajeId ?? id;
  const [personaje, setPersonaje] = useState(null);
  const [episodio, setEpisodio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function cargar() {
      try {
        setLoading(true);
        setError(null);
        const respuesta = await fetch(
          `https://rickandmortyapi.com/api/character/${idPersonaje}`,
        );
        if (!respuesta.ok) {
          throw new Error("Personaje no encontrado");
        }
        const datos = await respuesta.json();
        setPersonaje(datos);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    cargar();
  }, [idPersonaje]);

  useEffect(() => {
    if (!episodioId) return;

    async function fetchEpisode() {
      try {
        const response = await obtenerAPI(
          `https://rickandmortyapi.com/api/episode/${episodioId}`,
        );

        setEpisodio(response);
      } catch (error) {
        console.error("Error al cargar el episodio:", error);
        setEpisodio(null);
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
          CARGANDO PERSONAJE...
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
            to="/"
            className="mt-4 inline-block text-green-400 hover:text-green-500 transition-colors duration-300"
          >
            ← Volver al listado
          </Link>
        </div>
      </div>
    );

  if (!personaje)
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
        <div className="max-w-md rounded-2xl bg-red-950/20 p-8 text-center border border-red-500/40 backdrop-blur-sm">
          <p className="text-2xl font-black text-red-500 tracking-wide">
            💥 ¡WUBBA LUBBA DUB DUB!
          </p>
          <p className="mt-3 text-slate-400 font-medium">
            Personaje no encontrado
          </p>
          <Link
            to="/"
            className="mt-4 inline-block text-green-400 hover:text-green-500 transition-colors duration-300"
          >
            ← Volver al listado
          </Link>
        </div>
      </div>
    );

  const items = episodioId
    ? [
        { label: "Episodios", to: "/episodios" },
        ...(episodio
          ? [
              {
                label: episodio.name,
                to: `/episodios/${episodioId}`,
              },
            ]
          : []),
        { label: personaje.name },
      ]
    : [{ label: "Personajes", to: "/" }, { label: personaje.name }];

  return (
    <>
      <Breadcrumbs items={items} />
      <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 px-4 py-12 text-slate-100 sm:px-6 lg:px-8">
        {/* Encabezado Principal */}

        <div className="mx-auto mb-16 max-w-7xl text-center">
          <h1 className="bg-linear-to-r from-lime-400 via-green-400 to-emerald-500 bg-clip-text text-5xl font-black tracking-tight text-transparent drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] sm:text-6xl">
            EXPEDIENTE DIMENSIONAL
          </h1>

          <p className="mx-auto mt-4 max-w-md text-lg font-medium tracking-wide text-slate-400">
            Descubre la identidad, el origen y las coordenadas de cada viajero
            del multiverso.
          </p>

          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 text-green-400 transition-colors duration-300 hover:text-green-300"
          >
            <span aria-hidden="true">←</span>
            Volver al listado de personajes
          </Link>
        </div>

        <div className="mx-auto flex max-w-2xl flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/20 shadow-lg backdrop-blur-md sm:flex-row">
          {/* Imagen del personaje */}
          <div className="w-full shrink-0 sm:w-60 transition-transform duration-300 hover:scale-105 overflow-hidden">
            <img
              src={personaje.image}
              alt={personaje.name}
              className="h-64 w-full object-cover sm:h-full sm:min-h-72"
            />
          </div>

          {/* Datos del personaje */}
          <div className="flex flex-1 flex-col justify-center p-6 sm:p-7">
            <h1 className="text-2xl font-bold text-green-400">
              {personaje.name}
            </h1>

            <div className="mt-4 space-y-3 text-slate-400">
              <p>
                <span className="font-semibold text-slate-200">Estado:</span>{" "}
                {personaje.status}
              </p>

              <p>
                <span className="font-semibold text-slate-200">Especie:</span>{" "}
                {personaje.species}
              </p>

              <p>
                <span className="font-semibold text-slate-200">Género:</span>{" "}
                {personaje.gender}
              </p>

              <p>
                <span className="font-semibold text-slate-200">Origen:</span>{" "}
                {personaje.origin.name}
              </p>

              <p>
                <span className="font-semibold text-slate-200">Ubicación:</span>{" "}
                {personaje.location.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
