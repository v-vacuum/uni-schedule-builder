"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, X, Info } from "lucide-react";
import { PrerequisiteGroup } from "@/types";
import { useScheduler } from "@/store/scheduler-context";
import { PrereqTooltip } from "./prereq-tooltip";

const adjustTooltipPosition = (el: HTMLDivElement | null) => {
  if (!el) return;
  el.style.left = "0";
  el.style.right = "auto";
  const rect = el.getBoundingClientRect();
  const overflowParent = el.closest<HTMLElement>(".overflow-hidden, [class*='overflow-hidden']");
  const bound = overflowParent ? overflowParent.getBoundingClientRect().right : window.innerWidth;
  if (rect.right > bound) {
    el.style.left = "auto";
    el.style.right = "0";
  }
};

interface PrerequisitesProps {
  groups: PrerequisiteGroup[];
}

export function Prerequisites({ groups }: PrerequisitesProps) {
  const [hoveredPrereq, setHoveredPrereq] = useState<string | null>(null);
  const [mountedPrereq, setMountedPrereq] = useState<string | null>(null);
  const { selectCourse } = useScheduler();
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleMouseEnter = useCallback((code: string) => {
    clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      setMountedPrereq(code);
      setHoveredPrereq(code);
    }, 500);
  }, []);

  const handleMouseLeave = useCallback(() => {
    clearTimeout(hoverTimerRef.current);
    setHoveredPrereq(null);
  }, []);

  const handleTooltipAnimationEnd = useCallback(() => {
    if (hoveredPrereq === null) setMountedPrereq(null);
  }, [hoveredPrereq]);

  useEffect(() => {
    return () => clearTimeout(hoverTimerRef.current);
  }, []);

  if (groups.length === 0) return null;

  return (
    <div>
      <p className="mb-2 text-[9px] font-bold uppercase text-zinc-500" style={{ letterSpacing: "1.5px" }}>
        Prerequisites
      </p>
      <div className="flex flex-wrap items-center gap-1.5">
        {groups.map((group, gi) => (
          <span key={gi} className="flex items-center gap-1">
            {group.options.map((prereq, pi) => (
              <span key={prereq.code} className="flex items-center gap-1">
                {pi > 0 && (
                  <span className="text-[10px] text-zinc-400">or</span>
                )}
                {prereq.met ? (
                  <span
                    className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold text-zinc-900"
                    style={{ backgroundColor: "#ddf5af", paddingLeft: "6px", letterSpacing: "0.3px" }}
                  >
                    <Check size={10} strokeWidth={3} />
                    {prereq.code}
                  </span>
                ) : (
                  <div
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(prereq.code)}
                    onMouseLeave={handleMouseLeave}
                    onFocus={() => handleMouseEnter(prereq.code)}
                    onBlur={handleMouseLeave}
                  >
                    <span
                      className="inline-flex cursor-default items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold text-zinc-900"
                      style={{ backgroundColor: "#feb38a", paddingLeft: "6px", letterSpacing: "0.3px" }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Info about ${prereq.code}`}
                    >
                      <X size={10} strokeWidth={3} />
                      {prereq.code}
                      <Info size={12} className="ml-0.5" />
                    </span>
                    {mountedPrereq === prereq.code && (
                      <div
                        ref={adjustTooltipPosition}
                        className={`absolute top-full z-50 ${hoveredPrereq === prereq.code ? "animate-tooltip-in" : "animate-tooltip-out"}`}
                        onMouseEnter={() => {
                          clearTimeout(hoverTimerRef.current);
                          setHoveredPrereq(prereq.code);
                        }}
                        onMouseLeave={handleMouseLeave}
                        onAnimationEnd={handleTooltipAnimationEnd}
                      >
                        <div className="relative pt-3">
                          <div
                            className="absolute top-0 left-1/2 h-3 -translate-x-1/2"
                            style={{
                              width: "calc(100% + 80px)",
                              clipPath: "polygon(50% 0, 0 100%, 100% 100%)",
                            }}
                          />
                          <PrereqTooltip
                            courseCode={prereq.code}
                            onGoToCourse={selectCourse}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
