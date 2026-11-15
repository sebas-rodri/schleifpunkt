import type { StoreProduct } from "./commerce/types";
import { priceRange } from "./price";

export const PAGE_SIZE = 20;

export const SORTS = [
  { value: "empfohlen", label: "Empfohlen" },
  { value: "preis-auf", label: "Preis aufsteigend" },
  { value: "preis-ab", label: "Preis absteigend" },
  { value: "name", label: "Name A–Z" },
] as const;

export type SortValue = (typeof SORTS)[number]["value"];

export function parseSort(v: unknown): SortValue {
  return SORTS.some((s) => s.value === v) ? (v as SortValue) : "empfohlen";
}

export function parsePage(v: unknown): number {
  const n = Number(Array.isArray(v) ? v[0] : v);
  return Number.isInteger(n) && n > 0 ? n : 1;
}

/** "empfohlen" uses metadata.rank (floor-sanding core first); `keepOrder` keeps an upstream order such as search relevance. */
export function sortProducts(list: StoreProduct[], sort: SortValue, keepOrder = false): StoreProduct[] {
  const copy = [...list];
  if (sort === "empfohlen" && !keepOrder)
    copy.sort((a, b) => (a.metadata.rank ?? 1e9) - (b.metadata.rank ?? 1e9));
  if (sort === "preis-auf") copy.sort((a, b) => priceRange(a).min - priceRange(b).min);
  if (sort === "preis-ab") copy.sort((a, b) => priceRange(b).min - priceRange(a).min);
  if (sort === "name") copy.sort((a, b) => a.title.localeCompare(b.title, "de"));
  return copy;
}

export function paginate<T>(items: T[], page: number, size = PAGE_SIZE) {
  const pages = Math.max(1, Math.ceil(items.length / size));
  const current = Math.min(page, pages);
  return {
    items: items.slice((current - 1) * size, current * size),
    page: current,
    pages,
    total: items.length,
    from: items.length ? (current - 1) * size + 1 : 0,
    to: Math.min(current * size, items.length),
  };
}
