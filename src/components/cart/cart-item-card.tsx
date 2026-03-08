"use client";

import { Check, MapPin, Star, Trash2 } from "lucide-react";
import { CartItem } from "@/types";
import { getCourseById } from "@/lib/api";
import { COLOR_MAP } from "@/lib/utils";
import { useScheduler } from "@/store/scheduler-context";

interface CartItemCardProps {
  item: CartItem;
}

export function CartItemCard({ item }: CartItemCardProps) {
  const { toggleCartItem, removeFromCart, selectCourse } = useScheduler();
  const course = getCourseById(item.courseId);
  const section = course?.sections.find((s) => s.id === item.sectionId);
  if (!course || !section) return null;

  const colors = COLOR_MAP[item.color];
  const tutorial = item.tutorialId
    ? section.tutorials.find((t) => t.id === item.tutorialId)
    : null;

  return (
    <div
      onClick={() => selectCourse(course.id)}
      className="group/card flex w-full cursor-pointer items-center gap-2.5 rounded-sm border border-zinc-300 bg-white p-3 text-left transition-colors hover:bg-zinc-50"
    >
      <button
        role="checkbox"
        aria-checked={item.selected}
        aria-label={`Toggle ${course.code} ${section.code}`}
        onClick={(e) => {
          e.stopPropagation();
          toggleCartItem(item.courseId, item.sectionId);
        }}
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 ${
          item.selected
            ? "bg-zinc-900 border border-zinc-900"
            : "border border-zinc-300 bg-white"
        }`}
      >
        {item.selected && <Check size={10} className="text-white" strokeWidth={3} />}
      </button>
      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-bold text-zinc-900">{course.code}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              removeFromCart(item.courseId, item.sectionId);
            }}
            aria-label={`Remove ${course.code} from cart`}
            className="flex h-5 w-5 items-center justify-center rounded text-zinc-400 opacity-0 transition-opacity hover:text-red-500 group-hover/card:opacity-100 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none"
          >
            <Trash2 size={13} />
          </button>
          <div className="flex-1" />
          <span
            className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wider"
            style={{ backgroundColor: colors.bg, color: colors.text }}
          >
            {section.code}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-zinc-500">{section.professor}</span>
          <Star size={10} className="fill-amber-400 text-amber-400" />
          <span className="text-[11px] font-medium text-amber-500">
            {section.rating}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
          {tutorial && (
            <>
              <span className="font-medium text-zinc-500">{tutorial.code}</span>
              <span>·</span>
            </>
          )}
          <MapPin size={10} />
          <span>{section.location}</span>
        </div>
      </div>
    </div>
  );
}
