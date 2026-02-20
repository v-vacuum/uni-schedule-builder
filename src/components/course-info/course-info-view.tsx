"use client";

import { useMemo } from "react";
import { useScheduler } from "@/store/scheduler-context";
import { searchCourses, getAllCourses, getCourseById } from "@/lib/api";
import { EmptyState } from "./empty-state";
import { CourseHeader } from "./course-header";
import { CourseDescription } from "./course-description";
import { Prerequisites } from "./prerequisites";
import { SectionCard } from "./section-card";

export function CourseInfoView() {
  const { state, selectCourse } = useScheduler();

  const filteredCourses = useMemo(() => {
    let results =
      state.searchQuery.trim().length > 0
        ? searchCourses(state.searchQuery)
        : getAllCourses();

    if (state.filters.semesters.length > 0) {
      results = results.filter((c) =>
        c.semesters.some((s) => state.filters.semesters.includes(s))
      );
    }
    if (state.filters.enrollmentStatuses.length > 0) {
      results = results.filter((c) =>
        state.filters.enrollmentStatuses.includes(c.enrollmentStatus)
      );
    }

    return results;
  }, [state.searchQuery, state.filters]);

  const selectedCourse = state.selectedCourseId
    ? getCourseById(state.selectedCourseId)
    : null;

  if (selectedCourse) {
    return (
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        <CourseHeader course={selectedCourse} />
        <CourseDescription text={selectedCourse.description} />
        <Prerequisites groups={selectedCourse.prerequisites} />
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Sections
          </p>
          {selectedCourse.sections.map((section) => (
            <SectionCard
              key={section.id}
              section={section}
              courseId={selectedCourse.id}
            />
          ))}
        </div>
      </div>
    );
  }

  if (filteredCourses.length === 0 && state.searchQuery.trim().length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {filteredCourses.length === 0 ? (
        <div className="flex flex-1 items-center justify-center p-8">
          <p className="text-sm text-zinc-400">No courses found</p>
        </div>
      ) : (
        <div className="divide-y divide-zinc-100">
          {filteredCourses.map((course) => (
            <button
              key={course.id}
              onClick={() => selectCourse(course.id)}
              className="flex w-full flex-col gap-0.5 px-4 py-3 text-left transition-colors hover:bg-zinc-50"
            >
              <span className="text-sm font-bold text-zinc-900">
                {course.code}
              </span>
              <span className="text-xs text-zinc-500">{course.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
