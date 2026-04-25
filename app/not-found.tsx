"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Container } from "@/components/common/Container";

const quickLinks = [
  {
    label: "Shop all products",
    href: "/shop",
    description: "Browse all GharSet organizers"
  },
  {
    label: "Kitchen organizers",
    href: "/category/kitchen-organizers",
    description: "Sink, spice, fridge and shelf solutions"
  },
  {
    label: "Bathroom organizers",
    href: "/category/bathroom-organizers",
    description: "Shelves, hooks and daily-use holders"
  },
  {
    label: "Combo kits",
    href: "/combo-kits",
    description: "Ready-made setup bundles"
  },
  {
    label: "Under ₹499",
    href: "/under-499",
    description: "Budget-friendly useful finds"
  },
  {
    label: "Track order",
    href: "/track-order",
    description: "Check your latest order status"
  }
];

export default function NotFound() {
  const [query, setQuery] = useState("");

  const filteredLinks = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return quickLinks;
    }

    return quickLinks.filter((item) => {
      return (
        item.label.toLowerCase().includes(normalizedQuery) ||
        item.description.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [query]);

  return (
    <section className="compact-section min-h-[62vh]">
      <Container className="max-w-3xl">
        <div className="overflow-hidden rounded-3xl border border-lineStrong bg-white shadow-soft">
          <div className="border-b border-line bg-mutedSurface px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent">
                  404
                </p>
                <h1 className="mt-1 text-xl font-semibold tracking-[-0.02em] text-ink sm:text-2xl">
                  Page not found
                </h1>
              </div>

              <div className="hidden h-12 w-12 items-center justify-center rounded-2xl border border-line bg-white text-primary sm:flex">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M10.5 10.5h.01" />
                  <path d="M14.5 10.5h.01" />
                  <path d="M8.5 15c1.5-1 5.5-1 7 0" />
                  <path d="M12 3a9 9 0 1 0 9 9" />
                  <path d="M21 3v6h-6" />
                </svg>
              </div>
            </div>

            <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
              The page or product you are looking for is not available. Try searching
              the main sections below or go back to the shop.
            </p>
          </div>

          <div className="px-4 py-5 sm:px-6">
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/shop"
                className="focus-ring inline-flex h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-white shadow-soft transition hover:bg-primaryDark active:scale-[0.98]"
              >
                Go to shop
              </Link>

              <button
                type="button"
                onClick={() => window.history.back()}
                className="focus-ring inline-flex h-11 items-center justify-center rounded-xl border border-lineStrong bg-white px-5 text-sm font-semibold text-ink transition hover:border-primary hover:text-primary active:scale-[0.98]"
              >
                Go back
              </button>
            </div>

            <div className="mt-5">
              <label
                htmlFor="not-found-search"
                className="text-xs font-semibold uppercase tracking-[0.14em] text-muted"
              >
                Find a section
              </label>

              <div className="mt-2 flex h-11 items-center rounded-xl border border-lineStrong bg-white px-3 transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15">
                <svg
                  viewBox="0 0 24 24"
                  className="mr-2 h-4 w-4 shrink-0 text-muted"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>

                <input
                  id="not-found-search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search kitchen, bathroom, combo, order..."
                  className="h-full w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted"
                />

                {query ? (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="ml-2 rounded-full px-2 py-1 text-xs font-semibold text-muted transition hover:bg-mutedSurface hover:text-ink"
                  >
                    Clear
                  </button>
                ) : null}
              </div>
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {filteredLinks.length > 0 ? (
                filteredLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group rounded-2xl border border-line bg-white p-4 transition hover:border-primary hover:shadow-soft"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-ink transition group-hover:text-primary">
                          {item.label}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-muted">
                          {item.description}
                        </p>
                      </div>

                      <span className="mt-0.5 text-sm text-muted transition group-hover:translate-x-0.5 group-hover:text-primary">
                        →
                      </span>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="rounded-2xl border border-line bg-mutedSurface p-4 sm:col-span-2">
                  <p className="text-sm font-semibold text-ink">No matching section found</p>
                  <p className="mt-1 text-xs leading-5 text-muted">
                    Try searching for shop, kitchen, bathroom, combo, or order tracking.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}