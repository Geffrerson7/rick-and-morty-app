import { Component } from "react";

/**
 * Última red de seguridad de la aplicación.
 *
 * React desmonta el árbol completo cuando un componente lanza durante el
 * render; sin un límite de error el usuario solo vería una pantalla en blanco.
 * Aquí se captura el fallo, se registra para depuración y se ofrece un
 * reintento que vuelve a montar el contenido.
 */
export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // En producción esto es el punto donde conectaría un servicio de errores.
    console.error("Error de render no controlado:", error, info.componentStack);
  }

  reiniciar = () => {
    this.setState({ error: null });
  };

  render() {
    if (!this.state.error) {
      return this.props.children;
    }

    return (
      <div
        role="alert"
        className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-20 text-slate-100"
      >
        <div className="max-w-md rounded-2xl border border-red-500/40 bg-red-950/20 p-8 text-center backdrop-blur-sm">
          <h1 className="text-2xl font-black tracking-wide text-red-500">
            💥 El multiverso se rompió
          </h1>

          <p className="mt-3 text-sm text-slate-400">
            Algo falló al dibujar esta pantalla. Puedes reintentar; si el
            problema continúa, recarga la página.
          </p>

          <button
            type="button"
            onClick={this.reiniciar}
            className="mt-6 rounded-lg bg-green-500 px-5 py-2 font-bold text-slate-950 transition-all duration-300 hover:bg-green-400 focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 active:scale-[0.98]"
          >
            ↻ Reintentar
          </button>
        </div>
      </div>
    );
  }
}
