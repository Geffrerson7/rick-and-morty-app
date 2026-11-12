export const API_BASE_URL = "https://rickandmortyapi.com/api";

/** Tiempo máximo por intento antes de abortar la petición. */
export const API_TIMEOUT_MS = 9000;

/** Un intento original + un reintento para fallos de red. */
const MAX_INTENTOS = 2;

/**
 * Error normalizado de la API.
 * Permite distinguir el tipo de fallo sin exponer mensajes técnicos al usuario.
 */
export class ApiError extends Error {
  constructor(
    message,
    { status = 0, url = "", cause, reintentable = false } = {},
  ) {
    super(message, cause ? { cause } : undefined);
    this.name = "ApiError";
    this.status = status;
    this.url = url;
    this.reintentable = reintentable;
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

const ID_NUMERICO = /^\d+$/;

/**
 * Valida un id de ruta antes de construir la URL. Un id no numérico no puede
 * existir en la API, así que se rechaza en local con un 404: los consumidores
 * ya saben traducirlo a "no encontrado" y nunca se llega a hacer la petición.
 */
export function validarId(valor) {
  const id = String(valor ?? "").trim();

  if (!ID_NUMERICO.test(id)) {
    throw new ApiError("El identificador solicitado no es válido.", {
      status: 404,
    });
  }

  return id;
}

/**
 * Un único intento: aplica el timeout, combina la señal del llamador y
 * normaliza los fallos (red, timeout, HTTP y JSON inválido).
 */
async function peticionUnica(url, opciones = {}) {
  const { signal, timeoutMs = API_TIMEOUT_MS, ...resto } = opciones;

  const control = new AbortController();
  const temporizador = setTimeout(() => {
    control.abort(
      new DOMException("La petición superó el tiempo máximo.", "TimeoutError"),
    );
  }, timeoutMs);

  const senal = signal
    ? AbortSignal.any([signal, control.signal])
    : control.signal;

  let respuesta;

  try {
    respuesta = await fetch(url, { ...resto, signal: senal });
  } catch (error) {
    if (signal?.aborted) {
      throw new DOMException("Petición cancelada.", "AbortError");
    }

    if (control.signal.aborted) {
      throw new ApiError(
        "La API tardó demasiado en responder. Inténtalo de nuevo.",
        { url, cause: error },
      );
    }

    throw new ApiError(
      "No se pudo conectar con la API. Revisa tu conexión e inténtalo de nuevo.",
      { url, cause: error, reintentable: true },
    );
  } finally {
    clearTimeout(temporizador);
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

/**
 * Realiza una petición a la API y devuelve el JSON ya validado.
 *
 * - Aborta a los {@link API_TIMEOUT_MS} con un mensaje en español.
 * - Reintenta una vez los fallos de red (no los HTTP ni los timeouts).
 * - Lanza {@link ApiError} y propaga los `AbortError` para que quien cancele
 *   la petición pueda ignorarlos.
 */
export async function obtenerAPI(url, opciones = {}) {
  let ultimoError;

  for (let intento = 1; intento <= MAX_INTENTOS; intento += 1) {
    try {
      return await peticionUnica(url, opciones);
    } catch (error) {
      if (error.name === "AbortError") throw error;

      ultimoError = error;

      const puedeReintentar =
        error.reintentable === true &&
        intento < MAX_INTENTOS &&
        !opciones.signal?.aborted;

      if (!puedeReintentar) throw error;
    }
  }

  throw ultimoError;
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
