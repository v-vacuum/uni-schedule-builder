"use client";

interface SidebarIconProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  "aria-label": string;
}

export function SidebarIcon({ children, active, onClick, "aria-label": ariaLabel }: SidebarIconProps) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none ${
        active
          ? "bg-zinc-200 text-zinc-900"
          : "text-zinc-500 hover:bg-zinc-200 hover:text-zinc-900"
      }`}
    >
      {children}
    </button>
  );
}
