/**
 * The sanding job as Schleifpunkt explains it at the counter.
 * General floor-sanding practice; the counter adapts it to the actual floor.
 */

export interface Step {
  id: string;
  name: string;
  short: string;
  machines: { code: string; handle: string; label: string }[];
  grits: string;
  text: string;
  tip: string;
}

const M01 = { code: "M-01", handle: "bandschleifmaschine-laegler-hummel-elf", label: "Bandschleifmaschine" };
const M02 = { code: "M-02", handle: "randschleifer-unico-elan-panda", label: "Randschleifer" };
const M03 = { code: "M-03", handle: "einscheibenmaschine-tasky", label: "Einscheibenmaschine" };
const M04 = { code: "M-04", handle: "absaugmobil-ctl-24-festool", label: "Absaugmobil" };

export const steps: Step[] = [
  {
    id: "grob",
    name: "Grobschliff",
    short: "Alte Schicht runter",
    machines: [M01],
    grits: "24 bis 40",
    text: "Mit der Bandschleifmaschine nehmen Sie alten Lack, Farbe und Verschmutzung ab. Dielen schleifen Sie in Längsrichtung der Bretter, stark verzogenes Parkett zuerst schräg.",
    tip: "Nägel vorher versenken. Ein Nagelkopf zerreißt das Band sofort.",
  },
  {
    id: "rand",
    name: "Ränder",
    short: "Wände, Ecken, Heizkörper",
    machines: [M02],
    grits: "gleiche Körnung wie die Fläche",
    text: "Wo die große Maschine nicht hinkommt, arbeitet der Randschleifer: entlang der Wände, in Türlaibungen und unter Heizkörpern.",
    tip: "Nach jedem Gang auf der Fläche folgt derselbe Gang am Rand.",
  },
  {
    id: "mittel",
    name: "Mittelschliff",
    short: "Riefen glätten",
    machines: [M01, M02],
    grits: "60",
    text: "Der zweite Gang nimmt die Spuren des groben Schliffs heraus. Körnung nie um mehr als eine Stufe überspringen.",
    tip: "Zwischen den Gängen gründlich saugen. Altes Schleifkorn zerkratzt den nächsten Gang.",
  },
  {
    id: "fein",
    name: "Feinschliff",
    short: "Fläche fertig",
    machines: [M01, M02],
    grits: "100 bis 120",
    text: "Der letzte Gang mit Band und Randschleifer bereitet die Oberfläche für Lack oder Öl vor.",
    tip: "Für Öl eine Stufe feiner schleifen als für Lack.",
  },
  {
    id: "ausgleich",
    name: "Ausgleichen",
    short: "Übergänge verschwinden",
    machines: [M03, M04],
    grits: "Schleifgitter 100 bis 120",
    text: "Die Einscheibenmaschine gleicht die Kante zwischen Fläche und Rand aus. Danach wird gründlich abgesaugt.",
    tip: "Die Maschine ruhig in Bahnen führen, nicht drücken.",
  },
  {
    id: "versiegeln",
    name: "Versiegeln",
    short: "Lack oder Öl",
    machines: [M03],
    grits: "Pad zum Einpolieren",
    text: "Lack bildet eine strapazierfähige Schicht und wird in mehreren Schichten gerollt. Öl zieht ins Holz ein und wird mit der Einscheibenmaschine und einem Pad eingearbeitet.",
    tip: "Trocknungszeiten auf dem Gebinde einhalten. Wir zeigen Ihnen an der Theke, welches Produkt zu Ihrem Boden passt.",
  },
];

/** Trade words, defined in the margin where they are used. */
export const glossary: { term: string; text: string }[] = [
  {
    term: "Körnung",
    text: "Die Zahl auf dem Schleifmittel. Kleine Zahl, grobes Korn: 24 trägt viel ab, 120 glättet fein.",
  },
  {
    term: "Einscheibenmaschine",
    text: "Eine Maschine mit einer großen rotierenden Scheibe. Sie gleicht aus, poliert und arbeitet Öl ein.",
  },
  {
    term: "Kaution",
    text: "Sie hinterlegen sie bei Abholung und bekommen sie bei Rückgabe zurück, wenn die Maschine in Ordnung ist. Die Höhe hängt vom Gerät ab.",
  },
];
