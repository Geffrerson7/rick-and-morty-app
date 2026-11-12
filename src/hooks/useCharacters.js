import { useCallback, useEffect, useState } from "react";
import { API_BASE_URL, obtenerAPI, validarId } from "../helpers/api";

/**
 * Carga una página de personajes. Con `search`, espera `debounceMs` antes de
 * pedir para no lanzar una petición por cada tecla.
 *
 * Un 404 con término de búsqueda significa "sin resultados": se devuelve una
 * lista vacía en lugar de un error. Sin búsqueda, un 404 en una página > 1 es
 * una página fuera de rango y se avisa con `onPageOutOfRange`.
 */
export function useCharacters({
  page = 1,
  search = "",
  debounceMs = 500,
  onPageOutOfRange,
} = {}) {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [intento, setIntento] = useState(0);

  const retry = useCallback(() => setIntento((actual) => actual + 1), []);

  useEffect(() => {
    const controller = new AbortController();
    const termino = search.trim();
    let redirigiendo = false;

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
          return;
        }

        if (err.status === 404 && page > 1 && onPageOutOfRange) {
          redirigiendo = true;
          onPageOutOfRange();
          return;
        }

        setError(err.message || "No se pudieron cargar los personajes.");
      } finally {
        if (!controller.signal.aborted && !redirigiendo) {
          setLoading(false);
        }
      }
    }, debounceMs);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [page, search, debounceMs, intento, onPageOutOfRange]);

  return { characters, loading, error, totalPages, retry };
}

/**
 * Carga un personaje por id. Se usa en la ficha de detalle, sin debounce.
 * Un id no numérico se rechaza antes de la petición y se traduce al mismo
 * mensaje que un 404.
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

        const idValido = validarId(id);

        const datos = await obtenerAPI(
          `${API_BASE_URL}/character/${idValido}`,
          { signal: controller.signal },
        );

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
