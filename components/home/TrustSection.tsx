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
        <div className="grid gap-5 rounded-2xl border border-line bg-primaryDark p-5 text-white shadow-lift lg:grid-cols-[0.9fr_1.1fr] lg:p-6">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-successBg">Why GharSet</p>
            <h2 className="mt-2 text-[23px] font-black tracking-tight text-white sm:text-[30px]">A catalog built for practical purchases.</h2>
            <p className="mt-2 text-sm font-medium leading-6 text-blue-100">We keep the buying flow straightforward: useful products, compact pricing, manual WhatsApp confirmation and clear order status.</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {points.map((point) => (
              <div key={point} className="rounded-xl border border-white/15 bg-white/[0.08] px-3 py-3 text-sm font-bold text-white">{point}</div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
