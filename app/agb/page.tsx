import type { Metadata } from "next";
import { CarriedOver, LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Allgemeine Geschäftsbedingungen" };

export default function Page() {
  return (
    <LegalPage title="Allgemeine Geschäftsbedingungen">
      <CarriedOver path="allgemeine-geschaeftsbedingungen-agb" />
    </LegalPage>
  );
}
