import { Container } from "@/components/common/Container";
import { PageHeader } from "@/components/common/PageHeader";
import { getStoreSettings } from "@/lib/settings";
import { suggestionMessage, whatsappUrl } from "@/lib/whatsapp";
import { siteMetadata } from "@/lib/seo";

export const metadata = siteMetadata({ title: "Contact GharSet" });

export default async function ContactPage() {
  const settings = await getStoreSettings();
  return (
    <section className="compact-section">
      <Container className="max-w-3xl">
        <PageHeader eyebrow="Support" title="Contact us" description="For product suggestions, COD confirmation, order tracking or support, WhatsApp is the fastest channel." />
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-line bg-white p-4 shadow-soft">
            <p className="text-sm font-black text-ink">WhatsApp support</p>
            <p className="mt-1 text-sm font-medium leading-6 text-muted">Ask for product help, COD confirmation or tracking support.</p>
            <a href={whatsappUrl(suggestionMessage(), settings.whatsappNumber)} target="_blank" rel="noopener noreferrer" className="focus-ring mt-4 inline-flex h-11 items-center justify-center rounded-xl bg-primary px-4 text-sm font-black text-white shadow-crisp transition hover:bg-primaryDark">Message on WhatsApp</a>
          </div>
          <div className="rounded-2xl border border-line bg-white p-4 shadow-soft">
            <p className="text-sm font-black text-ink">Email</p>
            <p className="mt-1 text-sm font-medium leading-6 text-muted">Use email for policy, partnership or detailed support queries.</p>
            <a className="mt-4 inline-block break-all text-sm font-black text-primary" href={`mailto:${settings.supportEmail}`}>{settings.supportEmail}</a>
          </div>
        </div>
      </Container>
    </section>
  );
}
