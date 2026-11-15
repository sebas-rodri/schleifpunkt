"use client";

import { useSyncExternalStore } from "react";
import { berlinToday } from "./rental";

const noop = () => () => {};

/** Today's ISO date in Berlin on the client; "" during SSR/prerender (avoids baking a build date). */
export function useToday(): string {
  return useSyncExternalStore(noop, () => berlinToday(), () => "");
}
