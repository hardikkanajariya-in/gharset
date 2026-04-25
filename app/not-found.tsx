import Link from "next/link";
import { Container } from "@/components/common/Container";

export default function NotFound() {
  return (
    <section className="compact-section">
      <Container className="max-w-xl text-center">
        <div className="card p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">404</p>
          <h1 className="mt-2 text-2xl font-semibold text-ink">Page not found</h1>
          <p className="mt-2 text-sm leading-6 text-muted">The page or product you are looking for is not available.</p>
          <Link href="/shop" className="mt-5 inline-flex h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-white hover:bg-primaryDark">Go to shop</Link>
        </div>
      </Container>
    </section>
  );
}
