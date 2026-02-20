"use client";

import { Check, X } from "lucide-react";
import { PrerequisiteGroup } from "@/types";

interface PrerequisitesProps {
  groups: PrerequisiteGroup[];
}

export function Prerequisites({ groups }: PrerequisitesProps) {
  if (groups.length === 0) return null;

  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
        Prerequisites
      </p>
      <div className="flex flex-wrap items-center gap-1.5">
        {groups.map((group, gi) => (
          <span key={gi} className="flex items-center gap-1">
            {gi > 0 && <span className="text-xs text-zinc-300">+</span>}
            {group.options.map((prereq, pi) => (
              <span key={prereq.code} className="flex items-center gap-1">
                {pi > 0 && (
                  <span className="text-[10px] text-zinc-400">or</span>
                )}
                <span
                  className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-medium ${
                    prereq.met
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {prereq.met ? (
                    <Check size={10} strokeWidth={3} />
                  ) : (
                    <X size={10} strokeWidth={3} />
                  )}
                  {prereq.code}
                </span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
