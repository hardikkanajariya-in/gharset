import { Suspense } from "react";
import { Container } from "@/components/common/Container";
import { OrderConfirmation } from "@/components/cart/OrderConfirmation";
import { siteMetadata } from "@/lib/seo";

export const metadata = siteMetadata({ title: "Order Confirmation — GharSet" });

export default function OrderConfirmationPage() {
  return (
    <section className="compact-section">
      <Container>
        <Suspense fallback={null}>
          <OrderConfirmation />
        </Suspense>
      </Container>
    </section>
  );
}
