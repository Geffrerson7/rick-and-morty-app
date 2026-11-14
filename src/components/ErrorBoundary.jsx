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
        className="flex min-h-screen items-center justify-center bg-ink px-4 py-20 text-paper"
      >
        <div className="w-full max-w-md border border-danger/40 bg-danger/5 p-8 text-center">
          <p
            aria-hidden="true"
            className="font-mono text-label uppercase tracking-[0.3em] text-danger"
          >
            Fallo crítico
          </p>
          <h1 className="mt-3 font-display text-3xl uppercase leading-tight text-danger">
            💥 El multiverso se rompió
          </h1>

          <p className="mt-3 text-base text-muted">
            Algo falló al dibujar esta pantalla. Puedes reintentar; si el
            problema continúa, recarga la página.
          </p>

          <button
            type="button"
            onClick={this.reiniciar}
            className="mt-6 border border-danger/60 px-5 py-2 font-mono text-label uppercase tracking-[0.2em] text-paper transition-colors duration-300 hover:border-acid hover:text-acid focus-visible:ring-2 focus-visible:ring-acid focus-visible:ring-offset-2 focus-visible:ring-offset-ink active:scale-[0.98]"
          >
            ↻ Reintentar
          </button>
        </div>
      </div>
    );
  }
}
