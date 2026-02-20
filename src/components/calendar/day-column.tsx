"use client";

import { CalendarBlock, DayOfWeek } from "@/types";
import { HOUR_HEIGHT, START_HOUR, END_HOUR } from "@/lib/utils";
import { CourseBlock } from "./course-block";

interface DayColumnProps {
  day: DayOfWeek;
  blocks: CalendarBlock[];
}

const TOTAL_HOURS = END_HOUR - START_HOUR;

export function DayColumn({ day, blocks }: DayColumnProps) {
  const gridlines = [];
  for (let i = 0; i <= TOTAL_HOURS; i++) {
    gridlines.push(i);
  }

  return (
    <div className="relative flex-1 border-l border-zinc-100">
      {gridlines.map((i) => (
        <div
          key={i}
          className="absolute left-0 right-0 border-t border-zinc-100"
          style={{ top: `${i * HOUR_HEIGHT}px` }}
        />
      ))}
      {blocks
        .filter((b) => b.day === day)
        .map((block) => (
          <CourseBlock key={block.id} block={block} />
        ))}
    </div>
  );
}
