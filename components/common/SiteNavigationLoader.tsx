"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function SiteNavigationLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isVisible, setIsVisible] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
    }

    setIsVisible(true);

    hideTimer.current = setTimeout(() => {
      setIsVisible(false);
    }, 450);

    return () => {
      if (hideTimer.current) {
        clearTimeout(hideTimer.current);
      }
    };
  }, [pathname, searchParams]);

  return (
    <div
      aria-hidden="true"
      className={`
        pointer-events-none fixed left-0 top-0 z-[80] h-0.5 w-full overflow-hidden
        transition-opacity duration-200
        ${isVisible ? "opacity-100" : "opacity-0"}
      `}
    >
      <div className="h-full w-full origin-left animate-site-progress bg-primary" />
    </div>
  );
}