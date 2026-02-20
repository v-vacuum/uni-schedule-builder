"use client";

interface IconButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export function IconButton({
  onClick,
  children,
  className = "",
  title,
}: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`flex items-center justify-center rounded-lg p-1.5 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 ${className}`}
    >
      {children}
    </button>
  );
}
