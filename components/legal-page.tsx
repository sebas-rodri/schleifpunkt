import { ui } from "@/lib/ui";

export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className={`${ui.container} pt-8`}>
      <h1 className={ui.h1}>{title}</h1>
      <div className="mt-8 grid max-w-prose gap-4 leading-relaxed [&_h2]:mt-4 [&_h2]:text-lg [&_h2]:font-bold">{children}</div>
    </div>
  );
}

export function CarriedOver({ path }: { path: string }) {
  return (
    <p className="rounded-lg border border-line bg-surface p-5">
      Der Rechtstext wird beim Livegang unverändert von der bestehenden Website übernommen. Bis dahin gilt die Fassung auf{" "}
      <a className={ui.link} href={`https://schleifpunktberlin.com/${path}/`} target="_blank" rel="noreferrer">
        schleifpunktberlin.com/{path}
      </a>
      .
    </p>
  );
}
