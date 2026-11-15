export function ListingSkeleton() {
  return (
    <div aria-busy="true" aria-label="Produkte werden geladen">
      <div className="h-[3.25rem] border-b border-line" />
      <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => (
          <li key={i} className="aspect-[3/4] animate-pulse rounded-lg bg-surface" />
        ))}
      </ul>
    </div>
  );
}
