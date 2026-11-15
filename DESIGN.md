---
name: Schleifpunkt Berlin
description: A clean, conventional German tool-rental and DIY webshop in logo green on white.
colors:
  brand: "#1f4a34"
  brand-hover: "#173a29"
  brand-soft: "#e7efe9"
  accent: "#f2c230"
  accent-soft: "#fdf3cf"
  bg: "#ffffff"
  surface: "#f5f5f2"
  surface-2: "#eceee9"
  line: "#e1e3de"
  line-strong: "#c9ccc5"
  ink: "#1b1f1c"
  muted: "#59625c"
  danger: "#b42318"
  success: "#1d7a45"
typography:
  hero:
    fontFamily: "Sofia Sans, system-ui, sans-serif"
    fontSize: "clamp(1.8rem, 5.4vw, 3.5rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  display:
    fontFamily: "Sofia Sans, system-ui, sans-serif"
    fontSize: "clamp(1.9rem, 3.2vw, 2.6rem)"
    fontWeight: 800
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Sofia Sans, system-ui, sans-serif"
    fontSize: "clamp(1.45rem, 2.2vw, 1.9rem)"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Sofia Sans, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.4
  price:
    fontFamily: "Sofia Sans, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.55
    fontFeature: "\"tnum\", \"lnum\""
  body:
    fontFamily: "Sofia Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  body-sm:
    fontFamily: "Sofia Sans, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Sofia Sans, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.43
  meta:
    fontFamily: "Sofia Sans, system-ui, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 500
    lineHeight: 1.4
rounded:
  badge: "4px"
  control: "6px"
  card: "8px"
  pill: "9999px"
spacing:
  gutter-mobile: "16px"
  gutter-tablet: "24px"
  gutter-desktop: "32px"
  grid-gap-sm: "12px"
  grid-gap: "16px"
  card-pad: "16px"
  panel-pad: "20px"
  section: "64px"
components:
  button-primary:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.bg}"
    rounded: "{rounded.control}"
    padding: "0 20px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.brand-hover}"
  button-primary-lg:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.bg}"
    rounded: "{rounded.control}"
    padding: "0 24px"
    height: "48px"
  button-secondary:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0 20px"
    height: "44px"
  button-secondary-hover:
    backgroundColor: "{colors.surface}"
  button-accent:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0 24px"
    height: "48px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0 12px"
    height: "40px"
  button-ghost-hover:
    backgroundColor: "{colors.surface}"
  input:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0 12px"
    height: "44px"
  select:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0 36px 0 12px"
    height: "40px"
  card:
    backgroundColor: "{colors.bg}"
    rounded: "{rounded.card}"
    padding: "{spacing.card-pad}"
  summary-panel:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.card}"
    padding: "{spacing.panel-pad}"
  badge-rental:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ink}"
    typography: "{typography.meta}"
    rounded: "{rounded.badge}"
    padding: "2px 8px"
  cart-count:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 6px"
    height: "20px"
  pagination-cell:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0 12px"
    height: "40px"
  pagination-cell-current:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.bg}"
  category-item-active:
    backgroundColor: "{colors.brand-soft}"
    textColor: "{colors.brand}"
    rounded: "{rounded.control}"
    padding: "8px 12px"
  service-strip:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.bg}"
    height: "36px"
---

# Design System: Schleifpunkt Berlin

## Overview

**Creative North Star: "The Clean Counter"**

Schleifpunkt is the category standard executed cleanly: a German tool-and-DIY webshop in the lineage of Contorion and the Festool online shop. White pages, product photos on white tiles framed by hairlines, and the logo's deep green on every primary action and active state. Renting a machine works like buying a product: same card, same grid, same cart. The visitor should recognise the shop's mechanics on sight and spend their attention on machines, prices and dates.

