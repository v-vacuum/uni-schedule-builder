"use client";

import { Search } from "lucide-react";
import { useScheduler } from "@/store/scheduler-context";

export function SearchBar() {
  const { state, setSearchQuery } = useScheduler();

  return (
    <div className="relative flex-1">
      <Search
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
      />
      <input
        type="text"
        placeholder="Search courses..."
        value={state.searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full rounded-lg border border-zinc-200 bg-white py-2 pl-9 pr-3 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400"
      />
    </div>
  );
}
