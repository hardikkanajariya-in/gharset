import Link from "next/link";
import type { OfferBanner } from "@/types/offer";
import { Container } from "@/components/common/Container";

export function OfferBanners({ offers }: { offers: OfferBanner[] }) {
  if (!offers.length) return null;

  return (
    <section className="py-5">
      <Container>
        <div className="grid gap-3 md:grid-cols-2">
          {offers.map((offer) => (
            <Link
              key={offer.offerId || offer.title}
              href={offer.href}
              className="group rounded-2xl border border-line bg-primaryDark p-4 text-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift"
            >
              {offer.badge ? (
                <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-primaryDark">
                  {offer.badge}
                </span>
              ) : null}
              <p className="mt-3 text-lg font-semibold tracking-tight">{offer.title}</p>
              <p className="mt-1 text-sm font-medium leading-6 text-blue-100">{offer.description}</p>
              <span className="mt-3 inline-flex text-xs font-semibold text-white transition group-hover:translate-x-1">
                View offer
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
