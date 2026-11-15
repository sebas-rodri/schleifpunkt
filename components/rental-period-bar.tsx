"use client";

import Link from "next/link";
import { useRental } from "@/lib/cart/rental";
import { formatEur, pluralTage } from "@/lib/format";
import { ui } from "@/lib/ui";
import { DateRange } from "./date-range";
import { ArrowRight } from "./icons";

/** Rental period + running total, shown above the machine grid. */
export function RentalPeriodBar() {
  const rental = useRental();
  const count = rental.rentals.length;
  return (
    <section aria-label="Ihr Mietzeitraum" className="rounded-lg border border-line bg-surface p-4 sm:p-5">
      <div className="grid gap-5 md:grid-cols-[minmax(0,26rem)_1fr] md:items-end">
        <DateRange showDays={false} />
        <div className="flex flex-wrap items-center justify-between gap-4 md:justify-end">
          <p className="text-[0.95rem] text-muted" aria-live="polite">
            {count === 0 ? (
              <>Mietdauer {pluralTage(rental.days)} · noch keine Maschine gewählt</>
            ) : (
              <>
                {count} {count === 1 ? "Maschine" : "Maschinen"} · {pluralTage(rental.days)} ·{" "}
                <strong className="text-lg text-ink tabular">{formatEur(rental.total)}</strong>
              </>
            )}
          </p>
          <Link
            href="/warenkorb"
            aria-disabled={count === 0 || !rental.valid}
            onClick={(e) => (count === 0 || !rental.valid) && e.preventDefault()}
            className={ui.btnPrimary}
          >
            Zum Warenkorb <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
