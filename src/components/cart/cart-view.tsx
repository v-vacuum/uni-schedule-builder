"use client";

import { useScheduler } from "@/store/scheduler-context";
import { CartHeader } from "./cart-header";
import { CartItemCard } from "./cart-item-card";
import { CartFooter } from "./cart-footer";
import { ShoppingCart } from "lucide-react";

export function CartView() {
  const { activeCart } = useScheduler();

  return (
    <div className="flex h-full w-full md:w-[270px] shrink-0 flex-col md:border-l border-zinc-200 bg-white">
      <CartHeader />
      <div className="flex-1 space-y-2 overflow-y-auto p-3">
        {activeCart.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
            <ShoppingCart size={24} className="text-zinc-300" />
            <p className="text-xs text-zinc-400">
              Add courses from the course panel
            </p>
          </div>
        ) : (
          activeCart.items.map((item) => (
            <CartItemCard
              key={`${item.courseId}-${item.sectionId}`}
              item={item}
            />
          ))
        )}
      </div>
      <CartFooter />
    </div>
  );
}
