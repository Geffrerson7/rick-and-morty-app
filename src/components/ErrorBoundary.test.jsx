import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ErrorBoundary from "./ErrorBoundary";

let debeFallar = true;

function ComponenteInestable() {
  if (debeFallar) {
    throw new Error("Fallo de prueba");
  }

  return <p>Contenido recuperado</p>;
}

describe("ErrorBoundary", () => {
  afterEach(() => {
    debeFallar = true;
    vi.restoreAllMocks();
  });

  it("muestra el fallback y vuelve a montar el contenido al reintentar", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const user = userEvent.setup();

    render(
      <ErrorBoundary>
        <ComponenteInestable />
      </ErrorBoundary>,
    );

    expect(
      screen.getByRole("heading", { name: /el multiverso se rompió/i }),
    ).toBeInTheDocument();

    debeFallar = false;
    await user.click(screen.getByRole("button", { name: /reintentar/i }));

    expect(screen.getByText("Contenido recuperado")).toBeInTheDocument();
  });
});
