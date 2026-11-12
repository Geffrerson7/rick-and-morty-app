import { useEffect, useState } from "react";
import { API_BASE_URL, obtenerAPI } from "../helpers/api";

/**
 * Carga una página del listado de episodios y descarta respuestas obsoletas
 * cuando cambia la página antes de que termine la petición.
 */
export function useEpisodes(page = 1) {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const controller = new AbortController();

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

        setError(err.message || "No se pudieron cargar los episodios.");
        setTotalPages(1);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    cargar();

    return () => controller.abort();
  }, [page]);

  return { episodes, loading, error, totalPages };
}
