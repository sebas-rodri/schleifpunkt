import type { Metadata } from "next";
import { CarriedOver, LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Widerrufsbelehrung" };

export default function Page() {
  return (
    <LegalPage title="Widerrufsbelehrung">
      <CarriedOver path="widerrufsbelehrung" />
    </LegalPage>
  );
}
