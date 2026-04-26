import Link from "next/link";
import type { OfferBanner } from "@/types/offer";
import { Container } from "@/components/common/Container";
import { whatsappUrl, suggestionMessage } from "@/lib/whatsapp";

const categories = [
  { label: "Kitchen", href: "/category/kitchen-organizers", icon: "grid" },
  { label: "Bathroom", href: "/category/bathroom-organizers", icon: "drop" },
  { label: "Fridge", href: "/category/fridge-organizers", icon: "box" },
  { label: "Wardrobe", href: "/category/wardrobe-organizers", icon: "stack" },
  { label: "Under ₹499", href: "/under-499", icon: "tag" },
  { label: "Combos", href: "/combo-kits", icon: "bundle" }
];

const fallbackSlides: OfferBanner[] = [
  {
    offerId: "hero-1",
    title: "Kitchen organizers under ₹999",
    description: "Compact sink, shelf and spice organizers for daily-use Indian kitchens.",
    badge: "New deals",
    href: "/category/kitchen-organizers",
    active: true,
    sortOrder: 1
  },
  {
    offerId: "hero-2",
    title: "Budget home setup picks",
    description: "Useful bathroom, fridge and wardrobe organizers under ₹499.",
    badge: "Budget finds",
    href: "/under-499",
    active: true,
    sortOrder: 2
  }
];

