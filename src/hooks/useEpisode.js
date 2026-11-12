import { useEffect, useState } from "react";
import {
  API_BASE_URL,
  obtenerAPI,
  obtenerPersonajesPorLote,
  validarId,
} from "../helpers/api";

/**
 * Carga un episodio y, en una sola petición extra, todos sus personajes.
 * El `AbortController` es compartido: salir de la vista cancela ambas llamadas.
 *
 * Distingue tres finales: cargado, `notFound` (404 del episodio) y `error`
 * (cualquier otro fallo, incluido el del lote de personajes).
 */
export function useEpisode(episodeId) {
  const [episode, setEpisode] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function cargar() {
      let episodioCargado = null;

      try {
        setLoading(true);
        setError(null);
        setNotFound(false);
        setEpisode(null);
        setCharacters([]);

        const idValido = validarId(episodeId);

        episodioCargado = await obtenerAPI(
          `${API_BASE_URL}/episode/${idValido}`,
          { signal: controller.signal },
        );

        setEpisode(episodioCargado);

        const urlsPersonajes = Array.isArray(episodioCargado.characters)
          ? episodioCargado.characters
          : [];

        const personajes = await obtenerPersonajesPorLote(urlsPersonajes, {
          signal: controller.signal,
        });

        setCharacters(personajes);
      } catch (err) {
        if (err.name === "AbortError") return;

        if (!episodioCargado) {
          if (err.status === 404) {
            setNotFound(true);
          } else {
            setError(err.message || "No se pudo cargar el episodio.");
          }
          return;
        }

        setError(err.message || "No se pudieron cargar los personajes.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    cargar();

    return () => controller.abort();
  }, [episodeId]);

  return { episode, characters, loading, error, notFound };
}

/**
 * Carga solo los datos del episodio. Se usa para el breadcrumb de la ficha de
 * un personaje, donde no hacen falta sus personajes. Un fallo deja el nombre
 * fuera del breadcrumb sin bloquear la vista, igual que antes.
 */
export function useEpisodeSummary(episodeId) {
  const [episode, setEpisode] = useState(null);

  useEffect(() => {
    if (!episodeId) return;

    const controller = new AbortController();

    async function cargar() {
      try {
        const idValido = validarId(episodeId);

        const datos = await obtenerAPI(
          `${API_BASE_URL}/episode/${idValido}`,
          { signal: controller.signal },
        );

        setEpisode(datos);
      } catch (err) {
        if (err.name === "AbortError") return;

        // Un id inexistente o no numérico solo deja el breadcrumb sin nombre.
        if (err.status !== 404) {
          console.error("Error al cargar el episodio:", err);
        }
        setEpisode(null);
      }
    }

    cargar();

    return () => controller.abort();
  }, [episodeId]);

  return episode;
}
