"use client";

import { Search } from "lucide-react";
import { useScheduler } from "@/store/scheduler-context";

export function SearchBar() {
  const { state, setSearchQuery } = useScheduler();
  return (
    <div className="relative flex-1">
      <Search size={18} className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-900" />
      <input
        type="search"
        name="course-search"
        autoComplete="off"
        placeholder="Search Courses..."
        value={state.searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full bg-transparent py-1.5 pl-7 pr-3 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-1 rounded"
      />
    </div>
  );
}
