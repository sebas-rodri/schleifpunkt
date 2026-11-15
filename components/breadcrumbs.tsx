import Link from "next/link";
import { ChevronRight } from "./icons";

export function Breadcrumbs({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav aria-label="Brotkrumen" className="text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-1">
        <li>
          <Link href="/" className="hover:text-ink hover:underline">
            Start
          </Link>
        </li>
        {items.map((it) => (
          <li key={it.label} className="flex items-center gap-1">
            <ChevronRight size={14} />
            {it.href ? (
              <Link href={it.href} className="hover:text-ink hover:underline">
                {it.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink">
                {it.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
