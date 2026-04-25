"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BRAND, NAV_ITEMS } from "@/lib/constants";
import { whatsappUrl, suggestionMessage } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export function Header({ whatsappNumber }: { whatsappNumber: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  function isActive(href: string) {
    return href === "/" ? pathname === href : pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/97 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="focus-ring flex items-center gap-2 rounded-xl">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-sm font-black text-white shadow-crisp">
            GS
          </span>
          <span>
            <span className="block text-lg font-black tracking-tight text-ink">{BRAND.name}</span>
            <span className="hidden text-[11px] font-bold text-muted sm:block">{BRAND.tagline}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "focus-ring rounded-xl px-3 py-2 text-sm font-bold transition",
                isActive(item.href)
                  ? "bg-primarySoft text-primary"
                  : "text-muted hover:bg-mutedSurface hover:text-ink"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={whatsappUrl(suggestionMessage(), whatsappNumber)}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-crisp transition hover:bg-primaryDark active:scale-[0.98]"
          >
            WhatsApp Help
          </a>
        </div>

        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setOpen((value) => !value)}
          className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-xl border border-lineStrong bg-white text-ink shadow-soft lg:hidden"
        >
          <span className="sr-only">Menu</span>
          <span className="relative block h-4 w-5">
            <span className={cn("absolute left-0 top-0 h-0.5 w-5 bg-current transition", open && "top-1.5 rotate-45")} />
            <span className={cn("absolute left-0 top-1.5 h-0.5 w-5 bg-current transition", open && "opacity-0")} />
            <span className={cn("absolute left-0 top-3 h-0.5 w-5 bg-current transition", open && "top-1.5 -rotate-45")} />
          </span>
        </button>
      </div>

      {open ? (
        <div className="border-t border-line bg-white px-4 py-3 shadow-lift lg:hidden">
          <nav className="grid gap-1 rounded-2xl border border-line bg-background p-2">
            {NAV_ITEMS.concat([
              { label: "Free Suggestion", href: "/free-suggestion" },
              { label: "Contact", href: "/contact" }
            ]).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-xl px-3 py-3 text-sm font-bold transition",
                  isActive(item.href)
                    ? "bg-primary text-white"
                    : "text-ink hover:bg-white"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <a
            href={whatsappUrl(suggestionMessage(), whatsappNumber)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex h-12 items-center justify-center rounded-xl bg-primary px-4 text-sm font-bold text-white shadow-crisp"
          >
            WhatsApp Help
          </a>
        </div>
      ) : null}
    </header>
  );
}
