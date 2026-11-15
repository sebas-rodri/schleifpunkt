import type { Metadata, Viewport } from "next";
import { Sofia_Sans } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { commerce } from "@/lib/commerce";
import { toSearchItem } from "@/lib/search";
import { site } from "@/lib/site";
import "./globals.css";

const sofia = Sofia_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sofia",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Schleifpunkt Berlin · Bodenschleifmaschinen mieten in Moabit",
    template: "%s · Schleifpunkt Berlin",
  },
  description:
    "Parkett und Dielen selbst schleifen: Profi-Schleifmaschinen ab 25 € am Tag, dazu Schleifmittel, Lacke und Öle. Abholung in der Perleberger Str. 25, Berlin-Moabit.",
  openGraph: { type: "website", locale: "de_DE", siteName: site.name },
};

export const viewport: Viewport = { themeColor: "#1f4a34" };

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const all = await commerce.listProducts();
  const searchIndex = all.map(toSearchItem);

  return (
    <html lang="de" className={sofia.variable}>
      <body className="flex min-h-dvh flex-col antialiased">
        <a
          href="#inhalt"
          className="sr-only z-50 rounded-md bg-brand px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Zum Inhalt springen
        </a>
        <SiteHeader searchIndex={searchIndex} />
        <main id="inhalt" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
