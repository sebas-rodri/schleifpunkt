/**
 * Materialrechner — guidance values for one rectangular room.
 *
 * Every factor below is a rule-of-thumb assumption, not a client-confirmed
 * figure. They live in one place so Schleifpunkt can tune them before launch.
 * The UI labels the result as "Richtwert".
 */

export type FloorType = "dielen" | "parkett";
export type Condition = "beschichtet" | "geoelt" | "roh";
export type Finish = "lack" | "oel";

export interface EstimateInput {
  area: number; // m²
  floor: FloorType;
  condition: Condition;
  finish: Finish;
}

export interface EstimateLine {
  /** product handle in the catalog */
  handle: string;
  /** option selection used to find the variant, e.g. { Körnung: "40" } */
  options?: Record<string, string>;
  quantity: number;
  /** short reason shown next to the line */
  reason: string;
}

export interface Estimate {
  days: number;
  grits: number[];
  machines: EstimateLine[];
  consumables: EstimateLine[];
}

export const ESTIMATOR_ASSUMPTIONS = {
  /** m² one belt lasts, by grit. Coarse grits clog fastest on old coatings. */
  beltCoverage: (grit: number) => (grit <= 24 ? 8 : grit <= 40 ? 12 : grit <= 60 ? 15 : 20),
  /** metres of wall edge one Ø150 disc lasts, by grit. */
  discEdgeMetres: (grit: number) => (grit <= 40 ? 3 : 4),
  /** m² per Schleifgitter for the single-disc pass. */
  screenCoverage: 25,
  /** m² per polishing pad when oiling. */
  padCoverage: 25,
  /** lacquer: m² per litre and coat, coats, pack size */
  lacquer: { coverage: 10, coats: 2, pack: 5, handle: "bona-domo-matt-5l" },
  /** oil: m² per litre and coat, coats, pack size */
  oil: { coverage: 20, coats: 2, pack: 2.5, handle: "avalon-hartwachsoel-2-5l" },
  /** rental days by area */
  days: (area: number) => (area <= 30 ? 1 : area <= 70 ? 2 : 3),
} as const;

const BELT_SIZE = "200 × 750 mm · Hummel";
const FIRST_GRIT: Record<Condition, number> = { beschichtet: 24, geoelt: 40, roh: 40 };

export function gritSequence(condition: Condition, finish: Finish): number[] {
  const last = finish === "oel" ? 120 : 100;
  const ladder = [24, 40, 60];
  const start = FIRST_GRIT[condition];
  return [...ladder.filter((g) => g >= start), last];
}

export function estimate(input: EstimateInput): Estimate {
  const area = Math.max(1, Math.round(input.area));
  const a = ESTIMATOR_ASSUMPTIONS;
  const grits = gritSequence(input.condition, input.finish);
  const days = a.days(area);
  const perimeter = 4 * Math.sqrt(area);
  const last = grits[grits.length - 1];

  const machines: EstimateLine[] = [
    { handle: "bandschleifmaschine-laegler-hummel-elf", quantity: 1, reason: "Fläche schleifen" },
    { handle: "randschleifer-unico-elan-panda", quantity: 1, reason: "Ränder und Ecken" },
    { handle: "einscheibenmaschine-tasky", quantity: 1, reason: input.finish === "oel" ? "Ausgleichen und Öl einarbeiten" : "Ausgleichen vor dem Lack" },
    { handle: "absaugmobil-ctl-24-festool", quantity: 1, reason: "Staub zwischen den Gängen" },
  ];

  const consumables: EstimateLine[] = [];
  for (const grit of grits) {
    consumables.push({
      handle: "schleifband-hummel-elf",
      options: { Größe: BELT_SIZE, Körnung: String(grit) },
      quantity: Math.max(1, Math.ceil(area / a.beltCoverage(grit))),
      reason: `Fläche, Körnung ${grit}`,
    });
  }
  for (const grit of grits) {
    consumables.push({
      handle: "klettscheibe-mit-loch",
      options: { Größe: "Ø 150 mm", Körnung: String(grit) },
      quantity: Math.max(2, Math.ceil(perimeter / a.discEdgeMetres(grit))),
      reason: `Rand, Körnung ${grit}`,
    });
  }
  consumables.push({
    handle: "schleifgitter",
    options: { Größe: "Ø 400 mm", Körnung: String(last) },
    quantity: Math.max(1, Math.ceil(area / a.screenCoverage)),
    reason: `Einscheibe, Körnung ${last}`,
  });

  if (input.finish === "lack") {
    const litres = (area * a.lacquer.coats) / a.lacquer.coverage;
    consumables.push({
      handle: a.lacquer.handle,
      quantity: Math.max(1, Math.ceil(litres / a.lacquer.pack)),
      reason: `${a.lacquer.coats} Schichten, ca. ${formatLitres(litres)}`,
    });
  } else {
    const litres = (area * a.oil.coats) / a.oil.coverage;
    consumables.push({
      handle: a.oil.handle,
      quantity: Math.max(1, Math.ceil(litres / a.oil.pack)),
      reason: `${a.oil.coats} Aufträge, ca. ${formatLitres(litres)}`,
    });
    consumables.push({
      handle: "normalpad-406mm-beige",
      quantity: Math.max(1, Math.ceil(area / a.padCoverage)),
      reason: "Öl einpolieren",
    });
  }

  return { days, grits, machines, consumables };
}

function formatLitres(l: number) {
  return `${(Math.ceil(l * 2) / 2).toLocaleString("de-DE")} l`;
}

/** Every catalog handle the estimator can ask for, across all inputs. */
export function estimatorHandles(): string[] {
  const handles = new Set<string>();
  for (const condition of ["beschichtet", "geoelt", "roh"] as const)
    for (const finish of ["lack", "oel"] as const) {
      const e = estimate({ area: 20, floor: "dielen", condition, finish });
      [...e.machines, ...e.consumables].forEach((l) => handles.add(l.handle));
    }
  return [...handles];
}
