"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import { useScheduler } from "@/store/scheduler-context";
import { useClickOutside } from "@/lib/use-click-outside";
import { CartDropdown } from "./cart-dropdown";

export function CartHeader() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { activeCart, createCart } = useScheduler();

  const close = useCallback(() => setDropdownOpen(false), []);
  const ref = useClickOutside<HTMLDivElement>(close);

  useEffect(() => {
    if (dropdownOpen) setMounted(true);
  }, [dropdownOpen]);

  const handleAnimationEnd = useCallback(() => {
    if (!dropdownOpen) setMounted(false);
  }, [dropdownOpen]);

  return (
    <div className="flex h-11 items-center gap-2 border-b border-zinc-300 px-3.5">
      <div className="relative" ref={ref}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          aria-expanded={dropdownOpen}
          aria-haspopup="menu"
          className="flex items-center gap-1 text-[13px] font-extrabold text-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none rounded"
        >
          {activeCart.name}
          {dropdownOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>
        {mounted && (
          <CartDropdown
            onClose={close}
            animationClass={dropdownOpen ? "animate-dropdown-in" : "animate-dropdown-out"}
            onAnimationEnd={handleAnimationEnd}
          />
        )}
      </div>
      <div className="flex-1" />
      <button
        onClick={() => createCart(`Cart ${Date.now().toString().slice(-4)}`)}
        className="flex items-center gap-1 rounded border border-zinc-300 bg-white px-2.5 py-1 text-[11px] font-medium text-zinc-600 transition-colors hover:bg-zinc-50"
      >
        <Plus size={12} />
        New Cart
      </button>
    </div>
  );
}
