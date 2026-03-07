"use client";

import { Info, MapPin, Trash2 } from "lucide-react";
import { CartItem } from "@/types";
import { getCourseById } from "@/lib/api";
import { COLOR_MAP, formatDaysShort, formatTimeRange } from "@/lib/utils";
import { useScheduler } from "@/store/scheduler-context";
import { ConflictPill } from "./conflict-pill";

interface CartItemCardProps {
  item: CartItem;
}

export function CartItemCard({ item }: CartItemCardProps) {
  const { toggleCartItem, removeFromCart, selectCourse, conflicts } =
    useScheduler();
  const course = getCourseById(item.courseId);
  const section = course?.sections.find((s) => s.id === item.sectionId);
  if (!course || !section) return null;

  const colors = COLOR_MAP[item.color];
  const conflict = conflicts.find(
    (c) => c.courseId === item.courseId && c.sectionId === item.sectionId
  );

  return (
    <div
      className="group relative rounded-lg transition-colors"
      style={{
        backgroundColor: item.selected ? colors.bg : "#f4f4f5",
      }}
    >
      <div className="flex items-start gap-2 px-3 py-2.5">
        <input
          type="checkbox"
          checked={item.selected}
          onChange={() => toggleCartItem(item.courseId, item.sectionId)}
          className="mt-0.5 rounded border-zinc-300"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span
              className="text-sm font-bold"
              style={{ color: item.selected ? colors.text : "#71717a" }}
            >
              {course.code}
            </span>
            {conflict && <ConflictPill conflictsWith={conflict.conflictsWith} />}
          </div>
          <p className="text-xs text-zinc-500">
            {section.code} · {formatDaysShort(section.timeSlot.days)}{" "}
            {formatTimeRange(section.timeSlot)}
          </p>
          {section.location !== "Online" && (
            <p className="mt-0.5 flex items-center gap-0.5 text-xs text-zinc-400">
              <MapPin size={10} />
              {section.location}
            </p>
          )}
        </div>
        <div className="flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={() => selectCourse(course.id)}
            className="rounded p-1 text-zinc-400 hover:bg-white/60 hover:text-zinc-700"
            title="View course info"
          >
            <Info size={14} />
          </button>
          <button
            onClick={() => removeFromCart(item.courseId, item.sectionId)}
            className="rounded p-1 text-zinc-400 hover:bg-white/60 hover:text-red-600"
            title="Remove from cart"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
