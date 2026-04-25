import Link from "next/link";
import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/common/SectionHeader";

const problems = [
  { title: "Messy kitchen", text: "Sink, shelf, spice and oil organizers.", href: "/category/kitchen-organizers" },
  { title: "Small bathroom", text: "Compact shelves, holders and hooks.", href: "/category/bathroom-organizers" },
  { title: "Fridge clutter", text: "Storage boxes for cleaner shelves.", href: "/category/fridge-organizers" },
  { title: "Wardrobe storage", text: "Drawer and clothes organizers.", href: "/category/wardrobe-organizers" },
  { title: "Rented room setup", text: "Low-commitment storage helpers.", href: "/combo-kits" },
  { title: "Under ₹499", text: "Budget-friendly daily upgrades.", href: "/under-499" }
];

export function ShopByProblem() {
  return (
    <section className="compact-section">
      <Container>
        <SectionHeader title="Shop by problem" description="Start from the space you want to fix. Each category stays compact and practical." />
        <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-3">
          {problems.map((item) => (
            <Link key={item.title} href={item.href} className="card p-4 transition hover:-translate-y-0.5 hover:shadow-lift">
              <p className="text-sm font-semibold text-ink">{item.title}</p>
              <p className="mt-1 text-xs leading-5 text-muted sm:text-sm">{item.text}</p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
