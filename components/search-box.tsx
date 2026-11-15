"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useId, useMemo, useRef, useState } from "react";
import { formatEur } from "@/lib/format";
import { searchItems, type SearchItem } from "@/lib/search";
import { Search } from "./icons";

const hrefFor = (i: SearchItem) => (i.kind === "rental" ? `/mieten/${i.handle}` : `/shop/${i.handle}`);

/** Header search: live suggestions as you type, Enter opens the full results page. */
export function SearchBox({ items, autoFocus = false }: { items: SearchItem[]; autoFocus?: boolean }) {
  const router = useRouter();
  const id = useId();
  const listId = `${id}-list`;
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => (q.trim().length >= 2 ? searchItems(items, q) : []), [items, q]);
  const shown = results.slice(0, 6);
  const expanded = open && q.trim().length >= 2;

  function go(href: string) {
    setOpen(false);
    setActive(-1);
    router.push(href);
    inputRef.current?.blur();
  }

  function submit() {
    const term = q.trim();
    if (!term) return;
    if (active >= 0 && shown[active]) return go(hrefFor(shown[active]));
    go(`/suche?q=${encodeURIComponent(term)}`);
  }

  return (
    <form
      role="search"
      className="relative w-full"
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <label htmlFor={`${id}-q`} className="sr-only">
        Produkte und Maschinen suchen
      </label>
      <div className="relative">
        <Search size={19} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
        <input
          ref={inputRef}
          id={`${id}-q`}
          type="search"
          autoComplete="off"
          autoFocus={autoFocus}
          placeholder="Suchen: Schleifband, Bona, Randschleifer …"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
            setActive(-1);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 120)}
          onKeyDown={(e) => {
            if (!expanded) return;
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActive((a) => Math.min(a + 1, shown.length - 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((a) => Math.max(a - 1, -1));
            } else if (e.key === "Escape") {
              setOpen(false);
            }
          }}
          role="combobox"
          aria-expanded={expanded}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={active >= 0 ? `${id}-opt-${active}` : undefined}
          className="h-11 w-full rounded-md border border-line-strong bg-white pl-11 pr-24 text-[0.98rem] outline-none transition-shadow placeholder:text-muted/80 focus:border-brand focus:ring-3 focus:ring-brand/15 [&::-webkit-search-cancel-button]:hidden"
        />
        <button
          type="submit"
          className="absolute right-1 top-1 h-9 rounded-[5px] bg-brand px-4 text-sm font-semibold text-white hover:bg-brand-hover"
        >
          Suchen
        </button>
      </div>

      {expanded && (
        <div className="fade-up absolute inset-x-0 top-[calc(100%+6px)] z-50 overflow-hidden rounded-lg border border-line bg-white shadow-[0_12px_32px_-8px_rgb(27_31_28/0.25)]">
          {shown.length === 0 ? (
            <p className="px-4 py-4 text-[0.95rem] text-muted">Keine Treffer für „{q.trim()}“.</p>
          ) : (
            <>
              <ul id={listId} role="listbox" aria-label="Vorschläge">
                {shown.map((item, i) => (
                  <li
                    key={item.handle}
                    id={`${id}-opt-${i}`}
                    role="option"
                    aria-selected={i === active}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      go(hrefFor(item));
                    }}
                    onMouseEnter={() => setActive(i)}
                    className={`flex cursor-pointer items-center gap-3 px-3 py-2.5 ${i === active ? "bg-surface" : ""}`}
                  >
                    <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-md border border-line bg-white">
                      {item.thumbnail && (
                        <Image src={item.thumbnail} alt="" fill sizes="44px" className="product-photo object-contain p-1" />
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-semibold">
                        {item.title}
                        {item.subtitle && <span className="font-normal text-muted"> · {item.subtitle}</span>}
                      </span>
                      <span className="block text-sm text-muted">{item.category}</span>
                    </span>
                    <span className="shrink-0 text-sm font-semibold tabular">
                      {item.varies && "ab "}
                      {formatEur(item.price)}
                      {item.kind === "rental" && <span className="font-normal text-muted"> /Tag</span>}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="block w-full border-t border-line bg-surface px-4 py-2.5 text-left text-sm font-semibold text-brand hover:underline"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => go(`/suche?q=${encodeURIComponent(q.trim())}`)}
              >
                Alle {results.length} Ergebnisse für „{q.trim()}“ anzeigen
              </button>
            </>
          )}
        </div>
      )}
    </form>
  );
}
