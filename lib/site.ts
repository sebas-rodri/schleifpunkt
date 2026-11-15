/** Real business facts from schleifpunktberlin.com (Impressum / Kontakt). */
export const site = {
  name: "Schleifpunkt Berlin",
  url: "https://schleifpunktberlin.com",
  street: "Perleberger Str. 25",
  zip: "10559",
  city: "Berlin",
  district: "Moabit",
  phoneMobile: { label: "0176 40234772", href: "tel:+4917640234772" },
  phoneLandline: { label: "030 32592279", href: "tel:+493032592279" },
  email: "info@schleifpunktberlin.com",
  owner: "Rafael Breglia",
  vatId: "DE405760453",
  legalForm: "Gewerbebetrieb",
  mapsHref:
    "https://www.openstreetmap.org/search?query=Perleberger%20Stra%C3%9Fe%2025%2C%2010559%20Berlin",
  /** Extra services from the live catalog. */
  services: { transport: 30, cleaningFee: 35 },
  vatRate: 0.19,
} as const;

export const shopNav = [
  { href: "/mieten", label: "Maschinen mieten" },
  { href: "/shop/kategorie/schleifbaender", label: "Schleifbänder" },
  { href: "/shop/kategorie/schleifscheiben", label: "Schleifscheiben" },
  { href: "/shop/kategorie/lacke", label: "Lacke" },
  { href: "/shop/kategorie/oele", label: "Öle" },
  { href: "/shop/kategorie/zubehoer", label: "Zubehör" },
] as const;

export const infoNav = [
  { href: "/ratgeber", label: "Ratgeber" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

export const nav = [...shopNav, ...infoNav];
