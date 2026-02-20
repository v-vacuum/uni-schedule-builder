"use client";

import { useCallback, useState } from "react";
import { ChevronDown, Plus } from "lucide-react";
import { useScheduler } from "@/store/scheduler-context";
import { useClickOutside } from "@/lib/use-click-outside";
import { CartDropdown } from "./cart-dropdown";

export function CartHeader() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { activeCart, createCart } = useScheduler();

  const close = useCallback(() => setDropdownOpen(false), []);
  const ref = useClickOutside<HTMLDivElement>(close);

  return (
    <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-3">
      <div className="relative" ref={ref}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-1 text-sm font-bold text-zinc-900"
        >
          {activeCart.name}
          <ChevronDown size={14} />
        </button>
        {dropdownOpen && <CartDropdown onClose={close} />}
      </div>
      <button
        onClick={() => createCart(`Cart ${Date.now().toString().slice(-4)}`)}
        className="flex items-center gap-1 rounded-lg border border-zinc-200 px-2.5 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-50"
      >
        <Plus size={12} />
        New Cart
      </button>
    </div>
  );
}
