import { faq } from "@/lib/faq";
import { ChevronDown } from "./icons";

export function FaqList() {
  return (
    <ul className="divide-y divide-line rounded-lg border border-line">
      {faq.map((f) => (
        <li key={f.q}>
          <details className="group px-5 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-center gap-4 py-4 font-semibold">
              {f.q}
              <ChevronDown size={20} className="ml-auto shrink-0 text-muted transition-transform duration-200 group-open:rotate-180" />
            </summary>
            <p className="max-w-prose pb-5 leading-relaxed text-muted">{f.a}</p>
          </details>
        </li>
      ))}
    </ul>
  );
}
