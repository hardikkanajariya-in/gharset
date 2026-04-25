export function AnnouncementBar({ text }: { text: string }) {
  return (
    <div className="border-b border-primaryDark bg-primaryDark text-center text-[11px] font-bold text-white sm:text-xs">
      <div className="mx-auto flex min-h-8 max-w-[1180px] items-center justify-center px-4 py-1">
        {text}
      </div>
    </div>
  );
}
