import Image from "next/image";
import Link from "next/link";
import { Estimator } from "@/components/estimator";
import { ArrowRight, Box, Chat, Mail, Phone, Pin, Store, Tag } from "@/components/icons";
import { ProductCard } from "@/components/product-card";
import { commerce } from "@/lib/commerce";
import { estimatorHandles } from "@/lib/estimator";
import { site } from "@/lib/site";
import { ui } from "@/lib/ui";

const POPULAR_CODES = ["M-01", "M-02", "M-03", "M-04"];
const SHOP_PICKS = [
  "schleifband-hummel-elf",
  "klettscheibe-mit-loch",
  "schleifgitter",
  "bona-traffic-hd-4-95l",
  "bona-domo-matt-5l",
  "avalon-hartwachsoel-2-5l",
  "bona-hard-wax-oil",
  "bona-wasserlackrolle",
];
const CATEGORY_TILES: { href: string; label: string; image: string; countKey: string }[] = [
  { href: "/mieten", label: "Maschinen mieten", image: "/images/maschinen/hummel-freigestellt.webp", countKey: "rental" },
  { href: "/shop/kategorie/schleifbaender", label: "Schleifbänder", image: "/products/schleifband-hummel-elf.webp", countKey: "schleifbaender" },
  { href: "/shop/kategorie/schleifscheiben", label: "Schleifscheiben", image: "/products/klettscheibe-mit-loch.webp", countKey: "schleifscheiben" },
  { href: "/shop/kategorie/lacke", label: "Lacke", image: "/products/bona-traffic-hd-4-95l.webp", countKey: "lacke" },
  { href: "/shop/kategorie/oele", label: "Öle", image: "/products/avalon-hartwachsoel-2-5l.webp", countKey: "oele" },
  { href: "/shop/kategorie/zubehoer", label: "Zubehör", image: "/products/bona-wasserlackrolle.webp", countKey: "zubehoer" },
];

