"use client";

import Link from "next/link";
import type { StoreProduct } from "@/lib/commerce/types";
import { useRental } from "@/lib/cart/rental";
import { formatEur, pluralTage } from "@/lib/format";
import { ui } from "@/lib/ui";
import { DateRange } from "./date-range";
import { ArrowRight, Check, Plus } from "./icons";

export function BookingBox({ machine }: { machine: StoreProduct }) {
  const rental = useRental();
  const on = rental.isSelected(machine);
  const v = machine.variants[0];
  const available = v.inventory_quantity > 0;
  const price = v.calculated_price.calculated_amount;

  return (
    <div className="rounded-lg border border-line p-5">
      <DateRange showDays={false} />
      <dl className="mt-5 grid gap-1.5 border-t border-line pt-4 text-[0.95rem] tabular">
        <div className="flex justify-between">
          <dt className="text-muted">
            {formatEur(price)} × {pluralTage(rental.days)}
          </dt>
          <dd className="text-xl font-bold">{formatEur(price * rental.days)}</dd>
        </div>
        <p className="text-sm text-muted">inkl. 19 % MwSt., zzgl. Kaution bei Abholung</p>
      </dl>
      <div className="mt-5 grid gap-2">
        {available ? (
          <button
            type="button"
            aria-pressed={on}
            onClick={() => rental.toggle(machine)}
            disabled={!rental.valid}
            className={`${on ? ui.btnSecondary : ui.btnPrimaryLg} w-full`}
          >
            {on ? <Check size={20} /> : <Plus size={20} />}
            {on ? "Im Warenkorb, entfernen" : "In den Warenkorb"}
          </button>
        ) : (
          <p className="rounded-md bg-surface px-4 py-3 text-center font-semibold text-muted">Derzeit vergeben</p>
        )}
        {on && (
          <Link href="/warenkorb" className={`${ui.btnPrimaryLg} w-full`}>
            Zum Warenkorb <ArrowRight size={20} />
          </Link>
        )}
      </div>
    </div>
  );
}
