import { Link } from "react-router-dom";

/**
 * Breadcrumb local, sin dependencias externas.
 * Mantiene la semántica `nav > ol > li` con `aria-current="page"` en el
 * último elemento, y el separador queda oculto para lectores de pantalla.
 */
export default function Breadcrumbs({ items = [] }) {
  if (items.length === 0) return null;

  return (
    <div className="border-b border-line/60 bg-ink px-4 py-3 sm:px-6 lg:px-10">
      <nav aria-label="breadcrumb" className="mx-auto max-w-[1400px]">
        <ol className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-label uppercase tracking-[0.22em]">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li
                key={`${item.label}-${index}`}
                className="flex items-center gap-3"
              >
                {isLast ? (
                  <span aria-current="page" className="text-acid">
                    {item.label}
                  </span>
                ) : (
                  <>
                    <Link
                      to={item.to}
                      viewTransition
                      className="text-muted transition-colors duration-300 hover:text-paper"
                    >
                      {item.label}
                    </Link>
                    <span aria-hidden="true" className="text-muted/60">
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
