import "server-only";
import { medusaProvider } from "./medusa";
import { mockProvider } from "./mock";
import type { CommerceProvider } from "./types";

export * from "./types";

/** Select the backend with COMMERCE_PROVIDER=mock|medusa (default: mock). */
export const commerce: CommerceProvider =
  process.env.COMMERCE_PROVIDER === "medusa" ? medusaProvider : mockProvider;
