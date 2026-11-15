import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Estimator } from "@/components/estimator";
import { FaqList } from "@/components/faq-list";
import { commerce } from "@/lib/commerce";
import { estimatorHandles } from "@/lib/estimator";
import { glossary, steps } from "@/lib/sequence";
import { ui } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Ratgeber: Boden schleifen in sechs Schritten",
  description: "Welche Maschine, welche Körnung, Lack oder Öl: der Ablauf beim Dielen- und Parkettschleifen, mit Materialrechner.",
};

export default async function RatgeberPage() {
  const products = await commerce.getProductsByHandles(estimatorHandles());

  return (
    <div className={`${ui.container} pt-6`}>
      <Breadcrumbs items={[{ label: "Ratgeber" }]} />
      <div className="mt-3 grid gap-8 lg:grid-cols-[1fr_24rem] lg:items-start">
        <div>
          <h1 className={ui.h1}>Boden schleifen in sechs Schritten</h1>
          <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted">
            Der Ablauf, wie wir ihn an der Theke erklären. Er gilt für Kieferndielen im Altbau genauso wie für Parkett.
            Was Ihr Boden genau braucht, sehen wir am besten an einem Foto oder bei der Abholung.
          </p>
          <nav aria-label="Inhalt" className="mt-6">
            <ol className="flex flex-wrap gap-2">
              {steps.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="inline-flex rounded-full border border-line px-3.5 py-1.5 text-[0.95rem] hover:bg-surface">
                    {i + 1}. {s.name}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
        <div className="relative aspect-[3/2] overflow-hidden rounded-lg">
          <Image src="/images/floors/dielen-verwittert.jpg" alt="Verwitterte, ungeschliffene Kieferndielen" fill priority sizes="(min-width: 1024px) 24rem, 100vw" className="object-cover" />
        </div>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_18rem]">
        <ol className="grid gap-4">
          {steps.map((s, i) => (
            <li key={s.id} id={s.id} className="scroll-mt-6 rounded-lg border border-line p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-lg font-bold text-white tabular">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="text-xl font-bold">{s.name}</h2>
                  <p className="text-muted">{s.short}</p>
                  <p className="mt-3 max-w-prose leading-relaxed">{s.text}</p>
                  <p className="mt-3 max-w-prose rounded-md bg-surface px-4 py-3 text-[0.95rem]">
                    <strong>Tipp:</strong> {s.tip}
                  </p>
                  <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-[0.95rem]">
                    <div>
                      <dt className="text-sm text-muted">Körnung</dt>
                      <dd className="font-semibold">{s.grits}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted">Maschine</dt>
                      <dd className="flex flex-wrap gap-x-3">
                        {s.machines.map((m) => (
                          <Link key={m.code} href={`/mieten/${m.handle}`} className="font-semibold text-brand hover:underline">
                            {m.label}
                          </Link>
                        ))}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </li>
          ))}
        </ol>
        <aside aria-labelledby="begriffe" className="lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-lg bg-surface p-5">
            <h2 id="begriffe" className="font-bold">
              Begriffe kurz erklärt
            </h2>
            <dl className="mt-3 grid gap-4 text-[0.95rem]">
              {glossary.map((g) => (
                <div key={g.term}>
                  <dt className="font-semibold">{g.term}</dt>
                  <dd className="mt-0.5 text-muted">{g.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </div>

      <section className="pt-16" aria-labelledby="rechner">
        <h2 id="rechner" className={ui.h2}>
          Materialrechner
        </h2>
        <div className="mt-6">
          <Estimator products={products} />
        </div>
      </section>

      <section id="faq" className="scroll-mt-6 pt-16" aria-labelledby="faq-title">
        <h2 id="faq-title" className={ui.h2}>
          Häufige Fragen
        </h2>
        <div className="mt-6 max-w-3xl">
          <FaqList />
        </div>
      </section>
    </div>
  );
}
