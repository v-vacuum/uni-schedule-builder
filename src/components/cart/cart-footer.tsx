"use client";

export function CartFooter() {
  return (
    <div className="border-t border-zinc-300 p-2.5">
      <button className="flex h-10 w-full items-center justify-center rounded-sm bg-zinc-900 text-[13px] font-semibold text-white transition-colors hover:bg-zinc-800" style={{ letterSpacing: "0.5px" }}>
        Get this schedule
      </button>
    </div>
  );
}
