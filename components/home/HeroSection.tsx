import Link from "next/link";
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

const dealTiles = [
  { title: "Kitchen reset", price: "From ₹199", badge: "Daily deals", href: "/category/kitchen-organizers" },
  { title: "Bathroom shelves", price: "Under ₹499", badge: "COD picks", href: "/category/bathroom-organizers" },
  { title: "Combo kits", price: "Save more", badge: "Bundles", href: "/combo-kits" }
];

export function HeroSection({ whatsappNumber }: { whatsappNumber: string }) {
  return (
    <section className="border-b border-line bg-background">
      <Container>
        <div className="py-4 sm:py-5 lg:py-6">
          <div className="grid gap-4 lg:grid-cols-[250px_1fr_270px]">
            <aside className="hidden rounded-2xl border border-line bg-white p-3 shadow-soft lg:block">
              <p className="px-2 pb-2 text-xs font-black uppercase tracking-[0.14em] text-muted">
                Shop categories
              </p>
              <div className="grid gap-1">
                {categories.map((category) => (
                  <Link
                    key={category.href}
                    href={category.href}
                    className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-black text-ink transition hover:bg-primarySoft hover:text-primary"
                  >
                    <Icon name={category.icon} className="h-5 w-5 text-secondary transition group-hover:scale-110" />
                    <span>{category.label}</span>
                    <span className="ml-auto text-muted transition group-hover:translate-x-0.5 group-hover:text-primary">›</span>
                  </Link>
                ))}
              </div>
            </aside>

            <div className="overflow-hidden rounded-2xl border border-line bg-primaryDark shadow-lift">
              <div className="grid min-h-[420px] gap-4 p-4 text-white sm:p-5 lg:grid-cols-[1fr_330px] lg:p-6">
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-3 py-1.5">
                      <Icon name="shield" className="h-4 w-4 text-successBg" />
                      <span className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-100">
                        COD after WhatsApp confirmation
                      </span>
                    </div>

                    <h1 className="mt-4 max-w-xl text-[32px] font-black leading-[1.05] tracking-tight sm:text-[42px] lg:text-[50px]">
                      Organize every corner without overspending.
                    </h1>

                    <p className="mt-4 max-w-lg text-sm font-medium leading-6 text-blue-100 sm:text-[15px]">
                      Discover compact kitchen, bathroom, fridge and wardrobe organizers selected for Indian homes, rented rooms and daily-use storage problems.
                    </p>

                    <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
                      <Link
                        href="/shop"
                        className="focus-ring inline-flex h-12 items-center justify-center rounded-xl bg-white px-5 text-sm font-black text-primaryDark shadow-crisp transition hover:bg-primarySoft active:scale-[0.98]"
                      >
                        Shop products
                      </Link>
                      <a
                        href={whatsappUrl(suggestionMessage(), whatsappNumber)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="focus-ring inline-flex h-12 items-center justify-center rounded-xl border border-white/25 bg-white/[0.08] px-5 text-sm font-black text-white transition hover:bg-white/15 active:scale-[0.98]"
                      >
                        Get suggestion
                      </a>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-2">
                    <TrustCard icon="cash" title="COD" text="Pay on delivery" />
                    <TrustCard icon="truck" title="Delivery" text="Free or paid shown" />
                    <TrustCard icon="track" title="Track" text="Order ID support" />
                  </div>
                </div>

                <div className="grid gap-3">
                  <div className="rounded-2xl border border-white/15 bg-white p-3 text-ink shadow-lift">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.16em] text-secondary">Top home picks</p>
                        <p className="mt-1 text-base font-black">Fast setup deals</p>
                      </div>
                      <span className="rounded-full bg-accentSoft px-2.5 py-1 text-[10px] font-black text-accent">
                        New
                      </span>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <MiniProduct label="Sink stand" price="₹249" icon="grid" />
                      <MiniProduct label="Fridge box" price="₹199" icon="box" />
                      <MiniProduct label="Wall shelf" price="₹299" icon="drop" />
                      <MiniProduct label="Drawer kit" price="₹229" icon="stack" />
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/[0.08] p-3">
                    <div className="flex animate-hero-slide gap-3">
                      {[...dealTiles, ...dealTiles].map((deal, index) => (
                        <Link
                          key={`${deal.title}-${index}`}
                          href={deal.href}
                          className="min-w-[180px] rounded-xl border border-white/15 bg-white p-3 text-ink shadow-soft transition hover:-translate-y-0.5"
                        >
                          <span className="rounded-full bg-primarySoft px-2 py-1 text-[10px] font-black text-primary">
                            {deal.badge}
                          </span>
                          <p className="mt-2 text-sm font-black">{deal.title}</p>
                          <p className="mt-1 text-xs font-black text-accent">{deal.price}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <aside className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <SideDeal title="Budget finds" text="Useful picks under ₹299 and ₹499." href="/under-499" icon="tag" />
              <SideDeal title="Need help?" text="Tell us the space and budget." href="/free-suggestion" icon="chat" />
              <SideDeal title="Track order" text="Use order number and mobile last 4." href="/track-order" icon="track" />
            </aside>
          </div>

          <div className="chip-scroll mt-4 flex gap-2 overflow-x-auto pb-1 lg:hidden">
            {categories.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                className="focus-ring inline-flex h-11 shrink-0 items-center gap-2 rounded-xl border border-line bg-white px-3 text-xs font-black text-ink shadow-soft"
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

function TrustCard({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/[0.08] p-3">
      <Icon name={icon} className="h-5 w-5 text-successBg" />
      <p className="mt-2 text-sm font-black text-white">{title}</p>
      <p className="mt-0.5 text-[11px] font-medium leading-4 text-blue-100">{text}</p>
    </div>
  );
}

function MiniProduct({ label, price, icon }: { label: string; price: string; icon: string }) {
  return (
    <div className="rounded-xl border border-line bg-background p-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primarySoft">
        <Icon name={icon} className="h-5 w-5 text-primary" />
      </div>
      <p className="mt-3 text-xs font-black text-ink">{label}</p>
      <p className="mt-0.5 text-xs font-black text-accent">{price}</p>
    </div>
  );
}

function SideDeal({ title, text, href, icon }: { title: string; text: string; href: string; icon: string }) {
  return (
    <Link href={href} className="group rounded-2xl border border-line bg-white p-4 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondarySoft">
        <Icon name={icon} className="h-5 w-5 text-secondary" />
      </div>
      <p className="mt-3 text-sm font-black text-ink">{title}</p>
      <p className="mt-1 text-xs font-medium leading-5 text-muted">{text}</p>
      <span className="mt-3 inline-flex text-xs font-black text-primary transition group-hover:translate-x-0.5">Open</span>
    </Link>
  );
}

function Icon({ name, className }: { name: string; className?: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.2,
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
      {name === "cash" ? <><rect x="3" y="6" width="18" height="12" rx="2" {...common} /><circle cx="12" cy="12" r="3" {...common} /></> : null}
      {name === "truck" ? <><path d="M3 7h11v9H3z" {...common} /><path d="M14 10h4l3 3v3h-7v-6Z" {...common} /><path d="M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" {...common} /><path d="M18 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" {...common} /></> : null}
      {name === "track" ? <><path d="M12 21s7-5.2 7-11a7 7 0 0 0-14 0c0 5.8 7 11 7 11Z" {...common} /><circle cx="12" cy="10" r="2.5" {...common} /></> : null}
      {name === "chat" ? <><path d="M4 5h16v10H8l-4 4V5Z" {...common} /><path d="M8 9h8" {...common} /><path d="M8 12h5" {...common} /></> : null}
    </svg>
  );
}
