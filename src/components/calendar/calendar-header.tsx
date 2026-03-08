"use client";

import { Link, Share2 } from "lucide-react";

export function CalendarHeader() {
  return (
    <div className="flex h-11 items-center gap-2 border-b border-zinc-300 px-5">
      <h2 className="text-[13px] font-extrabold uppercase text-zinc-900" style={{ letterSpacing: "2px" }}>
        Schedule
      </h2>
      <div className="flex-1" />
      <button className="flex items-center gap-1 rounded border border-zinc-300 bg-white px-2.5 py-1 text-[11px] font-medium text-zinc-600 transition-colors hover:bg-zinc-50">
        <Link size={12} />
        Connect
      </button>
      <button className="flex items-center gap-1 rounded border border-zinc-300 bg-white px-2.5 py-1 text-[11px] font-medium text-zinc-600 transition-colors hover:bg-zinc-50">
        <Share2 size={12} />
        Share
      </button>
    </div>
  );
}
