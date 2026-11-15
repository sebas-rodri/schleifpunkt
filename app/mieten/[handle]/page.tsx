import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BookingBox } from "@/components/booking-box";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BuyBox } from "@/components/buy-box";
import { Check } from "@/components/icons";
import { commerce } from "@/lib/commerce";
import { formatEur, formatEurShort } from "@/lib/format";
import { rentalGroups } from "@/lib/rental-groups";
import { steps } from "@/lib/sequence";
import { site } from "@/lib/site";
import { ui } from "@/lib/ui";

type Props = PageProps<"/mieten/[handle]">;

export async function generateStaticParams() {
  const machines = await commerce.listProducts({ kind: "rental" });
  return machines.map((m) => ({ handle: m.handle }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { handle } = await props.params;
  const m = await commerce.getProduct(handle);
  if (!m) return {};
  const price = m.variants[0].calculated_price.calculated_amount;
  return {
    title: `${m.title} ${m.subtitle ?? ""} mieten`.trim(),
    description: `${m.title} (${m.subtitle}) für ${formatEurShort(price)} am Tag mieten. Abholung in Berlin-Moabit.`,
  };
}

async function MachineContent(props: Props) {
  const { handle } = await props.params;
  const machine = await commerce.getProduct(handle);
  if (!machine || machine.metadata.kind !== "rental") notFound();

  const accessories = await commerce.getProductsByHandles(machine.metadata.accessories ?? []);
  const group = rentalGroups.find((g) => g.id === machine.metadata.group);
  const usedIn = steps.filter((s) => s.machines.some((m) => m.handle === machine.handle));
  const price = machine.variants[0].calculated_price.calculated_amount;

  return (
    <>
      <Breadcrumbs items={[{ href: "/mieten", label: "Maschinen mieten" }, { href: `/mieten#${group?.id}`, label: group?.name ?? "" }, { label: machine.title }]} />

      <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="relative aspect-square overflow-hidden rounded-lg border border-line bg-white">
          {machine.thumbnail && (
            <Image
              src={machine.thumbnail}
              alt={`${machine.title} ${machine.subtitle}`}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="product-photo object-contain p-10"
            />
          )}
          <span className="absolute left-4 top-4 rounded bg-accent px-2.5 py-1 text-sm font-bold">Miete</span>
        </div>

        <div>
          <h1 className={ui.h1}>{machine.title}</h1>
          <p className="mt-1 text-sm text-muted">
            {machine.subtitle} · Art.-Nr. {machine.metadata.code}
          </p>
          <p className="mt-2 text-muted">{machine.metadata.note}</p>
          <p className="mt-5 text-3xl font-bold tabular">
            {formatEur(price)} <span className="text-base font-medium text-muted">pro Tag</span>
          </p>
          <p className="mt-1 text-sm text-muted">Abholung in Moabit · Verfügbarkeit bestätigen wir nach der Reservierung</p>

          <div className="mt-6">
            <BookingBox machine={machine} />
          </div>

          <ul className="mt-6 grid gap-2 text-[0.95rem]">
            {[
              `Abholung und Rückgabe: ${site.street}, ${site.zip} ${site.city}`,
              "Mietvertrag und Kaution bei der Abholung, Höhe je nach Maschine",
              "Abrechnung bei der Rückgabe",
              "Betriebsunterlagen zur Maschine inklusive",
            ].map((t) => (
              <li key={t} className="flex gap-2">
                <Check size={18} className="mt-0.5 shrink-0 text-brand" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-12">
        <section aria-labelledby="beschreibung">
          <h2 id="beschreibung" className={ui.h2}>
            Beschreibung
          </h2>
          <p className="mt-3 max-w-prose leading-relaxed">
            {machine.description ??
              `${machine.title} von ${machine.subtitle}: ${machine.metadata.note}. Die Betriebsunterlagen bekommen Sie bei der Abholung mit, Fragen zur Bedienung beantworten wir an der Theke.`}
          </p>
        </section>
        {usedIn.length > 0 && (
          <section aria-labelledby="einsatz">
            <h2 id="einsatz" className={ui.h2}>
              Einsatz beim Bodenschleifen
            </h2>
            <p className="mt-1 text-muted">Diese Maschine brauchen Sie in folgenden Schritten unserer Anleitung:</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {usedIn.map((s) => (
                <li key={s.id}>
                  <Link href={`/ratgeber#${s.id}`} className="inline-flex items-center gap-1 rounded-full border border-line px-3.5 py-1.5 text-[0.95rem] text-brand hover:bg-surface hover:underline">
                    Schritt {steps.indexOf(s) + 1}: {s.name} →
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {accessories.length > 0 && (
        <section className="mt-14" aria-labelledby="zubehoer">
          <h2 id="zubehoer" className={ui.h2}>
            Passendes Schleifmittel
          </h2>
          <p className="mt-1 text-muted">Pro Stück, in jeder Körnung. Gleich mit in den Warenkorb legen.</p>
          <ul className="mt-6 grid gap-4 lg:grid-cols-2">
            {accessories.map((a) => (
              <li key={a.id} className="grid grid-cols-[5rem_1fr] gap-4 rounded-lg border border-line p-4 sm:grid-cols-[6.5rem_1fr]">
                <Link href={`/shop/${a.handle}`} className="relative aspect-square overflow-hidden rounded-md border border-line bg-white" aria-hidden="true" tabIndex={-1}>
                  {a.thumbnail && <Image src={a.thumbnail} alt="" fill sizes="104px" className="product-photo object-contain p-1.5" />}
                </Link>
                <div className="min-w-0">
                  <h3 className="font-semibold">
                    <Link href={`/shop/${a.handle}`} className="hover:text-brand hover:underline">
                      {a.title}
                    </Link>
                  </h3>
                  <div className="mt-3">
                    <BuyBox product={a} compact />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

export default function MachinePage(props: Props) {
  return (
    <div className={`${ui.container} pt-6`}>
      <Suspense fallback={<div className="min-h-[70vh]" aria-busy="true" />}>
        <MachineContent {...props} />
      </Suspense>
    </div>
  );
}
