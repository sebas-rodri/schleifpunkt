import type { StoreProduct } from "./commerce/types";

export function priceRange(p: StoreProduct) {
  const amounts = p.variants.map((v) => v.calculated_price.calculated_amount).filter((a) => a > 0);
  const min = Math.min(...amounts);
  const max = Math.max(...amounts);
  return { min, max, varies: min !== max };
}
