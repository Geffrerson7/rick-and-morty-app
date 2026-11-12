import { useCallback, useEffect, useState } from "react";
import { API_BASE_URL, obtenerAPI } from "../helpers/api";

/**
 * Carga una página del listado de episodios y descarta respuestas obsoletas
 * cuando cambia la página antes de que termine la petición.
 *
 * Un 404 en una página > 1 se trata como página fuera de rango y se avisa con
 * `onPageOutOfRange` en lugar de mostrar la pantalla de error.
 */
export function useEpisodes(page = 1, { onPageOutOfRange } = {}) {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [intento, setIntento] = useState(0);

  const retry = useCallback(() => setIntento((actual) => actual + 1), []);

  useEffect(() => {
    const controller = new AbortController();
    let redirigiendo = false;

    async function cargar() {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({ page: String(page) });
        const datos = await obtenerAPI(`${API_BASE_URL}/episode?${params}`, {
          signal: controller.signal,
        });

        setEpisodes(datos.results);
        setTotalPages(datos.info.pages);
      } catch (err) {
        if (err.name === "AbortError") return;

        if (err.status === 404 && page > 1 && onPageOutOfRange) {
          redirigiendo = true;
          onPageOutOfRange();
          return;
        }

        setError(err.message || "No se pudieron cargar los episodios.");
        setTotalPages(1);
      } finally {
        if (!controller.signal.aborted && !redirigiendo) {
          setLoading(false);
        }
      }
    }

    cargar();

    return () => controller.abort();
  }, [page, intento, onPageOutOfRange]);

  return { episodes, loading, error, totalPages, retry };
}
