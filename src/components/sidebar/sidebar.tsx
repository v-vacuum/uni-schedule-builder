"use client";

import { BookOpen, Settings, User } from "lucide-react";
import { SidebarIcon } from "./sidebar-icon";

export function Sidebar() {
  return (
    <aside className="flex w-16 shrink-0 flex-col items-center justify-between bg-zinc-900 py-4">
      <div className="flex flex-col items-center gap-3">
        <SidebarIcon active>
          <User size={22} />
        </SidebarIcon>
        <SidebarIcon>
          <BookOpen size={22} />
        </SidebarIcon>
      </div>
      <SidebarIcon>
        <Settings size={22} />
      </SidebarIcon>
    </aside>
  );
}
