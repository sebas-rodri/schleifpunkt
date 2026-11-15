import type { StoreProduct } from "./commerce/types";

/** Compact record shipped to the header search box. */
export interface SearchItem {
  handle: string;
  title: string;
  subtitle: string | null;
  kind: "rental" | "sale";
  category: string;
  code?: string;
  price: number;
  varies: boolean;
  thumbnail: string | null;
  keywords: string;
}

const UMLAUT: [RegExp, string][] = [
  [/ä/g, "ae"],
  [/ö/g, "oe"],
  [/ü/g, "ue"],
  [/ß/g, "ss"],
];

/** Lowercase, fold umlauts both ways ("Öl", "Oel", "ol" all match), strip punctuation. */
export function normalize(s: string): string {
  let t = s.toLocaleLowerCase("de");
  for (const [re, rep] of UMLAUT) t = t.replace(re, rep);
  return t
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function toSearchItem(p: StoreProduct): SearchItem {
  const amounts = p.variants.map((v) => v.calculated_price.calculated_amount).filter((a) => a > 0);
  const min = Math.min(...amounts);
  const optionValues = p.options.flatMap((o) => o.values).join(" ");
  const category =
    p.metadata.kind === "rental" ? "Mietmaschine" : (p.categories[0]?.name ?? "Shop");
  return {
    handle: p.handle,
    title: p.title,
    subtitle: p.subtitle,
    kind: p.metadata.kind,
    category,
    code: p.metadata.code,
    price: min,
    varies: min !== Math.max(...amounts),
    thumbnail: p.thumbnail,
    keywords: normalize(
      [p.title, p.subtitle, p.metadata.brand, p.metadata.code, p.metadata.note, category, optionValues, p.metadata.kind === "rental" ? "mieten miete leihen" : ""]
        .filter(Boolean)
        .join(" "),
    ),
  };
}

/** Every query word must appear; titles that start with the query rank first. */
export function searchItems<T extends { title: string; keywords: string }>(items: T[], query: string): T[] {
  const q = normalize(query);
  if (!q) return [];
  const words = q.split(" ").filter(Boolean);
  const scored: { item: T; score: number }[] = [];
  for (const item of items) {
    const hay = item.keywords;
    if (!words.every((w) => hay.includes(w))) continue;
    const title = normalize(item.title);
    let score = 0;
    if (title.startsWith(q)) score += 6;
    else if (title.includes(q)) score += 3;
    for (const w of words) if (title.split(" ").some((t) => t.startsWith(w))) score += 1;
    scored.push({ item, score });
  }
  return scored.sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title, "de")).map((s) => s.item);
}

export function searchProducts(products: StoreProduct[], query: string): StoreProduct[] {
  const items = products.map((p) => ({ title: p.title, keywords: toSearchItem(p).keywords, p }));
  return searchItems(items, query).map((i) => i.p);
}
