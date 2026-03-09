"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Calendar } from "lucide-react";
import { useScheduler } from "@/store/scheduler-context";
import { getCourseById } from "@/lib/api";
import { getItemStatus, type CheckoutStatus, type CheckoutIssue } from "./checkout-item-card";

const CREDITS_PER_COURSE = 3;
const LOADING_DELAY_MS = 1500;

type ReceiptItem = {
  code: string;
  name: string;
  sectionCode: string;
  tutorialCode: string | null;
  location: string;
  credits: number;
  status: CheckoutStatus;
  issues: CheckoutIssue[];
  waitlistPosition: number | null;
};

function TornEdge({ flip }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 400 24"
      className="absolute left-0 w-full pointer-events-none"
      style={{
        zIndex: 1,
        height: 24,
        top: flip ? undefined : -12,
        bottom: flip ? -12 : undefined,
        transform: flip ? "scaleY(-1)" : undefined,
      }}
      preserveAspectRatio="none"
    >
      <path
        d="M0,24 L0,6 Q10,0 20,6 Q30,12 40,6 Q50,0 60,6 Q70,12 80,6 Q90,0 100,6 Q110,12 120,6 Q130,0 140,6 Q150,12 160,6 Q170,0 180,6 Q190,12 200,6 Q210,0 220,6 Q230,12 240,6 Q250,0 260,6 Q270,12 280,6 Q290,0 300,6 Q310,12 320,6 Q330,0 340,6 Q350,12 360,6 Q370,0 380,6 Q390,12 400,6 L400,24 Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function ReceiptSkeleton() {
  return (
    <div className="flex flex-col animate-receipt-pulse">
      <div className="flex flex-col items-center gap-2 px-7 pt-6 pb-4 border-b border-zinc-200">
        <div className="h-2.5 w-36 rounded bg-zinc-200" />
        <div className="h-5 w-48 rounded bg-zinc-200" />
        <div className="h-3 w-52 rounded bg-zinc-100" />
      </div>
      <div className="flex flex-col gap-3 px-7 py-4">
        <div className="h-3 w-20 rounded bg-zinc-200" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex justify-between py-2 border-b border-zinc-100">
            <div className="flex flex-col gap-1.5">
              <div className="h-3.5 w-24 rounded bg-zinc-200" />
              <div className="h-3 w-36 rounded bg-zinc-100" />
              <div className="h-2.5 w-32 rounded bg-zinc-100" />
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <div className="h-3 w-16 rounded bg-zinc-100" />
              <div className="h-5 w-16 rounded-full bg-zinc-100" />
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-zinc-200 px-7 py-3">
        <div className="h-4 w-full rounded bg-zinc-200" />
      </div>
      <div className="px-7 pb-5 pt-2.5 flex flex-col items-center gap-2">
        <div className="h-10 w-full rounded-sm bg-zinc-900" />
        <div className="h-2.5 w-48 rounded bg-zinc-100" />
      </div>
    </div>
  );
}

const STATUS_SECTION_LABEL = {
  ready: "ENROLLED",
  waitlisted: "WAITLISTED",
  blocked: "NOT ENROLLED",
} as const;

const STATUS_SECTION_COLOR = {
  ready: "#00D26A",
  waitlisted: "#F59E0B",
  blocked: "#991B1B",
} as const;

const STATUS_PILL_BG = {
  ready: "#ddf5af",
  waitlisted: "#f4f9ac",
  blocked: "#FEE2E2",
} as const;

const STATUS_PILL_TEXT = {
  ready: "#4a5a2b",
  waitlisted: "#78600a",
  blocked: "#991B1B",
} as const;

const STATUS_PILL_LABEL = {
  ready: "Enrolled",
  waitlisted: "Waitlisted",
  blocked: "Blocked",
} as const;

function ReceiptItemRow({ item }: { item: ReceiptItem }) {
  const pillLabel =
    item.status === "waitlisted" && item.waitlistPosition !== null
      ? `Waitlisted: Position #${item.waitlistPosition}`
      : STATUS_PILL_LABEL[item.status];

  const isBlocked = item.status === "blocked";

  const blockedReasons: string[] = [];
  for (const issue of item.issues) {
    if (issue.type === "blocked") {
      if (issue.message.startsWith("Missing prereq")) blockedReasons.push("Pre-req missing");
      else if (issue.message.startsWith("Time conflicts")) blockedReasons.push("Time conflict");
    }
  }
  const isFull = item.issues.some(
    (i) => i.type === "waitlisted" && i.message.includes("waitlisted")
  );
  if (isBlocked && isFull) blockedReasons.unshift("Section full");

  return (
    <div className="flex justify-between py-2.5 border-b border-zinc-100 last:border-b-0">
      <div className="flex flex-col gap-0.5">
        <span className="text-[15px] font-bold text-zinc-900">
          {item.code}
        </span>
        <span className="text-[13px] font-normal text-zinc-700">
          {item.name}
        </span>
        {isBlocked && blockedReasons.length > 0 ? (
          <span className="text-[11px] font-normal text-zinc-400">
            {blockedReasons.join(" · ")}
          </span>
        ) : (
          <span className="text-[11px] font-normal text-zinc-400">
            {item.sectionCode}
            {item.tutorialCode && ` · ${item.tutorialCode}`}
            {" · "}
            {item.location}
          </span>
        )}
      </div>
      <div className="flex flex-col items-end gap-1 shrink-0 pl-4">
        <span
          className="text-[13px] font-semibold"
          style={{ color: isBlocked ? "#AAAAAA" : "#1A1A1A" }}
        >
          {item.credits} credits
        </span>
        <span
          className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
          style={{
            backgroundColor: STATUS_PILL_BG[item.status],
            color: STATUS_PILL_TEXT[item.status],
          }}
        >
          {pillLabel}
        </span>
      </div>
    </div>
  );
}

