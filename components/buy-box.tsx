"use client";

import { useId, useState } from "react";
import { cart } from "@/lib/cart/store";
import type { StoreProduct } from "@/lib/commerce/types";
import { formatEur, formatOptions } from "@/lib/format";
import { ui } from "@/lib/ui";
import { Check, Minus, Plus } from "./icons";

function optionValueAvailable(p: StoreProduct, title: string, value: string, chosen: Record<string, string>) {
  return p.variants.some(
    (v) =>
      v.options[title] === value &&
      v.calculated_price.calculated_amount > 0 &&
      Object.entries(chosen).every(([k, val]) => k === title || v.options[k] === val),
  );
}

function initialSelection(p: StoreProduct): Record<string, string> {
  const first = p.variants.find((v) => v.calculated_price.calculated_amount > 0) ?? p.variants[0];
  return { ...first.options };
}

export function QtyStepper({
  value,
  onChange,
  label,
  tone = "light",
}: {
  value: number;
  onChange: (n: number) => void;
  label: string;
  tone?: "light" | "dark";
}) {
  const border = tone === "light" ? "border-line-strong bg-white" : "border-white/40";
  return (
    <div className={`inline-flex h-11 items-stretch overflow-hidden rounded-md border ${border}`} role="group" aria-label={label}>
      <button
        type="button"
        className="flex w-10 items-center justify-center hover:bg-surface disabled:opacity-40"
        onClick={() => onChange(Math.max(1, value - 1))}
        disabled={value <= 1}
        aria-label="Weniger"
      >
        <Minus size={16} />
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={1}
        max={99}
        value={value}
        onChange={(e) => onChange(Math.min(99, Math.max(1, Number(e.target.value) || 1)))}
        className="w-11 bg-transparent text-center font-semibold tabular outline-none [appearance:textfield]"
        aria-label="Menge"
      />
      <button
        type="button"
        className="flex w-10 items-center justify-center hover:bg-surface"
        onClick={() => onChange(Math.min(99, value + 1))}
        aria-label="Mehr"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}

/** Option chips + quantity + add to cart. `compact` is the row form used under a machine. */
export function BuyBox({ product, compact = false }: { product: StoreProduct; compact?: boolean }) {
  const groupId = useId();
  const [chosen, setChosen] = useState<Record<string, string>>(() => initialSelection(product));
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState<string | null>(null);

  const variant = product.variants.find((v) =>
    product.options.every((o) => v.options[o.title] === chosen[o.title]),
  );
  const price = variant?.calculated_price.calculated_amount ?? 0;
  const purchasable = Boolean(variant && price > 0 && variant.inventory_quantity > 0);

  function pick(title: string, value: string) {
    const next = { ...chosen, [title]: value };
    // keep the selection valid: if no variant matches, fall back to the first one with this value
    const match = product.variants.find((v) => product.options.every((o) => v.options[o.title] === next[o.title]));
    if (!match) {
      const fallback = product.variants.find((v) => v.options[title] === value && v.calculated_price.calculated_amount > 0);
      if (fallback) return setChosen({ ...fallback.options });
    }
    setChosen(next);
    setAdded(null);
  }

  function add() {
    if (!variant || !purchasable) return;
    cart.add({
      kind: "sale",
      productHandle: product.handle,
      variantId: variant.id,
      title: product.title,
      subtitle: null,
      variantTitle: formatOptions(variant.options),
      thumbnail: product.thumbnail,
      unitPrice: price,
      quantity: qty,
    });
    setAdded(variant.id);
  }

  const chipSize = compact ? "min-h-9 px-2.5 text-[0.92rem]" : "min-h-10 px-3.5 text-[0.98rem]";

  return (
    <div className={compact ? "grid gap-3" : "grid gap-6"}>
      {product.options.map((o) => (
        <fieldset key={o.id}>
          <legend className="text-sm font-semibold">
            {o.title}
            {chosen[o.title] && <span className="sr-only">: {chosen[o.title]}</span>}
          </legend>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {o.values.map((val) => {
              const ok = optionValueAvailable(product, o.title, val, chosen);
              return (
                <label key={val} className={ok ? "cursor-pointer" : "cursor-not-allowed"}>
                  <input
                    type="radio"
                    className="peer sr-only"
                    name={`${groupId}-${o.id}`}
                    value={val}
                    checked={chosen[o.title] === val}
                    disabled={!ok}
                    onChange={() => pick(o.title, val)}
                  />
                  <span
                    className={`flex items-center rounded-md border border-line-strong bg-white font-medium tabular transition-colors hover:border-ink peer-checked:border-brand peer-checked:bg-brand-soft peer-checked:font-semibold peer-checked:text-brand peer-checked:ring-1 peer-checked:ring-brand peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand peer-disabled:border-dashed peer-disabled:text-muted peer-disabled:opacity-60 ${chipSize}`}
                  >
                    {val}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>
      ))}

      <div className="flex flex-wrap items-center gap-3">
        <p className={`font-bold tabular ${compact ? "text-lg" : "text-[1.9rem] leading-none"} mr-auto`} aria-live="polite">
          {variant && price > 0 ? formatEur(price) : "Nicht verfügbar"}
          {!compact && <span className="ml-2 text-sm font-medium text-muted">pro Stück</span>}
        </p>
        <QtyStepper
          value={qty}
          onChange={(n) => {
            setQty(n);
            setAdded(null);
          }}
          label={`Menge ${product.title}`}
        />
        <button
          type="button"
          className={`${added === variant?.id ? ui.btnSecondary : ui.btnPrimary} ${compact ? "" : "sm:px-6"}`}
          onClick={add}
          disabled={!purchasable}
        >
          {added === variant?.id ? (
            <>
              <Check size={18} /> Im Warenkorb
            </>
          ) : (
            <>
              <Plus size={18} /> In den Warenkorb
            </>
          )}
        </button>
      </div>
    </div>
  );
}
