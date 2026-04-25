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
      {eyebrow ? <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">{eyebrow}</p> : null}
      <h2 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl lg:text-3xl">{title}</h2>
      {description ? <p className="mt-2 text-sm leading-6 text-muted sm:text-[15px]">{description}</p> : null}
    </div>
  );
}