export function SuccessReceipt() {
  const { activeCart, conflicts, dismissSuccess } = useScheduler();
  const [loaded, setLoaded] = useState(false);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const skeletonRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (skeletonRef.current) {
      setHeight(skeletonRef.current.scrollHeight);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), LOADING_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const handleContentRef = useCallback((node: HTMLDivElement | null) => {
    (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    if (node && loaded) {
      requestAnimationFrame(() => {
        setHeight(node.scrollHeight);
      });
    }
  }, [loaded]);

  const items: ReceiptItem[] = useMemo(() => activeCart.items.map((item) => {
    const course = getCourseById(item.courseId)!;
    const section = course.sections.find((s) => s.id === item.sectionId)!;
    const tutorial = item.tutorialId
      ? section.tutorials.find((t) => t.id === item.tutorialId)
      : null;
    const conflict = conflicts.find(
      (c) => c.courseId === item.courseId && c.sectionId === item.sectionId
    );
    const { status, issues } = getItemStatus(item, course, section, conflict?.conflictsWith ?? []);
    const isFull = section.enrolled >= section.capacity;
    return {
      code: course.code,
      name: course.name,
      sectionCode: section.code,
      tutorialCode: tutorial?.code ?? null,
      location: section.location,
      credits: course.noCredit ? 0 : CREDITS_PER_COURSE,
      status,
      issues,
      waitlistPosition: isFull && status === "waitlisted" ? section.waitlistCount + 1 : null,
    };
  }), [activeCart.items, conflicts]);

  const grouped = {
    ready: items.filter((i) => i.status === "ready"),
    waitlisted: items.filter((i) => i.status === "waitlisted"),
    blocked: items.filter((i) => i.status === "blocked"),
  };

  const totalCredits = items
    .filter((i) => i.status !== "blocked")
    .reduce((sum, i) => sum + i.credits, 0);

  const [dateStr, receiptNum] = useMemo(() => {
    const now = new Date();
    const d = now.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    const num = `#ENR-${now.getFullYear()}F-${String(Math.floor(Math.random() * 99999)).padStart(5, "0")}`;
    return [d, num] as const;
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center animate-overlay-in"
    >
      <div className="absolute inset-0 bg-black/50" />

      <div
        className="relative w-[400px] animate-receipt-in"
      >
        <TornEdge />
        <div
          className="relative bg-white overflow-hidden"
          style={{
            boxShadow: "0 12px 60px -10px rgba(0,0,0,0.27)",
            height: height !== undefined ? height : "auto",
            transition: "height 400ms cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <div
            ref={skeletonRef}
            className="absolute inset-x-0 top-0"
            style={{
              opacity: loaded ? 0 : 1,
              transition: "opacity 250ms ease-out",
              pointerEvents: loaded ? "none" : "auto",
            }}
          >
            <ReceiptSkeleton />
          </div>

          <div
            ref={handleContentRef}
            style={{
              opacity: loaded ? 1 : 0,
              transition: "opacity 300ms ease-out 100ms",
              pointerEvents: loaded ? "auto" : "none",
            }}
          >
            <div className="flex flex-col items-center gap-1 px-7 pt-6 pb-[18px] border-b border-zinc-200">
              <span
                className="text-[9px] font-bold text-zinc-400"
                style={{ letterSpacing: 2 }}
              >
                UNIVERSITY OF CALGARY
              </span>
              <span
                className="text-[20px] font-extrabold text-zinc-900"
                style={{ letterSpacing: -0.3 }}
              >
                ENROLLMENT RECEIPT
              </span>
              <span className="text-[11px] font-medium text-zinc-600">
                {dateStr}  ·  {receiptNum}
              </span>
            </div>

            <div className="h-px bg-zinc-200" />

            <div className="flex flex-col px-7 py-2.5">
              {(["ready", "waitlisted", "blocked"] as const).map((status) => {
                const group = grouped[status];
                if (group.length === 0) return null;
                return (
                  <div key={status} className="flex flex-col">
                    {status !== "ready" && <div className="h-2.5" />}
                    <span
                      className="text-[11px] font-extrabold mb-1"
                      style={{ letterSpacing: 1, color: STATUS_SECTION_COLOR[status] }}
                    >
                      {STATUS_SECTION_LABEL[status]}
                    </span>
                    {group.map((item) => (
                      <ReceiptItemRow key={item.code} item={item} />
                    ))}
                  </div>
                );
              })}
            </div>

            <div className="h-px bg-zinc-200" />

            <div className="flex justify-between items-center px-7 py-3">
              <span
                className="text-[14px] font-extrabold text-zinc-900"
                style={{ letterSpacing: -0.3 }}
              >
                TOTAL CREDITS
              </span>
              <span className="text-[14px] font-extrabold text-zinc-900">
                {totalCredits}
              </span>
            </div>

            <div className="h-px bg-zinc-200" />

            <div className="flex flex-col items-center gap-2 px-7 pt-2.5 pb-5">
              <button
                onClick={dismissSuccess}
                className="flex w-full items-center justify-center gap-2 rounded-sm bg-zinc-900 py-3 text-[13px] font-bold text-white transition-colors hover:bg-zinc-800"
              >
                <Calendar size={14} />
                Go to Schedule
              </button>
              <span className="text-[10px] font-normal text-zinc-400">
                Thank you for using Schedule Builder
              </span>
            </div>
          </div>
        </div>
        <TornEdge flip />
      </div>
    </div>
  );
}
