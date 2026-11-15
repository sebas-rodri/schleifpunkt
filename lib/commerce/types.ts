/**
 * Storefront types, deliberately shaped after Medusa v2's Store API
 * (`StoreProduct`, `StoreProductVariant`, `calculated_price`, …) so the mock
 * provider can be swapped for a Medusa adapter without touching UI code.
 *
 * Simplifications vs. Medusa v2 (handled in the Medusa adapter when it lands):
 * - option values are plain strings instead of `{ id, value }` objects
 * - variant `options` is a `{ [optionTitle]: value }` map
 * - prices are major units (Medusa v2 also stores major units, e.g. 25 = 25,00 €)
 */

export type CurrencyCode = "eur";

export interface CalculatedPrice {
  calculated_amount: number;
  currency_code: CurrencyCode;
}

export interface StoreProductOption {
  id: string;
  title: string;
  values: string[];
}

export interface StoreProductVariant {
  id: string;
  title: string;
  sku: string | null;
  options: Record<string, string>;
  calculated_price: CalculatedPrice;
  inventory_quantity: number;
  allow_backorder: boolean;
}

export type ProductKind = "rental" | "sale";

export type RentalGroup = "boden" | "absaugen" | "hand" | "saegen" | "weitere";

export interface ProductMetadata {
  kind: ProductKind;
  /** Equipment code painted on the machine plate, e.g. "M-01". Rentals only. */
  code?: string;
  group?: RentalGroup;
  /** One-line use note shown on the plate. */
  note?: string;
  /** Handles of consumables that fit this machine. */
  accessories?: string[];
  brand?: string | null;
  source_name?: string;
  /** Recommended order in listings ("Empfohlen"): lower comes first. */
  rank?: number;
}

export interface StoreProductCategory {
  handle: string;
  name: string;
}

export interface StoreProduct {
  id: string;
  handle: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  thumbnail: string | null;
  categories: StoreProductCategory[];
  metadata: ProductMetadata;
  options: StoreProductOption[];
  variants: StoreProductVariant[];
}

export interface ProductQuery {
  kind?: ProductKind;
  category?: string;
  group?: RentalGroup;
  q?: string;
}

/** The only surface the UI talks to. Implemented by `mock` today, `medusa` later. */
export interface CommerceProvider {
  readonly name: "mock" | "medusa";
  listProducts(query?: ProductQuery): Promise<StoreProduct[]>;
  getProduct(handle: string): Promise<StoreProduct | null>;
  getProductsByHandles(handles: string[]): Promise<StoreProduct[]>;
  listCategories(): Promise<(StoreProductCategory & { count: number })[]>;
}
