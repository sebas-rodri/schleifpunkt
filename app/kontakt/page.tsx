import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactForm } from "@/components/contact-form";
import { FaqList } from "@/components/faq-list";
import { Mail, Phone, Pin } from "@/components/icons";
import { site } from "@/lib/site";
import { ui } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Schleifpunkt Berlin, Perleberger Str. 25, 10559 Berlin. Telefon 030 32592279, info@schleifpunktberlin.com.",
};

export default function KontaktPage() {
  return (
    <div className={`${ui.container} pt-6`}>
      <Breadcrumbs items={[{ label: "Kontakt" }]} />
      <h1 className={`${ui.h1} mt-3`}>Kontakt</h1>
      <p className="mt-2 max-w-2xl text-muted">
        Sie wissen nicht, welche Maschine Ihr Boden braucht? Rufen Sie an oder schreiben Sie uns, am besten mit einem Foto
        des Bodens.
      </p>

      <div className="mt-8 grid gap-10 lg:grid-cols-[22rem_1fr]">
        <ul className="grid content-start gap-3">
          <li className="flex gap-3 rounded-lg border border-line p-4">
            <Phone size={22} className="mt-0.5 shrink-0 text-brand" />
            <div>
              <p className="font-semibold">Telefon</p>
              <a href={site.phoneLandline.href} className="block hover:underline tabular">
                {site.phoneLandline.label}
              </a>
              <a href={site.phoneMobile.href} className="block hover:underline tabular">
                {site.phoneMobile.label}
              </a>
            </div>
          </li>
          <li className="flex gap-3 rounded-lg border border-line p-4">
            <Mail size={22} className="mt-0.5 shrink-0 text-brand" />
            <div>
              <p className="font-semibold">E-Mail</p>
              <a href={`mailto:${site.email}`} className="hover:underline">
                {site.email}
              </a>
            </div>
          </li>
          <li className="flex gap-3 rounded-lg border border-line p-4">
            <Pin size={22} className="mt-0.5 shrink-0 text-brand" />
            <div>
              <p className="font-semibold">Adresse</p>
              <p>
                {site.street}
                <br />
                {site.zip} {site.city}
              </p>
              <a href={site.mapsHref} target="_blank" rel="noreferrer" className={`${ui.link} mt-1 inline-block text-sm`}>
                Route planen
              </a>
            </div>
          </li>
        </ul>
        <section aria-labelledby="form-title" className="rounded-lg border border-line p-5 sm:p-7">
          <h2 id="form-title" className="text-xl font-bold">
            Nachricht schreiben
          </h2>
          <div className="mt-5">
            <ContactForm />
          </div>
        </section>
      </div>

      <section className="mt-16" aria-labelledby="faq-title">
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
