"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/types/product";
import { buildSearchText, cn } from "@/lib/utils";
import { ProductGrid } from "./ProductGrid";

const defaultFilters = ["All", "Kitchen", "Bathroom", "Fridge", "Wardrobe", "Under ₹299", "Under ₹499", "Combos"];

export function ProductBrowser({ products, whatsappNumber, filters = defaultFilters }: { products: Product[]; whatsappNumber: string; filters?: string[] }) {
  const [active, setActive] = useState(filters[0] || "All");
  const [query, setQuery] = useState("");

  const visibleProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((product) => {
      const categoryMatch =
        active === "All" ||
        (active === "Under ₹299" && product.price <= 299) ||
        (active === "Under ₹499" && product.price <= 499) ||
        product.category.toLowerCase().includes(active.toLowerCase()) ||
        product.tags.some((tag) => tag.toLowerCase().includes(active.toLowerCase()));

      const searchText = buildSearchText([product.name, product.shortDescription, product.category, product.subcategory, ...product.tags]);
      return categoryMatch && (!q || searchText.includes(q));
    });
  }, [active, products, query]);

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-line bg-white p-3 shadow-soft sm:flex-row sm:items-center sm:justify-between">
        <div className="chip-scroll flex gap-2 overflow-x-auto pb-1">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              className={cn(
                "focus-ring whitespace-nowrap rounded-full border px-3 py-2 text-xs font-black transition",
                active === filter ? "border-primary bg-primary text-white" : "border-line bg-white text-muted hover:text-ink"
              )}
            >
              {filter}
            </button>
          ))}
        </div>
        <label className="grid gap-1 text-xs font-black uppercase tracking-[0.12em] text-muted sm:block">
          <span className="sr-only">Search products</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products"
            className="control-input sm:w-64"
          />
        </label>
      </div>
      <ProductGrid products={visibleProducts} whatsappNumber={whatsappNumber} />
    </div>
  );
}
