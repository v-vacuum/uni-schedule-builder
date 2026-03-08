"use client";

import { ArrowLeft } from "lucide-react";
import { useScheduler } from "@/store/scheduler-context";
import { Course, EnrollmentStatus, Semester } from "@/types";

export const SEMESTER_LABELS: Record<Semester, string> = {
  [Semester.FALL]: "Fall",
  [Semester.WINTER]: "Winter",
  [Semester.SPRING]: "Spring",
  [Semester.SUMMER]: "Summer",
};

export const ENROLLMENT_COLORS: Record<EnrollmentStatus, { bg: string; label: string } | null> = {
  [EnrollmentStatus.ENROLLED]: { bg: "#ddf5af", label: "Enrolled" },
  [EnrollmentStatus.WAITLISTED]: { bg: "#f4f9ac", label: "Waitlisted" },
  [EnrollmentStatus.NOT_ENROLLED]: null,
};

interface CourseHeaderProps {
  course: Course;
}

export function CourseTopBar({ course }: CourseHeaderProps) {
  const { clearSelection } = useScheduler();
  const enrollment = ENROLLMENT_COLORS[course.enrollmentStatus];

  return (
    <div className="flex h-11 shrink-0 items-center gap-2.5 border-b border-zinc-300 px-4">
      <button
        onClick={clearSelection}
        aria-label="Back to course list"
        className="flex shrink-0 items-center justify-center text-zinc-900 transition-colors hover:text-zinc-600 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none rounded"
      >
        <ArrowLeft size={16} />
      </button>
      <div className="flex-1" />
      <span className="inline-flex items-center rounded-full bg-zinc-900 px-2.5 py-1 text-[11px] font-bold tracking-wider text-white">
        {course.semesters.map((s) => SEMESTER_LABELS[s]).join(", ")}
      </span>
      {enrollment && (
        <span
          className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide text-zinc-900"
          style={{ backgroundColor: enrollment.bg }}
        >
          {enrollment.label}
        </span>
      )}
    </div>
  );
}

export function CourseInfo({ course }: CourseHeaderProps) {
  return (
    <div className="space-y-2.5">
      <h2 className="text-[32px] font-black tracking-tight text-zinc-900 leading-none" style={{ letterSpacing: "-1px" }}>
        {course.code}
      </h2>
      <p className="text-[13px] text-zinc-500">{course.name}</p>
    </div>
  );
}
