import Link from "next/link";
import { BRAND } from "@/lib/constants";
import { suggestionMessage, whatsappUrl } from "@/lib/whatsapp";
import { BackToTopButton } from "@/components/common/BackToTopButton";

const shopLinks = [
  ["Kitchen Organizers", "/category/kitchen-organizers"],
  ["Bathroom Organizers", "/category/bathroom-organizers"],
  ["Fridge Organizers", "/category/fridge-organizers"],
  ["Wardrobe Organizers", "/category/wardrobe-organizers"],
  ["Combo Kits", "/combo-kits"],
  ["Under ₹299", "/under-299"],
  ["Under ₹499", "/under-499"]
];

const helpLinks = [
  ["Track Order", "/track-order"],
  ["Contact Us", "/contact"],
  ["COD Policy", "/cod-policy"],
  ["Shipping Policy", "/shipping-policy"],
  ["Return & Refund Policy", "/return-refund-policy"]
];

const companyLinks = [
  ["About GharSet", "/about"],
  ["Privacy Policy", "/privacy-policy"],
  ["Terms & Conditions", "/terms-conditions"]
];

export function Footer({
  whatsappNumber,
  supportEmail
}: {
  whatsappNumber: string;
  supportEmail: string;
}) {
  return (
    <>
      <footer className="border-t border-primaryDark bg-primaryDark text-white">
        <div className="mx-auto max-w-[1180px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.9fr_0.9fr_1fr]">
            <div className="max-w-sm">
              <Link
                href="/"
                className="inline-flex text-xl font-black tracking-tight text-white"
              >
                {BRAND.name}
              </Link>

              <p className="mt-2 text-sm leading-6 text-blue-100">
                {BRAND.tagline} Useful organizers for kitchen, bathroom, fridge
                and storage spaces.
              </p>

              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <a
                  href={whatsappUrl(suggestionMessage(), whatsappNumber)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring inline-flex h-11 items-center justify-center rounded-xl bg-white px-4 text-xs font-bold text-primaryDark transition hover:bg-primarySoft"
                >
                  WhatsApp support
                </a>

                <Link
                  href="/track-order"
                  className="focus-ring inline-flex h-11 items-center justify-center rounded-xl border border-white/25 bg-white/10 px-4 text-xs font-bold text-white transition hover:bg-white/15"
                >
                  Track order
                </Link>
              </div>

              <div className="mt-5 rounded-2xl border border-white/15 bg-white/[0.08] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-successBg">
                  COD-first ordering
                </p>
                <p className="mt-2 text-sm leading-6 text-blue-100">
                  Orders are confirmed manually on WhatsApp before processing.
                </p>
              </div>
            </div>

            <FooterGroup title="Shop" links={shopLinks} />
            <FooterGroup title="Help" links={helpLinks} />

            <div>
              <FooterGroup title="Company" links={companyLinks} />

              <div className="mt-5 rounded-2xl border border-white/15 bg-white/[0.08] p-4 text-xs leading-6 text-blue-100">
                <p className="font-bold text-white">Contact</p>
                <a
                  href={`mailto:${supportEmail}`}
                  className="mt-1 block break-all hover:text-white"
                >
                  {supportEmail}
                </a>
                <p>{BRAND.businessCity}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/15 bg-[#041833] px-4 py-4">
          <div className="mx-auto flex max-w-[1180px] flex-col items-center justify-between gap-2 text-center text-xs leading-6 text-blue-100 sm:flex-row sm:text-left">
            <p>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>

            <p>
              Owned by{" "}
              <a
                href="https://hardikkanajariya.in"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-white underline-offset-4 transition hover:underline"
              >
                hardikkanajariya.in
              </a>
            </p>
          </div>
        </div>
      </footer>

      <BackToTopButton />
    </>
  );
}

function FooterGroup({
  title,
  links
}: {
  title: string;
  links: string[][];
}) {
  return (
    <nav aria-label={title}>
      <p className="text-sm font-bold text-white">{title}</p>

      <ul className="mt-3 space-y-2">
        {links.map(([label, href]) => (
          <li key={href}>
            <Link
              className="inline-flex text-sm font-medium text-blue-100 transition hover:translate-x-0.5 hover:text-white"
              href={href}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
