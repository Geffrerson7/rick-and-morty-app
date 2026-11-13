import { describe, expect, it } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { delay, http, HttpResponse } from "msw";
import { API_BASE_URL } from "../helpers/api";
import { server } from "../test/server";
import { morty, summer } from "../test/fixtures";
import { useCharacters } from "./useCharacters";

describe("useCharacters", () => {
  it("aborta la petición en curso al cambiar la búsqueda", async () => {
    const senales = [];

    server.use(
      http.get(`${API_BASE_URL}/character/`, async ({ request }) => {
        senales.push(request.signal);

        // La primera respuesta tarda: da tiempo a cancelarla.
        if (senales.length === 1) await delay(250);

        const url = new URL(request.url);

        return HttpResponse.json({
          info: { count: 1, pages: 1 },
          results: url.searchParams.has("name") ? [summer] : [morty],
        });
      }),
    );

    const { result, rerender } = renderHook(
      ({ search }) => useCharacters({ search, debounceMs: 0 }),
      { initialProps: { search: "" } },
    );

    await waitFor(() => expect(senales).toHaveLength(1));
    expect(result.current.loading).toBe(true);

    rerender({ search: "summer" });

    await waitFor(() => expect(senales[0].aborted).toBe(true));
    await waitFor(() => expect(senales).toHaveLength(2));
    await waitFor(() => expect(result.current.characters).toEqual([summer]));
    expect(result.current.loading).toBe(false);
  });
});
