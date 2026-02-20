"use client";

import { DayOfWeek } from "@/types";
import { useScheduler } from "@/store/scheduler-context";
import { HOUR_HEIGHT, START_HOUR, END_HOUR } from "@/lib/utils";
import { TimeAxis } from "./time-axis";
import { DayColumn } from "./day-column";

const DAYS = [
  { key: DayOfWeek.MON, label: "Mon" },
  { key: DayOfWeek.TUE, label: "Tue" },
  { key: DayOfWeek.WED, label: "Wed" },
  { key: DayOfWeek.THU, label: "Thu" },
  { key: DayOfWeek.FRI, label: "Fri" },
];

const TOTAL_HOURS = END_HOUR - START_HOUR;

export function CalendarGrid() {
  const { calendarBlocks } = useScheduler();

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex border-b border-zinc-100">
        <div className="w-16 shrink-0" />
        {DAYS.map((day) => (
          <div
            key={day.key}
            className="flex-1 border-l border-zinc-100 py-2 text-center text-xs font-semibold uppercase tracking-wider text-zinc-500"
          >
            {day.label}
          </div>
        ))}
      </div>
      <div className="flex flex-1 overflow-y-auto">
        <TimeAxis />
        <div
          className="flex flex-1"
          style={{ height: `${TOTAL_HOURS * HOUR_HEIGHT}px` }}
        >
          {DAYS.map((day) => (
            <DayColumn
              key={day.key}
              day={day.key}
              blocks={calendarBlocks}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
