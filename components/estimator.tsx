"use client";

import { useRouter } from "next/navigation";
import { useId, useMemo, useState } from "react";
import { cart, type CartLine } from "@/lib/cart/store";
import { rentalLineFor, useRental } from "@/lib/cart/rental";
import type { StoreProduct, StoreProductVariant } from "@/lib/commerce/types";
import { estimate, type Condition, type Finish, type FloorType } from "@/lib/estimator";
import { formatEur, formatOptions, pluralTage } from "@/lib/format";
import { addDays } from "@/lib/rental";
import { ui } from "@/lib/ui";
import { ArrowRight, Check } from "./icons";

function pickVariant(p: StoreProduct, options?: Record<string, string>): StoreProductVariant | undefined {
  if (!options) return p.variants[0];
  return p.variants.find((v) => Object.entries(options).every(([k, val]) => v.options[k] === val));
}

function Segmented<T extends string>({
  legend,
  value,
  onChange,
  options,
}: {
  legend: string;
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
}) {
  const name = useId();
  return (
    <fieldset>
      <legend className={ui.label}>{legend}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o.value} className="cursor-pointer">
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
              className="peer sr-only"
            />
            <span className="flex min-h-10 items-center rounded-md border border-line-strong bg-white px-3.5 text-[0.95rem] font-medium transition-colors hover:border-ink peer-checked:border-brand peer-checked:bg-brand-soft peer-checked:font-semibold peer-checked:text-brand peer-checked:ring-1 peer-checked:ring-brand peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand">
              {o.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function Estimator({ products }: { products: StoreProduct[] }) {
  const router = useRouter();
  const rental = useRental();
  const areaId = useId();
  const [area, setArea] = useState(24);
  const [floor, setFloor] = useState<FloorType>("dielen");
  const [condition, setCondition] = useState<Condition>("beschichtet");
  const [finish, setFinish] = useState<Finish>("lack");
  const [added, setAdded] = useState(false);

  const byHandle = useMemo(() => new Map(products.map((p) => [p.handle, p])), [products]);
  const result = useMemo(() => estimate({ area, floor, condition, finish }), [area, floor, condition, finish]);

  const machineRows = result.machines
    .map((l) => ({ line: l, product: byHandle.get(l.handle) }))
    .filter((r): r is { line: typeof r.line; product: StoreProduct } => Boolean(r.product));
  const consumableRows = result.consumables
    .map((l) => {
      const product = byHandle.get(l.handle);
      const variant = product && pickVariant(product, l.options);
      return product && variant ? { line: l, product, variant } : null;
    })
    .filter((r): r is NonNullable<typeof r> => r !== null);

  const UNIT: Record<string, string> = {
    "schleifband-hummel-elf": "200 × 750 mm, Fläche",
    "klettscheibe-mit-loch": "Ø 150 mm, Rand",
    schleifgitter: "400 mm, Einscheibe",
  };
  const groups: { product: StoreProduct; unit?: string; rows: typeof consumableRows; total: number }[] = [];
  for (const r of consumableRows) {
    let g = groups.find((x) => x.product.handle === r.product.handle);
    if (!g) {
      g = { product: r.product, unit: UNIT[r.product.handle], rows: [], total: 0 };
      groups.push(g);
    }
    g.rows.push(r);
    g.total += r.variant.calculated_price.calculated_amount * r.line.quantity;
  }

  const machineTotal = machineRows.reduce(
    (s, r) => s + r.product.variants[0].calculated_price.calculated_amount * result.days,
    0,
  );
  const consumableTotal = consumableRows.reduce(
    (s, r) => s + r.variant.calculated_price.calculated_amount * r.line.quantity,
    0,
  );

  function addAll() {
    const from = rental.period.from;
    if (from) cart.setPeriod({ from, to: addDays(from, result.days) });
    machineRows.forEach((r) => cart.add(rentalLineFor(r.product)));
    const lines: Omit<CartLine, "id">[] = consumableRows.map((r) => ({
      kind: "sale",
      productHandle: r.product.handle,
      variantId: r.variant.id,
      title: r.product.title,
      subtitle: null,
      variantTitle: formatOptions(r.variant.options),
      thumbnail: r.product.thumbnail,
      unitPrice: r.variant.calculated_price.calculated_amount,
      quantity: r.line.quantity,
    }));
    cart.addMany(lines);
    setAdded(true);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-10">
      <form
        className="grid content-start gap-6 rounded-lg border border-line bg-surface p-5"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Angaben zum Raum"
        onChange={() => setAdded(false)}
      >
        <div>
          <label htmlFor={areaId} className={ui.label}>
            Fläche in m²
          </label>
          <div className="mt-2 flex items-center gap-4">
            <input
              id={areaId}
              type="range"
              min={5}
              max={150}
              step={1}
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              className="flex-1 accent-[var(--brand)]"
              aria-valuetext={`${area} Quadratmeter`}
            />
            <input
              type="number"
              min={5}
              max={150}
              value={area}
              onChange={(e) => setArea(Math.min(150, Math.max(5, Number(e.target.value) || 5)))}
              className={`${ui.input} w-20 text-center tabular`}
              aria-label="Fläche in Quadratmetern"
            />
          </div>
        </div>
        <Segmented
          legend="Boden"
          value={floor}
          onChange={setFloor}
          options={[
            { value: "dielen", label: "Dielen" },
            { value: "parkett", label: "Parkett" },
          ]}
        />
        <Segmented
          legend="Jetziger Zustand"
          value={condition}
          onChange={setCondition}
          options={[
            { value: "beschichtet", label: "Lackiert / gestrichen" },
            { value: "geoelt", label: "Geölt" },
            { value: "roh", label: "Unbehandelt" },
          ]}
        />
        <Segmented
          legend="Neues Finish"
          value={finish}
          onChange={setFinish}
          options={[
            { value: "lack", label: "Lack" },
            { value: "oel", label: "Öl" },
          ]}
        />
        <p className="text-sm text-muted">
          Richtwerte für einen rechteckigen Raum. Die genaue Menge stimmen wir bei der Abholung mit Ihnen ab.
        </p>
      </form>

      <section aria-labelledby="est-result" aria-live="polite" className="rounded-lg border border-line">
        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line px-5 py-4">
          <h3 id="est-result" className="text-lg font-bold">
            Ihr Material für {area} m²
          </h3>
          <p className="text-sm text-muted tabular">Körnungen: {result.grits.join(" · ")}</p>
        </div>

        <div className="px-5 py-4">
          <h4 className="text-sm font-semibold text-muted">Maschinen, {pluralTage(result.days)}</h4>
          <ul className="mt-2 divide-y divide-line">
            {machineRows.map(({ line, product }) => (
              <li key={line.handle} className="flex items-baseline justify-between gap-4 py-2">
                <span className="min-w-0">
                  <span className="font-semibold">{product.title}</span>
                  <span className="text-muted"> · {line.reason}</span>
                </span>
                <span className="shrink-0 tabular">
                  {formatEur(product.variants[0].calculated_price.calculated_amount * result.days)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-line px-5 py-4">
          <h4 className="text-sm font-semibold text-muted">Schleifmittel und Finish</h4>
          <ul className="mt-2 divide-y divide-line">
            {groups.map((g) => (
              <li key={g.product.handle} className="flex items-start justify-between gap-4 py-2.5">
                <div className="min-w-0">
                  <p className="font-semibold">
                    {g.product.title}
                    {g.unit && <span className="font-normal text-muted"> · {g.unit}</span>}
                  </p>
                  {g.rows.length > 1 || g.rows[0].line.options?.["Körnung"] ? (
                    <ul className="mt-1.5 flex flex-wrap gap-1.5" aria-label="Menge pro Körnung">
                      {g.rows.map((r) => (
                        <li key={r.variant.id} className="rounded bg-surface px-2 py-0.5 text-sm tabular">
                          {r.line.quantity} × K{r.line.options?.["Körnung"]}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted">
                      {g.rows[0].line.quantity} × · {g.rows[0].line.reason}
                    </p>
                  )}
                </div>
                <span className="shrink-0 tabular">{formatEur(g.total)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 rounded-b-lg border-t border-line bg-surface px-5 py-4">
          <div>
            <p className="text-sm text-muted">Richtwert gesamt, inkl. 19 % MwSt., zzgl. Kaution</p>
            <p className="text-2xl font-bold tabular">{formatEur(machineTotal + consumableTotal)}</p>
          </div>
          {added ? (
            <button type="button" className={ui.btnSecondary} onClick={() => router.push("/warenkorb")}>
              <Check size={18} /> Im Warenkorb, ansehen
            </button>
          ) : (
            <button type="button" className={ui.btnPrimaryLg} onClick={addAll}>
              Alles in den Warenkorb <ArrowRight size={20} />
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
