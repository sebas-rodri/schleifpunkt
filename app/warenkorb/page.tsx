import type { Metadata } from "next";
import { CartView } from "@/components/cart-view";
import { ui } from "@/lib/ui";

export const metadata: Metadata = { title: "Warenkorb", robots: { index: false } };

export default function WarenkorbPage() {
  return (
    <div className={`${ui.container} pt-8`}>
      <h1 className={ui.h1}>Warenkorb</h1>
      <CartView />
    </div>
  );
}
