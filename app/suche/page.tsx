import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ListingSkeleton } from "@/components/listing-skeleton";
import { ProductListing } from "@/components/product-listing";
import { SearchFacets, type Facet } from "@/components/search-facets";
import { commerce } from "@/lib/commerce";
import { parsePage, parseSort } from "@/lib/listing";
import { searchProducts } from "@/lib/search";
import { shopNav } from "@/lib/site";
import { ui } from "@/lib/ui";

export const metadata: Metadata = { title: "Suche", robots: { index: false } };

async function SearchResults({ searchParams }: { searchParams: PageProps<"/suche">["searchParams"] }) {
  const sp = await searchParams;
  const q = String(Array.isArray(sp.q) ? sp.q[0] : (sp.q ?? "")).trim();
  const kategorie = String(Array.isArray(sp.kategorie) ? sp.kategorie[0] : (sp.kategorie ?? ""));
  const [all, categories] = await Promise.all([commerce.listProducts(), commerce.listCategories()]);
  const results = q ? searchProducts(all, q) : [];
  const keyOf = (p: (typeof results)[number]) => (p.metadata.kind === "rental" ? "mieten" : (p.categories[0]?.handle ?? ""));
  const facetNames: Record<string, string> = { mieten: "Mietmaschinen" };
  categories.forEach((c) => (facetNames[c.handle] = c.name));
  const facets: Facet[] = Object.entries(
    results.reduce<Record<string, number>>((acc, p) => ((acc[keyOf(p)] = (acc[keyOf(p)] ?? 0) + 1), acc), {}),
  )
    .map(([key, count]) => ({ key, name: facetNames[key] ?? key, count }))
    .sort((a, b) => b.count - a.count);
  const filtered = kategorie ? results.filter((p) => keyOf(p) === kategorie) : results;

  return (
    <>
      <h1 className={`${ui.h1} mt-3`}>{q ? <>Suchergebnisse für „{q}“</> : "Suche"}</h1>
      <div className={`mt-8 ${results.length ? "grid gap-8 lg:grid-cols-[15rem_1fr] [&>*]:min-w-0" : ""}`}>
        {results.length > 0 && (
          <aside>
            <SearchFacets q={q} facets={facets} active={kategorie} total={results.length} />
          </aside>
        )}
        <ProductListing
          products={filtered}
          keepOrder
          showCategory
          page={parsePage(sp.seite)}
          sort={parseSort(sp.sortierung)}
          basePath="/suche"
          params={kategorie ? { q, kategorie } : { q }}
          empty={
            <div className="rounded-lg border border-line bg-surface px-6 py-10 text-center">
              <p className="text-lg font-semibold">{q ? `Keine Treffer für „${q}“.` : "Was suchen Sie?"}</p>
              <p className="mt-2 text-muted">
                Versuchen Sie einen anderen Begriff, zum Beispiel „Schleifband“, „Bona“ oder „Randschleifer“, oder stöbern
                Sie in den Kategorien:
              </p>
              <ul className="mt-5 flex flex-wrap justify-center gap-2">
                {shopNav.map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className={ui.btnSecondary}>
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          }
        />
      </div>
    </>
  );
}

export default function SuchePage(props: PageProps<"/suche">) {
  return (
    <div className={`${ui.container} pt-6`}>
      <Breadcrumbs items={[{ label: "Suche" }]} />
      <Suspense fallback={<ListingSkeleton />}>
        <SearchResults searchParams={props.searchParams} />
      </Suspense>
    </div>
  );
}
