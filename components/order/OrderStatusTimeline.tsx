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
          <div key={step} className="flex items-center gap-3 rounded-xl border border-line bg-white px-3 py-2 text-sm">
            <span className={cn("h-2.5 w-2.5 rounded-full", done ? "bg-successText" : "bg-lineStrong", active && "ring-4 ring-successBg")} />
            <span className={done ? "font-bold text-ink" : "font-medium text-muted"}>{step}</span>
          </div>
        );
      })}
    </div>
  );
}
