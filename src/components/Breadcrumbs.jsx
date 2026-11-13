import { Link } from "react-router-dom";

/**
 * Breadcrumb local, sin dependencias externas.
 * Mantiene la semántica `nav > ol > li` con `aria-current="page"` en el
 * último elemento, y el separador queda oculto para lectores de pantalla.
 */
export default function Breadcrumbs({ items = [] }) {
  if (items.length === 0) return null;

  return (
    <div className="border-b border-slate-800 bg-slate-950/80 px-4 py-4 sm:px-6 lg:px-8">
      <nav aria-label="breadcrumb" className="mx-auto max-w-7xl">
        <ol className="flex flex-wrap items-center gap-2">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li
                key={`${item.label}-${index}`}
                className="flex items-center gap-2"
              >
                {isLast ? (
                  <span
                    aria-current="page"
                    className="text-sm font-bold text-green-400"
                  >
                    {item.label}
                  </span>
                ) : (
                  <>
                    <Link
                      to={item.to}
                      className="text-sm font-medium text-slate-400 transition-colors duration-300 hover:text-lime-400"
                    >
                      {item.label}
                    </Link>
                    <span aria-hidden="true" className="text-slate-400">
                      /
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
