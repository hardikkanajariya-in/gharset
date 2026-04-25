import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { TrackOrderForm } from "@/components/order/TrackOrderForm";
import { siteMetadata } from "@/lib/seo";

export const metadata = siteMetadata({ title: "Track Your Order — GharSet" });

export default function TrackOrderPage() {
  return (
    <section className="compact-section">
      <Container className="max-w-2xl">
        <SectionHeader title="Track your GharSet order" description="Enter your order ID and the last 4 digits of your phone number to view the latest safe status." />
        <div className="mt-5"><TrackOrderForm /></div>
      </Container>
    </section>
  );
}
