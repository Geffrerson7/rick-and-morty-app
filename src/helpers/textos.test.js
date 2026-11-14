import { describe, expect, it } from "vitest";
import { traducirEspecie, traducirEstado, traducirGenero } from "./textos";

describe("textos de la API", () => {
  it("traduce estado, especie y género al español", () => {
    expect(traducirEstado("Alive")).toBe("Vivo");
    expect(traducirEstado("Dead")).toBe("Muerto");
    expect(traducirEspecie("Human")).toBe("Humano");
    expect(traducirGenero("Female")).toBe("Femenino");
    expect(traducirGenero("Genderless")).toBe("Sin género");
  });

  it("deja intacto lo que no está contemplado", () => {
    expect(traducirEspecie("Cronenberg")).toBe("Cronenberg");
    expect(traducirEstado(undefined)).toBe("");
  });
});
