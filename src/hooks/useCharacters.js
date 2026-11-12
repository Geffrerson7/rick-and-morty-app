import { useEffect, useState } from "react";
import { API_BASE_URL, obtenerAPI } from "../helpers/api";

/**
 * Carga una página de personajes. Con `search`, espera `debounceMs` antes de
 * pedir para no lanzar una petición por cada tecla.
 *
 * Un 404 con término de búsqueda significa "sin resultados": se devuelve una
 * lista vacía en lugar de un error.
 */
export function useCharacters({ page = 1, search = "", debounceMs = 500 } = {}) {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const controller = new AbortController();
    const termino = search.trim();

    const timeoutId = setTimeout(async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({ page: String(page) });

        if (termino) {
          params.set("name", termino);
        }

        const datos = await obtenerAPI(
          `${API_BASE_URL}/character/?${params}`,
          { signal: controller.signal },
        );

        setCharacters(datos.results);
        setTotalPages(datos.info.pages);
      } catch (err) {
        if (err.name === "AbortError") return;

        setCharacters([]);
        setTotalPages(1);

        if (err.status === 404 && termino) {
          setError(null);
        } else {
          setError(err.message || "No se pudieron cargar los personajes.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, debounceMs);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [page, search, debounceMs]);

  return { characters, loading, error, totalPages };
}

/**
 * Carga un personaje por id. Se usa en la ficha de detalle, sin debounce.
 * Un 404 se traduce al mensaje que ya mostraba la vista.
 */
export function useCharacter(id) {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(Boolean(id));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();

    async function cargar() {
      try {
        setLoading(true);
        setError(null);

        const datos = await obtenerAPI(`${API_BASE_URL}/character/${id}`, {
          signal: controller.signal,
        });

        setCharacter(datos);
      } catch (err) {
        if (err.name === "AbortError") return;

        setError(
          err.status === 404
            ? "Personaje no encontrado"
            : err.message || "No se pudo cargar el personaje.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    cargar();

    return () => controller.abort();
  }, [id]);

  return { character, loading, error };
}
