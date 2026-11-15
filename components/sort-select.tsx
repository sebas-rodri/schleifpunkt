"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useId } from "react";
import { SORTS, type SortValue } from "@/lib/listing";
import { ChevronDown } from "./icons";

export function SortSelect({ value }: { value: SortValue }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const id = useId();
  return (
    <div className="flex items-center gap-2">
      <label htmlFor={id} className="text-sm text-muted">
        Sortieren
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => {
            const next = new URLSearchParams(params.toString());
            if (e.target.value === "empfohlen") next.delete("sortierung");
            else next.set("sortierung", e.target.value);
            next.delete("seite");
            const qs = next.toString();
            router.push(qs ? `${pathname}?${qs}` : pathname);
          }}
          className="h-10 appearance-none rounded-md border border-line-strong bg-white pl-3 pr-9 text-[0.95rem] font-medium outline-none focus:border-brand focus:ring-3 focus:ring-brand/15"
        >
          {SORTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted" />
      </div>
    </div>
  );
}
