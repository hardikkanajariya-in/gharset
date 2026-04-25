export function LoadingState() {
  return (
    <div className="rounded-2xl border border-line bg-white p-4 shadow-soft">
      <div className="aspect-[4/3] animate-pulse rounded-xl bg-mutedSurface" />
      <div className="mt-3 h-4 w-4/5 animate-pulse rounded bg-strongSurface" />
      <div className="mt-2 h-3 w-2/3 animate-pulse rounded bg-mutedSurface" />
      <div className="mt-4 h-11 animate-pulse rounded-xl bg-mutedSurface" />
    </div>
  );
}
