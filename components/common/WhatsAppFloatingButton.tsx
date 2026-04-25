import { getStoreSettings } from "@/lib/settings";
import { suggestionMessage, whatsappUrl } from "@/lib/whatsapp";

export async function WhatsAppFloatingButton() {
  const settings = await getStoreSettings();
  return (
    <a
      href={whatsappUrl(suggestionMessage(), settings.whatsappNumber)}
      className="focus-ring fixed bottom-4 right-4 z-40 hidden rounded-full bg-primary px-4 py-3 text-xs font-semibold text-white shadow-lift sm:inline-flex"
    >
      WhatsApp help
    </a>
  );
}
