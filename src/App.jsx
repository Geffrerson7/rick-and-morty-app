import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import PageLoader from "./components/PageLoader";

// Cada página se carga como su propio chunk: el bundle inicial solo trae el
// layout y el router.
const Personajes = lazy(() => import("./pages/Personajes"));
const PersonajeDetalle = lazy(() => import("./pages/PersonajeDetalle"));
const Episodios = lazy(() => import("./pages/Episodios"));
const EpisodioDetalle = lazy(() => import("./pages/EpisodioDetalle"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Un Suspense por ruta, dentro de Layout, para que navbar y footer no
// desaparezcan mientras se descarga el chunk de la página.
const withSuspense = (elemento) => (
  <Suspense fallback={<PageLoader message="CARGANDO MULTIVERSO..." />}>
    {elemento}
  </Suspense>
);

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={withSuspense(<Personajes />)} />

        <Route
          path="/personaje/:id"
          element={withSuspense(<PersonajeDetalle />)}
        />

        <Route path="/episodios" element={withSuspense(<Episodios />)} />

        <Route path="/episodios/:episodioId">
          <Route index element={withSuspense(<EpisodioDetalle />)} />

          <Route
            path="personaje/:personajeId"
            element={withSuspense(<PersonajeDetalle />)}
          />
        </Route>

        <Route path="*" element={withSuspense(<NotFound />)} />
      </Route>
    </Routes>
  );
}

export default App;
