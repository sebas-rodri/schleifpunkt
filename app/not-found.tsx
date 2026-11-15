import Link from "next/link";
import { ui } from "@/lib/ui";

export default function NotFound() {
  return (
    <div className={`${ui.container} py-20 text-center`}>
      <p className="text-6xl font-extrabold text-brand tabular">404</p>
      <h1 className={`${ui.h1} mt-4`}>Seite nicht gefunden</h1>
      <p className="mx-auto mt-3 max-w-md text-muted">
        Die Seite wurde verschoben oder existiert nicht. Nutzen Sie die Suche oder starten Sie hier:
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/mieten" className={ui.btnPrimary}>
          Maschinen mieten
        </Link>
        <Link href="/shop" className={ui.btnSecondary}>
          Zum Shop
        </Link>
      </div>
    </div>
  );
}
