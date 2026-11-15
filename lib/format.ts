const eur = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" });
const eurShort = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

/** 25 -> "25,00 €" */
export const formatEur = (amount: number) => eur.format(amount);
/** 25 -> "25 €", 4.3 -> "4,30 €" */
export const formatEurShort = (amount: number) =>
  Number.isInteger(amount) ? eurShort.format(amount) : eur.format(amount);

const dateFmt = new Intl.DateTimeFormat("de-DE", {
  weekday: "short",
  day: "2-digit",
  month: "2-digit",
  timeZone: "UTC",
});

/** "2026-11-21" -> "Sa., 21.11." */
export const formatIsoDate = (iso: string) => dateFmt.format(new Date(`${iso}T00:00:00Z`));

export const pluralTage = (n: number) => (n === 1 ? "1 Tag" : `${n} Tage`);

/** { Größe: "400mm", Körnung: "120" } -> "Größe 400mm, Körnung 120" */
export const formatOptions = (options: Record<string, string>) =>
  Object.entries(options)
    .map(([k, v]) => `${k} ${v.replace(/\s*\|\s*/g, " ")}`)
    .join(", ") || null;

/** Soft hyphens at the compound joints of long German machine names, so narrow plates break cleanly. */
const JOINTS: [RegExp, string][] = [
  [/Bandschleifmaschine/g, "Band­schleif­maschine"],
  [/Einscheibenmaschine/g, "Einscheiben­maschine"],
  [/Gehrungssäge/g, "Gehrungs­säge"],
  [/Multifunktionswerkzeug/g, "Multifunktions­werkzeug"],
  [/Exzenterschleifer/g, "Exzenter­schleifer"],
  [/Fliesenschneider/g, "Fliesen­schneider"],
  [/Inspektionskamera/g, "Inspektions­kamera"],
  [/Abbruchhammer/g, "Abbruch­hammer"],
  [/Absaugmobil/g, "Absaug­mobil"],
];
export const softHyphens = (s: string) => JOINTS.reduce((t, [re, rep]) => t.replace(re, rep), s);
