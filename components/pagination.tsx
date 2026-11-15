import Link from "next/link";
import { ChevronLeft, ChevronRight } from "./icons";

function pageList(page: number, pages: number): (number | "…")[] {
  if (pages <= 7) return Array.from({ length: pages }, (_, i) => i + 1);
  const set = new Set([1, pages, page - 1, page, page + 1]);
  const list = [...set].filter((n) => n >= 1 && n <= pages).sort((a, b) => a - b);
  const out: (number | "…")[] = [];
  list.forEach((n, i) => {
    if (i && n - list[i - 1] > 1) out.push("…");
    out.push(n);
  });
  return out;
}

/** Numbered pagination; `href(n)` builds the URL for page n. */
export function Pagination({ page, pages, href }: { page: number; pages: number; href: (n: number) => string }) {
  if (pages <= 1) return null;
  const cell = "inline-flex h-10 min-w-10 items-center justify-center rounded-md px-3 text-[0.95rem] font-semibold tabular";
  return (
    <nav aria-label="Seiten" className="mt-10 flex flex-wrap items-center justify-center gap-1.5">
      {page > 1 ? (
        <Link href={href(page - 1)} className={`${cell} border border-line hover:bg-surface`} rel="prev">
          <ChevronLeft size={18} /> <span className="hidden sm:inline">Zurück</span>
        </Link>
      ) : (
        <span className={`${cell} border border-line text-muted/50`} aria-hidden="true">
          <ChevronLeft size={18} /> <span className="hidden sm:inline">Zurück</span>
        </span>
      )}
      {pageList(page, pages).map((n, i) =>
        n === "…" ? (
          <span key={`gap-${i}`} className="px-1 text-muted" aria-hidden="true">
            …
          </span>
        ) : (
          <Link
            key={n}
            href={href(n)}
            aria-current={n === page ? "page" : undefined}
            aria-label={`Seite ${n}`}
            className={`${cell} ${n === page ? "bg-brand text-white" : "border border-line hover:bg-surface"}`}
          >
            {n}
          </Link>
        ),
      )}
      {page < pages ? (
        <Link href={href(page + 1)} className={`${cell} border border-line hover:bg-surface`} rel="next">
          <span className="hidden sm:inline">Weiter</span> <ChevronRight size={18} />
        </Link>
      ) : (
        <span className={`${cell} border border-line text-muted/50`} aria-hidden="true">
          <span className="hidden sm:inline">Weiter</span> <ChevronRight size={18} />
        </span>
      )}
    </nav>
  );
}
