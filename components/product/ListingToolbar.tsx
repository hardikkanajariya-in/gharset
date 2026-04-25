import Link from "next/link";
import type { Category } from "@/types/category";
import { cn } from "@/lib/utils";

const priceLinks = [
  { label: "Under ₹299", href: "/under-299" },
  { label: "Under ₹499", href: "/under-499" },
  { label: "Under ₹999", href: "/under-999" }
];

export function ListingToolbar({
  categories,
  activeHref,
  resultCount,
  label = "Products"
}: {
  categories: Category[];
  activeHref: string;
  resultCount: number;
  label?: string;
}) {
  const links = [
    { label: "All", href: "/shop" },
    ...categories.map((category) => ({
      label: category.name.replace(" Organizers", ""),
      href: `/category/${category.slug}`
    })),
    { label: "Combo Kits", href: "/combo-kits" },
    ...priceLinks
  ];

  return (
    <div className="mt-5 rounded-2xl border border-line bg-white p-3 shadow-soft">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="chip-scroll -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "focus-ring whitespace-nowrap rounded-full border px-3 py-2 text-xs font-black transition",
                activeHref === item.href
                  ? "border-primary bg-primary text-white"
                  : "border-lineStrong bg-white text-mutedStrong hover:border-secondary hover:text-secondary"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-between gap-3 text-xs font-bold text-muted sm:justify-end">
          <span>
            <span className="font-black text-ink">{resultCount}</span> {label}
          </span>
          <span className="rounded-full bg-mutedSurface px-3 py-1.5 text-mutedStrong">
            Sorted by relevance
          </span>
        </div>
      </div>
    </div>
  );
}
