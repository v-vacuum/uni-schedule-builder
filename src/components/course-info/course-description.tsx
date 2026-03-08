"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface CourseDescriptionProps {
  text: string;
}

export function CourseDescription({ text }: CourseDescriptionProps) {
  const [expanded, setExpanded] = useState(false);

  if (text.length <= 150) {
    return (
      <p className="text-xs leading-relaxed text-zinc-600" style={{ lineHeight: 1.6 }}>
        {text}
      </p>
    );
  }

  return (
    <div>
      <div className="relative">
        <p
          className={`text-xs leading-relaxed text-zinc-600 ${expanded ? "" : "line-clamp-3"}`}
          style={{ lineHeight: 1.6 }}
        >
          {text}
        </p>
        {!expanded && (
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-5 bg-gradient-to-t from-white to-transparent" />
        )}
      </div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-1 flex items-center gap-1 text-xs font-medium text-zinc-900 hover:underline mx-auto"
      >
        {expanded ? "collapse" : "expand"}
        {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
    </div>
  );
}
