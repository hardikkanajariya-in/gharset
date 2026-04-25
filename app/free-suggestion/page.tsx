import { Container } from "@/components/common/Container";
import { PageHeader } from "@/components/common/PageHeader";
import { SuggestionForm } from "@/components/order/SuggestionForm";
import { getStoreSettings } from "@/lib/settings";
import { siteMetadata } from "@/lib/seo";

export const metadata = siteMetadata({ title: "Free Home Organization Suggestion — GharSet" });

export default async function FreeSuggestionPage() {
  const settings = await getStoreSettings();
  return (
    <section className="compact-section">
      <Container className="max-w-3xl">
        <PageHeader eyebrow="Free help" title="Get a free organization suggestion" description="Tell us what you want to organize. We will suggest compact products within your budget on WhatsApp." />
        <div className="mt-5"><SuggestionForm whatsappNumber={settings.whatsappNumber} /></div>
        <div className="mt-5 rounded-2xl border border-line bg-primarySoft p-4 text-sm font-bold leading-6 text-primary">
          You can share photos on WhatsApp after submitting. We do not ask for payment before confirming product availability and COD details.
        </div>
      </Container>
    </section>
  );
}
