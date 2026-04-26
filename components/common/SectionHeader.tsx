import { cn } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  title,
  description,
  className
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow ? <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-secondary">{eyebrow}</p> : null}
      <h2 className="text-[23px] font-semibold tracking-tight text-ink sm:text-[28px] lg:text-[34px]">{title}</h2>
      {description ? <p className="mt-2 text-sm font-medium leading-6 text-muted sm:text-[15px]">{description}</p> : null}
    </div>
  );
}
