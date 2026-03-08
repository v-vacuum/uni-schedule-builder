"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Clock,
  SlidersHorizontal,
  Star,
  X,
} from "lucide-react";
import { useScheduler } from "@/store/scheduler-context";
import { useClickOutside } from "@/lib/use-click-outside";
import { getAllCourses } from "@/lib/api";
import { ClassType, DayOfWeek } from "@/types";

const CLASS_TYPE_LABELS: Record<ClassType, string> = {
  [ClassType.SEMINAR]: "Seminar",
  [ClassType.LAB]: "Lab",
  [ClassType.LECTURE]: "Lecture",
  [ClassType.PROJECT]: "Project",
};

const DAY_LABELS: Record<DayOfWeek, string> = {
  [DayOfWeek.MON]: "M",
  [DayOfWeek.TUE]: "T",
  [DayOfWeek.WED]: "W",
  [DayOfWeek.THU]: "R",
  [DayOfWeek.FRI]: "F",
};

const DEFAULT_LOCAL_FILTERS = {
  department: "",
  classTypes: [] as ClassType[],
  days: [] as DayOfWeek[],
  startTime: "09:00",
  endTime: "17:00",
  fitsSchedule: false,
  hasOpenSeats: false,
  countsTowardsDegree: false,
  requiredForMajor: false,
  minProfRating: 0,
};

type LocalFilters = typeof DEFAULT_LOCAL_FILTERS;

