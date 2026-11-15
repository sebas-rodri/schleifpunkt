import Link from "next/link";
import type { StoreProductCategory } from "@/lib/commerce/types";

export function CategorySidebar({
  categories,
  active,
  rentalCount,
}: {
  categories: (StoreProductCategory & { count: number })[];
  active?: string;
  rentalCount: number;
}) {
  const all = categories.reduce((n, c) => n + c.count, 0);
  const items = [
    { href: "/shop", name: "Alle Produkte", count: all, on: active === "" },
    ...categories.map((c) => ({ href: `/shop/kategorie/${c.handle}`, name: c.name, count: c.count, on: active === c.handle })),
  ];
  const row = "flex items-center justify-between gap-3 whitespace-nowrap rounded-md px-3 py-2 text-[0.95rem]";
  return (
    <nav aria-label="Kategorien">
      <h2 className="hidden px-3 pb-2 text-sm font-bold uppercase tracking-wide text-muted lg:block">Kategorien</h2>
      <ul className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 lg:mx-0 lg:block lg:space-y-0.5 lg:overflow-visible lg:px-0">
        {items.map((c) => (
          <li key={c.href} className="shrink-0">
            <Link
              href={c.href}
              aria-current={c.on ? "page" : undefined}
              className={`${row} border lg:border-0 ${c.on ? "border-brand bg-brand-soft font-semibold text-brand" : "border-line hover:bg-surface"}`}
            >
              {c.name}
              <span className="text-sm text-muted tabular">{c.count}</span>
            </Link>
          </li>
        ))}
        <li className="shrink-0 lg:mt-4 lg:border-t lg:border-line lg:pt-4">
          <Link href="/mieten" className={`${row} border border-line hover:bg-surface lg:border-0`}>
            Maschinen mieten
            <span className="text-sm text-muted tabular">{rentalCount}</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
