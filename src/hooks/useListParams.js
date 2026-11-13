import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

/**
 * Sincroniza la página y el término de búsqueda de un listado con la URL.
 *
 * La query string es la fuente de verdad: recargar o compartir un enlace
 * restaura el estado y Atrás/Adelante funcionan sin lógica adicional.
 *
 * - `setPagina` empuja una entrada al historial, para que Atrás vuelva a la
 *   página anterior del listado.
 * - `buscar` reemplaza la entrada actual en cada pulsación (no tiene sentido
 *   dejar una entrada por letra) y vuelve siempre a la primera página.
 * - `reajustarPagina` reemplaza la entrada cuando la API responde 404 a una
 *   página fuera de rango, para no dejar páginas inexistentes en el historial.
 */
export function useListParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const paginaSolicitada = Number(searchParams.get("page"));
  const pagina =
    Number.isInteger(paginaSolicitada) && paginaSolicitada > 0
      ? paginaSolicitada
      : 1;
  const busqueda = searchParams.get("name") ?? "";

  const escribir = useCallback(
    (cambios, { replace = false } = {}) => {
      setSearchParams(
        (anteriores) => {
          const siguientes = new URLSearchParams(anteriores);

          for (const [clave, valor] of Object.entries(cambios)) {
            if (valor) siguientes.set(clave, String(valor));
            else siguientes.delete(clave);
          }

          return siguientes;
        },
        { replace },
      );
    },
    [setSearchParams],
  );

  const setPagina = useCallback(
    (valor) => {
      const siguiente = typeof valor === "function" ? valor(pagina) : valor;
      // La página 1 es el estado por defecto: no ensucia la URL.
      escribir({ page: siguiente > 1 ? siguiente : null });
    },
    [escribir, pagina],
  );

  const buscar = useCallback(
    (texto) => {
      escribir({ name: texto || null, page: null }, { replace: true });
    },
    [escribir],
  );

  const reajustarPagina = useCallback(() => {
    escribir({ page: null }, { replace: true });
  }, [escribir]);

  return { pagina, busqueda, setPagina, buscar, reajustarPagina };
}
