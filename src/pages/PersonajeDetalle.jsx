import { Link, useLocation, useParams } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import ErrorState from "../components/ErrorState";
import PageLoader from "../components/PageLoader";
import { useCharacter } from "../hooks/useCharacters";
import { useEpisodeSummary } from "../hooks/useEpisode";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function PersonajeDetalle() {
  const { id, episodioId, personajeId } = useParams();
  const { state } = useLocation();
  const idPersonaje = personajeId ?? id;
  // La tarjeta del listado deja su URL en `state` para volver a la misma
  // página y búsqueda; si se entra por enlace directo se usa el contexto de
  // la ruta (episodio o listado).
  const desdeLista = typeof state?.desde === "string" ? state.desde : null;
  const volverA = desdeLista ?? (episodioId ? `/episodios/${episodioId}` : "/");
  const volverTexto = episodioId
    ? "Volver al episodio"
    : "Volver al listado de personajes";

  const { character, loading, error } = useCharacter(idPersonaje);
  const episode = useEpisodeSummary(episodioId);
  useDocumentTitle(character?.name ?? "Personaje");

  const volverAction = (
    <Link
      to={volverA}
      className="mt-4 inline-block text-green-400 hover:text-green-500 transition-colors duration-300"
    >
      ← {volverTexto}
    </Link>
  );

  if (loading) return <PageLoader message="CARGANDO PERSONAJE..." />;

  if (error) return <ErrorState message={error} action={volverAction} />;

  if (!character) {
    return (
      <ErrorState message="Personaje no encontrado" action={volverAction} />
    );
  }

  const items = episodioId
    ? [
        { label: "Episodios", to: "/episodios" },
        ...(episode
          ? [{ label: episode.name, to: `/episodios/${episodioId}` }]
          : []),
        { label: character.name },
      ]
    : [{ label: "Personajes", to: "/" }, { label: character.name }];

  return (
    <>
      <Breadcrumbs items={items} />
      <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 px-4 py-12 text-slate-100 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-7xl text-center">
          <h1 className="bg-linear-to-r from-lime-400 via-green-400 to-emerald-500 bg-clip-text text-5xl font-black tracking-tight text-transparent drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] sm:text-6xl">
            EXPEDIENTE DIMENSIONAL
          </h1>

          <p className="mx-auto mt-4 max-w-md text-lg font-medium tracking-wide text-slate-400">
            Descubre la identidad, el origen y las coordenadas de cada viajero
            del multiverso.
          </p>

          <Link
            to={volverA}
            className="mt-6 inline-flex items-center gap-2 text-green-400 transition-colors duration-300 hover:text-green-300"
          >
            <span aria-hidden="true">←</span>
            {volverTexto}
          </Link>
        </div>

        <div className="mx-auto flex max-w-2xl flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/20 shadow-lg backdrop-blur-md sm:flex-row">
          {/* Imagen del personaje */}
          <div className="w-full shrink-0 sm:w-60 transition-transform duration-300 hover:scale-105 overflow-hidden">
            <img
              src={character.image}
              alt={character.name}
              className="h-64 w-full object-cover sm:h-full sm:min-h-72"
            />
          </div>

          {/* Datos del personaje */}
          <div className="flex flex-1 flex-col justify-center p-6 sm:p-7">
            <h2 className="text-2xl font-bold text-green-400">
              {character.name}
            </h2>

            <div className="mt-4 space-y-3 text-slate-400">
              <p>
                <span className="font-semibold text-slate-200">Estado:</span>{" "}
                {character.status}
              </p>

              <p>
                <span className="font-semibold text-slate-200">Especie:</span>{" "}
                {character.species}
              </p>

              <p>
                <span className="font-semibold text-slate-200">Género:</span>{" "}
                {character.gender}
              </p>

              <p>
                <span className="font-semibold text-slate-200">Origen:</span>{" "}
                {character.origin.name}
              </p>

              <p>
                <span className="font-semibold text-slate-200">Ubicación:</span>{" "}
                {character.location.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
