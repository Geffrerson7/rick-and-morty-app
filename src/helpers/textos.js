/**
 * La API devuelve estado, especie y género en inglés. Estas tablas los
 * traducen para que la interfaz no mezcle idiomas; cualquier valor que no
 * esté contemplado se muestra tal cual llega.
 */
const ESTADOS = {
  Alive: "Vivo",
  Dead: "Muerto",
  unknown: "Desconocido",
};

const ESPECIES = {
  Human: "Humano",
  Alien: "Alienígena",
  Humanoid: "Humanoide",
  "Mythological Creature": "Criatura mitológica",
  Animal: "Animal",
  Robot: "Robot",
  Disease: "Enfermedad",
  unknown: "Desconocida",
};

const GENEROS = {
  Female: "Femenino",
  Male: "Masculino",
  Genderless: "Sin género",
  unknown: "Desconocido",
};

const traductor = (tabla) => (valor) => tabla[valor] ?? valor ?? "";

export const traducirEstado = traductor(ESTADOS);
export const traducirEspecie = traductor(ESPECIES);
export const traducirGenero = traductor(GENEROS);
