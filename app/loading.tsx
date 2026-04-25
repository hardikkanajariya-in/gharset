export default function Loading() {
  return (
    <div className="min-h-[52vh] bg-background px-4 py-8">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-5 h-5 w-40 animate-pulse rounded-full bg-strongSurface" />

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-line bg-white p-3 shadow-soft"
            >
              <div className="aspect-[4/3] animate-pulse rounded-xl bg-mutedSurface" />
              <div className="mt-3 h-4 w-4/5 animate-pulse rounded-full bg-strongSurface" />
              <div className="mt-2 h-3 w-2/3 animate-pulse rounded-full bg-mutedSurface" />
              <div className="mt-4 h-9 animate-pulse rounded-xl bg-mutedSurface" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
