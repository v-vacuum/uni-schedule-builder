"use client";

import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { useScheduler } from "@/store/scheduler-context";

interface CartDropdownProps {
  onClose: () => void;
  animationClass?: string;
  onAnimationEnd?: () => void;
}

export function CartDropdown({ onClose, animationClass, onAnimationEnd }: CartDropdownProps) {
  const { state, switchCart, deleteCart, renameCart } = useScheduler();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const startEditing = (cartId: string, currentName: string) => {
    setEditingId(cartId);
    setEditName(currentName);
  };

  const finishEditing = () => {
    if (editingId && editName.trim()) {
      renameCart(editingId, editName.trim());
    }
    setEditingId(null);
  };

  return (
    <div
      className={`absolute left-0 top-full z-50 mt-1 w-52 rounded-xl border border-zinc-200 bg-white py-1 shadow-lg ${animationClass ?? ""}`}
      onKeyDown={(e) => { if (e.key === "Escape") onClose(); }}
      onAnimationEnd={onAnimationEnd}
    >
      <div className="px-4 pb-1 pt-2">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
          My Carts
        </span>
      </div>
      {state.carts.map((cart) => {
        const isActive = cart.id === state.activeCartId;
        return (
          <div
            key={cart.id}
            className="group flex items-center justify-between px-4 py-2.5 hover:bg-zinc-50"
          >
            {editingId === cart.id ? (
              <input
                autoFocus
                aria-label="Cart name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onBlur={finishEditing}
                onKeyDown={(e) => {
                  if (e.key === "Enter") finishEditing();
                  if (e.key === "Escape") setEditingId(null);
                }}
                className="w-full rounded border border-zinc-300 px-1.5 py-0.5 text-sm outline-none focus:border-zinc-500"
              />
            ) : (
              <>
                <button
                  onClick={() => {
                    switchCart(cart.id);
                    onClose();
                  }}
                  className="flex-1 text-left text-sm text-zinc-900"
                >
                  {cart.name}
                </button>
                {isActive ? (
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                    Selected
                  </span>
                ) : (
                  <div className="flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                    <button
                      onClick={() => startEditing(cart.id, cart.name)}
                      aria-label={`Rename ${cart.name}`}
                      className="rounded p-0.5 text-zinc-400 hover:text-zinc-700 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none"
                    >
                      <Pencil size={12} />
                    </button>
                    {state.carts.length > 1 && (
                      <button
                        onClick={() => deleteCart(cart.id)}
                        aria-label={`Delete ${cart.name}`}
                        className="rounded p-0.5 text-zinc-400 hover:text-red-600 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none"
                      >
                        <Trash2 size={12} />
                      </button>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
