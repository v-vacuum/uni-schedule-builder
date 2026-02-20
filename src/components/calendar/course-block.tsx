"use client";

import { CalendarBlock } from "@/types";
import { COLOR_MAP, formatTime, getBlockHeight, getBlockTop } from "@/lib/utils";

interface CourseBlockProps {
  block: CalendarBlock;
}

export function CourseBlock({ block }: CourseBlockProps) {
  const top = getBlockTop(block.startTime);
  const height = getBlockHeight(block.startTime, block.endTime);
  const colors = COLOR_MAP[block.color];
  const colIndex = block.conflictIndex ?? 0;
  const colTotal = block.conflictTotal ?? 1;
  const widthPercent = 100 / colTotal;
  const leftPercent = colIndex * widthPercent;

  return (
    <div
      className="absolute overflow-hidden rounded-lg border-l-[3px] px-2 py-1.5"
      style={{
        top: `${top}px`,
        height: `${height}px`,
        left: `${leftPercent}%`,
        width: `${widthPercent}%`,
        backgroundColor: colors.bg,
        borderLeftColor: colors.border,
      }}
    >
      <p
        className="truncate text-xs font-bold leading-tight"
        style={{ color: colors.text }}
      >
        {block.courseCode}
      </p>
      <p className="truncate text-[10px] text-zinc-500">
        {formatTime(block.startTime)} – {formatTime(block.endTime)}
      </p>
      {block.type === "tutorial" && (
        <p className="text-[9px] font-medium text-zinc-400">TUT</p>
      )}
      {height > 50 && (
        <svg
          className="absolute bottom-1 right-1 opacity-20"
          width="24"
          height="8"
          viewBox="0 0 24 8"
        >
          <path
            d="M0 4 Q6 0 12 4 Q18 8 24 4"
            stroke={colors.border}
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      )}
    </div>
  );
}
