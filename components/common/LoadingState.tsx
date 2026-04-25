export function LoadingState() {
  return (
    <div className="rounded-2xl border border-line bg-white p-4">
      <div className="h-4 w-28 animate-pulse rounded bg-mutedSurface" />
      <div className="mt-3 h-3 w-full animate-pulse rounded bg-mutedSurface" />
      <div className="mt-2 h-3 w-2/3 animate-pulse rounded bg-mutedSurface" />
    </div>
  );
}
