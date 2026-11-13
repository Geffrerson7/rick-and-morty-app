import { setupServer } from "msw/node";
import { handlers } from "./handlers";

/** Servidor MSW compartido por todos los tests. */
export const server = setupServer(...handlers);
