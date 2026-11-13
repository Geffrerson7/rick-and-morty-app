import "@testing-library/jest-dom/vitest";
import { afterAll, afterEach, beforeAll } from "vitest";
import { server } from "./server";

// jsdom no implementa el scroll y avisa por consola en cada cambio de ruta.
window.scrollTo = () => {};

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

// Cada test parte de los handlers por defecto.
afterEach(() => server.resetHandlers());

afterAll(() => server.close());
