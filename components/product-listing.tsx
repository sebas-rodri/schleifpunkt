import { Suspense } from "react";
import type { StoreProduct } from "@/lib/commerce/types";
import { paginate, sortProducts, type SortValue } from "@/lib/listing";
import { Pagination } from "./pagination";
import { ProductCard } from "./product-card";
import { SortSelect } from "./sort-select";

/** Sorted, paginated grid (20 per page) with result count and page links. */
export function ProductListing({
  products,
  page,
  sort,
  basePath,
  params = {},
  empty,
  keepOrder = false,
  showCategory = false,
}: {
  products: StoreProduct[];
  page: number;
  sort: SortValue;
  basePath: string;
  params?: Record<string, string>;
  empty?: React.ReactNode;
  /** keep the incoming order for "Empfohlen" (search relevance) */
  keepOrder?: boolean;
  /** mixed listings show each product's category under its title */
  showCategory?: boolean;
}) {
  const sorted = sortProducts(products, sort, keepOrder);
  const p = paginate(sorted, page);
  const href = (n: number) => {
    const qs = new URLSearchParams(params);
    if (sort !== "empfohlen") qs.set("sortierung", sort);
    if (n > 1) qs.set("seite", String(n));
    const s = qs.toString();
    return s ? `${basePath}?${s}` : basePath;
  };

  if (p.total === 0) return <>{empty}</>;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
        <p className="text-[0.95rem] text-muted tabular" aria-live="polite">
          {p.pages > 1 ? `${p.from}–${p.to} von ${p.total} Artikeln` : `${p.total} ${p.total === 1 ? "Artikel" : "Artikel"}`}
        </p>
        <Suspense fallback={null}>
          <SortSelect value={sort} />
        </Suspense>
      </div>
      <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-4">
        {p.items.map((product, i) => (
          <li key={product.id}>
            <ProductCard product={product} priority={i < 4} showCategory={showCategory} />
          </li>
        ))}
      </ul>
      <Pagination page={p.page} pages={p.pages} href={href} />
      {p.pages > 1 && (
        <p className="mt-3 text-center text-sm text-muted tabular">
          Seite {p.page} von {p.pages}
        </p>
      )}
    </div>
  );
}