export default async function HomePage() {
  const [rentals, categories, picks, estimatorProducts] = await Promise.all([
    commerce.listProducts({ kind: "rental" }),
    commerce.listCategories(),
    commerce.getProductsByHandles(SHOP_PICKS),
    commerce.getProductsByHandles(estimatorHandles()),
  ]);
  const popular = POPULAR_CODES.map((c) => rentals.find((r) => r.metadata.code === c)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p),
  );
  const counts: Record<string, number> = { rental: rentals.length };
  categories.forEach((c) => (counts[c.handle] = c.count));

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink" aria-labelledby="hero-title">
        <Image
          src="/images/floors/dielen-sonnenlicht.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover object-[50%_65%] opacity-90"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(18_22_19/0.82)_0%,rgb(18_22_19/0.62)_45%,rgb(18_22_19/0.1)_100%)]" />
        <div className={`${ui.container} py-16 sm:py-24 lg:py-28`}>
          <div className="max-w-xl text-white">
            <h1 id="hero-title" className="text-[clamp(1.8rem,5.4vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight">
              Boden&shy;schleif&shy;maschinen mieten in Berlin
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-white/90">
              Parkett und Dielen selbst schleifen: Profi-Maschinen ab 25 € am Tag, dazu Schleifbänder, Lacke und Öle.
              Abholung in Berlin-Moabit.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/mieten" className={ui.btnAccent}>
                Maschinen mieten <ArrowRight size={20} />
              </Link>
              <Link
                href="/shop"
                className="inline-flex h-12 items-center justify-center rounded-md border border-white/60 px-6 text-[1.02rem] font-semibold text-white hover:bg-white/10"
              >
                Zum Shop
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* USPs */}
      <section aria-label="Unsere Vorteile" className="border-b border-line">
        <ul className={`${ui.container} grid grid-cols-2 gap-x-6 gap-y-5 py-6 lg:grid-cols-4`}>
          {[
            { icon: Tag, title: "Ab 25 € pro Tag", text: "Preise inkl. 19 % MwSt." },
            { icon: Store, title: "Abholung in Moabit", text: site.street },
            { icon: Chat, title: "Persönliche Beratung", text: "an der Theke und am Telefon" },
            { icon: Box, title: "Alles aus einer Hand", text: "Maschine, Schleifmittel, Finish" },
          ].map((u) => (
            <li key={u.title} className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                <u.icon size={20} />
              </span>
              <span>
                <span className="block font-semibold leading-snug">{u.title}</span>
                <span className="text-sm text-muted">{u.text}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Categories */}
      <section className={`${ui.container} pt-14`} aria-labelledby="kategorien">
        <h2 id="kategorien" className={ui.h2}>
          Sortiment
        </h2>
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {CATEGORY_TILES.map((c) => (
            <li key={c.href}>
              <Link href={c.href} className="group block rounded-lg border border-line p-3 transition-shadow hover:shadow-[0_8px_24px_-12px_rgb(27_31_28/0.3)]">
                <span className="relative block aspect-square overflow-hidden rounded-md bg-white">
                  <Image
                    src={c.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 16vw, (min-width: 640px) 30vw, 45vw"
                    className="product-photo object-contain p-4 transition-transform duration-300 group-hover:scale-[1.04]"
                  />
                </span>
                <span className="mt-3 flex items-baseline justify-between gap-2 px-1">
                  <span className="font-semibold group-hover:text-brand">{c.label}</span>
                  <span className="text-sm text-muted tabular">{counts[c.countKey]}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Popular rentals */}
      <section className={`${ui.container} pt-16`} aria-labelledby="beliebt">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="beliebt" className={ui.h2}>
              Die Maschinen für Ihren Boden
            </h2>
            <p className="mt-1 text-muted">Bandschleifer, Randschleifer, Einscheibenmaschine und Absaugung.</p>
          </div>
          <Link href="/mieten" className="inline-flex items-center gap-1.5 font-semibold text-brand hover:underline">
            Alle {rentals.length} Mietmaschinen <ArrowRight size={18} />
          </Link>
        </div>
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {popular.map((m) => (
            <li key={m.id}>
              <ProductCard product={m} />
            </li>
          ))}
        </ul>
      </section>

      {/* How renting works */}
      <section className="mt-16 bg-surface" aria-labelledby="ablauf">
        <div className={`${ui.container} py-14`}>
          <h2 id="ablauf" className={ui.h2}>
            So funktioniert die Miete
          </h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { title: "Online reservieren", text: "Maschinen und Zeitraum wählen, Schleifmittel gleich dazulegen." },
              { title: "In Moabit abholen", text: `Mietvertrag und Kaution an der Theke in der ${site.street}. Die Betriebsunterlagen bekommen Sie mit.` },
              { title: "Zurückbringen", text: "Abgerechnet wird bei der Rückgabe, die Kaution bekommen Sie zurück." },
            ].map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-lg font-bold text-white tabular">
                  {i + 1}
                </span>
                <span>
                  <span className="block text-lg font-semibold">{s.title}</span>
                  <span className="mt-1 block text-muted">{s.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Calculator */}
      <section className={`${ui.container} pt-16`} aria-labelledby="rechner">
        <h2 id="rechner" className={ui.h2}>
          Materialrechner
        </h2>
        <p className="mt-1 max-w-2xl text-muted">
          Fläche eingeben und Boden wählen: Sie sehen Maschinen, Mietdauer, Schleifbänder pro Körnung und die Menge Lack
          oder Öl mit Preisen.
        </p>
        <div className="mt-6">
          <Estimator products={estimatorProducts} />
        </div>
      </section>

      {/* Shop picks */}
      <section className={`${ui.container} pt-16`} aria-labelledby="shop-picks">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 id="shop-picks" className={ui.h2}>
            Schleifmittel und Finish
          </h2>
          <Link href="/shop" className="inline-flex items-center gap-1.5 font-semibold text-brand hover:underline">
            Zum Shop <ArrowRight size={18} />
          </Link>
        </div>
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {picks.map((p) => (
            <li key={p.id}>
              <ProductCard product={p} showCategory />
            </li>
          ))}
        </ul>
      </section>

      {/* Real floors */}
      <section className={`${ui.container} pt-16`} aria-labelledby="arbeiten">
        <h2 id="arbeiten" className={ui.h2}>
          Vom Rohbau zum Glanzstück
        </h2>
        <p className="mt-1 text-muted">Kieferndielen aus Berliner Altbauwohnungen, geschliffen mit unseren Maschinen.</p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-3 sm:gap-4">
          {[
            { src: "/images/arbeiten/geschliffen-roh.jpg", label: "Frisch geschliffen" },
            { src: "/images/arbeiten/lackiert-glanz.jpg", label: "Lackiert" },
            { src: "/images/arbeiten/flur-lackiert.jpg", label: "Flur, lackiert" },
          ].map((p) => (
            <li key={p.src}>
              <figure>
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-surface">
                  <Image
                    src={p.src}
                    alt={`${p.label}: Kieferndielen in einer Berliner Altbauwohnung`}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-2 text-sm text-muted">{p.label}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>

      {/* Location */}
      <section className={`${ui.container} pt-16`} aria-labelledby="standort">
        <div className="grid overflow-hidden rounded-lg border border-line lg:grid-cols-2">
          <div className="p-6 sm:p-10">
            <h2 id="standort" className={ui.h2}>
              Abholung und Beratung in Moabit
            </h2>
            <p className="mt-3 max-w-prose text-muted">
              Hier holen Sie Ihre Maschinen ab und bringen sie zurück. Fragen zu Ihrem Boden klären wir am besten direkt
              an der Theke oder am Telefon, gern mit einem Foto des Bodens.
            </p>
            <ul className="mt-6 grid gap-3">
              <li className="flex items-center gap-3">
                <Pin size={20} className="shrink-0 text-brand" />
                <a href={site.mapsHref} target="_blank" rel="noreferrer" className="hover:underline">
                  {site.street}, {site.zip} {site.city}
                </a>
              </li>
              <li className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <Phone size={20} className="shrink-0 text-brand" />
                <a href={site.phoneLandline.href} className="hover:underline tabular">
                  {site.phoneLandline.label}
                </a>
                <span className="text-muted">·</span>
                <a href={site.phoneMobile.href} className="hover:underline tabular">
                  {site.phoneMobile.label}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="shrink-0 text-brand" />
                <a href={`mailto:${site.email}`} className="hover:underline">
                  {site.email}
                </a>
              </li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={site.mapsHref} target="_blank" rel="noreferrer" className={ui.btnPrimary}>
                Route planen
              </a>
              <Link href="/kontakt" className={ui.btnSecondary}>
                Kontakt und FAQ
              </Link>
            </div>
          </div>
          <div className="relative min-h-64 bg-surface">
            <Image
              src="/images/arbeiten/dielen-geoelt.jpg"
              alt="Geschliffene Kieferndielen in einem hellen Berliner Altbauzimmer"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
