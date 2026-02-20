"use client";

import { HOUR_HEIGHT, START_HOUR, END_HOUR } from "@/lib/utils";

export function TimeAxis() {
  const hours = [];
  for (let h = START_HOUR; h <= END_HOUR; h++) {
    hours.push(h);
  }

  return (
    <div className="relative w-16 shrink-0">
      {hours.map((h) => {
        const period = h >= 12 ? "PM" : "AM";
        const display = h > 12 ? h - 12 : h === 0 ? 12 : h;
        return (
          <div
            key={h}
            className="absolute right-2 -translate-y-1/2 text-[10px] text-zinc-400"
            style={{ top: `${(h - START_HOUR) * HOUR_HEIGHT}px` }}
          >
            {display}{period}
          </div>
        );
      })}
    </div>
  );
}
