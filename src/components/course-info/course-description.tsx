"use client";

import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface CourseDescriptionProps {
  shortText: string;
  longText: string;
}

const TOTAL_MS = 700;
const WORD_ANIM_MS = 200;

function WordSpan({ word, index, total, phase }: { word: string; index: number; total: number; phase: "fade-out" | "fade-in" }) {
  const stagger = total > 1 ? (TOTAL_MS - WORD_ANIM_MS) / (total - 1) : 0;
  const delay = Math.round(index * stagger);
  const animation = phase === "fade-out"
    ? `desc-word-out ${WORD_ANIM_MS}ms ease-in ${delay}ms forwards`
    : `desc-word-in ${WORD_ANIM_MS}ms ease-out ${delay}ms forwards`;

  return (
    <span
      className="inline"
      style={{
        opacity: phase === "fade-in" ? 0 : 1,
        animation,
      }}
    >
      {word}{" "}
    </span>
  );
}

export function CourseDescription({ shortText, longText }: CourseDescriptionProps) {
  const [expanded, setExpanded] = useState(false);
  const [phase, setPhase] = useState<"idle" | "fade-out" | "fade-in">("idle");
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState<number | undefined>(undefined);
  const measureRef = useRef<HTMLDivElement>(null);
  const pendingExpandedRef = useRef(false);

  useLayoutEffect(() => {
    if (measureRef.current) {
      setContainerHeight(measureRef.current.scrollHeight);
    }
  }, [expanded, phase, shortText, longText]);

  useEffect(() => {
    setExpanded(false);
    setPhase("idle");
    setContainerHeight(undefined);
  }, [shortText]);

  useEffect(() => {
    if (phase === "fade-out") {
      const timer = setTimeout(() => {
        setExpanded(pendingExpandedRef.current);
        setPhase("fade-in");
      }, TOTAL_MS);
      return () => clearTimeout(timer);
    }
    if (phase === "fade-in") {
      const timer = setTimeout(() => setPhase("idle"), TOTAL_MS);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  const handleToggle = () => {
    if (phase !== "idle") return;
    pendingExpandedRef.current = !expanded;
    setPhase("fade-out");
  };

  const needsExpand = shortText !== longText;

  if (!needsExpand) {
    return (
      <p className="text-xs leading-relaxed text-zinc-600" style={{ lineHeight: 1.6 }}>
        {shortText}
      </p>
    );
  }

  const currentText = phase === "fade-in" ? (pendingExpandedRef.current ? longText : shortText) : (expanded ? longText : shortText);
  const words = currentText.split(/\s+/);

  return (
    <div>
      <div
        ref={containerRef}
        className="overflow-hidden"
        style={{
          height: containerHeight,
          transition: "height 400ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div
          ref={measureRef}
          className="text-xs leading-relaxed text-zinc-600"
          style={{ lineHeight: 1.6 }}
        >
          {phase === "idle" ? (
            currentText
          ) : (
            words.map((word, i) => (
              <WordSpan key={`${phase}-${i}`} word={word} index={i} total={words.length} phase={phase} />
            ))
          )}
        </div>
      </div>
      <button
        onClick={handleToggle}
        className="mt-1 flex items-center gap-1 text-xs font-medium text-zinc-900 hover:underline mx-auto"
      >
        {expanded ? "collapse" : "expand"}
        {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
    </div>
  );
}
