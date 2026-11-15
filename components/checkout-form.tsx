"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useRental } from "@/lib/cart/rental";
import { cart, cartTotals, useCart } from "@/lib/cart/store";
import { formatEur, formatIsoDate, pluralTage } from "@/lib/format";
import { site } from "@/lib/site";
import { ui } from "@/lib/ui";
import { ArrowRight } from "./icons";

type Errors = Partial<Record<"vorname" | "nachname" | "telefon" | "email" | "adresse" | "agb", string>>;

export const LAST_ORDER_KEY = "schleifpunkt.lastOrder.v1";

/** Demo reservation number, e.g. SP-261121-4821. Called from the submit handler only. */
function orderNumber(from: string) {
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return `SP-${from.replaceAll("-", "").slice(2) || "000000"}-${suffix}`;
}

export function CheckoutForm() {
  const router = useRouter();
  const state = useCart();
  const rental = useRental();
  const [delivery, setDelivery] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);

  const totals = cartTotals({ ...state, period: rental.period.from ? rental.period : state.period });
  const hasRental = state.lines.some((l) => l.kind === "rental");
  const transport = delivery ? site.services.transport : 0;
  const total = totals.total + transport;

  if (state.lines.length === 0 && !busy) {
    return (
      <div className="mt-8 rounded-lg border border-line bg-surface px-6 py-10 text-center">
        <p className="text-lg font-semibold">Ihr Warenkorb ist leer.</p>
        <Link href="/mieten" className={`${ui.btnPrimary} mt-5`}>
          Maschinen auswählen
        </Link>
      </div>
    );
  }

  function validate(form: FormData): Errors {
    const e: Errors = {};
    const get = (k: string) => String(form.get(k) ?? "").trim();
    if (!get("vorname")) e.vorname = "Bitte geben Sie Ihren Vornamen an.";
    if (!get("nachname")) e.nachname = "Bitte geben Sie Ihren Nachnamen an.";
    if (get("telefon").replace(/\D/g, "").length < 6) e.telefon = "Unter dieser Nummer erreichen wir Sie zur Bestätigung.";
    if (!/^\S+@\S+\.\S+$/.test(get("email"))) e.email = "Bitte prüfen Sie die E-Mail-Adresse.";
    if (delivery && get("adresse").length < 8) e.adresse = "Wohin sollen wir liefern? Straße, Hausnummer, PLZ.";
    if (!form.get("agb")) e.agb = "Bitte bestätigen Sie die AGB und die Widerrufsbelehrung.";
    return e;
  }

  function submit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = new FormData(ev.currentTarget);
    const e = validate(form);
    setErrors(e);
    const first = Object.keys(e)[0];
    if (first) {
      ev.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setBusy(true);
    const order = {
      number: orderNumber(rental.period.from),
      name: `${form.get("vorname")} ${form.get("nachname")}`,
      email: String(form.get("email")),
      delivery,
      period: hasRental ? rental.period : null,
      days: totals.days,
      lines: state.lines,
      total,
    };
    try {
      sessionStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order));
    } catch {
      /* ignore */
    }
    router.push("/kasse/bestaetigt");
    cart.clear();
  }

  const field = (name: keyof Errors, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <div className="grid gap-1.5">
      <label htmlFor={name} className={ui.label}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        className={ui.input}
        aria-invalid={Boolean(errors[name])}
        aria-describedby={errors[name] ? `${name}-err` : undefined}
        {...props}
      />
      {errors[name] && (
        <p id={`${name}-err`} className={ui.error}>
          {errors[name]}
        </p>
      )}
    </div>
  );

  const option = (checked: boolean) =>
    `flex cursor-pointer gap-3 rounded-lg border p-4 transition-colors ${checked ? "border-brand bg-brand-soft ring-1 ring-brand" : "border-line hover:bg-surface"}`;

  return (
    <form noValidate onSubmit={submit} className="mt-8 grid gap-8 lg:grid-cols-[1fr_24rem] lg:gap-10 [&>*]:min-w-0">
      <div className="grid content-start gap-10">
        <fieldset className="grid gap-4">
          <legend className="mb-4 text-xl font-bold">1. Ihre Angaben</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            {field("vorname", "Vorname", { autoComplete: "given-name" })}
            {field("nachname", "Nachname", { autoComplete: "family-name" })}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {field("telefon", "Telefon", { type: "tel", autoComplete: "tel", inputMode: "tel" })}
            {field("email", "E-Mail", { type: "email", autoComplete: "email" })}
          </div>
        </fieldset>

        <fieldset className="grid gap-3">
          <legend className="mb-4 text-xl font-bold">2. Abholung oder Lieferung</legend>
          <label className={option(!delivery)}>
            <input type="radio" name="versand" className="mt-1 h-4 w-4 accent-[var(--brand)]" checked={!delivery} onChange={() => setDelivery(false)} />
            <span>
              <span className="block font-semibold">Abholung · kostenlos</span>
              <span className="text-sm text-muted">
                {site.street}, {site.zip} {site.city}
              </span>
            </span>
          </label>
          <label className={option(delivery)}>
            <input type="radio" name="versand" className="mt-1 h-4 w-4 accent-[var(--brand)]" checked={delivery} onChange={() => setDelivery(true)} />
            <span>
              <span className="block font-semibold">Lieferung · {formatEur(site.services.transport)}</span>
              <span className="text-sm text-muted">Wir bringen Maschinen und Material. Liefergebiet nach Absprache.</span>
            </span>
          </label>
          {delivery && <div className="mt-2">{field("adresse", "Lieferadresse", { autoComplete: "street-address" })}</div>}
        </fieldset>

        <fieldset className="grid gap-4">
          <legend className="mb-4 text-xl font-bold">3. Bezahlung</legend>
          <div className="rounded-lg border border-line bg-surface p-4">
            <p className="font-semibold">Bezahlung vor Ort</p>
            <p className="text-sm text-muted">
              Sie bezahlen an der Theke. Die Kaution hinterlegen Sie bei der Abholung, abgerechnet wird bei der Rückgabe.
            </p>
          </div>
          <div className="grid gap-1.5">
            <label htmlFor="bemerkung" className={ui.label}>
              Nachricht an uns <span className="font-normal text-muted">(optional)</span>
            </label>
            <textarea
              id="bemerkung"
              name="bemerkung"
              rows={3}
              className={`${ui.input} h-auto py-2.5`}
              placeholder="z. B. Fläche, Holzart, gewünschte Abholzeit"
            />
          </div>
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              name="agb"
              className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--brand)]"
              aria-invalid={Boolean(errors.agb)}
              aria-describedby={errors.agb ? "agb-err" : undefined}
            />
            <span className="text-[0.95rem]">
              Ich habe die{" "}
              <Link href="/agb" className={ui.link}>
                AGB
              </Link>{" "}
              und die{" "}
              <Link href="/widerruf" className={ui.link}>
                Widerrufsbelehrung
              </Link>{" "}
              gelesen.
            </span>
          </label>
          {errors.agb && (
            <p id="agb-err" className={ui.error}>
              {errors.agb}
            </p>
          )}
        </fieldset>
      </div>

      <aside aria-labelledby="co-sum">
        <div className="rounded-lg border border-line bg-surface p-5 lg:sticky lg:top-6">
          <h2 id="co-sum" className="text-lg font-bold">
            Ihre Bestellung
          </h2>
          {hasRental && rental.period.from && (
            <p className="mt-1 text-sm text-muted tabular">
              Miete: {formatIsoDate(rental.period.from)} bis {formatIsoDate(rental.period.to)} · {pluralTage(totals.days)}
            </p>
          )}
          <ul className="mt-4 grid gap-2 text-[0.95rem]">
            {state.lines.map((l) => (
              <li key={l.id} className="flex justify-between gap-4 tabular">
                <span className="min-w-0">
                  {l.kind === "sale" && `${l.quantity} × `}
                  {l.title}
                </span>
                <span className="shrink-0">
                  {formatEur(l.kind === "rental" ? l.unitPrice * totals.days : l.unitPrice * l.quantity)}
                </span>
              </li>
            ))}
            {delivery && (
              <li className="flex justify-between gap-4 tabular">
                <span>Lieferung</span>
                <span>{formatEur(transport)}</span>
              </li>
            )}
          </ul>
          <div className="mt-4 flex justify-between gap-4 border-t border-line pt-3 text-lg font-bold tabular">
            <span>Gesamt</span>
            <span>{formatEur(total)}</span>
          </div>
          <p className="text-sm text-muted">inkl. 19 % MwSt.{hasRental && ", zzgl. Kaution"}</p>
          <button type="submit" className={`${ui.btnPrimaryLg} mt-5 w-full`} disabled={busy || !rental.valid}>
            Zahlungspflichtig reservieren <ArrowRight size={20} />
          </button>
          <p className="mt-3 text-center text-xs text-muted">Demo: Es wird nichts reserviert, bezahlt oder versendet.</p>
        </div>
      </aside>
    </form>
  );
}
