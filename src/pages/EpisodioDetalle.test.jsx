import { describe, expect, it } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderApp } from "../test/renderApp";

describe("EpisodioDetalle", () => {
  it("muestra el episodio inexistente y el enlace vuelve al listado", async () => {
    const user = userEvent.setup();
    renderApp("/episodios/9999");

    expect(
      await screen.findByText("Episodio no encontrado"),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: /volver al listado/i }));

    expect(
      await screen.findByRole("heading", {
        level: 1,
        name: "ARCHIVO DE EPISODIOS",
      }),
    ).toBeInTheDocument();
    expect(await screen.findByText("Pilot")).toBeInTheDocument();
  });

  it("conserva el episodio en el breadcrumb y al volver desde un personaje", async () => {
    const user = userEvent.setup();
    renderApp("/episodios/1");

    expect(
      await screen.findByRole("heading", { level: 1, name: "Pilot" }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: /rick sanchez/i }));

    expect(
      await screen.findByRole("heading", { level: 1, name: "Rick Sanchez" }),
    ).toBeInTheDocument();

    const breadcrumb = screen.getByRole("navigation", { name: "breadcrumb" });
    expect(
      within(breadcrumb).getByRole("link", { name: "Episodios" }),
    ).toBeInTheDocument();
    expect(within(breadcrumb).getByText("Pilot")).toBeInTheDocument();
    expect(within(breadcrumb).getByText("Rick Sanchez")).toBeInTheDocument();

    await user.click(
      screen.getByRole("link", { name: /volver al episodio/i }),
    );

    expect(
      await screen.findByRole("heading", { level: 1, name: "Pilot" }),
    ).toBeInTheDocument();
  });
});
