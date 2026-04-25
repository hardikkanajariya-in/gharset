import { STATUS_STEPS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function OrderStatusTimeline({ status }: { status: string }) {
  const index = STATUS_STEPS.findIndex((step) => step.toLowerCase() === status.toLowerCase());
  return (
    <div className="mt-4 space-y-2">
      {STATUS_STEPS.map((step, stepIndex) => {
        const done = index >= stepIndex;
        const active = index === stepIndex;
        return (
          <div key={step} className="flex items-center gap-3 text-sm">
            <span className={cn("h-2.5 w-2.5 rounded-full", done ? "bg-primary" : "bg-line", active && "ring-4 ring-[#EAF4EF]")} />
            <span className={done ? "font-medium text-ink" : "text-muted"}>{step}</span>
          </div>
        );
      })}
    </div>
  );
}
