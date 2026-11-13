import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

/**
 * Monta la aplicación completa en una ruta, con el router en memoria.
 * Al usar `App` se ejercitan también las rutas lazy y el `Suspense`.
 */
export function renderApp(ruta = "/") {
  return render(
    <MemoryRouter initialEntries={[ruta]}>
      <App />
    </MemoryRouter>,
  );
}
