import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useLocation, useNavigate } from "react-router-dom";
import { http, HttpResponse } from "msw";
import App from "../App";
import { API_BASE_URL } from "../helpers/api";
import { server } from "../test/server";
import { lawnmowerDog, summer } from "../test/fixtures";
import { renderApp } from "../test/renderApp";

/**
 * Lee la URL actual y ofrece un botón que se comporta como el "Atrás" del
 * navegador, ya que el router en memoria no expone su historial.
 */
function Sonda() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <output data-testid="url">{`${location.pathname}${location.search}`}</output>
      <button type="button" onClick={() => navigate(-1)}>
        atrás
      </button>
    </>
  );
}

function renderConSonda(ruta) {
  return render(
    <MemoryRouter initialEntries={[ruta]}>
      <App />
      <Sonda />
    </MemoryRouter>,
  );
}

const urlActual = () => screen.getByTestId("url").textContent;

describe("Estado en la URL", () => {
  it("restaura la página y la búsqueda desde la URL", async () => {
    let consulta;

    server.use(
      http.get(`${API_BASE_URL}/character/`, ({ request }) => {
        consulta = new URL(request.url).searchParams;

        return HttpResponse.json({
          info: { count: 60, pages: 3 },
          results: [summer],
        });
      }),
    );

    renderApp("/?page=2&name=rick");

    expect(
      await screen.findByRole("heading", { name: "Summer Smith" }),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Buscar personajes por nombre"),
    ).toHaveValue("rick");
    expect(screen.getByText("Página 2 de 3")).toBeInTheDocument();
    expect(consulta.get("page")).toBe("2");
    expect(consulta.get("name")).toBe("rick");
  });

  it("escribe la página en la URL y Atrás la restaura", async () => {
    const user = userEvent.setup();
    renderConSonda("/");

    expect(
      await screen.findByRole("heading", { name: "Rick Sanchez" }),
    ).toBeInTheDocument();
    expect(urlActual()).toBe("/");

    await user.click(
      screen.getByRole("button", { name: "Página siguiente de personajes" }),
    );

    expect(
      await screen.findByRole("heading", { name: "Summer Smith" }),
    ).toBeInTheDocument();
    expect(urlActual()).toBe("/?page=2");

    await user.click(screen.getByRole("button", { name: "atrás" }));

    expect(
      await screen.findByRole("heading", { name: "Morty Smith" }),
    ).toBeInTheDocument();
    expect(urlActual()).toBe("/");
  });

  it("vuelve a la primera página al buscar y no apila historial", async () => {
    const user = userEvent.setup();
    renderConSonda("/?page=2");

    expect(
      await screen.findByRole("heading", { name: "Summer Smith" }),
    ).toBeInTheDocument();

    await user.type(
      screen.getByLabelText("Buscar personajes por nombre"),
      "rick",
    );

    expect(urlActual()).toBe("/?name=rick");
  });

  it("ignora una página que no es un número válido", async () => {
    renderApp("/?page=abc");

    expect(
      await screen.findByRole("heading", { name: "Rick Sanchez" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Página 1 de 2")).toBeInTheDocument();
  });

  it("conserva la página del listado de episodios", async () => {
    server.use(
      http.get(`${API_BASE_URL}/episode`, () =>
        HttpResponse.json({
          info: { count: 60, pages: 3 },
          results: [lawnmowerDog],
        }),
      ),
    );

    renderApp("/episodios?page=2");

    expect(
      await screen.findByRole("heading", { name: "Lawnmower Dog" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Página 2 de 3")).toBeInTheDocument();
  });

  it("vuelve al listado con su página y búsqueda desde una ficha", async () => {
    const user = userEvent.setup();

    server.use(
      http.get(`${API_BASE_URL}/character/`, () =>
        HttpResponse.json({
          info: { count: 60, pages: 3 },
          results: [summer],
        }),
      ),
    );

    renderApp("/?page=2&name=summer");

    await user.click(
      await screen.findByRole("link", { name: /summer smith/i }),
    );

    expect(
      await screen.findByRole("heading", {
        level: 1,
        name: "EXPEDIENTE DIMENSIONAL",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /volver al listado/i }),
    ).toHaveAttribute("href", "/?page=2&name=summer");
  });

  it("vuelve al inicio de la página al cambiar de ruta", async () => {
    const scrollTo = vi.spyOn(window, "scrollTo");
    const user = userEvent.setup();
    renderConSonda("/");

    expect(
      await screen.findByRole("heading", { name: "Rick Sanchez" }),
    ).toBeInTheDocument();
    // El primer montaje respeta la posición con la que se abrió el enlace.
    expect(scrollTo).not.toHaveBeenCalled();

    await user.click(screen.getByRole("link", { name: "Episodios" }));

    expect(
      await screen.findByRole("heading", {
        level: 1,
        name: "ARCHIVO DE EPISODIOS",
      }),
    ).toBeInTheDocument();
    expect(scrollTo).toHaveBeenCalledWith(0, 0);

    scrollTo.mockRestore();
  });
});
