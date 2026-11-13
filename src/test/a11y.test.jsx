import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PageLoader from "../components/PageLoader";
import { renderApp } from "./renderApp";

const RUTAS = [
  {
    ruta: "/",
    titulo: "Personajes · Rick and Morty",
    encabezado: "EXPLORADOR DIMENSIONAL",
  },
  {
    ruta: "/episodios",
    titulo: "Episodios · Rick and Morty",
    encabezado: "ARCHIVO DE EPISODIOS",
  },
  {
    ruta: "/personaje/1",
    titulo: "Rick Sanchez · Rick and Morty",
    encabezado: "EXPEDIENTE DIMENSIONAL",
  },
  {
    ruta: "/episodios/1",
    titulo: "Pilot · Rick and Morty",
    encabezado: "Pilot",
  },
  {
    ruta: "/episodios/9999",
    titulo: "Episodio · Rick and Morty",
    encabezado: "💥 ¡WUBBA LUBBA DUB DUB!",
  },
  {
    ruta: "/ruta-inexistente",
    titulo: "Página no encontrada · Rick and Morty",
    encabezado: "Página no encontrada",
  },
];

describe("Accesibilidad", () => {
  it("declara el idioma español y un título inicial en el documento", () => {
    const html = readFileSync(resolve(process.cwd(), "index.html"), "utf8");

    expect(html).toMatch(/<html lang="es">/);
    expect(html).toMatch(/<title>Rick and Morty · Explorador dimensional<\/title>/);
    expect(html).toMatch(/name="description"/);
  });

  it.each(RUTAS)(
    "usa un solo h1 y un título propio en $ruta",
    async ({ ruta, titulo, encabezado }) => {
      renderApp(ruta);

      expect(
        await screen.findByRole("heading", { level: 1, name: encabezado }),
      ).toBeInTheDocument();
      expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
      expect(document.title).toBe(titulo);
    },
  );

  it("ofrece un enlace para saltar al contenido y enfoca main al navegar", async () => {
    const user = userEvent.setup();
    renderApp("/");

    expect(
      screen.getByRole("link", { name: "Saltar al contenido" }),
    ).toHaveAttribute("href", "#contenido-principal");

    const main = screen.getByRole("main");
    expect(main).toHaveAttribute("id", "contenido-principal");
    expect(main).toHaveAttribute("tabindex", "-1");

    await screen.findByRole("heading", { name: "Rick Sanchez" });
    await user.click(screen.getByRole("link", { name: "Episodios" }));
    await screen.findByRole("heading", {
      level: 1,
      name: "ARCHIVO DE EPISODIOS",
    });

    expect(main).toHaveFocus();
  });

  it("anuncia la carga y los errores a los lectores de pantalla", async () => {
    const { unmount } = render(<PageLoader inline />);
    expect(screen.getByRole("status")).toHaveAttribute("aria-live", "polite");
    unmount();

    renderApp("/episodios/9999");
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Episodio no encontrado",
    );
  });

  it("da nombres accesibles y en español a la paginación", async () => {
    renderApp("/");

    await screen.findByRole("heading", { name: "Rick Sanchez" });

    const paginacion = screen.getByRole("group", {
      name: "Paginación de personajes",
    });

    expect(
      within(paginacion).getByRole("button", {
        name: "Página anterior de personajes",
      }),
    ).toBeDisabled();
    expect(
      within(paginacion).getByRole("button", {
        name: "Página siguiente de personajes",
      }),
    ).toBeEnabled();
    expect(within(paginacion).getByText("Página 1 de 2")).toBeInTheDocument();
  });
});
