import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { unsplashCredits } from "@/lib/credits";

export const metadata: Metadata = { title: "Bildnachweis", robots: { index: false } };

export default function BildnachweisPage() {
  const used = unsplashCredits.filter((c) => c.used !== "Reserve");
  return (
    <LegalPage title="Bildnachweis">
      <p>
        Fotos von Böden aus Berliner Altbauwohnungen unter „Vom Rohbau zum Glanzstück“ und auf „Über uns“: Schleifpunkt
        Berlin.
      </p>
      <p>Produkt- und Maschinenfotos: jeweilige Hersteller (Lägler, Festool, Bosch, Makita, Fein, Rubi, Bona u. a.).</p>
      <h2>Unsplash</h2>
      <ul className="grid gap-2">
        {used.map((c) => (
          <li key={c.id}>
            Foto von {c.author} auf{" "}
            <a className="font-semibold text-brand hover:underline" href={`https://unsplash.com/photos/${c.id}`} target="_blank" rel="noreferrer">
              Unsplash
            </a>{" "}
            ({c.used})
          </li>
        ))}
      </ul>
    </LegalPage>
  );
}
