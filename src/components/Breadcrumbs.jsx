

import { Breadcrumbs as MTBreadCrumbs } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function Breadcrumbs({ items = [] }) {
  return (
    <div className="border-b border-slate-800 bg-slate-950/80 px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <MTBreadCrumbs
          separator={
            <span className="text-slate-600">/</span>
          }
          className="flex flex-wrap items-center gap-2 bg-transparent p-0"
        >
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return isLast ? (
              <span
                key={`${item.label}-${index}`}
                aria-current="page"
                className="text-sm font-bold text-green-400"
              >
                {item.label}
              </span>
            ) : (
              <Link
                key={`${item.label}-${index}`}
                to={item.to}
                className="text-sm font-medium text-slate-400 transition-colors duration-300 hover:text-lime-400"
              >
                {item.label}
              </Link>
            );
          })}
        </MTBreadCrumbs>
      </div>
    </div>
  );
}