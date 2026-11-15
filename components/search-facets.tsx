import Link from "next/link";

export interface Facet {
  key: string;
  name: string;
  count: number;
}

/** Category filter for search results: sidebar on desktop, scrolling chips on mobile. */
export function SearchFacets({ q, facets, active, total }: { q: string; facets: Facet[]; active: string; total: number }) {
  const href = (key: string) => {
    const p = new URLSearchParams({ q });
    if (key) p.set("kategorie", key);
    return `/suche?${p.toString()}`;
  };
  const items = [{ key: "", name: "Alle Ergebnisse", count: total }, ...facets];
  const row = "flex items-center justify-between gap-3 whitespace-nowrap rounded-md px-3 py-2 text-[0.95rem]";
  return (
    <nav aria-label="Ergebnisse filtern">
      <h2 className="hidden px-3 pb-2 text-sm font-bold uppercase tracking-wide text-muted lg:block">Kategorie</h2>
      <ul className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 lg:mx-0 lg:block lg:space-y-0.5 lg:overflow-visible lg:px-0">
        {items.map((f) => {
          const on = active === f.key;
          return (
            <li key={f.key || "all"} className="shrink-0">
              <Link
                href={href(f.key)}
                aria-current={on ? "page" : undefined}
                className={`${row} border lg:border-0 ${on ? "border-brand bg-brand-soft font-semibold text-brand" : "border-line hover:bg-surface"}`}
              >
                {f.name}
                <span className="text-sm text-muted tabular">{f.count}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
