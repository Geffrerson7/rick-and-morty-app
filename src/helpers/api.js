export const API_BASE_URL = "https://rickandmortyapi.com/api";

/**
 * Error normalizado de la API.
 * Permite distinguir el tipo de fallo sin exponer mensajes técnicos al usuario.
 */
export class ApiError extends Error {
  constructor(message, { status = 0, url = "", cause } = {}) {
    super(message, cause ? { cause } : undefined);
    this.name = "ApiError";
    this.status = status;
    this.url = url;
  }
}

function mensajePorEstado(status) {
  switch (status) {
    case 400:
      return "La solicitud enviada a la API no es válida.";
    case 404:
      return "No se encontró el recurso solicitado.";
    case 429:
      return "Demasiadas solicitudes a la API. Inténtalo de nuevo en unos segundos.";
    default:
      return status >= 500
        ? "La API no está disponible en este momento. Inténtalo de nuevo más tarde."
        : `La API respondió con un error (HTTP ${status}).`;
  }
}

/**
 * Realiza una petición a la API y devuelve el JSON ya validado.
 * Lanza {@link ApiError} si la respuesta no es correcta y propaga los
 * `AbortError` para que quien cancele la petición pueda ignorarlos.
 */
export async function obtenerAPI(url, opciones = {}) {
  let respuesta;

  try {
    respuesta = await fetch(url, opciones);
  } catch (error) {
    if (error.name === "AbortError") throw error;

    throw new ApiError(
      "No se pudo conectar con la API. Revisa tu conexión e inténtalo de nuevo.",
      { url, cause: error },
    );
  }

  if (!respuesta.ok) {
    throw new ApiError(mensajePorEstado(respuesta.status), {
      status: respuesta.status,
      url,
    });
  }

  try {
    return await respuesta.json();
  } catch (error) {
    throw new ApiError("La respuesta de la API no tiene un formato válido.", {
      status: respuesta.status,
      url,
      cause: error,
    });
  }
}

const ID_EN_URL = /\/(\d+)\/?$/;

/**
 * Extrae el id numérico del final de una URL de recurso de la API.
 * Devuelve `null` si la URL no tiene un id válido.
 */
export function extraerIdDeUrl(url) {
  const coincidencia = String(url).match(ID_EN_URL);
  return coincidencia ? coincidencia[1] : null;
}

/**
 * Obtiene varios personajes en una sola petición usando el endpoint por lotes
 * (`/character/1,2,3`). La API responde ordenada por id, así que se reordena
 * para respetar el orden de las URLs recibidas.
 */
export async function obtenerPersonajesPorLote(urls, opciones = {}) {
  const ids = urls.map(extraerIdDeUrl).filter(Boolean);

  if (ids.length === 0) return [];

  const datos = await obtenerAPI(
    `${API_BASE_URL}/character/${ids.join(",")}`,
    opciones,
  );

  // Un único id devuelve un objeto; varios devuelven un array.
  const personajes = Array.isArray(datos) ? datos : [datos];
  const porId = new Map(
    personajes.map((personaje) => [String(personaje.id), personaje]),
  );

  return ids.map((id) => porId.get(id)).filter(Boolean);
}
