import type { CommerceProvider } from "../types";

/**
 * Medusa v2 adapter — NOT ACTIVE YET.
 *
 * Plan (see README "Medusa v2"):
 *   npm i @medusajs/js-sdk
 *   const sdk = new Medusa({ baseUrl: process.env.MEDUSA_BACKEND_URL!, publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY })
 *   listProducts  -> sdk.store.product.list({ region_id, fields: "*variants.calculated_price,+metadata,*categories" })
 *   getProduct    -> sdk.store.product.list({ handle, region_id, ... }).products[0]
 *   categories    -> sdk.store.category.list()
 * Map `option.values[].value` to strings and `variant.options[]` to a
 * `{ [option.title]: value }` record so the UI types in ../types stay unchanged.
 * Rentals: one product per machine with `metadata.kind = "rental"`; the per-day
 * price is the variant price; rental dates travel as line-item metadata.
 */
function notConfigured(): never {
  throw new Error(
    "Medusa provider is not configured yet. Set COMMERCE_PROVIDER=mock or implement lib/commerce/medusa.",
  );
}

export const medusaProvider: CommerceProvider = {
  name: "medusa",
  listProducts: async () => notConfigured(),
  getProduct: async () => notConfigured(),
  getProductsByHandles: async () => notConfigured(),
  listCategories: async () => notConfigured(),
};
