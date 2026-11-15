import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CategorySidebar } from "@/components/category-sidebar";
import { ListingSkeleton } from "@/components/listing-skeleton";
import { ProductListing } from "@/components/product-listing";
import { commerce } from "@/lib/commerce";
import { parsePage, parseSort } from "@/lib/listing";
import { ui } from "@/lib/ui";

type Props = PageProps<"/shop/kategorie/[kategorie]">;

export async function generateStaticParams() {
  const categories = await commerce.listCategories();
  return categories.map((c) => ({ kategorie: c.handle }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { kategorie } = await props.params;
  const c = (await commerce.listCategories()).find((x) => x.handle === kategorie);
  return c ? { title: `${c.name} kaufen` } : {};
}

async function CategoryContent(props: Props) {
  const [{ kategorie }, sp] = await Promise.all([props.params, props.searchParams]);
  const [categories, rentals] = await Promise.all([commerce.listCategories(), commerce.listProducts({ kind: "rental" })]);
  const category = categories.find((c) => c.handle === kategorie);
  if (!category) notFound();
  const products = await commerce.listProducts({ kind: "sale", category: kategorie });

  return (
    <>
      <Breadcrumbs items={[{ href: "/shop", label: "Shop" }, { label: category.name }]} />
      <h1 className={`${ui.h1} mt-3`}>{category.name}</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[15rem_1fr] [&>*]:min-w-0">
        <aside>
          <CategorySidebar categories={categories} active={kategorie} rentalCount={rentals.length} />
        </aside>
        <ProductListing
          products={products}
          page={parsePage(sp.seite)}
          sort={parseSort(sp.sortierung)}
          basePath={`/shop/kategorie/${kategorie}`}
        />
      </div>
    </>
  );
}

export default function CategoryPage(props: Props) {
  return (
    <div className={`${ui.container} pt-6`}>
      <Suspense fallback={<ListingSkeleton />}>
        <CategoryContent {...props} />
      </Suspense>
    </div>
  );
}
