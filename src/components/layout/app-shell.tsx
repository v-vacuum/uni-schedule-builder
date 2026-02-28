"use client";

import { Sidebar } from "@/components/sidebar/sidebar";
import { SearchFilterRow } from "@/components/search/search-filter-row";
import { CourseInfoView } from "@/components/course-info/course-info-view";
import { CartView } from "@/components/cart/cart-view";
import { ScheduleView } from "@/components/calendar/schedule-view";

export function AppShell() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex w-[440px] shrink-0 flex-col border-r border-zinc-200 bg-white">
        <SearchFilterRow />
        <CourseInfoView />
      </div>
      <CartView />
      <ScheduleView />
    </div>
  );
}
