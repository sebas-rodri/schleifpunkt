import type { Metadata } from "next";
import { OrderConfirmation } from "@/components/order-confirmation";
import { ui } from "@/lib/ui";

export const metadata: Metadata = { title: "Reservierung angefragt", robots: { index: false } };

export default function BestaetigtPage() {
  return (
    <div className={`${ui.container} pt-8`}>
      <h1 className={ui.h1}>Vielen Dank für Ihre Reservierung</h1>
      <OrderConfirmation />
    </div>
  );
}
