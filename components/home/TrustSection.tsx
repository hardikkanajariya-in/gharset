import { Container } from "@/components/common/Container";

const points = [
  "COD after confirmation",
  "WhatsApp order support",
  "Clear product details",
  "Order tracking page",
  "Budget-focused catalog",
  "No fake urgency blocks"
];

export function TrustSection() {
  return (
    <section className="compact-section">
      <Container>
        <div className="card grid gap-5 p-5 lg:grid-cols-[0.9fr_1.1fr] lg:p-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Why GharSet</p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-ink sm:text-2xl">A simple catalog built for practical purchases.</h2>
            <p className="mt-2 text-sm leading-6 text-muted">We keep the buying flow straightforward: useful products, compact pricing, manual WhatsApp confirmation and clear order status.</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {points.map((point) => (
              <div key={point} className="rounded-xl border border-line bg-cream px-3 py-3 text-sm font-medium text-ink">{point}</div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
