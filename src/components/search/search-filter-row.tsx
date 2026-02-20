"use client";

import { SearchBar } from "./search-bar";
import { FilterBar } from "./filter-bar";

export function SearchFilterRow() {
  return (
    <div className="flex items-center gap-2 border-b border-zinc-100 px-4 py-3">
      <SearchBar />
      <FilterBar />
    </div>
  );
}
