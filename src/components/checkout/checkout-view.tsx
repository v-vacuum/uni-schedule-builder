"use client";

import { useCallback, useState } from "react";
import { ArrowLeft, ChevronDown, ChevronUp, TriangleAlert } from "lucide-react";
import { useScheduler } from "@/store/scheduler-context";
import { useClickOutside } from "@/lib/use-click-outside";
import { getCourseById } from "@/lib/api";
import { CheckoutItemCard, getItemStatus } from "./checkout-item-card";
import { CartDropdown } from "@/components/cart/cart-dropdown";

const CREDITS_PER_COURSE = 3;

export function CheckoutView() {
  const { activeCart, conflicts, exitCheckout, confirmEnrollment } = useScheduler();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const close = useCallback(() => setDropdownOpen(false), []);
  const ref = useClickOutside<HTMLDivElement>(close);

  const toggleDropdown = useCallback(() => {
    setDropdownOpen((prev) => {
      if (!prev) setMounted(true);
      return !prev;
    });
  }, []);

  const handleAnimationEnd = useCallback(() => {
    if (!dropdownOpen) setMounted(false);
  }, [dropdownOpen]);

  const items = activeCart.items;

  const stats = (() => {
    let warnings = 0;
    let waitlisted = 0;
    let blocked = 0;
    let credits = 0;

    for (const item of items) {
      const course = getCourseById(item.courseId);
      const section = course?.sections.find((s) => s.id === item.sectionId);
      if (!course || !section) continue;

      if (!course.noCredit) credits += CREDITS_PER_COURSE;

      const conflict = conflicts.find(
        (c) => c.courseId === item.courseId && c.sectionId === item.sectionId
      );
      const { status, issues } = getItemStatus(
        item,
        course,
        section,
        conflict?.conflictsWith ?? []
      );

      if (status === "blocked") blocked++;
      else if (status === "waitlisted") waitlisted++;
      else if (issues.some((i) => i.type === "warning")) warnings++;
    }

    return { warnings, waitlisted, blocked, credits };
  })();

  const totalIssues = stats.warnings + stats.waitlisted + stats.blocked;
  const hasIssues = totalIssues > 0;

  const issuesParts: string[] = [];
  if (stats.warnings > 0) issuesParts.push(`${stats.warnings} Warning`);
  if (stats.waitlisted > 0) issuesParts.push(`${stats.waitlisted} Waitlisted`);
  if (stats.blocked > 0) issuesParts.push(`${stats.blocked} Blocked`);

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex h-11 items-center justify-between border-b border-zinc-300 px-3.5">
        <button
          onClick={exitCheckout}
          className="text-zinc-600 transition-colors hover:text-zinc-900"
          aria-label="Back"
        >
          <ArrowLeft size={16} />
        </button>
        <div className="relative" ref={ref}>
          <button
            onClick={toggleDropdown}
            aria-expanded={dropdownOpen}
            aria-haspopup="menu"
            className="flex items-center gap-1.5 text-[13px] font-extrabold text-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none rounded"
            style={{ letterSpacing: "1px" }}
          >
            {activeCart.name}
            {dropdownOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>
          {mounted && (
            <CartDropdown
              onClose={close}
              animationClass={
                dropdownOpen ? "animate-dropdown-in" : "animate-dropdown-out"
              }
              onAnimationEnd={handleAnimationEnd}
              readOnly
            />
          )}
        </div>
      </div>

      <div
        className="flex flex-1 flex-col overflow-hidden"
      >
        {/* Issues banner */}
        {hasIssues && (
          <div className="flex items-center gap-1.5 px-3.5 py-2" style={{ backgroundColor: "#FEF3C7" }}>
            <TriangleAlert size={12} style={{ color: "#92400E" }} className="shrink-0" />
            <span className="text-[10px] font-semibold" style={{ color: "#92400E" }}>
              {totalIssues} {totalIssues === 1 ? "issue" : "issues"} found
            </span>
          </div>
        )}

        {/* Items list */}
        <div className="flex-1 flex flex-col gap-1.5 overflow-y-auto px-2.5 py-2">
          {items.map((item) => (
            <CheckoutItemCard
              key={`${item.courseId}-${item.sectionId}`}
              item={item}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-2 border-t border-zinc-300 px-3.5 py-3">
          {/* Summary stats */}
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium text-zinc-500">Courses</span>
              <span className="text-[10px] font-semibold text-zinc-900">{items.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium text-zinc-500">Credits</span>
              <span className="text-[10px] font-semibold text-zinc-900">
                {stats.credits}
              </span>
            </div>
            {hasIssues && (
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium text-zinc-500">Issues</span>
                <span className="text-[10px] font-semibold" style={{ color: "#991B1B" }}>
                  {issuesParts.join(" · ")}
                </span>
              </div>
            )}
          </div>

          {/* Buttons */}
          <button
            onClick={exitCheckout}
            className="flex w-full items-center justify-center rounded-sm border border-zinc-300 py-2.5 text-[12px] font-semibold text-zinc-600 transition-colors hover:bg-zinc-50"
          >
            Cancel
          </button>
          <button
            onClick={confirmEnrollment}
            className="flex w-full items-center justify-center rounded-sm bg-zinc-900 py-2.5 text-[12px] font-bold text-white transition-colors hover:bg-zinc-800"
          >
            {hasIssues ? "Enroll Anyway" : "Enroll"}
          </button>
        </div>
      </div>
    </div>
  );
}