export function FilterBar() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { state, setFilters, clearFilters } = useScheduler();
  const [local, setLocal] = useState<LocalFilters>({ ...DEFAULT_LOCAL_FILTERS });

  const allCourses = useMemo(() => getAllCourses(), []);

  const departments = useMemo(() => {
    const deps = new Set<string>();
    for (const c of allCourses) {
      const dep = c.code.split(" ")[0];
      if (dep) deps.add(dep);
    }
    return Array.from(deps).sort();
  }, [allCourses]);

  const filteredCourses = useMemo(() => {
    return allCourses.filter((course) => {
      if (local.department) {
        const dep = course.code.split(" ")[0];
        if (dep !== local.department) return false;
      }

      if (local.classTypes.length > 0) {
        if (!course.classTypes.some((ct) => local.classTypes.includes(ct)))
          return false;
      }

      if (local.days.length > 0) {
        const hasMatchingDay = course.sections.some((s) =>
          s.timeSlot.days.some((d) => local.days.includes(d))
        );
        if (!hasMatchingDay) return false;
      }

      if (local.hasOpenSeats) {
        const hasOpen = course.sections.some((s) => s.enrolled < s.capacity);
        if (!hasOpen) return false;
      }

      if (local.minProfRating > 0) {
        const meetsRating = course.sections.some(
          (s) => s.rating >= local.minProfRating
        );
        if (!meetsRating) return false;
      }

      return true;
    });
  }, [allCourses, local]);

  useEffect(() => {
    if (open) setMounted(true);
  }, [open]);

  const handleAnimationEnd = useCallback(() => {
    if (!open) setMounted(false);
  }, [open]);

  const close = useCallback(() => setOpen(false), []);
  const ref = useClickOutside<HTMLDivElement>(close);

  const activeCount = useMemo(() => {
    let count = 0;
    if (state.filters.classTypes.length > 0) count++;
    if (state.filters.days.length > 0) count++;
    if (state.filters.hasOpenSeats) count++;
    if (state.filters.fitsSchedule) count++;
    if (state.filters.countsTowardsDegree) count++;
    if (state.filters.requiredForMajor) count++;
    if (state.filters.minProfRating > 0) count++;
    if (state.filters.startTime || state.filters.endTime) count++;
    return count;
  }, [state.filters]);

  const handleApply = useCallback(() => {
    setFilters({
      semesters: state.filters.semesters,
      enrollmentStatuses: state.filters.enrollmentStatuses,
      classTypes: local.classTypes,
      days: local.days,
      startTime: local.startTime,
      endTime: local.endTime,
      fitsSchedule: local.fitsSchedule,
      hasOpenSeats: local.hasOpenSeats,
      countsTowardsDegree: local.countsTowardsDegree,
      requiredForMajor: local.requiredForMajor,
      minProfRating: local.minProfRating,
    });
    setOpen(false);
  }, [local, state.filters.semesters, state.filters.enrollmentStatuses, setFilters]);

  const handleClearAll = useCallback(() => {
    setLocal({ ...DEFAULT_LOCAL_FILTERS });
    clearFilters();
  }, [clearFilters]);

  const toggleClassType = (ct: ClassType) => {
    setLocal((prev) => ({
      ...prev,
      classTypes: prev.classTypes.includes(ct)
        ? prev.classTypes.filter((t) => t !== ct)
        : [...prev.classTypes, ct],
    }));
  };

  const toggleDay = (day: DayOfWeek) => {
    setLocal((prev) => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter((d) => d !== day)
        : [...prev.days, day],
    }));
  };

  const toggleBool = (key: keyof LocalFilters) => {
    setLocal((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const setRating = (rating: number) => {
    setLocal((prev) => ({
      ...prev,
      minProfRating: prev.minProfRating === rating ? 0 : rating,
    }));
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="dialog"
        className={`flex items-center gap-1.5 rounded border bg-white px-3 py-1.5 text-xs font-medium text-zinc-900 transition-colors hover:bg-zinc-50 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none ${
          open || activeCount > 0 ? "border-zinc-400" : "border-zinc-300"
        }`}
      >
        <SlidersHorizontal size={14} />
        <span>Filter</span>
        {activeCount > 0 && (
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-zinc-900 text-[10px] font-bold text-white">
            {activeCount}
          </span>
        )}
        {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      {mounted && (
        <div
          className={`${open ? "animate-filter-in" : "animate-filter-out"} absolute right-0 top-full z-50 mt-1 w-[280px] rounded-xl border border-zinc-200 bg-white shadow-lg`}
          onAnimationEnd={handleAnimationEnd}
          onKeyDown={(e) => { if (e.key === "Escape") close(); }}
        >
          <div className="flex items-center justify-between px-4 pt-3 pb-2">
            <span className="text-sm font-semibold text-zinc-900">Filters</span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleClearAll}
                className="text-xs text-zinc-400 transition-colors hover:text-zinc-600"
              >
                Clear all
              </button>
              <button
                onClick={close}
                aria-label="Close filters"
                className="text-zinc-400 transition-colors hover:text-zinc-600 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none rounded"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          <hr className="border-zinc-100" />

          <div className="max-h-[70vh] overflow-y-auto px-4 py-3 space-y-4">
            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                Department
              </p>
              <select
                value={local.department}
                onChange={(e) =>
                  setLocal((prev) => ({ ...prev, department: e.target.value }))
                }
                className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-700 outline-none focus:border-zinc-400"
              >
                <option value="">All Departments</option>
                {departments.map((dep) => (
                  <option key={dep} value={dep}>
                    {dep}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                Type
              </p>
              <div className="flex flex-wrap gap-1.5">
                {Object.values(ClassType).map((ct) => (
                  <button
                    key={ct}
                    onClick={() => toggleClassType(ct)}
                    aria-pressed={local.classTypes.includes(ct)}
                    className={`rounded-full px-3 py-1 text-xs font-medium cursor-pointer transition-colors focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none ${
                      local.classTypes.includes(ct)
                        ? "bg-zinc-900 text-white"
                        : "border border-zinc-300 text-zinc-600 bg-white"
                    }`}
                  >
                    {CLASS_TYPE_LABELS[ct]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                Date / Time
              </p>
              <div className="flex gap-1.5 mb-3">
                {Object.values(DayOfWeek).map((day) => (
                  <button
                    key={day}
                    onClick={() => toggleDay(day)}
                    aria-pressed={local.days.includes(day)}
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium cursor-pointer transition-colors focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none ${
                      local.days.includes(day)
                        ? "bg-zinc-900 text-white"
                        : "border border-zinc-300 text-zinc-600"
                    }`}
                  >
                    {DAY_LABELS[day]}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Clock
                    size={12}
                    className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400"
                  />
                  <input
                    type="time"
                    aria-label="Start time"
                    value={local.startTime}
                    onChange={(e) =>
                      setLocal((prev) => ({
                        ...prev,
                        startTime: e.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-zinc-300 py-1.5 pl-7 pr-2 text-xs text-zinc-700 outline-none focus:border-zinc-400"
                  />
                </div>
                <span className="text-zinc-400 text-xs">&ndash;</span>
                <div className="relative flex-1">
                  <Clock
                    size={12}
                    className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400"
                  />
                  <input
                    type="time"
                    aria-label="End time"
                    value={local.endTime}
                    onChange={(e) =>
                      setLocal((prev) => ({
                        ...prev,
                        endTime: e.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-zinc-300 py-1.5 pl-7 pr-2 text-xs text-zinc-700 outline-none focus:border-zinc-400"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2.5">
              {(
                [
                  ["fitsSchedule", "Fits in current schedule"],
                  ["hasOpenSeats", "Has open seats"],
                  ["countsTowardsDegree", "Counts towards degree"],
                  ["requiredForMajor", "Required for major"],
                ] as const
              ).map(([key, label]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm text-zinc-700">{label}</span>
                  <button
                    role="switch"
                    aria-checked={!!local[key]}
                    aria-label={label}
                    onClick={() => toggleBool(key)}
                    className={`relative h-[22px] w-10 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none ${
                      local[key] ? "bg-zinc-900" : "bg-zinc-200"
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 h-[18px] w-[18px] rounded-full bg-white shadow transition-transform ${
                        local[key] ? "translate-x-[20px]" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>

            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                Prof Rating
              </p>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} onClick={() => setRating(n)} aria-label={`${n} star${n > 1 ? "s" : ""} minimum`}>
                    <Star
                      size={18}
                      className={
                        n <= local.minProfRating
                          ? "fill-amber-400 text-amber-400"
                          : "text-zinc-300"
                      }
                    />
                  </button>
                ))}
                {local.minProfRating > 0 && (
                  <span className="ml-1 text-xs text-zinc-500">
                    {local.minProfRating}.0+
                  </span>
                )}
              </div>
            </div>
          </div>

          <hr className="border-zinc-100" />

          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-xs text-zinc-400">
              {filteredCourses.length} results
            </span>
            <button
              onClick={handleApply}
              className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
