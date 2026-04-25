import Link from "next/link";
import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/common/SectionHeader";

const problems = [
  { title: "Messy kitchen", text: "Sink, shelf, spice and oil organizers.", href: "/category/kitchen-organizers", code: "K" },
  { title: "Small bathroom", text: "Compact shelves, holders and hooks.", href: "/category/bathroom-organizers", code: "B" },
  { title: "Fridge clutter", text: "Storage boxes for cleaner shelves.", href: "/category/fridge-organizers", code: "F" },
  { title: "Wardrobe storage", text: "Drawer and clothes organizers.", href: "/category/wardrobe-organizers", code: "W" },
  { title: "Rented room setup", text: "Low-commitment storage helpers.", href: "/combo-kits", code: "R" },
  { title: "Under ₹499", text: "Budget-friendly daily upgrades.", href: "/under-499", code: "₹" }
];

export function ShopByProblem() {
  return (
    <section className="compact-section">
      <Container>
        <SectionHeader title="Shop by problem" description="Start from the space you want to fix. Each category stays compact and practical." />
        <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-3">
          {problems.map((item) => (
            <Link key={item.title} href={item.href} className="group rounded-2xl border border-line bg-white p-3 shadow-soft transition hover:-translate-y-0.5 hover:border-lineStrong hover:shadow-lift sm:p-4">
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primarySoft text-xs font-black text-primary transition group-hover:bg-primary group-hover:text-white">
                  {item.code}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-black text-ink">{item.title}</span>
                  <span className="mt-1 line-clamp-2 block text-xs font-medium leading-5 text-muted sm:text-sm">{item.text}</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
