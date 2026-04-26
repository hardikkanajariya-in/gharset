import { Container } from "@/components/common/Container";
import { PageHeader } from "@/components/common/PageHeader";
import { AdminImageManager } from "@/components/admin/AdminImageManager";
import { siteMetadata } from "@/lib/seo";

export const metadata = siteMetadata({ title: "Admin Image Manager — GharSet" });

export default function AdminPage() {
  return (
    <section className="compact-section">
      <Container>
        <PageHeader
          eyebrow="Admin"
          title="Product image manager"
          description="Upload Drive images once and assign thumbnails/gallery images to products from a single table."
        />
        <div className="mt-5">
          <AdminImageManager />
        </div>
      </Container>
    </section>
  );
}