Density is retail-normal: four-up product grids on wide screens, 44px controls, compact meta lines, prices set bold with tabular figures. Depth is almost flat. Hairlines and the warm grey panels do the structural work; a soft shadow appears only when a card is hovered or when something floats (suggestions dropdown, mobile drawer). One family, Sofia Sans, carries everything from the 800-weight hero headline to the small muted meta lines.

Convention is the commitment. A themed, decorative direction was rejected by the user in favour of a normal webshop, so the system has no signature quirk to protect; its rules exist to keep it ordinary, legible and fast to scan.

**Key Characteristics:**
- White pages, white image tiles framed by hairlines, warm grey (#f5f5f2) summary panels, hairline borders.
- Logo green for primary actions, active navigation, current page and focus.
- Signal yellow is rationed to three jobs: the hero CTA, the "Miete" badge, the cart count.
- One sans family in 400 to 800; tabular numerals on every price, count and date.
- Flat at rest; shadows only on hover and on floating layers.
- 8px cards, 6px controls, 4px badges.

## Colors

A neutral, slightly warm white-and-grey retail palette with one dark brand green and one rationed yellow.

### Primary
- **Logo Green** (brand): primary buttons, the service strip above the header, active nav underline, current pagination cell, active category text and border, text links, focus outlines, text selection, radio and range accents, browser theme colour.
- **Deep Logo Green** (brand-hover): hover state for every green fill.
- **Pale Sage** (brand-soft): selected-state fills (active category row, chosen checkout option) and the circular icon wells in the USP row.

### Secondary
- **Signal Yellow** (accent): background of the hero CTA, the "Miete" badge on product cards in mixed contexts (home, search) and on the rental detail image, and the cart count pill. Text on it is always ink.
- **Pale Signal Yellow** (accent-soft): defined as a token, not yet used in the build. Reserve for a yellow-family notice before inventing a new tint.

### Neutral
- **White** (bg): page, cards, inputs, secondary buttons, header.
- **Warm Grey Well** (surface): summary panels (cart, checkout), empty states, footer, the USP and "So funktioniert" bands, hover fill for ghost and secondary controls, skeleton blocks, "Derzeit vergeben" notices.
- **Deeper Grey Well** (surface-2): defined second tier for nested wells; rarely needed.
- **Hairline** (line): card borders, header and section dividers, list dividers, pagination cell borders.
- **Strong Hairline** (line-strong): input, select and secondary-button borders, where the edge must be findable.
- **Ink** (ink): body text, headings, text on yellow, the dark hero base, modal backdrop at 40%.
- **Muted Grey-Green** (muted): meta text, the category line under product names in mixed listings, units ("/ Tag", "ab"), breadcrumbs, counts, helper text.

### Semantic
- **Danger Red** (danger): error messages, invalid input borders, hover on "Entfernen".
- **Success Green** (success): confirmations; distinct from the brand green so success never reads as a button.

### Named Rules
**The Three Yellow Jobs Rule.** Signal yellow appears in exactly three places: the single hero CTA, the "Miete" rental badge, and the cart count. It never fills a second button on the same screen, never marks a sale, never becomes a section background. If a new element wants yellow, it should be green.

**The Green Means Go Rule.** Every primary action, every "you are here" marker and every focus ring is logo green. Green is not decoration; do not use it for large fills except the 36px service strip.

**The Ink On Yellow Rule.** Text on yellow is always ink (#1b1f1c), never white.

## Typography

**Display Font:** Sofia Sans (with system-ui, sans-serif)
**Body Font:** Sofia Sans (with system-ui, sans-serif)

**Character:** One humanist-grotesque family doing every job by weight alone: extra-bold for headlines, bold for prices and section titles, semibold for product names, labels and buttons, regular for reading text. Loaded via next/font with latin-ext for German.

### Hierarchy
- **Hero** (800, clamp(1.8rem, 5.4vw, 3.5rem), 1.05): the home hero headline on the photo, white, max ~36rem measure. One per site.
- **Display** (800, clamp(1.9rem, 3.2vw, 2.6rem), tight): page H1 on listings, product detail, cart, checkout and info pages.
- **Headline** (700, clamp(1.45rem, 2.2vw, 1.9rem), tight): section H2 on the home page and long-form pages.
- **Title** (700, 1.25rem): sub-section headings inside cart and checkout ("Miete", "Einkauf"); 1.125rem for summary panel headings.
- **Price** (700, 1.125rem, tabular): card prices; 1.25rem in the booking box total. Units and "ab" drop to 0.875rem semibold muted.
- **Body** (400, 1rem, 1.55): default text; long prose capped at max-w-prose (65ch).
- **Body small** (400, 0.95rem): nav links, sidebar items, summaries, footer lists, sort select.
- **Label** (600, 0.875rem): form labels; 0.875rem regular muted for helper text and breadcrumbs.
- **Meta** (400, 0.875rem, muted): the category line under a product name, shown only in mixed listings (all products, search, home); never above a heading. Badges use 0.75rem 700.

### Named Rules
**The Tabular Money Rule.** Every price, count, date and page number uses tabular lining figures (the `.tabular` utility), so columns of prices align.

**The Weight Not Face Rule.** Hierarchy comes from weight and size in Sofia Sans. No second display face, no italics for emphasis, no letter-spaced uppercase labels above headings.

## Layout

A centered container of max 1320px with 16px gutters on mobile, 24px from 640px and 32px from 1024px. Breakpoints are Tailwind defaults (640 / 768 / 1024 / 1280).

- **Product grids:** 2 columns on mobile, 3 from 640px, 4 from 1280px, with 12px gaps on mobile and 16px from 640px. Listings paginate at 20 items with a count-and-sort toolbar above (hairline beneath) and numbered pagination below.
- **Shop listing:** category sidebar on the left from 1024px; below that the sidebar becomes a horizontally scrolling row of bordered chips.
- **Home:** full-width photo hero, then a USP row (2 columns, 4 from 1024px), then category tiles (2 / 3 / 6 columns), then product rows.
- **Cart and checkout:** main column plus a 22rem summary panel that sticks 24px from the top on desktop and stacks below on mobile.
- **Footer:** 1 / 2 / 4 columns on the grey surface.
- **Rhythm:** sections separate with 56 to 64px top padding; the footer sits 80px below content. Card internals use 14 to 16px; panels and booking box use 20px.

**The Familiar Grid Rule.** Product collections are always a uniform card grid of 2, 3 or 4 columns. No bento layouts, featured oversize tiles or carousels in place of a listing.

## Elevation & Depth

Flat by default. Structure comes from hairline borders and the warm grey panels, not from shadows. Shadows are cool-neutral, negative-spread and soft, drawn from ink at low alpha, and they appear only in response to state or for layers that float above the page.

### Shadow Vocabulary
- **Hover lift** (`box-shadow: 0 8px 24px -12px rgb(27 31 28 / 0.3)`): product cards and category tiles on hover.
- **Floating layer** (`box-shadow: 0 12px 32px -8px rgb(27 31 28 / 0.25)`): the search suggestions dropdown.
- **Drawer** (Tailwind `shadow-xl`): the mobile menu drawer over a 40% ink backdrop.

### Named Rules
**The Flat-At-Rest Rule.** Nothing on the page carries a shadow at rest. Cards gain the hover lift; dropdowns and drawers carry theirs because they float. No hard offset shadows.

## Shapes

Gently rounded rectangles throughout, with radius stepping down as elements get smaller: 8px for cards, panels, tiles, dropdowns and the FAQ group; 6px for buttons, inputs, selects, pagination cells, sidebar rows and thumbnail tiles; 4px for the "Miete" badge. The search submit button nested inside the search field uses 5px so it sits concentric inside the 6px field. Full pills are reserved for the cart count and the circular USP icon wells. Borders are 1px hairlines; the only thicker line is the 2px green underline on the active top-nav item.

Icons are a single custom stroke set: 24px viewBox, 1.9 stroke, round caps and joins, currentColor, sized 14 to 24px.

## Components

### Buttons
Plain, solid, confident; the kind a shopper never has to read twice.
- **Shape:** gently rounded (6px), semibold, icon gap 8px, color transitions only.
- **Primary:** logo green, white text, 44px tall with 20px side padding; large variant 48px with 24px padding and 1.02rem text for "In den Warenkorb", "Zur Kasse" and booking actions.
- **Secondary:** white with strong hairline border and ink text; hover fills warm grey. Also the "selected" state of a rental toggle ("Im Warenkorb").
- **Accent:** signal yellow, ink text, 48px; hover darkens by brightness 95%. Hero CTA only.
- **Ghost:** transparent, 40px, hover fills warm grey; for header utilities.
- **On-photo outline:** 48px, 60% white border, white text, hover 10% white fill; only beside the hero CTA.
- **Focus:** 2px logo-green outline, 2px offset, on every interactive element.
- **Disabled:** 50% opacity and not-allowed cursor (applies to `disabled` and `aria-disabled`).

### Inputs / Fields
- **Style:** white, 1px strong hairline, 6px radius, 44px tall, 12px padding, 0.98rem text, placeholder muted at 80%, green caret.
- **Focus:** border turns logo green plus a 3px green ring at 15% opacity.
- **Error:** `aria-invalid` turns the border danger red; message below in 0.875rem medium danger red, announced politely.
- **Labels:** 0.875rem semibold ink, 6px above the field.
- **Select (sort):** same field language at 40px with a muted chevron at the right.
- **Radio and checkbox:** native controls tinted logo green; choice cards for delivery use the bordered 8px card, selected state brand border, 1px brand ring and pale sage fill.

### Date Range
Two native date inputs side by side ("Abholung", "Rückgabe") in the input style with tabular figures. One rental period applies to the whole cart. Below, either the duration in muted small text with the day count in ink, or a danger-red alert when return precedes pickup or pickup is in the past.

### Header with Search Combobox
- **Service strip:** 36px logo-green bar, white 0.85rem text with pin and phone icons.
- **Main row:** logo (48 to 56px tall), the search field taking the flexible middle up to 42rem, cart link at right with the yellow count pill.
- **Search:** search icon inset left, an inline 36px green "Suchen" button inset right. From two characters a dropdown opens 6px below: white, 8px radius, hairline, floating shadow; up to six rows with a 44px white thumbnail tile, semibold title, muted category and tabular price; the active row fills warm grey; a grey footer row links to all results in green. Arrow keys, Enter and Escape work; empty results show a muted "Keine Treffer" line.
- **Category nav:** a hairline-topped row of 48px links, semibold 0.95rem; hover and active turn green, active adds a 2px green underline. Service links sit right in muted regular weight.
- **Mobile:** search moves under the logo row; a menu button opens a right drawer with grouped 48px rows.

### Product Card
- **Shell:** white, 1px hairline, 8px radius, full height in the grid; hover lift shadow.
- **Image tile:** square, white, separated from the card body by a hairline; product photo contained with 20px inset (photos are normalised to pure-white backgrounds); photo scales to 103% on hover over 300ms.
- **Body:** 14 to 16px padding; semibold product name (hover green and underlined, subtitle in muted regular), then in mixed listings a muted category line below it, bold tabular price pinned to the bottom with "ab" and "/ Tag" in muted.
- **Rental variant:** full-width rental add button ("Mieten" / "Gewählt") under the price; the yellow "Miete" badge top-left of the tile only in mixed contexts, never on /mieten where every card is a rental.
- **Unavailable:** a muted grey notice block in place of the action ("Derzeit vergeben").

### Listing with Sort and Pagination
A toolbar row with the muted tabular item count ("21–40 von 145 Artikeln") at left and the sort select at right, hairline below; the card grid; then centered numbered pagination: 40px cells with 6px radius and hairline, current page solid green, ellipsis for gaps, "Zurück"/"Weiter" with chevrons (labels hidden on mobile, muted at 50% when unavailable), and a muted "Seite x von y" line.

### Category Sidebar
On desktop a vertical list of 0.95rem rows with tabular counts at right; hover fills warm grey; the active row is pale sage with green semibold text. A hairline-separated link to rentals ends the list. On mobile it becomes a scrolling row of bordered chips, active chip with green border.

### Booking Box
A bordered 8px panel with 20px padding on the rental detail page: date range, a hairline, the line "price × days" in muted against the 1.25rem bold total, a muted VAT and deposit note, then the large primary "In den Warenkorb". Once added, the action becomes a secondary "Im Warenkorb, entfernen" with a check icon, plus a primary "Zum Warenkorb".

### Cart and Checkout Summaries
Line items are divided by hairlines with an 80 to 96px white thumbnail tile with hairline, semibold linked title, muted variant and unit price, bold tabular line total, and a muted "Entfernen" link that turns danger red on hover. The summary is a warm-grey 8px panel (20px padding), sticky on desktop, with muted labels against tabular values, a hairline-topped bold total, a muted VAT and deposit note, the large primary action, and a green text link back to the shop.

### FAQ Accordion
One 8px hairline-bordered group with hairline dividers; each row is a native disclosure with a semibold question and a muted chevron that rotates 180 degrees over 200ms; answers are muted, relaxed leading, capped at 65ch.

### Breadcrumbs
0.875rem muted trail starting at "Start", separated by 14px chevrons; links darken to ink and underline on hover; the current page is ink and not linked.

### States
- **Hover:** green text on links and nav; warm-grey fill on secondary, ghost, pagination and list rows; deep green on primary; hover lift on cards.
- **Focus:** global 2px green outline with 2px offset; fields add the soft green ring.
- **Disabled:** 50% opacity, not-allowed cursor.
- **Error:** danger-red border and message.
- **Empty:** a warm-grey 8px panel, centered, 48px vertical padding, semibold 1.125rem statement, muted next-step line, and a primary plus secondary button pair.
- **Loading:** skeleton grid matching the listing (2 / 3 / 4 columns) of warm-grey 8px blocks at 3:4 with a pulse, under a placeholder toolbar row; `aria-busy` set.
- **Motion:** new floating layers and the cart count fade up 6px over 260ms (cubic-bezier(0.16, 1, 0.3, 1)); all motion collapses under reduced-motion.

## Do's and Don'ts

### Do:
- **Do** use logo green for every primary action, active marker, current page and focus ring.
- **Do** keep yellow to its three jobs: the hero CTA, the "Miete" badge (mixed contexts only) and the cart count, always with ink text.
- **Don't** put a category or label line above a product name; meta goes below the title.
- **Do** put product photos on white tiles with a hairline, contained fit, and backgrounds normalised to pure white in the asset, not in CSS.
- **Do** lay product collections out as 2 / 3 / 4-column card grids inside the 1320px container, paginated at 20.
- **Do** set prices, counts, dates and page numbers in tabular figures, with units in smaller muted text.
- **Do** use 8px radius for cards and panels, 6px for controls, 4px for badges.
- **Do** keep surfaces flat at rest; use the hover lift on cards and the floating shadow only for dropdowns and drawers.

### Don't:
- **Don't** use yellow for a second button, a sale marker, a section background or decorative highlights.
- **Don't** add a second typeface, decorative display type, or letter-spaced uppercase labels above headings.
- **Don't** reintroduce themed or ornamental treatments (textures, enamel plates, stamps, illustrated frames); the user chose a conventional shop over a themed one.
- **Don't** use hard offset shadows or shadows on resting cards.
- **Don't** replace listings with carousels, bento grids or oversized featured tiles.
- **Don't** put white text on yellow or on the pale tints.
