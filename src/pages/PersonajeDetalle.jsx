import { Link, useLocation, useParams } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import ErrorState from "../components/ErrorState";
import PageLoader from "../components/PageLoader";
import { useCharacter } from "../hooks/useCharacters";
import { useEpisodeSummary } from "../hooks/useEpisode";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import {
  traducirEspecie,
  traducirEstado,
  traducirGenero,
} from "../helpers/textos";

const COLOR_ESTADO = {
  Alive: "bg-acid",
  Dead: "bg-danger",
};

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
      className="mt-4 inline-block font-mono text-label uppercase tracking-[0.2em] text-acid transition-colors duration-300 hover:text-paper"
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

  const filas = [
    {
      etiqueta: "Estado",
      valor: traducirEstado(character.status),
      estado: character.status,
    },
    { etiqueta: "Especie", valor: traducirEspecie(character.species) },
    { etiqueta: "Género", valor: traducirGenero(character.gender) },
    { etiqueta: "Origen", valor: character.origin.name },
    { etiqueta: "Ubicación", valor: character.location.name },
  ];

  return (
    <>
      <Breadcrumbs items={items} />
      <div className="flex-1 bg-[radial-gradient(120%_80%_at_50%_-10%,var(--color-ink-soft),var(--color-ink)_70%)] px-4 pb-24 pt-8 text-paper sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
            <h1 className="font-mono text-label uppercase tracking-[0.28em] text-acid">
              EXPEDIENTE DIMENSIONAL
            </h1>

            <Link
              to={volverA}
              viewTransition
              className="group inline-flex items-center gap-2 font-mono text-label uppercase tracking-[0.2em] text-muted transition-colors duration-300 hover:text-acid"
            >
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-x-1"
              >
                ←
              </span>
              {volverTexto}
            </Link>
          </div>

          <div className="grid gap-12 pt-10 lg:grid-cols-12 lg:gap-14">
            {/* Imagen del personaje */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-sm lg:mx-0">
                <span
                  aria-hidden="true"
                  className="absolute -left-3 -top-3 h-16 w-16 border-l border-t border-acid"
                />
                <span
                  aria-hidden="true"
                  className="absolute -bottom-3 -right-3 h-16 w-16 border-b border-r border-acid"
                />
                <img
                  src={character.image}
                  alt={character.name}
                  width="300"
                  height="300"
                  className="aspect-square w-full border border-line object-cover"
                />
              </div>
            </div>

            {/* Datos del personaje */}
            <div className="lg:col-span-7">
              <p className="font-mono text-label uppercase tracking-[0.24em] text-muted">
                Personaje / {String(character.id).padStart(3, "0")}
              </p>

              <h2 className="mt-3 font-display text-display-sm uppercase text-paper sm:text-display">
                {character.name}
              </h2>

              <dl className="mt-8 divide-y divide-line border-y border-line">
                {filas.map(({ etiqueta, valor, estado }) => (
                  <div
                    key={etiqueta}
                    className="grid grid-cols-[6.5rem_1fr] items-baseline gap-4 py-4 sm:grid-cols-[9rem_1fr]"
                  >
                    <dt className="font-mono text-label uppercase tracking-[0.2em] text-muted">
                      {etiqueta}
                    </dt>
                    <dd className="flex items-center gap-2 text-sm text-paper">
                      {estado && (
                        <span
                          aria-hidden="true"
                          className={`h-1.5 w-1.5 shrink-0 ${COLOR_ESTADO[estado] ?? "bg-muted"}`}
                        />
                      )}
                      {valor}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
