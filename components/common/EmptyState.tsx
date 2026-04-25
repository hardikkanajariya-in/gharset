export function EmptyState({ title = "Nothing found", message = "Try a different category or contact us on WhatsApp." }) {
  return (
    <div className="rounded-2xl border border-dashed border-lineStrong bg-white p-6 text-center shadow-soft">
      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-primarySoft text-sm font-black text-primary">
        GS
      </div>
      <p className="mt-3 text-sm font-black text-ink">{title}</p>
      <p className="mt-1 text-sm font-medium leading-6 text-muted">{message}</p>
    </div>
  );
}
