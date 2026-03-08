"use client";

import { Plus, X } from "lucide-react";
import { Tutorial } from "@/types";
import { formatDays, formatTimeRange } from "@/lib/utils";

interface TutorialRowProps {
  tutorial: Tutorial;
  onAdd: (tutorialId: string) => void;
  onRemove: (tutorialId: string) => void;
  alreadyInCart: boolean;
}

export function TutorialRow({
  tutorial,
  onAdd,
  onRemove,
  alreadyInCart,
}: TutorialRowProps) {
  return (
    <div
      className={`flex h-10 items-center justify-between rounded-md px-3 ${
        alreadyInCart
          ? "border border-zinc-200"
          : "border border-transparent"
      }`}
      style={alreadyInCart ? { backgroundColor: "#ddf5af" } : { backgroundColor: "#FAFAFA" }}
    >
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-zinc-900">
          {tutorial.code}
        </span>
        <span className="text-xs text-zinc-500">
          {formatDays(tutorial.timeSlot.days)}{" "}
          {formatTimeRange(tutorial.timeSlot)}
        </span>
      </div>
      {alreadyInCart ? (
        <button
          onClick={() => onRemove(tutorial.id)}
          aria-label={`Remove tutorial ${tutorial.code}`}
          className="flex h-5 w-5 items-center justify-center rounded-full text-zinc-500 hover:text-zinc-700 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none"
        >
          <X size={14} />
        </button>
      ) : (
        <button
          onClick={() => onAdd(tutorial.id)}
          aria-label={`Add tutorial ${tutorial.code}`}
          className="flex h-5 w-5 items-center justify-center rounded-full border border-zinc-300 text-zinc-500 transition-colors hover:border-zinc-900 hover:bg-zinc-900 hover:text-white focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none"
        >
          <Plus size={14} />
        </button>
      )}
    </div>
  );
}
