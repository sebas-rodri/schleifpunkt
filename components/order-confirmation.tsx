"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import type { CartLine, RentalPeriod } from "@/lib/cart/store";
import { formatEur, formatIsoDate, pluralTage } from "@/lib/format";
import { site } from "@/lib/site";
import { ui } from "@/lib/ui";
import { Check } from "./icons";
import { LAST_ORDER_KEY } from "./checkout-form";

interface Order {
  number: string;
  name: string;
  email: string;
  delivery: boolean;
  period: RentalPeriod | null;
  days: number;
  lines: CartLine[];
  total: number;
}

const noop = () => () => {};
const read = () => {
  try {
    return sessionStorage.getItem(LAST_ORDER_KEY);
  } catch {
    return null;
  }
};

export function OrderConfirmation() {
  const raw = useSyncExternalStore(noop, read, () => null);
  const order = raw ? (JSON.parse(raw) as Order) : null;

  if (!order) {
    return (
      <div className="mt-8 rounded-lg border border-line bg-surface px-6 py-10 text-center">
        <p className="text-lg font-semibold">Keine Reservierung gefunden.</p>
        <Link href="/mieten" className={`${ui.btnPrimary} mt-5`}>
          Zu den Maschinen
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_24rem] lg:gap-10">
      <div>
        <p className="flex items-center gap-2 text-lg font-semibold text-success">
          <Check size={22} /> Reservierungsnummer <span className="tabular">{order.number}</span>
        </p>
        <p className="mt-3 max-w-prose leading-relaxed">
          Danke, {order.name}. Im Live-Shop bekämen Sie jetzt eine Bestätigung an {order.email}.
        </p>
        <p className="mt-2 max-w-prose text-sm text-muted">
          Dies ist eine Vorschau des neuen Shops: Es wurde nichts reserviert und keine E-Mail verschickt.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className={ui.btnPrimary}>
            Zur Startseite
          </Link>
          <a href={site.phoneLandline.href} className={ui.btnSecondary}>
            Fragen? {site.phoneLandline.label}
          </a>
        </div>
      </div>
      <div className="rounded-lg border border-line bg-surface p-5">
        <p className="font-bold">{order.delivery ? "Lieferung" : "Abholung in Moabit"}</p>
        <p className="text-sm text-muted tabular">
          {order.period
            ? `${formatIsoDate(order.period.from)} bis ${formatIsoDate(order.period.to)} · ${pluralTage(order.days)}`
            : `${site.street}, ${site.zip} ${site.city}`}
        </p>
        <ul className="mt-4 grid gap-2 text-[0.95rem] tabular">
          {order.lines.map((l) => (
            <li key={l.id} className="flex justify-between gap-4">
              <span className="min-w-0">
                {l.kind === "sale" && `${l.quantity} × `}
                {l.title}
              </span>
              <span className="shrink-0">
                {formatEur(l.kind === "rental" ? l.unitPrice * order.days : l.unitPrice * l.quantity)}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-4 flex justify-between border-t border-line pt-3 text-lg font-bold tabular">
          <span>Gesamt</span>
          <span>{formatEur(order.total)}</span>
        </p>
      </div>
    </div>
  );
}
