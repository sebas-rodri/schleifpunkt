import Image from "next/image";
import Link from "next/link";
import type { StoreProduct } from "@/lib/commerce/types";
import { formatEur } from "@/lib/format";
import { priceRange } from "@/lib/price";
import { RentalAddButton } from "./rental-add-button";

export function ProductCard({
  product,
  priority = false,
  showCategory = false,
  showRentalBadge = true,
}: {
  product: StoreProduct;
  priority?: boolean;
  /** mixed listings (all products, search, home) show the category under the title */
  showCategory?: boolean;
  /** off on /mieten, where every card is a rental */
  showRentalBadge?: boolean;
}) {
  const rental = product.metadata.kind === "rental";
  const href = rental ? `/mieten/${product.handle}` : `/shop/${product.handle}`;
  const { min, varies } = priceRange(product);
  const category = rental ? "Mietmaschine" : product.categories[0]?.name;

  return (
    <article className="group flex h-full flex-col rounded-lg border border-line bg-white transition-shadow hover:shadow-[0_8px_24px_-12px_rgb(27_31_28/0.3)]">
      <Link href={href} className="relative block aspect-square overflow-hidden rounded-t-lg border-b border-line bg-white" tabIndex={-1} aria-hidden="true">
        {product.thumbnail && (
          <Image
            src={product.thumbnail}
            alt=""
            fill
            priority={priority}
            sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="product-photo object-contain p-5 transition-transform duration-300 group-hover:scale-[1.03]"
          />
        )}
        {rental && showRentalBadge && (
          <span className="absolute left-2.5 top-2.5 rounded bg-accent px-2 py-0.5 text-xs font-bold text-ink">Miete</span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-3.5 sm:p-4">
        <h3 className="hyphens-auto font-semibold leading-snug [overflow-wrap:anywhere]">
          <Link href={href} className="hover:text-brand hover:underline">
            {product.title}
            {product.subtitle && <span className="font-normal text-muted"> · {product.subtitle}</span>}
          </Link>
        </h3>
        {showCategory && <p className="mt-1 text-sm text-muted">{category}</p>}
        <p className="mt-auto pt-3 text-lg font-bold tabular">
          {varies && <span className="mr-1 text-sm font-semibold text-muted">ab</span>}
          {formatEur(min)}
          {rental && <span className="text-sm font-semibold text-muted"> / Tag</span>}
        </p>
        {rental && (
          <div className="mt-3">
            <RentalAddButton machine={product} />
          </div>
        )}
      </div>
    </article>
  );
}
