"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};

/** Current year, read on the client only so Cache Components can prerender the footer. */
export function Year() {
  const year = useSyncExternalStore(
    noop,
    () => String(new Date().getFullYear()),
    () => "",
  );
  return <>{year}</>;
}
