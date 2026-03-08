"use client";

import { BookOpen } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100">
        <BookOpen size={28} className="text-zinc-400" />
      </div>
      <p className="text-sm font-semibold text-zinc-900">
        Search for courses
      </p>
      <p className="text-xs text-zinc-400">
        Type a course name or code above to get started building your schedule.
      </p>
    </div>
  );
}
