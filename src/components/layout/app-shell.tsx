"use client";

import { useState } from "react";
import { BookOpen, ShoppingCart, Calendar } from "lucide-react";
import { Sidebar } from "@/components/sidebar/sidebar";
import { CourseInfoView } from "@/components/course-info/course-info-view";
import { CartView } from "@/components/cart/cart-view";
import { ScheduleView } from "@/components/calendar/schedule-view";
import { useScheduler } from "@/store/scheduler-context";

type MobileTab = "courses" | "cart" | "schedule";

const TABS: { id: MobileTab; label: string; icon: typeof BookOpen }[] = [
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "cart", label: "Cart", icon: ShoppingCart },
  { id: "schedule", label: "Schedule", icon: Calendar },
];

export function AppShell() {
  const [activeTab, setActiveTab] = useState<MobileTab>("courses");
  const { state } = useScheduler();
  const courseSelected = state.selectedCourseId !== null;

  return (
    <>
      {/* Desktop / tablet: side-by-side with horizontal scroll when needed */}
      <div className="hidden md:flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex flex-1 overflow-x-auto">
          <div
            className="flex shrink-0 flex-col bg-zinc-50 transition-[width] duration-300 ease-in-out"
            style={{ width: courseSelected ? 410 : 336 }}
          >
            <CourseInfoView />
          </div>
          <CartView />
          <div className="flex min-w-[500px] flex-1 flex-col">
            <ScheduleView />
          </div>
        </div>
      </div>

      {/* Mobile: single column with tab navigation */}
      <div className="flex md:hidden h-screen flex-col overflow-hidden">
        <div className="flex-1 overflow-hidden">
          {activeTab === "courses" && (
            <div className="flex h-full flex-col bg-white">
              <CourseInfoView />
            </div>
          )}
          {activeTab === "cart" && (
            <div className="h-full">
              <CartView />
            </div>
          )}
          {activeTab === "schedule" && (
            <div className="h-full">
              <ScheduleView />
            </div>
          )}
        </div>
        <nav className="flex shrink-0 border-t border-zinc-200 bg-white" role="tablist">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              role="tab"
              aria-selected={activeTab === id}
              onClick={() => setActiveTab(id)}
              className={`flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium transition-colors ${
                activeTab === id
                  ? "text-zinc-900"
                  : "text-zinc-400"
              }`}
            >
              <Icon size={20} />
              {label}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
