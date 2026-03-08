"use client";

import { CalendarHeader } from "./calendar-header";
import { CalendarGrid } from "./calendar-grid";

export function ScheduleView() {
  return (
    <div className="flex flex-1 flex-col bg-zinc-50 pr-3">
      <CalendarHeader />
      <CalendarGrid />
    </div>
  );
}
