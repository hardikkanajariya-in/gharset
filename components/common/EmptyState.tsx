export function EmptyState({ title = "Nothing found", message = "Try a different category or contact us on WhatsApp." }) {
  return (
    <div className="rounded-2xl border border-dashed border-line bg-white p-6 text-center">
      <p className="text-sm font-semibold text-ink">{title}</p>
      <p className="mt-1 text-sm text-muted">{message}</p>
    </div>
  );
}
