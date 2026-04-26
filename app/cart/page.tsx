import { Container } from "@/components/common/Container";
import { PageHeader } from "@/components/common/PageHeader";
import { CartView } from "@/components/cart/CartView";
import { siteMetadata } from "@/lib/seo";

export const metadata = siteMetadata({ title: "Cart — GharSet" });

export default function CartPage() {
  return (
    <section className="compact-section">
      <Container>
        <PageHeader
          eyebrow="Cart"
          title="Review your order"
          description="Check your selected organizers before entering delivery details."
        />
        <div className="mt-5">
          <CartView />
        </div>
      </Container>
    </section>
  );
}
