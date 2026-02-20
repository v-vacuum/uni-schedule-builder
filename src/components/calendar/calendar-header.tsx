"use client";

import { Calendar, Share2 } from "lucide-react";

export function CalendarHeader() {
  return (
    <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-3">
      <h2 className="text-sm font-black uppercase tracking-wider text-zinc-900">
        Schedule
      </h2>
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1.5 rounded-lg border border-zinc-200 px-2.5 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-50">
          <Calendar size={12} />
          Connect
        </button>
        <button className="flex items-center gap-1.5 rounded-lg border border-zinc-200 px-2.5 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-50">
          <Share2 size={12} />
          Share
        </button>
      </div>
    </div>
  );
}
