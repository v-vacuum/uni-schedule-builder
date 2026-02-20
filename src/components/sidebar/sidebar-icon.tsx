"use client";

interface SidebarIconProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export function SidebarIcon({ children, active, onClick }: SidebarIconProps) {
  return (
    <button
      onClick={onClick}
      className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
        active
          ? "bg-white/20 text-white"
          : "text-zinc-400 hover:bg-white/10 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}
