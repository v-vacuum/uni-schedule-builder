"use client";

import { useRef, useState, useEffect } from "react";
import { CalendarBlock, DayOfWeek } from "@/types";
import { HOUR_HEIGHT, START_HOUR, END_HOUR } from "@/lib/utils";
import { CourseBlock, BlockAnimationState } from "./course-block";

interface DayColumnProps {
  day: DayOfWeek;
  blocks: CalendarBlock[];
}

interface AnimatedBlock {
  block: CalendarBlock;
  state: BlockAnimationState;
}

const TOTAL_HOURS = END_HOUR - START_HOUR;
const FADE_DURATION = 150;

export function DayColumn({ day, blocks }: DayColumnProps) {
  const dayBlocks = blocks.filter((b) => b.day === day);

  // Set of block IDs that have been "committed" (rendered at least one frame)
  const committedRef = useRef<Set<string>>(new Set());
  const prevBlocksRef = useRef<Map<string, CalendarBlock>>(new Map());
  const [exitingBlocks, setExitingBlocks] = useState<Map<string, CalendarBlock>>(new Map());
  // Exiting blocks that haven't yet been "decommitted" (still at opacity 1 for one frame)
  const pendingExitRef = useRef<Set<string>>(new Set());
  const [, forceRender] = useState(0);
  const isFirstRender = useRef(true);

  // On first render, mark all current blocks as committed (no entry animation)
  if (isFirstRender.current) {
    isFirstRender.current = false;
    for (const b of dayBlocks) {
      committedRef.current.add(b.id);
    }
    prevBlocksRef.current = new Map(dayBlocks.map((b) => [b.id, b]));
  }

  // Detect exiting blocks on each render
  const currentIds = new Set(dayBlocks.map((b) => b.id));

  useEffect(() => {
    const prevBlocks = prevBlocksRef.current;

    // Detect exiting blocks
    const newExiting = new Map<string, CalendarBlock>();
    for (const [id, block] of prevBlocks) {
      if (!currentIds.has(id)) {
        newExiting.set(id, block);
        committedRef.current.delete(id);
      }
    }

    if (newExiting.size > 0) {
      for (const id of newExiting.keys()) {
        pendingExitRef.current.add(id);
      }
      setExitingBlocks((prev) => {
        const merged = new Map(prev);
        for (const [id, block] of newExiting) {
          merged.set(id, block);
        }
        return merged;
      });

      // Double rAF ensures the browser has painted the opacity-1 frame before we transition.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          for (const id of newExiting.keys()) {
            pendingExitRef.current.delete(id);
          }
          forceRender((n) => n + 1);

          setTimeout(() => {
            setExitingBlocks((prev) => {
              const updated = new Map(prev);
              for (const id of newExiting.keys()) {
                updated.delete(id);
              }
              return updated;
            });
          }, FADE_DURATION);
        });
      });
    }

    // If a block reappears while still in the exiting set, cancel its exit
    for (const id of currentIds) {
      pendingExitRef.current.delete(id);
    }
    setExitingBlocks((prev) => {
      let changed = false;
      const updated = new Map(prev);
      for (const id of currentIds) {
        if (updated.has(id)) {
          updated.delete(id);
          changed = true;
        }
      }
      return changed ? updated : prev;
    });

    // Detect entering blocks — they render this frame at opacity 0,
    // then we commit them next frame to trigger opacity 1
    const uncommitted: string[] = [];
    for (const id of currentIds) {
      if (!committedRef.current.has(id)) {
        uncommitted.push(id);
      }
    }

    if (uncommitted.length > 0) {
      requestAnimationFrame(() => {
        for (const id of uncommitted) {
          committedRef.current.add(id);
        }
        forceRender((n) => n + 1);
      });
    }

    prevBlocksRef.current = new Map(dayBlocks.map((b) => [b.id, b]));
  });

  const gridlines = [];
  for (let i = 0; i <= TOTAL_HOURS; i++) {
    gridlines.push(i);
  }

  const allBlocks: AnimatedBlock[] = [];

  for (const block of dayBlocks) {
    const state: BlockAnimationState = committedRef.current.has(block.id) ? "visible" : "entering";
    allBlocks.push({ block, state });
  }

  for (const [id, block] of exitingBlocks) {
    const state: BlockAnimationState = pendingExitRef.current.has(id) ? "visible" : "exiting";
    allBlocks.push({ block, state });
  }

  return (
    <div className="relative flex-1 border-l border-zinc-100">
      {gridlines.map((i) => (
        <div
          key={i}
          className="absolute left-0 right-0 border-t border-zinc-100"
          style={{ top: `${i * HOUR_HEIGHT}px` }}
        />
      ))}
      {allBlocks.map(({ block, state }) => (
        <CourseBlock
          key={block.id}
          block={block}
          animationState={state}
        />
      ))}
    </div>
  );
}
