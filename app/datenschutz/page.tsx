import type { Metadata } from "next";
import { CarriedOver, LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Datenschutzerklärung" };

export default function Page() {
  return (
    <LegalPage title="Datenschutzerklärung">
      <CarriedOver path="datenschutzerklaerung" />
    </LegalPage>
  );
}
