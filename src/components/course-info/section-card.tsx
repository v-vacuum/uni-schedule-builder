"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ExternalLink, Info, MapPin, Star } from "lucide-react";
import { TutorialRow } from "./tutorial-row";
import { ReservedSeatingTooltip } from "./reserved-seating-tooltip";
import { EnrollmentStatus, LectureSection } from "@/types";
import { formatDays, formatTimeRange } from "@/lib/utils";
import { useScheduler } from "@/store/scheduler-context";

interface SectionCardProps {
  section: LectureSection;
  courseId: string;
  enrollmentStatus: EnrollmentStatus;
}

export function SectionCard({
  section,
  courseId,
  enrollmentStatus,
}: SectionCardProps) {
  const { addToCart, removeFromCart, activeCart } = useScheduler();
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipMounted, setTooltipMounted] = useState(false);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleMouseEnter = useCallback(() => {
    clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      setTooltipMounted(true);
      setTooltipVisible(true);
    }, 500);
  }, []);

  const handleMouseLeave = useCallback(() => {
    clearTimeout(hoverTimerRef.current);
    setTooltipVisible(false);
  }, []);

  const handleTooltipAnimationEnd = useCallback(() => {
    if (!tooltipVisible) setTooltipMounted(false);
  }, [tooltipVisible]);

  useEffect(() => {
    return () => clearTimeout(hoverTimerRef.current);
  }, []);

  const isFull = section.enrolled >= section.capacity;
  const hasReservedSeating =
    section.reservedSeating && section.reservedSeating.length > 0;

  const inCart = (tutorialId?: string) =>
    activeCart.items.some(
      (i) =>
        i.courseId === courseId &&
        i.sectionId === section.id &&
        i.tutorialId === tutorialId
    );

  const handleAddTutorial = (tutorialId: string) => {
    addToCart(courseId, section.id, tutorialId);
  };

  const handleRemoveTutorial = () => {
    removeFromCart(courseId, section.id);
  };

  const sectionInCart = activeCart.items.some(
    (i) => i.courseId === courseId && i.sectionId === section.id
  );

  return (
    <div className="rounded-sm border border-zinc-300 bg-white">
      <div className="px-3.5 pt-3 pb-2.5">
        <div className="mb-3 flex items-center gap-2">
          <span className="text-sm font-extrabold text-zinc-900" style={{ letterSpacing: "-0.3px" }}>
            {section.code}
          </span>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <span
              className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold text-zinc-900"
              style={isFull ? { backgroundColor: "#feb38a" } : { border: "1px solid #1A1A1A" }}
            >
              {section.enrolled}/{section.capacity}
            </span>
            {hasReservedSeating && (
              <button
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onFocus={handleMouseEnter}
                onBlur={handleMouseLeave}
                aria-label="Reserved seating details"
              >
                <span className="inline-flex items-center gap-0.5 rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-700">
                  Reserved: {section.reservedSeating![0].reservedCapacity}/
                  {section.capacity}
                  <Info size={12} />
                </span>
                {tooltipMounted && (
                  <div
                    className={`absolute right-0 top-full z-50 mt-1 ${tooltipVisible ? "animate-tooltip-in" : "animate-tooltip-out"}`}
                    onAnimationEnd={handleTooltipAnimationEnd}
                  >
                    <ReservedSeatingTooltip
                      reservedSeating={section.reservedSeating![0]}
                      totalCapacity={section.capacity}
                    />
                  </div>
                )}
              </button>
            )}
            {section.waitlistCount > 0 && (
              <span
                className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold text-zinc-900"
                style={{ backgroundColor: "#f4f9ac" }}
              >
                WL: {section.waitlistCount}/{section.waitlistCapacity}
              </span>
            )}
          </div>
        </div>

        <div className="space-y-1.5 text-xs text-zinc-900">
          <p>
            {formatDays(section.timeSlot.days)}{" "}
            {formatTimeRange(section.timeSlot)}
          </p>
          <div className="flex items-center gap-1.5">
            <span>{section.professor}</span>
            <a
              href={section.rateMyProfUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${section.professor} on Rate My Professor, rated ${section.rating}`}
              className="flex items-center gap-0.5 text-amber-500 hover:text-amber-600 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none rounded"
            >
              <Star size={12} fill="currentColor" />
              <span className="text-xs">{section.rating}</span>
              <ExternalLink size={12} />
            </a>
          </div>
          <div className="flex items-center gap-1 text-zinc-500">
            <MapPin size={12} />
            <span className="text-xs">{section.location}</span>
          </div>
        </div>
      </div>

      {section.tutorials.length > 0 && (
        <div className="border-t border-zinc-200 px-4 py-2.5 space-y-1.5">
          <p className="text-[9px] font-semibold uppercase text-zinc-500" style={{ letterSpacing: "0.8px" }}>
            Tutorials
          </p>
          {section.tutorials.map((tut) => (
            <TutorialRow
              key={tut.id}
              tutorial={tut}
              onAdd={handleAddTutorial}
              onRemove={handleRemoveTutorial}
              alreadyInCart={sectionInCart && inCart(tut.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
