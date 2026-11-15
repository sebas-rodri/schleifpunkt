# Schleifpunkt Berlin · Storefront (Pitch-Version)

Neue Website für [schleifpunktberlin.com](https://schleifpunktberlin.com): Maschinenverleih für Bodenschleifen plus Shop für Schleifmittel, Lacke und Öle. Gebaut mit Next.js 16 (App Router, Cache Components), React 19, Tailwind CSS 4.

Der Shop läuft auf einem **Mock-Backend** mit dem echten Katalog (16 Mietmaschinen, 97 Produkte mit Varianten, Stand 15.11.2026). Für den Livegang ist **Medusa v2** vorgesehen.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 141 statisch / teil-statisch vorgerenderte Seiten
```

## Was die Seite kann

| Bereich | Route | Inhalt |
|---|---|---|
| Startseite | `/` | Banner, Vorteile, Sortiment, Mietmaschinen, Ablauf der Miete, Materialrechner, Shop-Auswahl, Kundenfotos, Standort |
| Suche | Header, `/suche?q=` | Live-Vorschläge beim Tippen (Tastatur bedienbar), Ergebnisseite mit Sortierung und Seiten; Umlaute egal („oel“ findet „Öl“) |
| Mieten | `/mieten`, `/mieten/[handle]` | 16 Maschinen nach Gruppen, Mietzeitraum oben, Detailseite mit Buchung und passendem Schleifmittel |
| Shop | `/shop`, `/shop/kategorie/[kategorie]`, `/shop/[handle]` | Kategorien-Sidebar, Sortierung, **20 Artikel pro Seite** mit Seitennavigation, Produktseiten mit Variantenwahl |
| Warenkorb / Kasse | `/warenkorb`, `/kasse`, `/kasse/bestaetigt` | Miete (ein Zeitraum pro Bestellung) und Einkauf getrennt, MwSt.-Ausweis, Abholung oder Lieferung, Validierung, Demo-Bestätigung |
| Inhalte | `/ratgeber`, `/ueber-uns`, `/kontakt`, Rechtliches | Schritt-für-Schritt-Anleitung, FAQ (vom bestehenden Auftritt), Kontaktformular (Mock) |

Design: bewusst ein klassischer, aufgeräumter Webshop (weiß, Markengrün aus dem Logo, eine Schrift: Sofia Sans). Die Klassen liegen als Tailwind-Utilities in den Komponenten, gemeinsame Bausteine in `lib/ui.ts`.

## Architektur

```
lib/commerce/types.ts        Medusa-v2-förmige Typen (StoreProduct, variants, calculated_price)
lib/commerce/mock/           Mock-Provider + catalog.json (Snapshot des WooCommerce-Katalogs)
lib/commerce/medusa/         Platzhalter-Adapter für Medusa v2
lib/commerce/index.ts        wählt den Provider über COMMERCE_PROVIDER=mock|medusa
lib/cart/                    Client-Warenkorb (localStorage) + Miet-Logik
lib/estimator.ts             Materialrechner, alle Faustwerte an einer Stelle
lib/sequence.ts              Arbeitsgänge und Fachbegriffe
lib/search.ts                Suche (Umlaut-Faltung, alle Wörter müssen passen, Ranking)
lib/listing.ts               Sortierung und Seiten (PAGE_SIZE = 20)
components/                  Header mit Suche, Produktkarte, Listing, Pagination, Buchung, Warenkorb, Kasse …
```

Die UI spricht ausschließlich mit `commerce` (Server) und `cart` (Client). Ein Backend-Wechsel ändert keine Komponente.

## Umstieg auf Medusa v2

1. Medusa-v2-Backend aufsetzen, Region „Deutschland“ (EUR, Preise inkl. 19 % MwSt.).
2. Katalog importieren: `lib/commerce/mock/catalog.json` ist bereits nach Produkten, Optionen und Varianten strukturiert. Mietmaschinen als Produkte mit `metadata.kind = "rental"`, `metadata.code`, `metadata.group`, `metadata.accessories`; Variantenpreis = Tagespreis.
3. `npm i @medusajs/js-sdk`, dann `lib/commerce/medusa/index.ts` implementieren (Mapping-Hinweise stehen in der Datei) und `COMMERCE_PROVIDER=medusa` setzen.
4. Warenkorb: die Aktionen in `lib/cart/store.ts` durch `sdk.store.cart.*` ersetzen, Cart-ID im Cookie. Mietzeitraum als Line-Item-Metadaten `{ rental: { from, to } }`, Mietpreis = Tagespreis × Tage (Custom Pricing oder Quantity = Tage).
5. Verfügbarkeit pro Zeitraum (Miete) ist in Medusa nicht eingebaut: eigenes Modul oder Reservation-Logik über Inventory Items pro Maschine.
6. Kasse: Zahlungsart klären (siehe offene Punkte), Bestellbestätigung per E-Mail über einen Notification-Provider.

## Offene Punkte für das Kundengespräch

Annahmen, die vor dem Livegang bestätigt werden müssen:

- **Miettage**: berechnet als Rückgabe minus Abholung, mindestens 1 Tag. Wochenendtarif?
- **Kaution**: Höhe je Maschine ist nicht veröffentlicht; die Seite nennt keine Beträge.
- **Transport 30 €** (im alten Katalog): als Lieferoption interpretiert, Liefergebiet offen.
- **Reinigungspauschale 35 €**: als Gebühr für ungereinigt zurückgegebene Maschinen interpretiert.
- **Bezahlung**: online oder an der Theke? Die Kasse sagt „Sie bezahlen vor Ort“.
- **Öffnungszeiten** fehlen auf der alten Seite und hier.
- **Lagerbestand**: im Mock ist jede Maschine verfügbar (der Randschleifer war beim Crawl „nicht vorrätig“). Der Zustand „Derzeit vergeben“ ist eingebaut.
- **Materialrechner**: Faustwerte (Bandverbrauch je Körnung, Lack 10 m²/l, Öl 20 m²/l) in `lib/estimator.ts`, bitte vom Team prüfen lassen.
- **Zubehör-Zuordnung** (welche Scheiben in welche Maschine passen) ist abgeleitet, siehe `metadata.accessories`.
- Korrekturen gegenüber dem alten Katalog: „Einteler Maschine“ → „Einscheibenmaschine“ (war unter Staubsauger einsortiert), „Kapsäge“ → „Kapp- und Gehrungssäge“.
- Rechtstexte (Datenschutz, AGB, Widerruf) werden 1:1 übernommen; bis dahin verlinken die Seiten auf die bestehenden Texte.
- Die eine Google-Bewertung wird bewusst nicht als Bewertungs-Widget gezeigt.
- Produktnamen aus WooCommerce wurden vereinheitlicht (z. B. „Bona Domo, Matt; 5L“ → „Bona Domo matt, 5 l“), Produktfotos auf einheitliches Format zugeschnitten.

## Bilder

- Kundenfotos (Berliner Altbaudielen) und Produktbilder stammen von der bestehenden Website.
- Stimmungsfotos: Unsplash (Unsplash License), Nachweis unter `/bildnachweis` und in `lib/credits.ts`. Weitere Fotos liegen als Reserve in `public/images/floors/`.
- Jede Rastergrafik trägt ihre Herkunft eingebettet (`impeccable embed-prompt --read <datei>`).
# schleifpunkt
