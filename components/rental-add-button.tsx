"use client";

import type { StoreProduct } from "@/lib/commerce/types";
import { useRental } from "@/lib/cart/rental";
import { ui } from "@/lib/ui";
import { Check, Plus } from "./icons";

/** Quick add/remove for a rental machine on listing cards. */
export function RentalAddButton({ machine, full = true }: { machine: StoreProduct; full?: boolean }) {
  const rental = useRental();
  const on = rental.isSelected(machine);
  const available = machine.variants[0]?.inventory_quantity > 0;
  if (!available) {
    return (
      <p className={`${full ? "w-full" : ""} rounded-md bg-surface px-3 py-2.5 text-center text-sm font-semibold text-muted`}>
        Derzeit vergeben
      </p>
    );
  }
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={() => rental.toggle(machine)}
      className={`${on ? ui.btnSecondary : ui.btnPrimary} !px-3 ${full ? "w-full" : ""}`}
    >
      {on ? <Check size={18} /> : <Plus size={18} />}
      {on ? "Gewählt" : "Mieten"}
      <span className="sr-only">: {machine.title}</span>
    </button>
  );
}
