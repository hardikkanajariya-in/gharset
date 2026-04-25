import Link from "next/link";
import { Container } from "@/components/common/Container";
import { whatsappUrl, suggestionMessage } from "@/lib/whatsapp";

const carouselItems = [
  {
    title: "Kitchen reset kit",
    price: "Under ₹999",
    text: "Sink, spice and fridge organizers.",
    tag: "Popular",
    tone: "primary"
  },
  {
    title: "Bathroom setup",
    price: "Under ₹799",
    text: "Shelves, holders and hooks.",
    tag: "COD",
    tone: "secondary"
  },
  {
    title: "Budget finds",
    price: "Under ₹499",
    text: "Daily-use organizers for small homes.",
    tag: "Value",
    tone: "accent"
  }
];

export function HeroSection({ whatsappNumber }: { whatsappNumber: string }) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-background">
      <div className="pointer-events-none absolute -left-24 top-12 h-64 w-64 rounded-full bg-primary/14 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-28 h-72 w-72 rounded-full bg-secondary/14 blur-3xl" />
      <div className="pointer-events-none absolute bottom-4 left-[45%] hidden h-52 w-52 rounded-full bg-accent/10 blur-3xl lg:block" />

      <Container>
        <div className="grid gap-7 py-7 sm:py-9 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-10 lg:py-12">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-lineStrong bg-white px-3 py-1.5 shadow-soft">
              <span className="h-2 w-2 rounded-full bg-accent" />
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-mutedStrong">
                COD-first home catalog
              </span>
            </div>

            <h1 className="mt-4 max-w-2xl text-[30px] font-bold leading-[1.05] tracking-[-0.04em] text-ink sm:text-[40px] lg:text-[52px]">
              Smart organizers for cleaner, faster home setup.
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-6 text-muted sm:text-[15px]">
              Shop compact kitchen, bathroom, fridge and wardrobe organizers selected
              for Indian homes, rented rooms and daily-use storage problems.
            </p>

            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
              <Link
                href="/shop"
                className="focus-ring inline-flex h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-white shadow-soft transition hover:bg-primaryDark active:scale-[0.98]"
              >
                Shop products
              </Link>

              <a
                href={whatsappUrl(suggestionMessage(), whatsappNumber)}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring inline-flex h-11 items-center justify-center rounded-xl border border-secondary bg-white px-5 text-sm font-semibold text-secondary transition hover:bg-secondary hover:text-white active:scale-[0.98]"
              >
                Get suggestion
              </a>
            </div>

            <div className="mt-5 grid max-w-lg grid-cols-3 gap-2 text-[11px] sm:text-xs">
              <TrustMini label="COD support" />
              <TrustMini label="Manual confirm" />
              <TrustMini label="Track order" />
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <OfferPill label="Kitchen kits under ₹999" />
              <OfferPill label="Budget finds under ₹499" />
              <OfferPill label="Free WhatsApp help" />
            </div>
          </div>

          <div className="relative z-10">
            <div className="relative mx-auto max-w-xl">
              <div className="absolute -left-3 top-8 z-20 hidden rotate-[-4deg] rounded-2xl border border-lineStrong bg-white p-3 shadow-lift sm:block">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-accent">
                  New
                </p>
                <p className="mt-1 text-sm font-bold text-ink">50+ useful picks</p>
                <p className="mt-0.5 text-xs text-muted">Ready for COD orders</p>
              </div>

              <div className="absolute -right-2 bottom-16 z-20 hidden rotate-[3deg] rounded-2xl border border-lineStrong bg-white p-3 shadow-lift sm:block">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-secondary">
                  Help
                </p>
                <p className="mt-1 text-sm font-bold text-ink">Send a corner</p>
                <p className="mt-0.5 text-xs text-muted">Get product ideas</p>
              </div>

              <div className="rounded-[28px] border border-lineStrong bg-white p-3 shadow-lift sm:p-4">
                <div className="relative overflow-hidden rounded-[22px] border border-line bg-mutedSurface p-3 sm:p-4">
                  <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/18 blur-2xl" />
                  <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-secondary/18 blur-2xl" />

                  <div className="relative grid gap-3 sm:grid-cols-[1.08fr_0.92fr]">
                    <div className="rounded-2xl border border-lineStrong bg-white p-3 shadow-soft">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                            Featured setup
                          </p>
                          <p className="mt-1 text-base font-bold text-ink">
                            Kitchen Reset Kit
                          </p>
                        </div>
                        <span className="rounded-full bg-accentSoft px-2.5 py-1 text-[10px] font-bold text-accent">
                          Save more
                        </span>
                      </div>

                      <div className="mt-4 grid aspect-[4/3] grid-cols-3 gap-2 rounded-2xl border border-line bg-background p-3">
                        <ProductBlock className="col-span-2 row-span-2" tone="primary" />
                        <ProductBlock tone="secondary" />
                        <ProductBlock tone="accent" />
                        <ProductBlock tone="secondary" />
                        <ProductBlock tone="primary" />
                      </div>

                      <div className="mt-3 flex items-end justify-between gap-3">
                        <div>
                          <p className="text-xs text-muted">Bundle starts from</p>
                          <p className="text-xl font-bold tracking-tight text-ink">
                            ₹799
                          </p>
                        </div>
                        <Link
                          href="/combo-kits"
                          className="focus-ring inline-flex h-9 items-center justify-center rounded-xl bg-primary px-3 text-xs font-semibold text-white transition hover:bg-primaryDark"
                        >
                          View kits
                        </Link>
                      </div>
                    </div>

                    <div className="grid gap-3">
                      <CarouselPanel />

                      <div className="rounded-2xl border border-lineStrong bg-white p-3 shadow-soft">
                        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                          How it works
                        </p>

                        <div className="mt-3 space-y-2">
                          <StepItem number="1" text="Choose product" />
                          <StepItem number="2" text="Confirm on WhatsApp" />
                          <StepItem number="3" text="Pay on delivery" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                <Metric label="Categories" value="6+" />
                <Metric label="COD flow" value="Easy" />
                <Metric label="Support" value="WA" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function TrustMini({ label }: { label: string }) {
  return (
    <div className="rounded-xl border border-lineStrong bg-white px-2.5 py-2 text-center font-semibold leading-snug text-mutedStrong shadow-soft">
      {label}
    </div>
  );
}

