export function AnnouncementBar({ text }: { text: string }) {
  return (
    <div className="border-b border-line bg-mutedSurface text-center text-[11px] font-medium text-muted sm:text-xs">
      <div className="mx-auto max-w-[1180px] px-4 py-2">{text}</div>
    </div>
  );
}
