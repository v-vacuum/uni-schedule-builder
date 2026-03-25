"use client";

import { useMemo, useRef, useLayoutEffect, useState, useCallback } from "react";
import { useScheduler } from "@/store/scheduler-context";
import { searchCourses, getAllCourses, getCourseById } from "@/lib/api";
import { SearchFilterRow } from "@/components/search/search-filter-row";
import { EmptyState } from "./empty-state";
import { NoResultsState } from "./no-results-state";
import { CourseTopBar, CourseTopBarFrame, CourseTopBarPills, CourseInfo, SEMESTER_LABELS, ENROLLMENT_COLORS } from "./course-header";
import { CourseDescription } from "./course-description";
import { Prerequisites } from "./prerequisites";
import { SectionCard } from "./section-card";
import { Course, EnrollmentStatus } from "@/types";

const SLIDE_DURATION = 300;

type TransitionType = "slide-in" | "slide-out" | "crossfade" | null;

export function CourseInfoView() {
  const { state, selectCourse, getEffectiveEnrollmentStatus } = useScheduler();

  const hasActiveFilters = useMemo(() => {
    const f = state.filters;
    return (
      f.semesters.length > 0 ||
      f.enrollmentStatuses.length > 0 ||
      f.classTypes.length > 0 ||
      f.days.length > 0 ||
      f.startTime !== "" ||
      f.endTime !== "" ||
      f.fitsSchedule ||
      f.hasOpenSeats ||
      f.countsTowardsDegree ||
      f.requiredForMajor ||
      f.minProfRating > 0
    );
  }, [state.filters]);

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
        state.filters.enrollmentStatuses.includes(getEffectiveEnrollmentStatus(c.id))
      );
    }
    if (state.filters.classTypes.length > 0) {
      results = results.filter((c) =>
        c.classTypes.some((ct) => state.filters.classTypes.includes(ct))
      );
    }
    if (state.filters.days.length > 0) {
      results = results.filter((c) =>
        c.sections.some((s) =>
          s.timeSlot.days.some((d) => state.filters.days.includes(d))
        )
      );
    }
    if (state.filters.hasOpenSeats) {
      results = results.filter((c) =>
        c.sections.some((s) => s.enrolled < s.capacity)
      );
    }
    if (state.filters.minProfRating > 0) {
      results = results.filter((c) =>
        c.sections.some((s) => s.rating >= state.filters.minProfRating)
      );
    }
    if (state.filters.requiredForMajor) {
      results = results.filter((c) => c.requiredForMajors.length > 0);
    }
    if (state.filters.countsTowardsDegree) {
      results = results.filter((c) => !c.noCredit);
    }

    return results.toSorted((a, b) => {
      const priority = (c: Course) => {
        if (c.enrollmentStatus === EnrollmentStatus.ENROLLED) return 0;
        if (c.enrollmentStatus === EnrollmentStatus.WAITLISTED) return 1;
        if (c.requiredForMajors.length > 0) return 2;
        return 3;
      };
      return priority(a) - priority(b);
    });
  }, [state.searchQuery, state.filters]);

  const selectedCourse = state.selectedCourseId
    ? getCourseById(state.selectedCourseId)
    : null;

  const courseSelected = selectedCourse !== null;

  const lastCourseRef = useRef<Course | null>(selectedCourse);
  const [transition, setTransition] = useState<TransitionType>(null);
  const prevSelectedRef = useRef<string | null>(null);
  const detailScrollRef = useRef<HTMLDivElement>(null);
  const [outgoingCourse, setOutgoingCourse] = useState<Course | null>(null);
  const [crossfadePhase, setCrossfadePhase] = useState<"out" | "in" | null>(null);

  const displayCourse = selectedCourse ?? lastCourseRef.current;

  useLayoutEffect(() => {
    const prevId = prevSelectedRef.current;
    const currentId = state.selectedCourseId;

    if (prevId !== currentId) {
      if (prevId === null && currentId !== null) {
        setTransition("slide-in");
      } else if (prevId !== null && currentId === null) {
        setTransition("slide-out");
      } else if (prevId !== null && currentId !== null) {
        setOutgoingCourse(lastCourseRef.current ?? null);
        setTransition("crossfade");
        setCrossfadePhase("out");
      }
    }

    prevSelectedRef.current = currentId;
    if (selectedCourse) {
      lastCourseRef.current = selectedCourse;
    }
  }, [state.selectedCourseId, selectedCourse]);

  const handleTransitionEnd = useCallback(() => {
    setTransition(null);
  }, []);

  const handleFadeOutEnd = useCallback(() => {
    setOutgoingCourse(null);
    setCrossfadePhase("in");
  }, []);

  useLayoutEffect(() => {
    if (crossfadePhase === "in" && detailScrollRef.current) {
      detailScrollRef.current.scrollTop = 0;
    }
  }, [crossfadePhase]);

  const handleFadeInEnd = useCallback(() => {
    setCrossfadePhase(null);
    setTransition(null);
  }, []);

  // Determine styles for the list panel
  const listStyle = (): React.CSSProperties => {
    if (transition === "crossfade") {
      return courseSelected ? { visibility: "hidden" } : {};
    }
    return {
      transform: courseSelected ? "translateX(-100%)" : "translateX(0)",
      ...(transition === null && courseSelected ? { visibility: "hidden" as const } : {}),
    };
  };

  // Determine styles for the detail panel
  const detailStyle = (): React.CSSProperties => {
    if (transition === "crossfade") {
      return { transform: "translateX(0)" };
    }
    return {
      transform: courseSelected ? "translateX(0)" : "translateX(100%)",
      ...(transition === null && !courseSelected ? { visibility: "hidden" as const } : {}),
    };
  };

  const isCrossfading = transition === "crossfade";

  const CourseDetailPanel = ({ course }: { course: Course }) => (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <CourseTopBar course={course} />
      <CourseDetailContent course={course} />
    </div>
  );

  const CourseDetailContent = ({ course }: { course: Course }) => (
    <>
      <div className="bg-white px-5 py-4 space-y-2.5">
        <CourseInfo course={course} />
        <CourseDescription shortText={course.description} longText={course.fullDescription} />
      </div>
      <div className="border-b border-zinc-300 bg-white px-5 pb-3.5">
        <Prerequisites groups={course.prerequisites} />
      </div>
      <div className="flex-1 space-y-2.5 bg-zinc-50 px-5 py-3">
        <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-500" style={{ letterSpacing: "1.5px" }}>
          Sections
        </p>
        {course.sections.map((section) => (
          <SectionCard
            key={section.id}
            section={section}
            courseId={course.id}
            enrollmentStatus={getEffectiveEnrollmentStatus(course.id)}
          />
        ))}
      </div>
    </>
  );

  return (
    <div className="relative flex flex-1 overflow-hidden">
      {/* Course list panel (includes search bar) */}
      <div
        className="absolute inset-0 flex flex-col"
        style={{
          ...listStyle(),
          transition: transition !== "crossfade" ? `transform ${SLIDE_DURATION}ms ease-in-out` : undefined,
        }}
        onTransitionEnd={!courseSelected ? handleTransitionEnd : undefined}
      >
        <SearchFilterRow />
        {filteredCourses.length === 0 && state.searchQuery.trim().length === 0 && !hasActiveFilters ? (
          <EmptyState />
        ) : filteredCourses.length === 0 ? (
          <NoResultsState query={state.searchQuery} />
        ) : (
          <div className="flex-1 overflow-y-auto">
            <div>
              {filteredCourses.map((course) => {
                const enrollment = ENROLLMENT_COLORS[getEffectiveEnrollmentStatus(course.id)];
                return (
                  <button
                    key={course.id}
                    onClick={() => selectCourse(course.id)}
                    className="flex w-full flex-col gap-0.5 border-b border-zinc-300 px-4 py-3.5 text-left transition-colors hover:bg-zinc-100"
                  >
                    <div className="flex items-center gap-1.5 pb-1">
                      <span className="inline-flex items-center rounded-full bg-zinc-900 px-2 py-0.5 text-[10px] font-bold tracking-wider text-white">
                        {course.semesters.map((s) => SEMESTER_LABELS[s]).join(" & ")}
                      </span>
                      {course.requiredForMajors.length > 0 && (
                        <span className="inline-flex items-center rounded-full border border-zinc-900 px-2 py-0.5 text-[10px] font-bold tracking-wider text-zinc-900">
                          Required
                        </span>
                      )}
                      {course.noCredit && (
                        <span className="inline-flex items-center rounded-full border border-zinc-900 px-2 py-0.5 text-[10px] font-bold tracking-wider text-zinc-900">
                          No Credit
                        </span>
                      )}
                      <div className="flex-1" />
                      {enrollment && (
                        <span
                          className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide text-zinc-900"
                          style={{ backgroundColor: enrollment.bg }}
                        >
                          {enrollment.label}
                        </span>
                      )}
                    </div>
                    <span className="text-[22px] font-extrabold tracking-tight text-zinc-900">
                      {course.code}
                    </span>
                    <span className="text-[11px] text-zinc-500">{course.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Crossfade: persistent top bar frame + fading pills & content */}
      {isCrossfading && (
        <div className="absolute inset-0 flex flex-col">
          <div className="flex h-11 shrink-0 items-center gap-2.5 border-b border-zinc-300 bg-white px-4 z-10 relative">
            <CourseTopBarFrame />
            {crossfadePhase === "out" && outgoingCourse && (
              <div className="absolute right-4 flex items-center gap-2.5 animate-crossfade-out">
                <CourseTopBarPills course={outgoingCourse} />
              </div>
            )}
            {crossfadePhase === "in" && displayCourse && (
              <div className="absolute right-4 flex items-center gap-2.5 animate-crossfade-in">
                <CourseTopBarPills course={displayCourse} />
              </div>
            )}
          </div>
          <div className="relative flex-1 overflow-hidden">
            {crossfadePhase === "out" && outgoingCourse && (
              <div className="absolute inset-0 flex flex-col overflow-y-auto animate-crossfade-out" onAnimationEnd={handleFadeOutEnd}>
                <CourseDetailContent course={outgoingCourse} />
              </div>
            )}
            {crossfadePhase === "in" && displayCourse && (
              <div ref={detailScrollRef} className="absolute inset-0 flex flex-col overflow-y-auto animate-crossfade-in" onAnimationEnd={handleFadeInEnd}>
                <CourseDetailContent course={displayCourse} />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Course detail panel (normal slide transitions) */}
      {!isCrossfading && displayCourse && (
        <div
          ref={detailScrollRef}
          className="absolute inset-0 flex flex-col"
          style={{
            ...detailStyle(),
            transition: `transform ${SLIDE_DURATION}ms ease-in-out`,
          }}
          onTransitionEnd={courseSelected ? handleTransitionEnd : undefined}
        >
          <CourseDetailPanel course={displayCourse} />
        </div>
      )}
    </div>
  );
}
