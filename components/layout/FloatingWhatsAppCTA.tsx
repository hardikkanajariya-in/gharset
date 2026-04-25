"use client";

import { usePathname } from "next/navigation";
import { suggestionMessage, whatsappUrl } from "@/lib/whatsapp";

export function FloatingWhatsAppCTA({ whatsappNumber }: { whatsappNumber: string }) {
  const pathname = usePathname();

  if (pathname.startsWith("/product/")) {
    return null;
  }

  return (
    <a
      href={whatsappUrl(suggestionMessage(), whatsappNumber)}
      target="_blank"
      rel="noopener noreferrer"
      className="focus-ring fixed bottom-5 left-4 z-40 inline-flex h-11 items-center justify-center rounded-full border border-successText/20 bg-successBg px-4 text-xs font-bold text-successText shadow-lift transition hover:-translate-y-0.5 sm:left-auto sm:right-20"
    >
      WhatsApp help
    </a>
  );
}
