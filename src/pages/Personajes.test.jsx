import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { delay, http, HttpResponse } from "msw";
import { API_BASE_URL } from "../helpers/api";
import { server } from "../test/server";
import { morty, summer } from "../test/fixtures";
import { renderApp } from "../test/renderApp";

describe("Personajes", () => {
  it("muestra un estado vacío cuando la búsqueda no tiene resultados", async () => {
    const user = userEvent.setup();
    renderApp("/");

    expect(
      await screen.findByText("Rick Sanchez — Human"),
    ).toBeInTheDocument();

    await user.type(
      screen.getByLabelText("Buscar personajes por nombre"),
      "zzzzzz",
    );

    expect(
      await screen.findByText(/No se encontraron personajes/, {}, { timeout: 3000 }),
    ).toBeInTheDocument();
    expect(screen.getByText("«zzzzzz»")).toBeInTheDocument();

    // El 404 de la búsqueda no es un error de la API: no hay reintento.
    expect(
      screen.queryByRole("button", { name: /reintentar/i }),
    ).not.toBeInTheDocument();

    // Buscador y paginación siguen montados (regresión de T4).
    expect(
      screen.getByLabelText("Buscar personajes por nombre"),
    ).toHaveValue("zzzzzz");
    expect(screen.getByText("Page 1 of 1")).toBeInTheDocument();
  });

  it("mantiene los controles montados mientras carga la página siguiente", async () => {
    const user = userEvent.setup();

    server.use(
      http.get(`${API_BASE_URL}/character/`, async ({ request }) => {
        const url = new URL(request.url);

        if (url.searchParams.get("page") === "2") {
          await delay(150);
          return HttpResponse.json({
            info: { count: 4, pages: 3 },
            results: [summer],
          });
        }

        return HttpResponse.json({
          info: { count: 4, pages: 3 },
          results: [morty],
        });
      }),
    );

    renderApp("/");
    expect(await screen.findByText("Morty Smith — Human")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /next/i }));

    // Durante la carga, la página 2 ya está activa y los controles siguen ahí.
    expect(await screen.findByText("CARGANDO PERSONAJES...")).toBeInTheDocument();
    expect(screen.getByText("Page 2 of 3")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Buscar personajes por nombre"),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /next/i })).toBeDisabled();

    expect(
      await screen.findByText("Summer Smith — Human"),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /next/i })).toBeEnabled();
  });

  it("vuelve a la página 1 cuando la API responde 404 a una página fuera de rango", async () => {
    const user = userEvent.setup();

    server.use(
      http.get(`${API_BASE_URL}/character/`, ({ request }) => {
        const url = new URL(request.url);

        if (url.searchParams.get("page") === "2") {
          return HttpResponse.json(
            { error: "There is nothing here" },
            { status: 404 },
          );
        }

        return HttpResponse.json({
          info: { count: 2, pages: 2 },
          results: [morty],
        });
      }),
    );

    renderApp("/");
    expect(await screen.findByText("Morty Smith — Human")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /next/i }));

    expect(
      await screen.findByText("Page 1 of 2", {}, { timeout: 3000 }),
    ).toBeInTheDocument();
    expect(screen.getByText("Morty Smith — Human")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /reintentar/i }),
    ).not.toBeInTheDocument();
  });
});
