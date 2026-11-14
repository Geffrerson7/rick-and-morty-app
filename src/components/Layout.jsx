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
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <a
        href="#contenido-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-green-500 focus:px-4 focus:py-2 focus:font-bold focus:text-slate-950"
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
