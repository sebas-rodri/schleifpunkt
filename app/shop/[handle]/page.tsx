import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BuyBox } from "@/components/buy-box";
import { Check } from "@/components/icons";
import { ProductCard } from "@/components/product-card";
import { commerce } from "@/lib/commerce";
import { formatEur } from "@/lib/format";
import { priceRange } from "@/lib/price";
import { ui } from "@/lib/ui";

type Props = PageProps<"/shop/[handle]">;

export async function generateStaticParams() {
  const products = await commerce.listProducts({ kind: "sale" });
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { handle } = await props.params;
  const p = await commerce.getProduct(handle);
  if (!p) return {};
  return { title: p.title, description: `${p.title} ab ${formatEur(priceRange(p).min)} bei Schleifpunkt Berlin.` };
}

async function ProductContent(props: Props) {
  const { handle } = await props.params;
  const product = await commerce.getProduct(handle);
  if (!product || product.metadata.kind !== "sale") notFound();

  const category = product.categories[0];
  const [rentals, sameCategory] = await Promise.all([
    commerce.listProducts({ kind: "rental" }),
    commerce.listProducts({ kind: "sale", category: category?.handle }),
  ]);
  const fits = rentals.filter((r) => r.metadata.accessories?.includes(product.handle));
  const related = sameCategory.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <>
      <Breadcrumbs
        items={[
          { href: "/shop", label: "Shop" },
          ...(category ? [{ href: `/shop/kategorie/${category.handle}`, label: category.name }] : []),
          { label: product.title },
        ]}
      />
      <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="relative aspect-square overflow-hidden rounded-lg border border-line bg-white">
          {product.thumbnail && (
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="product-photo object-contain p-10"
            />
          )}
        </div>
        <div>
          <h1 className={ui.h1}>{product.title}</h1>
          <p className="mt-1 text-sm text-muted">
            {[product.metadata.brand, category?.name].filter(Boolean).join(" · ")}
          </p>
          <div className="mt-6 rounded-lg border border-line p-5">
            <BuyBox product={product} />
            <p className="mt-4 text-sm text-muted">Preis inkl. 19 % MwSt. Abholung in Berlin-Moabit, auf Wunsch Lieferung.</p>
          </div>
          <ul className="mt-5 grid gap-2 text-[0.95rem]">
            <li className="flex gap-2">
              <Check size={18} className="mt-0.5 shrink-0 text-brand" /> Abholung zusammen mit Ihrer Mietmaschine
            </li>
            <li className="flex gap-2">
              <Check size={18} className="mt-0.5 shrink-0 text-brand" /> Beratung zu Körnung und Menge an der Theke
            </li>
          </ul>
          {product.description && (
            <section className="mt-8" aria-labelledby="beschreibung">
              <h2 id="beschreibung" className="text-lg font-bold">
                Beschreibung
              </h2>
              <p className="mt-2 max-w-prose leading-relaxed">{product.description}</p>
            </section>
          )}
          {fits.length > 0 && (
            <section className="mt-8" aria-labelledby="passt">
              <h2 id="passt" className="text-lg font-bold">
                Passt zu diesen Mietmaschinen
              </h2>
              <ul className="mt-3 grid gap-2">
                {fits.map((m) => (
                  <li key={m.id}>
                    <Link
                      href={`/mieten/${m.handle}`}
                      className="flex items-center gap-3 rounded-md border border-line px-4 py-3 hover:bg-surface"
                    >
                      <span className="font-semibold">{m.title}</span>
                      <span className="text-muted">{m.subtitle}</span>
                      <span className="ml-auto text-sm font-semibold tabular">
                        {formatEur(m.variants[0].calculated_price.calculated_amount)} / Tag
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16" aria-labelledby="related">
          <h2 id="related" className={ui.h2}>
            Weitere Produkte aus der Kategorie {category?.name}
          </h2>
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {related.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

export default function ProductPage(props: Props) {
  return (
    <div className={`${ui.container} pt-6`}>
      <Suspense fallback={<div className="min-h-[70vh]" aria-busy="true" />}>
        <ProductContent {...props} />
      </Suspense>
    </div>
  );
}
