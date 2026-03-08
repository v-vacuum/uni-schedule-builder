"use client";

import { Check, X, User, Info } from "lucide-react";
import { courses } from "@/data/courses";
import { EnrollmentStatus, Semester } from "@/types";

const SEMESTER_LABELS: Record<Semester, string> = {
  [Semester.FALL]: "Fall",
  [Semester.WINTER]: "Winter",
  [Semester.SPRING]: "Spring",
  [Semester.SUMMER]: "Summer",
};

const ENROLLMENT_LABEL: Record<EnrollmentStatus, string> = {
  [EnrollmentStatus.ENROLLED]: "Enrolled",
  [EnrollmentStatus.NOT_ENROLLED]: "Not enrolled",
  [EnrollmentStatus.WAITLISTED]: "Waitlisted",
};

interface PrereqTooltipProps {
  courseCode: string;
  onGoToCourse?: (courseId: string) => void;
}

export function PrereqTooltip({ courseCode, onGoToCourse }: PrereqTooltipProps) {
  const course = courses.find((c) => c.code === courseCode);

  if (!course) {
    return (
      <div className="w-72 rounded-xl border border-zinc-200 bg-white px-5 py-4 shadow-lg">
        <p className="text-lg font-bold text-zinc-900">{courseCode}</p>
        <p className="text-sm text-zinc-500">Course not found</p>
      </div>
    );
  }

  return (
    <div className="w-72 rounded-xl border border-zinc-200 bg-white px-5 py-4 shadow-lg">
      <p className="text-lg font-bold text-zinc-900">{course.code}</p>
      <p className="mt-0.5 text-sm text-zinc-400">{course.name}</p>

      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {course.semesters.map((s) => (
          <span
            key={s}
            className="inline-flex rounded-full bg-zinc-900 px-3 py-1 text-xs font-semibold text-white"
          >
            {SEMESTER_LABELS[s]}
          </span>
        ))}
      </div>

      {course.prerequisites.length > 0 && (
        <>
          <div className="my-3 border-t border-zinc-200" />
          <p className="text-xs font-medium tracking-wide text-zinc-400">Prerequisites:</p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {course.prerequisites.flatMap((group) =>
              group.options.map((prereq) => (
                <span
                  key={prereq.code}
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    prereq.met
                      ? "text-zinc-900"
                      : "border border-orange-200 bg-orange-50 text-orange-700"
                  }`}
                  style={prereq.met ? { backgroundColor: "#ddf5af" } : undefined}
                >
                  {prereq.met ? (
                    <Check size={10} strokeWidth={3} />
                  ) : (
                    <X size={10} strokeWidth={3} />
                  )}
                  {prereq.code}
                  {!prereq.met && <Info size={10} className="ml-0.5 text-orange-400" />}
                </span>
              ))
            )}
          </div>
        </>
      )}

      <div className="my-3 border-t border-zinc-200" />
      <div className="flex items-center gap-1.5 text-sm text-zinc-400">
        <User size={14} />
        {ENROLLMENT_LABEL[course.enrollmentStatus]}
      </div>

      <div className="my-3 border-t border-zinc-200" />
      <button
        className="cursor-pointer text-base font-bold text-zinc-900 hover:underline"
        onClick={() => onGoToCourse?.(course.id)}
      >
        Go to course &rarr;
      </button>
    </div>
  );
}
