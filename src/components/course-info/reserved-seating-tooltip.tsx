"use client";

import { Calendar } from "lucide-react";
import { ReservedSeating } from "@/types";

interface ReservedSeatingTooltipProps {
  reservedSeating: ReservedSeating;
  totalCapacity: number;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function ReservedSeatingTooltip({
  reservedSeating,
  totalCapacity,
}: ReservedSeatingTooltipProps) {
  return (
    <div className="w-72 rounded-xl border border-zinc-200 bg-white px-5 py-4 shadow-lg">
      <p className="text-lg font-bold text-zinc-900">Reserved Seating</p>
      <p className="mt-0.5 text-sm text-zinc-400">
        {reservedSeating.reservedCapacity} of {totalCapacity} seats reserved
      </p>
      <div className="my-3 border-t border-zinc-200" />
      <div className="flex items-center gap-2 text-sm text-zinc-900">
        <Calendar size={16} className="text-zinc-400" />
        <span>
          {formatDate(reservedSeating.startDate)} &ndash;{" "}
          {formatDate(reservedSeating.endDate)}
        </span>
      </div>
      <div className="my-3 border-t border-zinc-200" />
      <p className="text-xs font-medium tracking-wide text-zinc-400">Reserved for:</p>
      <div className="mt-1.5 space-y-0.5">
        {reservedSeating.majors.map((major) => (
          <p key={major} className="text-sm text-zinc-600">
            {major} majors
          </p>
        ))}
      </div>
    </div>
  );
}
