import Link from "next/link";

function createPageHref(basePath: string, page: number) {
  if (page <= 1) {
    return basePath;
  }

  return `${basePath}?page=${page}`;
}

export function Pagination({
  basePath,
  currentPage,
  totalPages
}: {
  basePath: string;
  currentPage: number;
  totalPages: number;
}) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav
      aria-label="Pagination"
      className="mt-7 flex flex-col items-center justify-between gap-3 rounded-2xl border border-lineStrong bg-white p-3 shadow-soft sm:flex-row"
    >
      <p className="text-xs font-medium text-muted">
        Page <span className="font-bold text-ink">{currentPage}</span> of{" "}
        <span className="font-bold text-ink">{totalPages}</span>
      </p>

      <div className="flex flex-wrap items-center justify-center gap-1.5">
        <Link
          href={createPageHref(basePath, currentPage - 1)}
          aria-disabled={currentPage <= 1}
          className={`inline-flex h-9 items-center justify-center rounded-xl border px-3 text-xs font-semibold transition ${
            currentPage <= 1
              ? "pointer-events-none border-line bg-mutedSurface text-muted"
              : "border-lineStrong bg-white text-ink hover:border-primary hover:text-primary"
          }`}
        >
          Previous
        </Link>

        {pages.map((page) => (
          <Link
            key={page}
            href={createPageHref(basePath, page)}
            aria-current={page === currentPage ? "page" : undefined}
            className={`inline-flex h-9 min-w-9 items-center justify-center rounded-xl border px-3 text-xs font-semibold transition ${
              page === currentPage
                ? "border-primary bg-primary text-white"
                : "border-lineStrong bg-white text-ink hover:border-primary hover:text-primary"
            }`}
          >
            {page}
          </Link>
        ))}

        <Link
          href={createPageHref(basePath, currentPage + 1)}
          aria-disabled={currentPage >= totalPages}
          className={`inline-flex h-9 items-center justify-center rounded-xl border px-3 text-xs font-semibold transition ${
            currentPage >= totalPages
              ? "pointer-events-none border-line bg-mutedSurface text-muted"
              : "border-lineStrong bg-white text-ink hover:border-primary hover:text-primary"
          }`}
        >
          Next
        </Link>
      </div>
    </nav>
  );
}