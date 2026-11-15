---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: ["app/mieten","app/shop","app/suche","app/warenkorb","app/kasse"]
---

# Surface brief: Storefront (home, rental, shop, search, cart, checkout)

Scope: `/` (Persuade, conventional), `/mieten`, `/shop`, `/shop/kategorie/*`, `/suche`, `/warenkorb`, `/kasse` (Operate).
Audience: Berlin DIY renovators with Altbau Dielen or parquet; small trades needing a machine for a day.
Job: find and rent the right machines for a date range, add abrasives and finish, reserve; or buy consumables.
Constraints: German, formal Sie; mock store (labelled), Medusa v2 later; no fabricated metrics, hours, deposits.
User requirements (2026-11-15): a normal webshop, not fancy; product search; pagination above 20 products.
Unresolved: online payment vs. pay at pickup; deposit amounts; opening hours; delivery radius.

## Direction contract

THESIS: The category standard, executed cleanly: a familiar German tool-and-DIY webshop where renting a machine works like adding a product to the cart. The user rejected the themed "courtyard enamel board" direction; convention is the commitment, with no smuggled quirk.

OWN-WORLD: White surfaces, warm light grey (#f5f5f2) for wells and panels, hairline borders (#e1e3de), brand green #1f4a34 from the logo for primary actions and active states, signal yellow #f2c230 only for the hero CTA, the "Miete" badge and the cart count. One family, Sofia Sans, in 400–800. 8px card radius, 6px controls, shadows only on hover.

STORY: The header search and category navigation get any visitor to a product in one step. Rental machines are products with a per-day price and a "Mieten" button. One rental period applies to the whole cart, and the cart shows the total with VAT and the deposit note.

FIRST VIEWPORT: Green service strip (pickup in Moabit, prices incl. VAT, phone). Header with logo, a wide search with live suggestions, and the cart. Category nav row. A full-width floor photo hero with a dark left scrim: headline "Bodenschleifmaschinen mieten in Berlin", one line of offer, yellow "Maschinen mieten" and outline "Zum Shop". Then a USP row.

FORM: Canon, the category standard. The user chose it in plain words over grounded candidate 6 (seed:48e486eaf94a1844). Craft bar: Contorion and the Festool online shop. Listings paginate at 20 with sort and a category sidebar. Search folds umlauts, matches every word, and paginates.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
