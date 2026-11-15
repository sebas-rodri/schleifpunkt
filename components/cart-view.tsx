"use client";

import Image from "next/image";
import Link from "next/link";
import { useRental } from "@/lib/cart/rental";
import { cart, cartTotals, useCart, type CartLine } from "@/lib/cart/store";
import { formatEur, pluralTage } from "@/lib/format";
import { site } from "@/lib/site";
import { ui } from "@/lib/ui";
import { QtyStepper } from "./buy-box";
import { DateRange } from "./date-range";
import { ArrowRight, Close } from "./icons";

function Thumb({ line, href }: { line: CartLine; href: string }) {
  return (
    <Link href={href} className="relative block aspect-square w-20 shrink-0 overflow-hidden rounded-md border border-line bg-white sm:w-24" tabIndex={-1} aria-hidden="true">
      {line.thumbnail && <Image src={line.thumbnail} alt="" fill sizes="96px" className="product-photo object-contain p-1.5" />}
    </Link>
  );
}

function RemoveButton({ line }: { line: CartLine }) {
  return (
    <button
      type="button"
      onClick={() => cart.remove(line.id)}
      className="inline-flex items-center gap-1 text-sm text-muted hover:text-danger hover:underline"
    >
      <Close size={14} /> Entfernen<span className="sr-only">: {line.title}</span>
    </button>
  );
}

export function CartView() {
  const state = useCart();
  const rental = useRental();
  const totals = cartTotals({ ...state, period: rental.period.from ? rental.period : state.period });
  const rentals = state.lines.filter((l) => l.kind === "rental");
  const sales = state.lines.filter((l) => l.kind === "sale");
  const vat = totals.total - totals.total / (1 + site.vatRate);

  if (state.lines.length === 0) {
    return (
      <div className="mt-8 rounded-lg border border-line bg-surface px-6 py-12 text-center">
        <p className="text-lg font-semibold">Ihr Warenkorb ist leer.</p>
        <p className="mt-1 text-muted">Wählen Sie Maschinen für Ihren Zeitraum oder stöbern Sie im Shop.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/mieten" className={ui.btnPrimary}>
            Maschinen mieten
          </Link>
          <Link href="/shop" className={ui.btnSecondary}>
            Zum Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_22rem] lg:gap-10 [&>*]:min-w-0">
      <div className="grid content-start gap-10 [&>*]:min-w-0">
        {rentals.length > 0 && (
          <section aria-labelledby="cart-rentals">
            <h2 id="cart-rentals" className="text-xl font-bold">
              Miete
            </h2>
            <div className="mt-4 rounded-lg border border-line bg-surface p-4">
              <DateRange />
            </div>
            <ul className="mt-2 divide-y divide-line border-b border-line">
              {rentals.map((l) => (
                <li key={l.id} className="flex gap-4 py-4">
                  <Thumb line={l} href={`/mieten/${l.productHandle}`} />
                  <div className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                    <div className="min-w-0">
                      <p className="font-semibold">
                        <Link href={`/mieten/${l.productHandle}`} className="hover:text-brand hover:underline">
                          {l.title}
                        </Link>
                      </p>
                      <p className="text-sm text-muted">
                        {l.subtitle} · Art.-Nr. {l.code}
                      </p>
                      <p className="text-sm text-muted tabular">
                        {formatEur(l.unitPrice)} × {pluralTage(totals.days)}
                      </p>
                      <div className="mt-1.5">
                        <RemoveButton line={l} />
                      </div>
                    </div>
                    <p className="font-bold tabular sm:text-right">{formatEur(l.unitPrice * totals.days)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {sales.length > 0 && (
          <section aria-labelledby="cart-sales">
            <h2 id="cart-sales" className="text-xl font-bold">
              Einkauf
            </h2>
            <ul className="mt-2 divide-y divide-line border-b border-line">
              {sales.map((l) => (
                <li key={l.id} className="flex gap-4 py-4">
                  <Thumb line={l} href={`/shop/${l.productHandle}`} />
                  <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                    <div className="min-w-0">
                      <p className="font-semibold">
                        <Link href={`/shop/${l.productHandle}`} className="hover:text-brand hover:underline">
                          {l.title}
                        </Link>
                      </p>
                      {l.variantTitle && <p className="text-sm text-muted">{l.variantTitle}</p>}
                      <p className="text-sm text-muted tabular">{formatEur(l.unitPrice)} pro Stück</p>
                      <div className="mt-2 flex items-center gap-4">
                        <QtyStepper value={l.quantity} onChange={(n) => cart.setQuantity(l.id, n)} label={`Menge ${l.title}`} />
                        <RemoveButton line={l} />
                      </div>
                    </div>
                    <p className="font-bold tabular sm:text-right">{formatEur(l.unitPrice * l.quantity)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      <aside aria-labelledby="cart-sum">
        <div className="rounded-lg border border-line bg-surface p-5 lg:sticky lg:top-6">
          <h2 id="cart-sum" className="text-lg font-bold">
            Zusammenfassung
          </h2>
          <dl className="mt-4 grid gap-2 text-[0.95rem] tabular">
            {rentals.length > 0 && (
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Miete ({pluralTage(totals.days)})</dt>
                <dd>{formatEur(totals.rental)}</dd>
              </div>
            )}
            {sales.length > 0 && (
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Einkauf</dt>
                <dd>{formatEur(totals.sale)}</dd>
              </div>
            )}
            <div className="mt-2 flex justify-between gap-4 border-t border-line pt-3 text-lg font-bold">
              <dt>Gesamt</dt>
              <dd>{formatEur(totals.total)}</dd>
            </div>
            <p className="text-sm text-muted">
              inkl. {formatEur(vat)} MwSt. (19 %){rentals.length > 0 && ", zzgl. Kaution bei Abholung"}
            </p>
          </dl>
          <Link
            href="/kasse"
            aria-disabled={!rental.valid}
            onClick={(e) => !rental.valid && e.preventDefault()}
            className={`${ui.btnPrimaryLg} mt-5 w-full`}
          >
            Zur Kasse <ArrowRight size={20} />
          </Link>
          <Link href="/shop" className="mt-3 block text-center text-sm font-semibold text-brand hover:underline">
            Weiter einkaufen
          </Link>
        </div>
      </aside>
    </div>
  );
}
