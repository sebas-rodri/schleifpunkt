"use client";

import type { StoreProduct } from "@/lib/commerce/types";
import { defaultRange, isValidRange, rentalDays } from "@/lib/rental";
import { useToday } from "@/lib/use-today";
import { cart, useCart, type CartLine } from "./store";

export function rentalLineFor(p: StoreProduct): Omit<CartLine, "id"> {
  const v = p.variants[0];
  return {
    kind: "rental",
    productHandle: p.handle,
    variantId: v.id,
    title: p.title,
    subtitle: p.subtitle,
    variantTitle: "Tagesmiete",
    thumbnail: p.thumbnail,
    unitPrice: v.calculated_price.calculated_amount,
    quantity: 1,
    code: p.metadata.code,
  };
}

/** Shared rental state: one pickup/return period per job, machines in the cart. */
export function useRental() {
  const state = useCart();
  const today = useToday();
  const fallback = today ? defaultRange(today) : { from: "", to: "" };
  const stored = state.period;
  const period = stored && today && stored.from >= today ? stored : fallback;
  const valid = today ? isValidRange(period.from, period.to, today) : true;
  const days = period.from && period.to && period.to >= period.from ? rentalDays(period.from, period.to) : 1;
  const rentals = state.lines.filter((l) => l.kind === "rental");

  return {
    today,
    period,
    valid,
    days,
    rentals,
    isSelected: (p: StoreProduct) => rentals.some((l) => l.variantId === p.variants[0]?.id),
    toggle(p: StoreProduct) {
      const v = p.variants[0];
      if (!v) return;
      if (rentals.some((l) => l.variantId === v.id)) cart.removeVariant(v.id);
      else {
        if (!stored && period.from) cart.setPeriod(period);
        cart.add(rentalLineFor(p));
      }
    },
    setFrom(from: string) {
      const to = period.to && period.to >= from ? period.to : from;
      cart.setPeriod({ from, to });
    },
    setTo(to: string) {
      cart.setPeriod({ from: period.from, to });
    },
    total: rentals.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0) * days,
  };
}
