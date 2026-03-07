"use client";

import { useState } from "react";
import { BookOpen, ShoppingCart, Calendar } from "lucide-react";
import { Sidebar } from "@/components/sidebar/sidebar";
import { SearchFilterRow } from "@/components/search/search-filter-row";
import { CourseInfoView } from "@/components/course-info/course-info-view";
import { CartView } from "@/components/cart/cart-view";
import { ScheduleView } from "@/components/calendar/schedule-view";

type MobileTab = "courses" | "cart" | "schedule";

const TABS: { id: MobileTab; label: string; icon: typeof BookOpen }[] = [
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "cart", label: "Cart", icon: ShoppingCart },
  { id: "schedule", label: "Schedule", icon: Calendar },
];

export function AppShell() {
  const [activeTab, setActiveTab] = useState<MobileTab>("courses");

  return (
    <>
      {/* Desktop / tablet: side-by-side with horizontal scroll when needed */}
      <div className="hidden md:flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex flex-1 overflow-x-auto">
          <div className="flex min-w-[440px] w-[440px] shrink-0 flex-col border-r border-zinc-200 bg-white">
            <SearchFilterRow />
            <CourseInfoView />
          </div>
          <CartView />
          <div className="flex min-w-[500px] flex-1 flex-col bg-white">
            <ScheduleView />
          </div>
        </div>
      </div>

      {/* Mobile: single column with tab navigation */}
      <div className="flex md:hidden h-screen flex-col overflow-hidden">
        <div className="flex-1 overflow-hidden">
          {activeTab === "courses" && (
            <div className="flex h-full flex-col bg-white">
              <SearchFilterRow />
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
        <nav className="flex shrink-0 border-t border-zinc-200 bg-white">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
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
