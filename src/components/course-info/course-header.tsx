"use client";

import { ArrowLeft } from "lucide-react";
import { Pill } from "@/components/ui/pill";
import { useScheduler } from "@/store/scheduler-context";
import { Course, EnrollmentStatus, Semester } from "@/types";

const SEMESTER_LABELS: Record<Semester, string> = {
  [Semester.FALL]: "Fall",
  [Semester.WINTER]: "Winter",
  [Semester.SPRING]: "Spring",
  [Semester.SUMMER]: "Summer",
};

const ENROLLMENT_VARIANT = {
  [EnrollmentStatus.ENROLLED]: "success",
  [EnrollmentStatus.NOT_ENROLLED]: "neutral",
  [EnrollmentStatus.WAITLISTED]: "warning",
} as const;

const ENROLLMENT_LABEL = {
  [EnrollmentStatus.ENROLLED]: "Enrolled",
  [EnrollmentStatus.NOT_ENROLLED]: "Not Enrolled",
  [EnrollmentStatus.WAITLISTED]: "Waitlisted",
} as const;

interface CourseHeaderProps {
  course: Course;
}

export function CourseHeader({ course }: CourseHeaderProps) {
  const { clearSelection } = useScheduler();

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <button
          onClick={clearSelection}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="flex flex-wrap items-center gap-1.5">
          <Pill variant="outlined">
            {course.semesters.map((s) => SEMESTER_LABELS[s]).join(", ")}
          </Pill>
          <Pill variant={ENROLLMENT_VARIANT[course.enrollmentStatus]}>
            {ENROLLMENT_LABEL[course.enrollmentStatus]}
          </Pill>
        </div>
      </div>
      <h2 className="text-3xl font-black tracking-tight text-zinc-900">
        {course.code}
      </h2>
      <p className="text-base text-zinc-500">{course.name}</p>
    </div>
  );
}
