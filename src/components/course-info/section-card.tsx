"use client";

import { MapPin, Star } from "lucide-react";
import { Pill } from "@/components/ui/pill";
import { TutorialRow } from "./tutorial-row";
import { LectureSection } from "@/types";
import { formatDays, formatTimeRange } from "@/lib/utils";
import { useScheduler } from "@/store/scheduler-context";

interface SectionCardProps {
  section: LectureSection;
  courseId: string;
}

export function SectionCard({ section, courseId }: SectionCardProps) {
  const { addToCart, activeCart } = useScheduler();
  const isFull = section.enrolled >= section.capacity;

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

  const sectionInCart = activeCart.items.some(
    (i) => i.courseId === courseId && i.sectionId === section.id
  );

  return (
    <div className="rounded-xl border border-zinc-200 bg-white">
      <div className="border-l-4 border-zinc-900 p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-bold text-zinc-900">
            {section.code}
          </span>
          <div className="flex items-center gap-1.5">
            <Pill variant={isFull ? "danger" : "neutral"}>
              {section.enrolled}/{section.capacity}
            </Pill>
            {section.waitlistCount > 0 && (
              <Pill variant="warning">
                WL: {section.waitlistCount}/{section.waitlistCapacity}
              </Pill>
            )}
          </div>
        </div>

        <div className="space-y-1.5 text-sm text-zinc-600">
          <p>
            {formatDays(section.timeSlot.days)}{" "}
            {formatTimeRange(section.timeSlot)}
          </p>
          <div className="flex items-center gap-1.5">
            <span>{section.professor}</span>
            <span className="flex items-center gap-0.5 text-amber-500">
              <Star size={12} fill="currentColor" />
              <span className="text-xs">{section.rating}</span>
            </span>
          </div>
          <div className="flex items-center gap-1 text-zinc-500">
            <MapPin size={12} />
            <span className="text-xs">{section.location}</span>
          </div>
        </div>

        {section.tutorials.length > 0 && (
          <div className="mt-3 space-y-1.5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
              Tutorials
            </p>
            {section.tutorials.map((tut) => (
              <TutorialRow
                key={tut.id}
                tutorial={tut}
                onAdd={handleAddTutorial}
                alreadyInCart={sectionInCart && inCart(tut.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
