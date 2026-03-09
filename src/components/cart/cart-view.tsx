"use client";

import { useRef, useState, useEffect } from "react";
import { useScheduler } from "@/store/scheduler-context";
import { CartHeader } from "./cart-header";
import { CartItemCard } from "./cart-item-card";
import { CartFooter } from "./cart-footer";
import { ShoppingCart } from "lucide-react";
import { CartItem } from "@/types";

interface AnimatedItem {
  item: CartItem;
  state: "entering" | "visible" | "exiting";
}

function itemKey(item: CartItem) {
  return `${item.courseId}-${item.sectionId}`;
}

export function CartView() {
  const { activeCart } = useScheduler();
  const [animatedItems, setAnimatedItems] = useState<AnimatedItem[]>(() =>
    activeCart.items.map((item) => ({ item, state: "visible" as const }))
  );
  const prevKeysRef = useRef<Set<string>>(new Set(activeCart.items.map(itemKey)));
  const prevCartIdRef = useRef(activeCart.id);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (prevCartIdRef.current !== activeCart.id) {
      prevCartIdRef.current = activeCart.id;
      prevKeysRef.current = new Set(activeCart.items.map(itemKey));
      setAnimatedItems(
        activeCart.items.map((item) => ({ item, state: "visible" as const }))
      );
      return;
    }

    const currentKeys = new Set(activeCart.items.map(itemKey));
    const prevKeys = prevKeysRef.current;

    const entering = activeCart.items.filter((item) => !prevKeys.has(itemKey(item)));

    setAnimatedItems((prev) => {
      const exiting = prev
        .filter((ai) => ai.state !== "exiting" && !currentKeys.has(itemKey(ai.item)))
        .map((ai) => ai.item);

      const newAnimated: AnimatedItem[] = [];

      for (const item of activeCart.items) {
        const key = itemKey(item);
        const wasEntering = entering.some((e) => itemKey(e) === key);
        newAnimated.push({ item, state: wasEntering ? "entering" : "visible" });
      }

      for (const item of exiting) {
        newAnimated.push({ item, state: "exiting" });
      }

      return newAnimated;
    });
    prevKeysRef.current = currentKeys;

    // Transition entering → visible after animation completes
    if (entering.length > 0) {
      setTimeout(() => {
        setAnimatedItems((prev) =>
          prev.map((ai) =>
            ai.state === "entering" ? { ...ai, state: "visible" } : ai
          )
        );
      }, 120);
    }

    // Remove exiting items after animation
    setTimeout(() => {
      setAnimatedItems((prev) =>
        prev.filter((ai) => ai.state !== "exiting")
      );
    }, 150);
  }, [activeCart.id, activeCart.items]);

  return (
    <div className="flex h-full w-full md:w-[270px] shrink-0 flex-col md:border-x border-zinc-300 bg-zinc-50">
      <CartHeader />
      <div className="flex-1 space-y-1.5 overflow-y-auto px-2.5 py-2">
        {activeCart.items.length === 0 && animatedItems.filter((ai) => ai.state === "exiting").length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
            <ShoppingCart size={24} className="text-zinc-300" />
            <p className="text-xs text-zinc-400">
              Add courses from the course panel
            </p>
          </div>
        ) : (
          animatedItems.map((ai) => (
            <div
              key={itemKey(ai.item)}
              className={
                ai.state === "entering"
                  ? "animate-cart-item-in"
                  : ai.state === "exiting"
                    ? "animate-cart-item-out"
                    : ""
              }
            >
              <CartItemCard item={ai.item} />
            </div>
          ))
        )}
      </div>
      <CartFooter />
    </div>
  );
}
