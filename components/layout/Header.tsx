"use client";

import Link from "next/link";
import { useState } from "react";
import { BRAND, NAV_ITEMS } from "@/lib/constants";
import { whatsappUrl, suggestionMessage } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export function Header({ whatsappNumber }: { whatsappNumber: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-cream/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="focus-ring rounded-lg">
          <span className="block text-lg font-semibold tracking-tight text-ink">{BRAND.name}</span>
          <span className="hidden text-[11px] font-medium text-muted sm:block">{BRAND.tagline}</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="focus-ring rounded-xl px-3 py-2 text-sm font-medium text-muted transition hover:bg-white hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={whatsappUrl(suggestionMessage(), whatsappNumber)}
            className="focus-ring rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primaryDark"
          >
            WhatsApp
          </a>
        </div>

        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setOpen((value) => !value)}
          className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white text-ink lg:hidden"
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
        <div className="border-t border-line bg-cream px-4 py-3 lg:hidden">
          <nav className="grid gap-1">
            {NAV_ITEMS.concat([
              { label: "Free Suggestion", href: "/free-suggestion" },
              { label: "Contact", href: "/contact" }
            ]).map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-2.5 text-sm font-medium text-ink hover:bg-white">
                {item.label}
              </Link>
            ))}
          </nav>
          <a
            href={whatsappUrl(suggestionMessage(), whatsappNumber)}
            className="mt-3 flex h-11 items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-white"
          >
            Message on WhatsApp
          </a>
        </div>
      ) : null}
    </header>
  );
}
