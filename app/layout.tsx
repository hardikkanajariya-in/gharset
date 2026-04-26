import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Suspense } from "react";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SiteNavigationLoader } from "@/components/common/SiteNavigationLoader";
import { getStoreSettings } from "@/lib/settings";
import { siteMetadata } from "@/lib/seo";
import { FloatingWhatsAppCTA } from "@/components/layout/FloatingWhatsAppCTA";

export const metadata: Metadata = siteMetadata();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B3B8F"
};

export default async function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  const settings = await getStoreSettings();

  return (
    <html lang="en-IN" data-scroll-behavior="smooth">
      <body>
        <Suspense fallback={null}>
          <SiteNavigationLoader />
        </Suspense>

        <AnnouncementBar text={settings.announcementText} />
        <Header whatsappNumber={settings.whatsappNumber} />

        <main>{children}</main>

        <Footer
          whatsappNumber={settings.whatsappNumber}
          supportEmail={settings.supportEmail}
        />
        <FloatingWhatsAppCTA whatsappNumber={settings.whatsappNumber} />
      </body>
    </html>
  );
}
