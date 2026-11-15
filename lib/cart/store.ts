"use client";

import { useSyncExternalStore } from "react";
import { rentalDays } from "../rental";

/**
 * Mock cart, persisted in localStorage.
 *
 * Medusa v2 later: replace these actions with `sdk.store.cart.*` calls
 * (create, createLineItem, updateLineItem, deleteLineItem) and keep the
 * cart id in a cookie. Rental lines carry `metadata.rental = { from, to }`.
 */

export type LineKind = "rental" | "sale";

export interface CartLine {
  id: string;
  kind: LineKind;
  productHandle: string;
  variantId: string;
  title: string;
  subtitle: string | null;
  variantTitle: string | null;
  thumbnail: string | null;
  /** per day for rentals, per piece for sale items */
  unitPrice: number;
  quantity: number;
  code?: string;
}

export interface RentalPeriod {
  from: string;
  to: string;
}

export interface CartState {
  lines: CartLine[];
  period: RentalPeriod | null;
}

const KEY = "schleifpunkt.cart.v1";
const EMPTY: CartState = { lines: [], period: null };

let state: CartState = EMPTY;
let hydrated = false;
const listeners = new Set<() => void>();

function load() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as CartState;
      if (Array.isArray(parsed.lines)) state = { lines: parsed.lines, period: parsed.period ?? null };
    }
  } catch {
    state = EMPTY;
  }
}

function commit(next: CartState) {
  state = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable: cart still works for this tab */
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  load();
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key !== KEY) return;
    hydrated = false;
    load();
    listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot() {
  load();
  return state;
}

function getServerSnapshot() {
  return EMPTY;
}

export function useCart() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

const uid = () => Math.random().toString(36).slice(2, 10);

export const cart = {
  add(line: Omit<CartLine, "id">) {
    load();
    const existing = state.lines.find((l) => l.variantId === line.variantId && l.kind === line.kind);
    if (existing) {
      // a machine is rented once per job; consumables stack
      const quantity = line.kind === "rental" ? existing.quantity : existing.quantity + line.quantity;
      commit({ ...state, lines: state.lines.map((l) => (l === existing ? { ...l, quantity } : l)) });
      return;
    }
    commit({ ...state, lines: [...state.lines, { ...line, id: uid() }] });
  },
  addMany(lines: Omit<CartLine, "id">[]) {
    lines.forEach((l) => cart.add(l));
  },
  setQuantity(id: string, quantity: number) {
    load();
    if (quantity <= 0) return cart.remove(id);
    commit({ ...state, lines: state.lines.map((l) => (l.id === id ? { ...l, quantity } : l)) });
  },
  remove(id: string) {
    load();
    commit({ ...state, lines: state.lines.filter((l) => l.id !== id) });
  },
  removeVariant(variantId: string) {
    load();
    commit({ ...state, lines: state.lines.filter((l) => l.variantId !== variantId) });
  },
  setPeriod(period: RentalPeriod) {
    load();
    commit({ ...state, period });
  },
  clear() {
    commit(EMPTY);
  },
};

export function cartTotals(s: CartState) {
  const days = s.period ? rentalDays(s.period.from, s.period.to) : 1;
  let rental = 0;
  let sale = 0;
  for (const l of s.lines) {
    if (l.kind === "rental") rental += l.unitPrice * l.quantity * days;
    else sale += l.unitPrice * l.quantity;
  }
  const count = s.lines.reduce((n, l) => n + (l.kind === "rental" ? 1 : l.quantity), 0);
  return { days, rental, sale, total: rental + sale, count };
}
