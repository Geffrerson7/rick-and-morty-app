import { http, HttpResponse } from "msw";
import { API_BASE_URL } from "../helpers/api";
import {
  beth,
  lawnmowerDog,
  morty,
  piloto,
  rick,
  summer,
} from "./fixtures";

const PERSONAJES = [rick, morty, summer, beth];
const PAGINAS_PERSONAJES = {
  1: [rick, morty],
  2: [summer, beth],
};
const EPISODIOS = [piloto, lawnmowerDog];

const noEncontrado = () =>
  HttpResponse.json({ error: "There is nothing here" }, { status: 404 });

const personajePorId = (id) =>
  PERSONAJES.find((personaje) => String(personaje.id) === String(id));

/**
 * Handlers por defecto. Reproducen los casos que la API real devuelve con 404
 * (búsqueda sin resultados, página fuera de rango, recurso inexistente) para
 * que las pruebas cubran los flujos ya corregidos en T1–T9.
 */
export const handlers = [
  http.get(`${API_BASE_URL}/character/`, ({ request }) => {
    const url = new URL(request.url);
    const pagina = Number(url.searchParams.get("page") ?? "1");
    const termino = (url.searchParams.get("name") ?? "").trim().toLowerCase();

    if (termino) {
      const resultados = PERSONAJES.filter((personaje) =>
        personaje.name.toLowerCase().includes(termino),
      );

      return resultados.length > 0
        ? HttpResponse.json({
            info: { count: resultados.length, pages: 1 },
            results: resultados,
          })
        : noEncontrado();
    }

    const resultados = PAGINAS_PERSONAJES[pagina];

    if (!resultados) return noEncontrado();

    return HttpResponse.json({
      info: { count: PERSONAJES.length, pages: 2 },
      results: resultados,
    });
  }),

  // Un id devuelve un objeto; varios ids separados por comas, un array.
  http.get(`${API_BASE_URL}/character/:ids`, ({ params }) => {
    const ids = String(params.ids).split(",");
    const encontrados = ids.map(personajePorId);

    if (encontrados.some((personaje) => !personaje)) return noEncontrado();

    return HttpResponse.json(
      encontrados.length === 1 ? encontrados[0] : encontrados,
    );
  }),

  http.get(`${API_BASE_URL}/episode`, ({ request }) => {
    const url = new URL(request.url);
    const pagina = Number(url.searchParams.get("page") ?? "1");

    if (pagina !== 1) return noEncontrado();

    return HttpResponse.json({
      info: { count: EPISODIOS.length, pages: 1 },
      results: EPISODIOS,
    });
  }),

  http.get(`${API_BASE_URL}/episode/:id`, ({ params }) => {
    const episodio = EPISODIOS.find(
      (item) => String(item.id) === String(params.id),
    );

    return episodio ? HttpResponse.json(episodio) : noEncontrado();
  }),
];
