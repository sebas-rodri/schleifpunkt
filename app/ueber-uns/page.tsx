import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { site } from "@/lib/site";
import { ui } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Über uns",
  description: "Schleifpunkt Berlin: Maschinenverleih für Bodenrenovierung in Moabit, geführt von Rafael Breglia.",
};

const counter = [
  { label: "Abholung und Rückgabe", value: `${site.street}, ${site.zip} ${site.city}` },
  { label: "Mietvertrag", value: "bei der Abholung" },
  { label: "Kaution", value: "je nach Maschine, zurück bei Rückgabe" },
  { label: "Abrechnung", value: "pro Tag, bei der Rückgabe" },
  { label: "Lieferung", value: `${site.services.transport} €, Liefergebiet nach Absprache` },
  { label: "Reinigungspauschale", value: `${site.services.cleaningFee} €, falls die Maschine nicht gereinigt zurückkommt` },
];

export default function UeberUnsPage() {
  return (
    <div className={`${ui.container} pt-6`}>
      <Breadcrumbs items={[{ label: "Über uns" }]} />
      <div className="mt-3 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <h1 className={ui.h1}>Ihr Partner für Bodenrenovierung in Berlin</h1>
          <p className="mt-4 max-w-prose text-lg leading-relaxed">
            Schleifpunkt Berlin ist ein Maschinenverleih aus Moabit, spezialisiert auf das Schleifen von Böden. Wir
            vermieten die Maschinen, verkaufen die Schleifmittel, Lacke und Öle dazu und helfen Ihnen, Ihr
            Renovierungsprojekt erfolgreich umzusetzen.
          </p>
          <p className="mt-4 max-w-prose leading-relaxed text-muted">
            Klare Preise und eine persönliche Abwicklung an der Theke sind uns wichtig. Sie sehen vorher, was die Miete
            kostet, und bekommen die Betriebsunterlagen zu jeder Maschine mit.
          </p>
          <figure className="mt-8 rounded-lg bg-surface p-5">
            <blockquote className="text-lg leading-relaxed">
              „Wir sind stolz darauf, Menschen bei ihren Renovierungsprojekten zu unterstützen und deren Wünsche zu
              erfüllen.“
            </blockquote>
            <figcaption className="mt-2 text-sm text-muted">
              {site.owner}, Geschäftsführer
            </figcaption>
          </figure>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
          <Image
            src="/images/arbeiten/dielen-geoelt.jpg"
            alt="Geschliffene und versiegelte Kieferndielen in einem hellen Berliner Altbauzimmer"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      <section className="mt-16" aria-labelledby="ablauf">
        <h2 id="ablauf" className={ui.h2}>
          So läuft die Miete bei uns
        </h2>
        <dl className="mt-6 divide-y divide-line rounded-lg border border-line">
          {counter.map((c) => (
            <div key={c.label} className="grid gap-1 px-5 py-4 sm:grid-cols-[16rem_1fr] sm:gap-6">
              <dt className="font-semibold">{c.label}</dt>
              <dd className="text-muted">{c.value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/mieten" className={ui.btnPrimary}>
            Maschinen mieten
          </Link>
          <Link href="/kontakt" className={ui.btnSecondary}>
            Beratung anfragen
          </Link>
        </div>
      </section>
    </div>
  );
}
