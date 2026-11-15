import Image from "next/image";
import Link from "next/link";
import { infoNav, shopNav, site } from "@/lib/site";
import { ui } from "@/lib/ui";
import { Year } from "./year";

const legal = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
  { href: "/agb", label: "AGB" },
  { href: "/widerruf", label: "Widerrufsbelehrung" },
  { href: "/bildnachweis", label: "Bildnachweis" },
];

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line bg-surface">
      <div className={`${ui.container} grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4`}>
        <div>
          <Image src="/brand/schleifpunkt-logo.webp" alt="Schleifpunkt Berlin" width={480} height={340} className="h-16 w-auto" />
          <p className="mt-4 max-w-xs text-[0.95rem] text-muted">
            Maschinenverleih für Bodenschleifen, Schleifmittel, Lacke und Öle in Berlin-Moabit.
          </p>
        </div>
        <nav aria-label="Sortiment">
          <h2 className="font-bold">Sortiment</h2>
          <ul className="mt-3 grid gap-2 text-[0.95rem]">
            {shopNav.map((n) => (
              <li key={n.href}>
                <Link className="text-muted hover:text-ink hover:underline" href={n.href}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Service">
          <h2 className="font-bold">Service</h2>
          <ul className="mt-3 grid gap-2 text-[0.95rem]">
            {infoNav.map((n) => (
              <li key={n.href}>
                <Link className="text-muted hover:text-ink hover:underline" href={n.href}>
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link className="text-muted hover:text-ink hover:underline" href="/ratgeber#faq">
                Häufige Fragen
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          <h2 className="font-bold">Kontakt</h2>
          <address className="mt-3 grid gap-1 text-[0.95rem] not-italic text-muted">
            <span>{site.name}</span>
            <span>{site.street}</span>
            <span>
              {site.zip} {site.city}
            </span>
            <a className="mt-2 text-ink hover:underline tabular" href={site.phoneLandline.href}>
              {site.phoneLandline.label}
            </a>
            <a className="text-ink hover:underline tabular" href={site.phoneMobile.href}>
              {site.phoneMobile.label}
            </a>
            <a className="text-ink hover:underline" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </address>
        </div>
      </div>
      <div className="border-t border-line">
        <div className={`${ui.container} flex flex-col gap-3 py-5 text-sm text-muted md:flex-row md:items-center`}>
          <p>
            © <Year /> {site.name}
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            {legal.map((l) => (
              <li key={l.href}>
                <Link className="hover:text-ink hover:underline" href={l.href}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="md:ml-auto">Demo-Shop: Bestellungen werden nicht ausgeführt.</p>
        </div>
      </div>
    </footer>
  );
}
