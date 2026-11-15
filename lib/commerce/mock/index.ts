import catalog from "./catalog.json";
import type {
  CommerceProvider,
  ProductQuery,
  StoreProduct,
  StoreProductCategory,
} from "../types";

/**
 * Mock catalog: a snapshot of the live schleifpunktberlin.com WooCommerce
 * catalog (crawled 2026-11-15), re-shaped into Medusa-v2-like products.
 * Prices and variants are real at the time of the crawl; stock is simulated.
 */
const products = catalog as unknown as StoreProduct[];

export const SHOP_CATEGORIES: StoreProductCategory[] = [
  { handle: "schleifbaender", name: "Schleifbänder" },
  { handle: "schleifscheiben", name: "Schleifscheiben" },
  { handle: "lacke", name: "Lacke" },
  { handle: "oele", name: "Öle" },
  { handle: "zubehoer", name: "Zubehör" },
];

function matches(p: StoreProduct, query: ProductQuery) {
  if (query.kind && p.metadata.kind !== query.kind) return false;
  if (query.group && p.metadata.group !== query.group) return false;
  if (query.category && !p.categories.some((c) => c.handle === query.category)) return false;
  if (query.q) {
    const needle = query.q.toLocaleLowerCase("de");
    const hay = `${p.title} ${p.subtitle ?? ""} ${p.metadata.brand ?? ""}`.toLocaleLowerCase("de");
    if (!hay.includes(needle)) return false;
  }
  return true;
}

function byCode(a: StoreProduct, b: StoreProduct) {
  return (a.metadata.code ?? "").localeCompare(b.metadata.code ?? "");
}

export const mockProvider: CommerceProvider = {
  name: "mock",
  async listProducts(query = {}) {
    const list = products.filter((p) => matches(p, query));
    return query.kind === "rental" ? [...list].sort(byCode) : list;
  },
  async getProduct(handle) {
    return products.find((p) => p.handle === handle) ?? null;
  },
  async getProductsByHandles(handles) {
    return handles
      .map((h) => products.find((p) => p.handle === h))
      .filter((p): p is StoreProduct => Boolean(p));
  },
  async listCategories() {
    return SHOP_CATEGORIES.map((c) => ({
      ...c,
      count: products.filter((p) => p.categories.some((pc) => pc.handle === c.handle)).length,
    }));
  },
};
