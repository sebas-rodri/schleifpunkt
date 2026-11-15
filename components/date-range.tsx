"use client";

import { useId } from "react";
import { useRental } from "@/lib/cart/rental";
import { pluralTage } from "@/lib/format";
import { ui } from "@/lib/ui";

/** Pickup and return date for the whole rental (one period per order). */
export function DateRange({ showDays = true }: { showDays?: boolean }) {
  const id = useId();
  const { period, setFrom, setTo, today, valid, days } = useRental();

  return (
    <div>
      <div className="grid grid-cols-2 gap-3">
        <div className="grid min-w-0 gap-1.5">
          <label htmlFor={`${id}-from`} className={ui.label}>
            Abholung
          </label>
          <input
            id={`${id}-from`}
            type="date"
            className={`${ui.input} min-w-0 tabular`}
            value={period.from}
            min={today || undefined}
            onChange={(e) => e.target.value && setFrom(e.target.value)}
            aria-invalid={!valid}
            aria-describedby={`${id}-info`}
          />
        </div>
        <div className="grid min-w-0 gap-1.5">
          <label htmlFor={`${id}-to`} className={ui.label}>
            Rückgabe
          </label>
          <input
            id={`${id}-to`}
            type="date"
            className={`${ui.input} min-w-0 tabular`}
            value={period.to}
            min={period.from || today || undefined}
            onChange={(e) => e.target.value && setTo(e.target.value)}
            aria-invalid={!valid}
            aria-describedby={`${id}-info`}
          />
        </div>
      </div>
      <div id={`${id}-info`} aria-live="polite">
        {!valid ? (
          <p className={`${ui.error} mt-2`} role="alert">
            Die Rückgabe muss am oder nach dem Abholtag liegen, die Abholung frühestens heute.
          </p>
        ) : (
          showDays && <p className="mt-2 text-sm text-muted">Mietdauer: <strong className="text-ink">{pluralTage(days)}</strong></p>
        )}
      </div>
    </div>
  );
}
