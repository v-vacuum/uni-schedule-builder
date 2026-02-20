"use client";

import { useCallback, useState } from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { useScheduler } from "@/store/scheduler-context";
import { useClickOutside } from "@/lib/use-click-outside";
import { EnrollmentStatus, Semester } from "@/types";

const SEMESTER_LABELS: Record<Semester, string> = {
  [Semester.FALL]: "Fall",
  [Semester.WINTER]: "Winter",
  [Semester.SPRING]: "Spring",
  [Semester.SUMMER]: "Summer",
};

const ENROLLMENT_LABELS: Record<EnrollmentStatus, string> = {
  [EnrollmentStatus.ENROLLED]: "Enrolled",
  [EnrollmentStatus.NOT_ENROLLED]: "Not Enrolled",
  [EnrollmentStatus.WAITLISTED]: "Waitlisted",
};

export function FilterBar() {
  const [open, setOpen] = useState(false);
  const { state, toggleSemesterFilter, toggleEnrollmentFilter } =
    useScheduler();

  const close = useCallback(() => setOpen(false), []);
  const ref = useClickOutside<HTMLDivElement>(close);

  const activeCount =
    state.filters.semesters.length + state.filters.enrollmentStatuses.length;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 transition-colors hover:bg-zinc-50"
      >
        <SlidersHorizontal size={14} />
        <span>Filter</span>
        {activeCount > 0 && (
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-zinc-900 text-[10px] font-bold text-white">
            {activeCount}
          </span>
        )}
        <ChevronDown size={14} />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 w-56 rounded-lg border border-zinc-200 bg-white p-3 shadow-lg">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Semester
          </p>
          {Object.values(Semester).map((sem) => (
            <label
              key={sem}
              className="flex cursor-pointer items-center gap-2 rounded px-1 py-1 text-sm text-zinc-700 hover:bg-zinc-50"
            >
              <input
                type="checkbox"
                checked={state.filters.semesters.includes(sem)}
                onChange={() => toggleSemesterFilter(sem)}
                className="rounded border-zinc-300"
              />
              {SEMESTER_LABELS[sem]}
            </label>
          ))}

          <hr className="my-2 border-zinc-100" />

          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Enrollment
          </p>
          {Object.values(EnrollmentStatus).map((status) => (
            <label
              key={status}
              className="flex cursor-pointer items-center gap-2 rounded px-1 py-1 text-sm text-zinc-700 hover:bg-zinc-50"
            >
              <input
                type="checkbox"
                checked={state.filters.enrollmentStatuses.includes(status)}
                onChange={() => toggleEnrollmentFilter(status)}
                className="rounded border-zinc-300"
              />
              {ENROLLMENT_LABELS[status]}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
