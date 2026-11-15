"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cartTotals, useCart } from "@/lib/cart/store";
import type { SearchItem } from "@/lib/search";
import { infoNav, shopNav, site } from "@/lib/site";
import { ui } from "@/lib/ui";
import { Cart, Close, Menu, Phone, Pin } from "./icons";
import { SearchBox } from "./search-box";

export function SiteHeader({ searchIndex }: { searchIndex: SearchItem[] }) {
  const pathname = usePathname();
  const { count } = cartTotals(useCart());
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);
  const drawerRef = useRef<HTMLDivElement>(null);

  if (open && openedAt !== pathname) setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    drawerRef.current?.querySelector<HTMLElement>("a")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="relative z-30 border-b border-line bg-white">
      <div className="bg-brand text-[0.85rem] text-white">
        <div className={`${ui.container} flex h-9 items-center gap-6`}>
          <p className="flex items-center gap-1.5">
            <Pin size={15} /> Abholung und Rückgabe in Berlin-Moabit
          </p>
          <p className="hidden md:block">Preise inkl. 19 % MwSt.</p>
          <a href={site.phoneLandline.href} className="ml-auto hidden items-center gap-1.5 hover:underline sm:flex">
            <Phone size={15} /> Beratung: <span className="tabular">{site.phoneLandline.label}</span>
          </a>
        </div>
      </div>

      <div className={`${ui.container} flex items-center gap-4 py-3 lg:gap-8 lg:py-4`}>
        <Link href="/" className="shrink-0" aria-label="Schleifpunkt Berlin, Startseite">
          <Image
            src="/brand/schleifpunkt-logo.webp"
            alt="Schleifpunkt Berlin"
            width={480}
            height={340}
            priority
            className="h-12 w-auto lg:h-14"
          />
        </Link>
        <div className="hidden flex-1 md:block md:max-w-2xl">
          <SearchBox items={searchIndex} />
        </div>
        <div className="ml-auto flex items-center gap-1">
          <Link
            href="/warenkorb"
            className="relative inline-flex h-11 items-center gap-2 rounded-md px-3 font-semibold hover:bg-surface"
            aria-label={`Warenkorb, ${count} ${count === 1 ? "Artikel" : "Artikel"}`}
          >
            <span className="relative">
              <Cart size={24} />
              {count > 0 && (
                <span
                  key={count}
                  className="fade-up absolute -right-2.5 -top-2 min-w-5 rounded-full bg-accent px-1.5 text-center text-xs font-bold leading-5 text-ink tabular"
                >
                  {count}
                </span>
              )}
            </span>
            <span className="hidden lg:inline">Warenkorb</span>
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md hover:bg-surface lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => {
              setOpenedAt(pathname);
              setOpen(true);
            }}
          >
            <Menu size={24} />
            <span className="sr-only">Menü öffnen</span>
          </button>
        </div>
      </div>

      <div className={`${ui.container} pb-3 md:hidden`}>
        <SearchBox items={searchIndex} />
      </div>

      <nav aria-label="Hauptnavigation" className="hidden border-t border-line lg:block">
        <div className={`${ui.container} flex items-center`}>
          <ul className="flex items-center gap-1">
            {shopNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`relative inline-flex h-12 items-center px-3 text-[0.95rem] font-semibold transition-colors hover:text-brand ${
                    isActive(item.href) ? "text-brand after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:bg-brand" : ""
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="ml-auto flex items-center gap-1">
            {infoNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`inline-flex h-12 items-center px-3 text-[0.95rem] text-muted transition-colors hover:text-ink ${
                    isActive(item.href) ? "font-semibold text-ink" : ""
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menü">
          <button type="button" className="absolute inset-0 bg-ink/40" aria-label="Menü schließen" onClick={() => setOpen(false)} />
          <div ref={drawerRef} id="mobile-menu" className="fade-up absolute inset-y-0 right-0 flex w-[min(22rem,88vw)] flex-col overflow-y-auto bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <p className="font-bold">Menü</p>
              <button type="button" className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-surface" onClick={() => setOpen(false)}>
                <Close size={22} />
                <span className="sr-only">Menü schließen</span>
              </button>
            </div>
            <nav aria-label="Hauptnavigation mobil" className="px-2 py-3">
              <p className="px-3 pb-1 text-sm font-semibold text-muted">Sortiment</p>
              <ul>
                {shopNav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="flex h-12 items-center rounded-md px-3 text-base font-semibold hover:bg-surface">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-3 px-3 pb-1 text-sm font-semibold text-muted">Service</p>
              <ul>
                {[{ href: "/", label: "Startseite" }, ...infoNav, { href: "/warenkorb", label: `Warenkorb (${count})` }].map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="flex h-12 items-center rounded-md px-3 text-base hover:bg-surface">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-auto border-t border-line px-5 py-4 text-[0.95rem]">
              <a className={ui.link} href={site.phoneLandline.href}>
                {site.phoneLandline.label}
              </a>
              <p className="text-muted">
                {site.street}, {site.zip} {site.city}
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
