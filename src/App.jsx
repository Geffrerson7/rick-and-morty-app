import { Routes, Route } from "react-router-dom";
import Episodios from "./pages/Episodios";
import Personajes from "./pages/Personajes";
import PersonajeDetalle from "./pages/PersonajeDetalle";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import EpisodioDetalle from "./pages/EpisodioDetalle";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Personajes />} />

        <Route path="/personaje/:id" element={<PersonajeDetalle />} />

        <Route path="/episodios" element={<Episodios />} />

        <Route path="/episodios/:episodioId">
          <Route index element={<EpisodioDetalle />} />

          <Route path="personaje/:personajeId" element={<PersonajeDetalle />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
