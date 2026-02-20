"use client";

import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { useScheduler } from "@/store/scheduler-context";

interface CartDropdownProps {
  onClose: () => void;
}

export function CartDropdown({ onClose }: CartDropdownProps) {
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
    <div className="absolute left-0 top-full z-50 mt-1 w-48 rounded-lg border border-zinc-200 bg-white py-1 shadow-lg">
      {state.carts.map((cart) => (
        <div
          key={cart.id}
          className="group flex items-center justify-between px-3 py-1.5 hover:bg-zinc-50"
        >
          {editingId === cart.id ? (
            <input
              autoFocus
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
                className={`flex-1 text-left text-sm ${
                  cart.id === state.activeCartId
                    ? "font-bold text-zinc-900"
                    : "text-zinc-600"
                }`}
              >
                {cart.name}
              </button>
              <div className="flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  onClick={() => startEditing(cart.id, cart.name)}
                  className="rounded p-0.5 text-zinc-400 hover:text-zinc-700"
                >
                  <Pencil size={12} />
                </button>
                {state.carts.length > 1 && (
                  <button
                    onClick={() => deleteCart(cart.id)}
                    className="rounded p-0.5 text-zinc-400 hover:text-red-600"
                  >
                    <Trash2 size={12} />
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
