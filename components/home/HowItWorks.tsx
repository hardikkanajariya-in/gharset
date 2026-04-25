import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/common/SectionHeader";

const steps = [
  ["1", "Choose product", "Browse products or combo kits from the catalog."],
  ["2", "Confirm on WhatsApp", "We verify availability, address and COD details."],
  ["3", "Track order", "Get an order ID and view status on the tracking page."]
];

export function HowItWorks() {
  return (
    <section className="compact-section bg-white/45">
      <Container>
        <SectionHeader title="How COD ordering works" description="No complicated checkout in the first version. Orders are confirmed manually for better control." />
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {steps.map(([number, title, text]) => (
            <div key={number} className="card p-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">{number}</div>
              <p className="mt-3 text-sm font-semibold text-ink">{title}</p>
              <p className="mt-1 text-sm leading-6 text-muted">{text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
