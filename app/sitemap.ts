import type { MetadataRoute } from "next";
import { commerce } from "@/lib/commerce";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [rentals, sales, categories] = await Promise.all([
    commerce.listProducts({ kind: "rental" }),
    commerce.listProducts({ kind: "sale" }),
    commerce.listCategories(),
  ]);
  const pages = ["", "/mieten", "/shop", "/ratgeber", "/ueber-uns", "/kontakt", "/impressum"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}` })),
    ...rentals.map((m) => ({ url: `${site.url}/mieten/${m.handle}` })),
    ...categories.map((c) => ({ url: `${site.url}/shop/kategorie/${c.handle}` })),
    ...sales.map((p) => ({ url: `${site.url}/shop/${p.handle}` })),
  ];
}