export function HeroSection({
  whatsappNumber,
  offers
}: {
  whatsappNumber: string;
  offers: OfferBanner[];
}) {
  const slides = offers.length ? offers : fallbackSlides;

  return (
    <section className="border-b border-line bg-background">
      <Container>
        <div className="py-4 sm:py-5 lg:py-6">
          <div className="grid gap-4 lg:grid-cols-[250px_1fr]">
            <aside className="hidden rounded-2xl border border-line bg-white p-3 shadow-soft lg:block">
              <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                Shop categories
              </p>
              <div className="grid gap-1">
                {categories.map((category) => (
                  <Link
                    key={category.href}
                    href={category.href}
                    className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink transition hover:bg-primarySoft hover:text-primary"
                  >
                    <Icon name={category.icon} className="h-5 w-5 text-secondary transition group-hover:scale-110" />
                    <span>{category.label}</span>
                    <span className="ml-auto text-muted transition group-hover:translate-x-0.5 group-hover:text-primary">›</span>
                  </Link>
                ))}
              </div>
            </aside>

            <div className="overflow-hidden rounded-2xl border border-line bg-primaryDark shadow-lift">
              <div className="grid gap-4 p-4 text-white sm:p-5 lg:grid-cols-[0.82fr_1.18fr] lg:p-6">
                <div className="flex min-h-[330px] flex-col justify-center">
                  <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-3 py-1.5">
                    <Icon name="shield" className="h-4 w-4 text-successBg" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-100">
                      COD after WhatsApp confirmation
                    </span>
                  </div>

                  <h1 className="mt-4 max-w-xl text-[32px] font-medium leading-[1.08] tracking-tight sm:text-[40px] lg:text-[48px]">
                    Organize every corner without overspending.
                  </h1>

                  <p className="mt-4 max-w-lg text-sm font-normal leading-6 text-blue-100 sm:text-[15px]">
                    Discover compact kitchen, bathroom, fridge and wardrobe organizers selected for Indian homes and daily-use storage problems.
                  </p>

                  <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
                    <Link
                      href="/shop"
                      className="focus-ring inline-flex h-12 items-center justify-center rounded-xl bg-white px-5 text-sm font-semibold text-primaryDark shadow-crisp transition hover:bg-primarySoft active:scale-[0.98]"
                    >
                      Shop products
                    </Link>
                    <a
                      href={whatsappUrl(suggestionMessage(), whatsappNumber)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-ring inline-flex h-12 items-center justify-center rounded-xl border border-white/25 bg-white/[0.08] px-5 text-sm font-semibold text-white transition hover:bg-white/15 active:scale-[0.98]"
                    >
                      Get suggestion
                    </a>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium text-blue-100">
                    <span className="rounded-full border border-white/15 bg-white/[0.08] px-3 py-1.5">Free or paid delivery shown</span>
                    <span className="rounded-full border border-white/15 bg-white/[0.08] px-3 py-1.5">Trackable order ID</span>
                  </div>
                </div>

                <HeroOfferCarousel slides={slides} />
              </div>
            </div>
          </div>

          <div className="chip-scroll mt-4 flex gap-2 overflow-x-auto pb-1 lg:hidden">
            {categories.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                className="focus-ring inline-flex h-11 shrink-0 items-center gap-2 rounded-xl border border-line bg-white px-3 text-xs font-medium text-ink shadow-soft"
              >
                <Icon name={category.icon} className="h-4 w-4 text-secondary" />
                {category.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function HeroOfferCarousel({ slides }: { slides: OfferBanner[] }) {
  return (
    <div className="relative min-h-[250px] overflow-hidden rounded-2xl border border-white/15 bg-white shadow-lift sm:min-h-[330px]">
      <div className="flex h-full min-h-[250px] animate-offer-carousel sm:min-h-[330px]">
        {[...slides, ...slides].map((slide, index) => (
          <Link
            key={`${slide.offerId || slide.title}-${index}`}
            href={slide.href}
            className="relative min-w-full overflow-hidden bg-mutedSurface"
          >
            {slide.imageDriveId ? (
              <img
                src={`/api/drive-image/${encodeURIComponent(slide.imageDriveId)}`}
                alt={slide.title}
                className="h-full min-h-[250px] w-full object-cover sm:min-h-[330px]"
              />
            ) : (
              <div className="flex h-full min-h-[250px] items-center justify-center bg-primarySoft p-6 sm:min-h-[330px]">
                <div className="max-w-md text-center">
                  <Icon name="bundle" className="mx-auto h-16 w-16 text-primary" />
                  <p className="mt-4 text-2xl font-medium text-ink">{slide.title}</p>
                  <p className="mt-2 text-sm font-normal leading-6 text-muted">{slide.description}</p>
                </div>
              </div>
            )}
            {!slide.imageDriveId ? (
              <div className="absolute inset-x-0 bottom-0 bg-primaryDark/90 p-4 text-white">
                {slide.badge ? (
                  <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-primaryDark">
                    {slide.badge}
                  </span>
                ) : null}
                <p className="mt-2 text-lg font-semibold tracking-tight">{slide.title}</p>
                <p className="mt-1 line-clamp-1 text-xs font-normal text-blue-100 sm:text-sm">{slide.description}</p>
              </div>
            ) : null}
          </Link>
        ))}
      </div>
    </div>
  );
}

function Icon({ name, className }: { name: string; className?: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.1,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const
  };

  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {name === "grid" ? <><rect x="4" y="4" width="7" height="7" rx="1.5" {...common} /><rect x="13" y="4" width="7" height="7" rx="1.5" {...common} /><rect x="4" y="13" width="7" height="7" rx="1.5" {...common} /><rect x="13" y="13" width="7" height="7" rx="1.5" {...common} /></> : null}
      {name === "drop" ? <path d="M12 3s6 6.4 6 11a6 6 0 0 1-12 0c0-4.6 6-11 6-11Z" {...common} /> : null}
      {name === "box" ? <><path d="m4 7 8-4 8 4-8 4-8-4Z" {...common} /><path d="M4 7v10l8 4 8-4V7" {...common} /><path d="M12 11v10" {...common} /></> : null}
      {name === "stack" ? <><path d="m12 3 8 4-8 4-8-4 8-4Z" {...common} /><path d="m4 12 8 4 8-4" {...common} /><path d="m4 17 8 4 8-4" {...common} /></> : null}
      {name === "tag" ? <><path d="M20 12 12 20 4 12V4h8l8 8Z" {...common} /><path d="M8.5 8.5h.01" {...common} /></> : null}
      {name === "bundle" ? <><path d="M7 7h10v10H7z" {...common} /><path d="M4 10h3" {...common} /><path d="M17 14h3" {...common} /><path d="M10 4v3" {...common} /><path d="M14 17v3" {...common} /></> : null}
      {name === "shield" ? <path d="M12 3 19 6v5c0 5-3.4 8.2-7 10-3.6-1.8-7-5-7-10V6l7-3Z" {...common} /> : null}
    </svg>
  );
}
