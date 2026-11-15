import type { RentalGroup } from "./commerce/types";

export const rentalGroups: { id: RentalGroup; name: string; text: string }[] = [
  { id: "boden", name: "Boden schleifen", text: "Die drei Maschinen für Parkett und Dielen." },
  { id: "absaugen", name: "Absaugen", text: "Staub gehört in den Sauger, nicht in die nächste Schicht." },
  { id: "hand", name: "Handmaschinen", text: "Für Treppen, Kanten, Ecken und alles, was die große Maschine nicht erreicht." },
  { id: "saegen", name: "Sägen und Schneiden", text: "Sockelleisten, Dielen, Fliesen." },
  { id: "weitere", name: "Weitere Geräte", text: "Wenn vor dem Schleifen erst etwas raus muss." },
];
