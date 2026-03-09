"use client";

import { useScheduler } from "@/store/scheduler-context";

export function CartFooter() {
  const { enterCheckout, activeCart } = useScheduler();

  return (
    <div className="border-t border-zinc-300 p-2.5">
      <button
        onClick={enterCheckout}
        disabled={activeCart.items.length === 0}
        className="flex h-10 w-full items-center justify-center rounded-sm bg-zinc-900 text-[13px] font-semibold text-white transition-colors hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ letterSpacing: "0.5px" }}
      >
        Get this schedule
      </button>
    </div>
  );
}
