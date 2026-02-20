"use client";

interface ConflictPillProps {
  conflictsWith: string[];
}

export function ConflictPill({ conflictsWith }: ConflictPillProps) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-semibold text-red-700"
      title={`Conflicts with ${conflictsWith.join(", ")}`}
    >
      conflict
    </span>
  );
}
