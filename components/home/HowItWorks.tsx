import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/common/SectionHeader";

const steps = [
  ["1", "Choose product", "Browse products or combo kits from the catalog."],
  ["2", "Confirm on WhatsApp", "We verify availability, address and COD details."],
  ["3", "COD order processed", "Your confirmed order is processed for delivery."],
  ["4", "Track order", "Get an order ID and view status on the tracking page."],
  ["5", "Recorded in Sheets", "Orders are logged for inventory and follow-up."]
];

export function HowItWorks() {
  return (
    <section className="compact-section bg-white">
      <Container>
        <SectionHeader title="How COD ordering works" description="No complicated checkout in the first version. Orders are confirmed manually for better control." />
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map(([number, title, text]) => (
            <div key={number} className="rounded-2xl border border-line bg-background p-4 shadow-soft">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-white">{number}</div>
              <p className="mt-3 text-sm font-semibold text-ink">{title}</p>
              <p className="mt-1 text-xs font-medium leading-5 text-muted sm:text-sm sm:leading-6">{text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
