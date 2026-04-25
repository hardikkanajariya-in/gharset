import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppFloatingButton } from "@/components/common/WhatsAppFloatingButton";
import { getStoreSettings } from "@/lib/settings";
import { siteMetadata } from "@/lib/seo";

export const metadata: Metadata = siteMetadata();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F8F5EF"
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getStoreSettings();

  return (
    <html lang="en-IN">
      <body>
        <AnnouncementBar text={settings.announcementText} />
        <Header whatsappNumber={settings.whatsappNumber} />
        <main>{children}</main>
        <WhatsAppFloatingButton />
        <Footer whatsappNumber={settings.whatsappNumber} supportEmail={settings.supportEmail} />
      </body>
    </html>
  );
}
