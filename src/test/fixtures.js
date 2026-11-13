/**
 * Datos de ejemplo con la misma forma que devuelve la API.
 * Se construyen con funciones para que cada test pueda ajustar solo lo que
 * necesita sin repetir el resto de campos.
 */
export function crearPersonaje(id, name, extra = {}) {
  return {
    id,
    name,
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
    origin: { name: "Earth (C-137)", url: "" },
    location: { name: "Citadel of Ricks", url: "" },
    image: `https://rickandmortyapi.com/api/character/avatar/${id}.jpeg`,
    episode: [],
    url: `https://rickandmortyapi.com/api/character/${id}`,
    created: "2017-11-04T18:48:46.250Z",
    ...extra,
  };
}

export function crearEpisodio(id, name, characters = [], extra = {}) {
  return {
    id,
    name,
    air_date: "December 2, 2013",
    episode: `S01E${String(id).padStart(2, "0")}`,
    characters,
    url: `https://rickandmortyapi.com/api/episode/${id}`,
    created: "2017-11-10T12:56:33.798Z",
    ...extra,
  };
}

export const rick = crearPersonaje(1, "Rick Sanchez");
export const morty = crearPersonaje(2, "Morty Smith");
export const summer = crearPersonaje(3, "Summer Smith");
export const beth = crearPersonaje(4, "Beth Smith");

export const piloto = crearEpisodio(1, "Pilot", [
  "https://rickandmortyapi.com/api/character/1",
  "https://rickandmortyapi.com/api/character/2",
]);

export const lawnmowerDog = crearEpisodio(2, "Lawnmower Dog", [
  "https://rickandmortyapi.com/api/character/1",
]);
