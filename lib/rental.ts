const DAY = 86_400_000;

/** ISO date (YYYY-MM-DD) of "today" in Berlin. */
export function berlinToday(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Berlin" }).format(now);
}

export function addDays(iso: string, days: number): string {
  const d = new Date(`${iso}T00:00:00Z`);
  return new Date(d.getTime() + days * DAY).toISOString().slice(0, 10);
}

/**
 * Billable rental days: return date minus pickup date, at least one day.
 * Pickup and return on the same day counts as one day.
 * (Assumption mirrored from the live site's "Gesamtdauer" field; confirm with the client.)
 */
export function rentalDays(from: string, to: string): number {
  const diff = Math.round(
    (new Date(`${to}T00:00:00Z`).getTime() - new Date(`${from}T00:00:00Z`).getTime()) / DAY,
  );
  return Math.max(1, diff);
}

export function isValidRange(from: string, to: string, today: string): boolean {
  return Boolean(from && to) && from >= today && to >= from;
}

/** Default range: tomorrow until the day after. */
export function defaultRange(today: string) {
  return { from: addDays(today, 1), to: addDays(today, 2) };
}
