"use client";

import { BookOpen, GraduationCap, Settings } from "lucide-react";
import { SidebarIcon } from "./sidebar-icon";

export function Sidebar() {
  return (
    <aside className="flex w-[52px] shrink-0 flex-col items-center justify-between border-r border-zinc-300 bg-zinc-50 py-5">
      <div className="flex flex-col items-center gap-4">
        <SidebarIcon active aria-label="Courses">
          <BookOpen size={18} />
        </SidebarIcon>
        <SidebarIcon aria-label="Degrees">
          <GraduationCap size={18} />
        </SidebarIcon>
      </div>
      <SidebarIcon aria-label="Settings">
        <Settings size={20} />
      </SidebarIcon>
    </aside>
  );
}
