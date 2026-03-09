"use client";

import { AlertTriangle, CheckCircle2, CircleX, Hourglass, Info } from "lucide-react";
import { CartItem, Course, LectureSection } from "@/types";
import { getCourseById } from "@/lib/api";
import { useScheduler } from "@/store/scheduler-context";

export type CheckoutStatus = "ready" | "waitlisted" | "blocked";

export interface CheckoutIssue {
  type: "warning" | "waitlisted" | "blocked";
  message: string;
}

export function getItemStatus(
  item: CartItem,
  course: Course,
  section: LectureSection,
  conflictCodes: string[]
): { status: CheckoutStatus; issues: CheckoutIssue[] } {
  const issues: CheckoutIssue[] = [];

  const unmetPrereqs: string[] = [];
  for (const group of course.prerequisites) {
    if (!group.options.some((o) => o.met)) {
      unmetPrereqs.push(group.options.map((o) => o.code).join("/"));
    }
  }

  const isFull = section.enrolled >= section.capacity;
  const hasConflict = conflictCodes.length > 0;

  let status: CheckoutStatus = "ready";
  if (unmetPrereqs.length > 0 || hasConflict) {
    status = "blocked";
  } else if (isFull) {
    status = "waitlisted";
  }

  if (course.noCredit) {
    issues.push({ type: "warning", message: "This course will not give credits" });
  }

  if (status !== "blocked" && isFull) {
    issues.push({ type: "waitlisted", message: "You will be waitlisted in this course" });
  }

  if (unmetPrereqs.length > 0) {
    issues.push({
      type: "blocked",
      message: `Missing prereq: ${unmetPrereqs.join(", ")}`,
    });
  }

  if (hasConflict) {
    issues.push({
      type: "blocked",
      message: `Time conflicts with ${conflictCodes.join(", ")}`,
    });
  }

  return { status, issues };
}

const STATUS_PILL_BG = {
  ready: "#ddf5af",
  waitlisted: "#f4f9ac",
  blocked: "#feb38a",
} as const;

const STATUS_LABEL = {
  ready: "Ready",
  waitlisted: "Waitlisted",
  blocked: "Blocked",
} as const;

const STATUS_ICON = {
  ready: CheckCircle2,
  waitlisted: Hourglass,
  blocked: CircleX,
} as const;

const STATUS_ICON_COLOR = {
  ready: "#00D26A",
  waitlisted: "#F59E0B",
  blocked: "#991B1B",
} as const;

const ISSUE_CONFIG = {
  warning: { icon: AlertTriangle, iconColor: "#F59E0B", textColor: "#92400E" },
  waitlisted: { icon: Info, iconColor: "#F59E0B", textColor: "#92400E" },
  blocked: { icon: CircleX, iconColor: "#991B1B", textColor: "#991B1B" },
} as const;

interface CheckoutItemCardProps {
  item: CartItem;
}

export function CheckoutItemCard({ item }: CheckoutItemCardProps) {
  const { conflicts } = useScheduler();
  const course = getCourseById(item.courseId);
  const section = course?.sections.find((s) => s.id === item.sectionId);
  if (!course || !section) return null;

  const tutorial = item.tutorialId
    ? section.tutorials.find((t) => t.id === item.tutorialId)
    : null;

  const conflict = conflicts.find(
    (c) => c.courseId === item.courseId && c.sectionId === item.sectionId
  );
  const conflictCodes = conflict?.conflictsWith ?? [];

  const { status, issues } = getItemStatus(item, course, section, conflictCodes);
  const isFull = section.enrolled >= section.capacity;

  const StatusIcon = STATUS_ICON[status];

  return (
    <div className="flex flex-col gap-1 rounded-sm border border-zinc-200 bg-white px-3.5 py-2.5">
      {/* Top row: icon + title + pill */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <StatusIcon
            size={14}
            className="shrink-0"
            style={{ color: STATUS_ICON_COLOR[status] }}
          />
          <span className="text-[14px] font-bold text-zinc-900">
            {course.code}
          </span>
        </div>
        <span
          className="rounded-full px-2 py-0.5 text-[11px] font-semibold text-zinc-900"
          style={{ backgroundColor: STATUS_PILL_BG[status], letterSpacing: "0.3px" }}
        >
          {STATUS_LABEL[status]}
        </span>
      </div>

      {/* Subtext */}
      <div className="text-[12px] font-medium text-zinc-600">
        <p>
          {section.code}
          {tutorial && <> · {tutorial.code}</>}
          {" · "}
          <span className={isFull ? "text-zinc-600" : ""}>
            {section.enrolled}/{section.capacity}
            {isFull ? " full" : " seats"}
          </span>
        </p>
        <p>{section.professor} · {section.location}</p>
      </div>

      {/* Issue messages */}
      {issues.length > 0 && (
        <div className="flex flex-col gap-1">
          {issues.map((issue, i) => {
            const config = ISSUE_CONFIG[issue.type];
            const IssueIcon = config.icon;
            return (
              <div key={i} className="flex items-center gap-1">
                <IssueIcon
                  size={10}
                  className="shrink-0"
                  style={{ color: config.iconColor }}
                />
                <span
                  className="text-[11px] font-medium"
                  style={{ color: config.textColor }}
                >
                  {issue.message}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
