"use client";

import { useState } from "react";
import { ui } from "@/lib/ui";
import { Check } from "./icons";

type Errors = Partial<Record<"vorname" | "email" | "nachricht", string>>;

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="rounded-lg border border-line bg-brand-soft p-6" role="status">
        <p className="flex items-center gap-2 text-lg font-semibold text-brand">
          <Check size={22} /> Nachricht gesendet
        </p>
        <p className="mt-1 text-muted">Vorschau: Im Live-Betrieb ginge Ihre Nachricht jetzt an das Team in Moabit.</p>
      </div>
    );
  }

  return (
    <form
      noValidate
      className="grid gap-4"
      onSubmit={(ev) => {
        ev.preventDefault();
        const f = new FormData(ev.currentTarget);
        const e: Errors = {};
        if (!String(f.get("vorname") ?? "").trim()) e.vorname = "Bitte geben Sie Ihren Vornamen an.";
        if (!/^\S+@\S+\.\S+$/.test(String(f.get("email") ?? ""))) e.email = "Bitte prüfen Sie die E-Mail-Adresse.";
        if (String(f.get("nachricht") ?? "").trim().length < 10) e.nachricht = "Schreiben Sie uns kurz, worum es geht.";
        setErrors(e);
        const first = Object.keys(e)[0];
        if (first) ev.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
        else setSent(true);
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="vorname" label="Vorname" error={errors.vorname} autoComplete="given-name" />
        <Field name="nachname" label="Nachname" autoComplete="family-name" optional />
      </div>
      <Field name="email" label="E-Mail" type="email" error={errors.email} autoComplete="email" />
      <div className="grid gap-1.5">
        <label htmlFor="nachricht" className={ui.label}>
          Nachricht
        </label>
        <textarea
          id="nachricht"
          name="nachricht"
          rows={5}
          className={`${ui.input} h-auto py-2.5`}
          placeholder="Welcher Boden, wie viele Quadratmeter, wann?"
          aria-invalid={Boolean(errors.nachricht)}
          aria-describedby={errors.nachricht ? "nachricht-err" : undefined}
        />
        {errors.nachricht && (
          <p id="nachricht-err" className={ui.error}>
            {errors.nachricht}
          </p>
        )}
      </div>
      <button type="submit" className={`${ui.btnPrimary} justify-self-start`}>
        Nachricht senden
      </button>
    </form>
  );
}

function Field({
  name,
  label,
  error,
  optional,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { name: string; label: string; error?: string; optional?: boolean }) {
  return (
    <div className="grid gap-1.5">
      <label htmlFor={name} className={ui.label}>
        {label} {optional && <span className="font-normal text-muted">(optional)</span>}
      </label>
      <input id={name} name={name} className={ui.input} aria-invalid={Boolean(error)} aria-describedby={error ? `${name}-err` : undefined} {...props} />
      {error && (
        <p id={`${name}-err`} className={ui.error}>
          {error}
        </p>
      )}
    </div>
  );
}
