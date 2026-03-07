"use client";

import { Plus } from "lucide-react";
import { Tutorial } from "@/types";
import { formatDays, formatTimeRange } from "@/lib/utils";

interface TutorialRowProps {
  tutorial: Tutorial;
  onAdd: (tutorialId: string) => void;
  alreadyInCart: boolean;
}

export function TutorialRow({ tutorial, onAdd, alreadyInCart }: TutorialRowProps) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-zinc-50 px-3 py-2">
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold text-zinc-500">
          {tutorial.code}
        </span>
        <span className="text-xs text-zinc-500">
          {formatDays(tutorial.timeSlot.days)}{" "}
          {formatTimeRange(tutorial.timeSlot)}
        </span>
      </div>
      {alreadyInCart ? (
        <span className="flex h-6 items-center text-xs text-emerald-600 font-medium">Added</span>
      ) : (
        <button
          onClick={() => onAdd(tutorial.id)}
          className="flex h-6 w-6 items-center justify-center rounded-full border border-zinc-300 text-zinc-500 transition-colors hover:border-zinc-900 hover:bg-zinc-900 hover:text-white"
        >
          <Plus size={14} />
        </button>
      )}
    </div>
  );
}
