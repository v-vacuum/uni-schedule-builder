"use client";

import { useState } from "react";

interface CourseDescriptionProps {
  text: string;
}

export function CourseDescription({ text }: CourseDescriptionProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <p
        className={`text-sm leading-relaxed text-zinc-600 ${
          expanded ? "" : "line-clamp-3"
        }`}
      >
        {text}
      </p>
      {text.length > 150 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-1 text-xs font-medium text-zinc-900 hover:underline"
        >
          {expanded ? "see less" : "see more"}
        </button>
      )}
    </div>
  );
}
