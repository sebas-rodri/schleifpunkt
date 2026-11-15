import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout-form";
import { ui } from "@/lib/ui";

export const metadata: Metadata = { title: "Kasse", robots: { index: false } };

export default function KassePage() {
  return (
    <div className={`${ui.container} pt-8`}>
      <h1 className={ui.h1}>Kasse</h1>
      <CheckoutForm />
    </div>
  );
}
