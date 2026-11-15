import type { Metadata } from "next";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CategorySidebar } from "@/components/category-sidebar";
import { ListingSkeleton } from "@/components/listing-skeleton";
import { ProductListing } from "@/components/product-listing";
import { commerce } from "@/lib/commerce";
import { parsePage, parseSort } from "@/lib/listing";
import { ui } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Shop: Schleifmittel, Lacke und Öle",
  description: "Schleifbänder, Schleifscheiben, Bona-Lacke, Hartwachsöle und Zubehör für Ihr Bodenprojekt in Berlin.",
};

async function Results({ searchParams }: { searchParams: PageProps<"/shop">["searchParams"] }) {
  const sp = await searchParams;
  const products = await commerce.listProducts({ kind: "sale" });
  return <ProductListing products={products} page={parsePage(sp.seite)} sort={parseSort(sp.sortierung)} basePath="/shop" showCategory />;
}

export default async function ShopPage(props: PageProps<"/shop">) {
  const [categories, rentals] = await Promise.all([commerce.listCategories(), commerce.listProducts({ kind: "rental" })]);
  return (
    <div className={`${ui.container} pt-6`}>
      <Breadcrumbs items={[{ label: "Shop" }]} />
      <h1 className={`${ui.h1} mt-3`}>Schleifmittel, Lacke und Öle</h1>
      <p className="mt-2 max-w-2xl text-muted">
        Alles, was in unsere Maschinen passt und danach auf Ihren Boden kommt. Abholung zusammen mit Ihrer Miete.
      </p>
      <div className="mt-8 grid gap-8 lg:grid-cols-[15rem_1fr] [&>*]:min-w-0">
        <aside>
          <CategorySidebar categories={categories} active="" rentalCount={rentals.length} />
        </aside>
        <Suspense fallback={<ListingSkeleton />}>
          <Results searchParams={props.searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
