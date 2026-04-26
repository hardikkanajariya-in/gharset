import { Suspense } from "react";
import { Container } from "@/components/common/Container";
import { PageHeader } from "@/components/common/PageHeader";
import { TrackOrderForm } from "@/components/order/TrackOrderForm";
import { siteMetadata } from "@/lib/seo";

export const metadata = siteMetadata({ title: "Track Your Order — GharSet" });

export default function TrackOrderPage() {
  return (
    <section className="compact-section">
      <Container className="max-w-2xl">
        <PageHeader
          eyebrow="Order status"
          title="Track your GharSet order"
          description="Enter your order ID and the last 4 digits of your phone number to view the latest safe status."
        />
        <div className="mt-5">
          <Suspense fallback={null}>
            <TrackOrderForm />
          </Suspense>
        </div>
      </Container>
    </section>
  );
}
