import Link from "next/link";
import { Container } from "@/components/common/Container";
import { whatsappUrl, suggestionMessage } from "@/lib/whatsapp";

export function HeroSection({ whatsappNumber }: { whatsappNumber: string }) {
  return (
    <section className="compact-section border-b border-line">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.94fr_1.06fr] lg:items-center">
          <div>
            <p className="inline-flex rounded-full border border-line bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
              COD-first home catalog
            </p>
            <h1 className="mt-4 max-w-2xl text-[30px] font-semibold leading-tight tracking-[-0.03em] text-ink sm:text-4xl lg:text-5xl">
              Useful organizers for cleaner Indian homes.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-muted sm:text-[15px]">
              Kitchen, bathroom, fridge and wardrobe products selected for small homes, rented rooms and daily use.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/shop" className="focus-ring inline-flex h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-white transition hover:bg-primaryDark">
                Shop products
              </Link>
              <a href={whatsappUrl(suggestionMessage(), whatsappNumber)} className="focus-ring inline-flex h-11 items-center justify-center rounded-xl border border-line bg-white px-5 text-sm font-semibold text-ink transition hover:border-primary hover:text-primary">
                Get suggestion
              </a>
            </div>
            <div className="mt-6 grid max-w-lg grid-cols-3 gap-3 text-xs text-muted">
              <TrustMini label="COD support" />
              <TrustMini label="Manual confirm" />
              <TrustMini label="Track order" />
            </div>
          </div>

          <div className="card p-3 sm:p-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <PreviewCard title="Kitchen setup" price="Under ₹999" text="Sink, spice and fridge organizers." />
              <PreviewCard title="Bathroom setup" price="Under ₹799" text="Shelves, holders and hooks." />
              <div className="rounded-2xl border border-line bg-mutedSurface p-4 sm:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Free suggestion</p>
                <p className="mt-2 text-base font-semibold text-ink">Send one corner. Get product ideas.</p>
                <p className="mt-1 text-sm leading-6 text-muted">Share a kitchen, bathroom or wardrobe photo on WhatsApp and get a compact product suggestion.</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function TrustMini({ label }: { label: string }) {
  return <div className="rounded-xl border border-line bg-white px-3 py-2 text-center font-medium">{label}</div>;
}

function PreviewCard({ title, price, text }: { title: string; price: string; text: string }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-4">
      <div className="aspect-[4/3] rounded-xl border border-line bg-cream p-3">
        <div className="h-full rounded-lg border border-line bg-white" />
      </div>
      <p className="mt-3 text-sm font-semibold text-ink">{title}</p>
      <p className="mt-1 text-xs font-semibold text-primary">{price}</p>
      <p className="mt-1 text-xs leading-5 text-muted">{text}</p>
    </div>
  );
}
