import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Impressum" };

export default function ImpressumPage() {
  return (
    <LegalPage title="Impressum">
      <p>
        {site.name}
        <br />
        {site.street}
        <br />
        {site.zip} {site.city}
        <br />
        Deutschland
      </p>
      <p>
        <strong>Vertreten durch:</strong> {site.owner}
      </p>
      <p>
        <strong>Kontakt:</strong>
        <br />
        Telefon: {site.phoneMobile.label} / {site.phoneLandline.label}
        <br />
        E-Mail: <a className="font-semibold text-brand hover:underline" href={`mailto:${site.email}`}>{site.email}</a>
      </p>
      <p>
        <strong>Unternehmensform:</strong> {site.legalForm}
        <br />
        <strong>Umsatzsteuer-ID:</strong> {site.vatId}
      </p>
      <h2>Haftung für Inhalte</h2>
      <p>
        Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und
        Aktualität der Inhalte wird jedoch keine Gewähr übernommen.
      </p>
      <h2>Haftung für Links</h2>
      <p>
        Diese Website enthält Links zu externen Websites Dritter, auf deren Inhalte kein Einfluss besteht. Für die Inhalte
        der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber verantwortlich.
      </p>
      <h2>Urheberrecht</h2>
      <p>
        Die auf dieser Website veröffentlichten Inhalte und Werke unterliegen dem deutschen Urheberrecht. Jede Art der
        Verwertung außerhalb der Grenzen des Urheberrechts bedarf der schriftlichen Zustimmung des jeweiligen Autors bzw.
        Erstellers.
      </p>
    </LegalPage>
  );
}
