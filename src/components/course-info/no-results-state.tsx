"use client";

import { XCircle } from "lucide-react";

interface NoResultsStateProps {
  query: string;
}

export function NoResultsState({ query }: NoResultsStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100">
        <XCircle size={28} className="text-zinc-400" />
      </div>
      <p className="text-base font-bold text-zinc-900">No results found</p>
      <p className="text-xs text-zinc-400">
        We couldn&apos;t find any courses matching &ldquo;{query}&rdquo;. Try a
        different search term.
      </p>
    </div>
  );
}
