"use client";

import { SearchBar } from "./search-bar";
import { FilterBar } from "./filter-bar";

export function SearchFilterRow() {
  return (
    <div className="flex h-11 items-center gap-3 border-b border-zinc-300 px-3.5">
      <SearchBar />
      <div className="h-6 w-px bg-zinc-300" />
      <FilterBar />
    </div>
  );
}
