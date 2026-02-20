"use client";

const VARIANTS = {
  outlined: "border border-zinc-300 text-zinc-600 bg-white",
  success: "bg-emerald-100 text-emerald-800 border border-emerald-300",
  danger: "bg-red-100 text-red-800 border border-red-300",
  warning: "bg-amber-100 text-amber-800 border border-amber-300",
  info: "bg-blue-100 text-blue-800 border border-blue-300",
  neutral: "bg-zinc-100 text-zinc-700 border border-zinc-200",
} as const;

type PillVariant = keyof typeof VARIANTS;

interface PillProps {
  variant?: PillVariant;
  children: React.ReactNode;
  className?: string;
}

export function Pill({ variant = "outlined", children, className = "" }: PillProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
