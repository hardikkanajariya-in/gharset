import Link from "next/link";
import { BRAND } from "@/lib/constants";
import { suggestionMessage, whatsappUrl } from "@/lib/whatsapp";

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

export function Footer({ whatsappNumber, supportEmail }: { whatsappNumber: string; supportEmail: string }) {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto grid max-w-[1180px] gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.25fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <Link href="/" className="text-lg font-semibold tracking-tight text-ink">{BRAND.name}</Link>
          <p className="mt-2 max-w-xs text-sm leading-6 text-muted">{BRAND.tagline} Useful organizers for kitchen, bathroom, fridge and storage spaces.</p>
          <a href={whatsappUrl(suggestionMessage(), whatsappNumber)} className="mt-4 inline-flex rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primaryDark">
            WhatsApp support
          </a>
        </div>
        <FooterGroup title="Shop" links={shopLinks} />
        <FooterGroup title="Help" links={helpLinks} />
        <div>
          <FooterGroup title="Company" links={companyLinks} />
          <div className="mt-5 text-xs leading-6 text-muted">
            <p>{supportEmail}</p>
            <p>{BRAND.businessCity}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-line px-4 py-4 text-center text-xs text-muted">© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</div>
    </footer>
  );
}

function FooterGroup({ title, links }: { title: string; links: string[][] }) {
  return (
    <div>
      <p className="text-sm font-semibold text-ink">{title}</p>
      <ul className="mt-3 space-y-2">
        {links.map(([label, href]) => (
          <li key={href}>
            <Link className="text-sm text-muted hover:text-ink" href={href}>{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
