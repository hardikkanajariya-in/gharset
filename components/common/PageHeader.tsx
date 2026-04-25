import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageHeader({
  eyebrow,
  title,
  description,
  aside,
  className
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("page-panel p-4 sm:p-5", className)}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          {eyebrow ? <p className="text-[11px] font-black uppercase tracking-[0.16em] text-secondary">{eyebrow}</p> : null}
          <h1 className="mt-1 text-[26px] font-black tracking-tight text-ink sm:text-[32px] lg:text-[36px]">
            {title}
          </h1>
          {description ? <p className="mt-2 text-sm font-medium leading-6 text-muted sm:text-[15px]">{description}</p> : null}
        </div>
        {aside}
      </div>
    </div>
  );
}
