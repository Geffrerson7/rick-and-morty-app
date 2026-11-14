import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  const { pathname } = useLocation();
  const mainRef = useRef(null);
  const primeraRuta = useRef(true);

  // Al cambiar de ruta se vuelve al principio de la página y el foco pasa al
  // contenido principal, para no entrar al detalle a mitad del scroll ni dejar
  // a los lectores de pantalla en el enlace pulsado.
  useEffect(() => {
    if (primeraRuta.current) {
      primeraRuta.current = false;
      return;
    }

    window.scrollTo(0, 0);
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <div className="grain flex min-h-screen flex-col bg-ink text-paper">
      <a
        href="#contenido-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-acid focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:font-bold focus:uppercase focus:tracking-[0.2em] focus:text-ink"
      >
        Saltar al contenido
      </a>

      <Navbar />

      <main
        id="contenido-principal"
        ref={mainRef}
        tabIndex={-1}
        className="flex flex-1 flex-col focus:outline-none"
      >
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
