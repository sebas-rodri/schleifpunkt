import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProductCard } from "@/components/product-card";
import { RentalPeriodBar } from "@/components/rental-period-bar";
import { commerce } from "@/lib/commerce";
import { rentalGroups } from "@/lib/rental-groups";
import { site } from "@/lib/site";
import { ui } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Maschinen mieten",
  description:
    "Bandschleifmaschine, Randschleifer, Einscheibenmaschine, Absaugmobile, Sägen: 16 Maschinen ab 20 € am Tag, Abholung in Berlin-Moabit.",
};

export default async function MietenPage() {
  const machines = await commerce.listProducts({ kind: "rental" });

  return (
    <div className={`${ui.container} pt-6`}>
      <Breadcrumbs items={[{ label: "Maschinen mieten" }]} />
      <h1 className={`${ui.h1} mt-3`}>Maschinen mieten</h1>
      <p className="mt-2 max-w-3xl text-muted">
        {machines.length} Maschinen, Preise pro Tag inkl. 19 % MwSt. Mietvertrag und Kaution erledigen Sie bei der
        Abholung in der {site.street}, abgerechnet wird bei der Rückgabe.
      </p>

      <div className="mt-6">
        <RentalPeriodBar />
      </div>

      <nav aria-label="Maschinengruppen" className="no-scrollbar mt-8 flex gap-2 overflow-x-auto">
        {rentalGroups.map((g) => (
          <a key={g.id} href={`#${g.id}`} className="shrink-0 rounded-full border border-line px-4 py-1.5 text-[0.95rem] font-medium hover:bg-surface">
            {g.name}
          </a>
        ))}
      </nav>

      <div className="mt-6 grid gap-12">
        {rentalGroups.map((g) => {
          const list = machines.filter((m) => m.metadata.group === g.id);
          if (!list.length) return null;
          return (
            <section key={g.id} id={g.id} aria-labelledby={`g-${g.id}`} className="scroll-mt-6">
              <h2 id={`g-${g.id}`} className={ui.h2}>
                {g.name}
              </h2>
              <p className="mt-1 text-muted">{g.text}</p>
              <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-4">
                {list.map((m, i) => (
                  <li key={m.id}>
                    <ProductCard product={m} priority={g.id === "boden" && i < 3} showRentalBadge={false} />
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <section aria-labelledby="miet-info" className="mt-16 grid gap-6 rounded-lg border border-line p-6 md:grid-cols-3">
        <h2 id="miet-info" className="sr-only">
          Gut zu wissen
        </h2>
        <div>
          <h3 className="font-bold">Kaution</h3>
          <p className="mt-1 text-[0.95rem] text-muted">
            Hinterlegen Sie bei Abholung, Sie bekommen sie bei Rückgabe zurück. Die Höhe hängt von der Maschine ab.
          </p>
        </div>
        <div>
          <h3 className="font-bold">Reinigung</h3>
          <p className="mt-1 text-[0.95rem] text-muted">
            Bitte geben Sie die Maschine sauber zurück, sonst fällt eine Reinigungspauschale von {site.services.cleaningFee} € an.
          </p>
        </div>
        <div>
          <h3 className="font-bold">Lieferung</h3>
          <p className="mt-1 text-[0.95rem] text-muted">
            Kein Auto für eine 70-kg-Maschine? Wir liefern für {site.services.transport} €, das Liefergebiet klären wir am
            Telefon.
          </p>
        </div>
      </section>
    </div>
  );
}
