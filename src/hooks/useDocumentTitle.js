import { useEffect } from "react";

const NOMBRE_APP = "Rick and Morty";

/**
 * Actualiza `document.title` con el nombre de la vista actual.
 * Sin título se usa solo el nombre de la aplicación.
 */
export function useDocumentTitle(titulo) {
  useEffect(() => {
    document.title = titulo ? `${titulo} · ${NOMBRE_APP}` : NOMBRE_APP;
  }, [titulo]);
}
