# Product

<!-- impeccable:product-schema 1 -->

> Interview substitution: the user asked for every option to be auto-confirmed ("decide everything for yourself"). Facts below come from the live site schleifpunktberlin.com (crawled 2026-11-15) and the brief. Anything marked **[assumed]** is an inference, not a confirmed answer, and should be checked with the client before launch.

## Platform

web

## Stack

- **Pinned by user:** Next.js (App Router).
- **Pinned by user:** commerce runs on a **mock store** for the pitch; **Medusa v2** is the planned backend later, not now. The data layer must be shaped so a Medusa v2 adapter can replace the mock without touching UI (products, variants, prices, cart, regions).
- **Delegated:** TypeScript, Tailwind CSS v4, `next/font`, `next/image`, client-side cart state persisted locally. Chosen because they are the Next.js defaults that a Medusa v2 storefront (`@medusajs/js-sdk`) slots into directly.

## Users

- **Primary [assumed]:** Berlin residents (tenants and owners) renovating old-building floors themselves: pine *Dielen* in Altbau flats, parquet in post-war flats. They have one weekend or a few days, have usually never run a 70 kg belt sander, and need the right machine, the right abrasives in the right order, and the right finish, all from one counter.
- **Secondary [assumed]:** small trades (painters, floor layers, handymen, property caretakers) who need an extra machine for a day, or consumables (abrasives, Bona lacquers/oils), without going to a Baumarkt.
- **The client** (Rafael Breglia, Geschäftsführer) sees this as a pitch: the site must look clearly better than the current WordPress/WooCommerce site and be credible as a future production storefront.

## Product Purpose

Schleifpunkt Berlin rents floor-sanding machines and power tools by the day and sells the consumables to finish the job (sanding belts, discs, pads, lacquers, oils, cleaning products, tools, PPE), from a shop in Berlin-Moabit. Success means a visitor books a machine for a date range (with matching abrasives) or buys finishing products, and comes to the counter prepared.

## Positioning

A local specialist counter, not a Baumarkt rental desk: professional machines (Lägler Hummel / ELF belt sander, Unico/Elan/Panda edger, Tasky single-disc), every grit and pad that fits them, the professional finish ranges (Bona, Avalon, Pafuki), and in-person advice from people who sand floors. Machine, abrasives and finish are sold together, as one job.

## Operating Context

- Pickup and return at **Perleberger Str. 25, 10559 Berlin**. Rental contract signed at pickup; **deposit (Kaution) varies by machine**, paid at pickup and refunded on return in good condition.
- **Prices are per day, gross, incl. 19 % MwSt**, deposit excluded. Final price is settled on return.
- Rental booking on the current site: choose a *from/to* date range, see total days and total price, optionally add matching consumables (e.g. *Schleifband Hummel / ELF*, sizes 200×550 / 200×750 mm, grits 12–120, priced per piece).
- Extra services on the current catalog: **Transport (30 €)**, **Reinigungspauschale / cleaning fee (35 €)**.
- The sanding job is a known sequence: coarse to fine grits with the belt sander, edges with the edger, then buffing/intermediate sanding with the single-disc machine, vacuuming, then lacquer or oil. That sequence is real domain knowledge the site may teach.
- Language: **German** (site and audience). Currency EUR.

## Capabilities and Constraints

- **Rental catalog (real, from live site):** Parkettschleifmaschine Hummel/ELF 25 €/Tag; Randschleifermaschine Unico/Elan/Panda 25 €/Tag (currently out of stock); Einteler Maschine Tasky 35 €/Tag; Staubsauger Festo CTL 24 35 €, CTL 36 45 €, Festo Midi 60 €; Fliesen-Schneider Rubi 60/90 cm 22 €; Inspektionskamera Laserline 20 €; Kapsäge Bosch 216 35 €, 305 40 €; Multifunktionswerkzeug Fein 35 €; Oberfräse Bosch/Makita 25 €; Rotex Schleifer Festo 35 €; Stichsäge Bosch/Makita 25 €; Stemm-/Abbruchhammer Bosch/Makita 40 €; Tauchsäge Festo 40 €. The full crawl also lists Lägler TRIO, Bona FlexiSand + DCS 50, Tasky Große, Wirbel single-disc and others without category.
- **Shop categories (real):** Schleifbänder, Schleifscheiben, Lacke, Öle, Zubehör (~145 products, many with variants such as grit and size).
- **Store is a mock for now.** No payments, no accounts, no real availability. Checkout ends in a clearly-labelled demo confirmation. Medusa v2 later must be able to provide: product/variant catalog, rental pricing per day, date-range availability, deposits, cart, checkout.
- **Undecided:** online payment vs. pay-at-pickup; whether rentals are reserved online or only requested; deposit amounts per machine; opening hours (not published on the current site); delivery area for Transport.

## Brand Commitments

- Name: **Schleifpunkt Berlin** (domain schleifpunktberlin.com).
- Existing logo: illustrated badge, a green belt sander on a wooden-floor hexagon with "SCHLEIFPUNKT · BERLIN" on a dark green banner (`/wp-content/uploads/2026/03/logo-png.png`). Preserved as the brand mark. The redesign may change everything around it.
- Voice on the current site is formal German (*Sie*), service-oriented. Keep *Sie*.
- **Standing preference (user, 2026-11-15):** a normal, conventional webshop, "not too fancy". The themed "courtyard board" direction was rejected. Convention is the commitment: clean white storefront, brand green from the logo, clear product grids. Craft bar (chosen by Claude, as the user delegated): German tool and DIY shops such as Contorion and the Festool online shop.
- **Required shop features (user):** product search, and pagination whenever a listing has more than 20 products.

## Evidence on Hand

- Contact: +49 176 40234772, +49 30 32592279, info@schleifpunktberlin.com, Perleberger Str. 25, 10559 Berlin. Gewerbebetrieb, USt-ID DE405760453, represented by Rafael Breglia.
- Six real job photos of sanded/finished Berlin Altbau pine floorboards (phone photos, some with "REDMI NOTE 12" watermark) on the current site.
- Manufacturer product photos for the machines (Lägler Hummel, Unico, Tasky, Festool, Bosch, Makita, Rubi).
- Quote on the live About page, attributed to Rafael Breglia, Geschäftsführer: „Wir sind stolz darauf, Menschen bei Ihren Renovierungsprojekten zu unterstützen und deren Wünsche zu erfüllen.“ (used verbatim, capitalisation of „ihren“ corrected).
- **One** Google review (5 stars, Trustindex widget). Do not inflate this into "many satisfied customers", rating averages, or invented testimonials.
- **Not available, must not be fabricated:** founding year, number of customers, jobs completed, square metres sanded, opening hours, deposit amounts, delivery radius.
- Stock floor photography (Unsplash) is used for atmosphere and is not presented as the client's own work.

## Product Principles

1. **One job, one counter.** Machine, abrasives and finish are presented as a single project, never as unrelated catalogue rows.
2. **Show the price before the question.** Per-day price, what is included, and that a deposit applies are visible up front; nothing appears for the first time at the counter.
3. **Teach the sequence.** A first-timer should leave knowing which machine, which grits in which order, and which finish they need.
4. **Local and physical.** The shop is a real place in Moabit; pickup, return and advice in person are the product, not a footnote.
5. **Mock honestly.** Anything simulated (checkout, availability) says so; the data layer stays swappable for Medusa v2.

## Accessibility & Inclusion

- WCAG 2.2 AA as the working standard **[assumed]**. Older and first-time DIY users: large tap targets, legible type, plain-language German, no hover-only information.
