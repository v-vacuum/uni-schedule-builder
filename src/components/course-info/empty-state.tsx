"use client";

import { BookOpen } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100">
        <BookOpen size={24} className="text-zinc-400" />
      </div>
      <p className="text-sm font-medium text-zinc-500">
        Search for a course to get started
      </p>
      <p className="text-xs text-zinc-400">
        Browse courses and add them to your cart
      </p>
    </div>
  );
}