function OfferPill({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-lineStrong bg-white px-3 py-1.5 text-[11px] font-semibold text-mutedStrong shadow-soft">
      {label}
    </span>
  );
}

function ProductBlock({
  tone,
  className = ""
}: {
  tone: "primary" | "secondary" | "accent";
  className?: string;
}) {
  const toneClass =
    tone === "primary"
      ? "bg-primarySoft text-primary"
      : tone === "secondary"
        ? "bg-secondarySoft text-secondary"
        : "bg-accentSoft text-accent";

  return (
    <div
      className={`flex items-end rounded-xl border border-line bg-white p-1.5 ${className}`}
    >
      <div className={`h-full w-full rounded-lg ${toneClass}`} />
    </div>
  );
}

function CarouselPanel() {
  return (
    <div className="overflow-hidden rounded-2xl border border-lineStrong bg-white p-3 shadow-soft">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
          Trending now
        </p>
        <div className="flex gap-1">
          <span className="h-1.5 w-4 rounded-full bg-primary" />
          <span className="h-1.5 w-1.5 rounded-full bg-lineStrong" />
          <span className="h-1.5 w-1.5 rounded-full bg-lineStrong" />
        </div>
      </div>

      <div className="mt-3 flex animate-hero-slide gap-3">
        {[...carouselItems, ...carouselItems].map((item, index) => (
          <div
            key={`${item.title}-${index}`}
            className="min-w-[170px] rounded-xl border border-line bg-background p-3"
          >
            <span
              className={`rounded-full px-2 py-1 text-[10px] font-bold ${
                item.tone === "primary"
                  ? "bg-primarySoft text-primary"
                  : item.tone === "secondary"
                    ? "bg-secondarySoft text-secondary"
                    : "bg-accentSoft text-accent"
              }`}
            >
              {item.tag}
            </span>
            <p className="mt-2 text-sm font-bold leading-snug text-ink">
              {item.title}
            </p>
            <p className="mt-1 text-xs font-bold text-primary">{item.price}</p>
            <p className="mt-1 text-xs leading-5 text-muted">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function StepItem({ number, text }: { number: string; text: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-line bg-background px-2.5 py-2">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white">
        {number}
      </span>
      <span className="text-xs font-semibold text-mutedStrong">{text}</span>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-lineStrong bg-white p-3 shadow-soft">
      <p className="text-base font-bold text-ink">{value}</p>
      <p className="mt-0.5 text-[11px] font-medium text-muted">{label}</p>
    </div>
  );
}