import { Ticket } from "@/types";
import { create } from "zustand";

export type CartItem = {
  ticket: Ticket;
  amount: number;
};

export type CartStoreState = {
  items: CartItem[];
  addItem: (item: Ticket) => void;
  removeItem: (item: Ticket) => void;
  increaseItemAmount: (item: CartItem) => void;
  decreaseItemAmount: (item: CartItem) => void;
};

export const useCartStore = create<CartStoreState>((set) => ({
  items: [],
  addItem: (ticket: Ticket) =>
    set((state: CartStoreState) => ({
      items: [...state.items, { ticket, amount: 1 }],
    })),
  removeItem: (ticket: Ticket) =>
    set((state: CartStoreState) => ({
      items: state.items.filter((item) => item.ticket.id !== ticket.id),
    })),
  increaseItemAmount: (item: CartItem) => {
    if (item.amount >= 5) return;
    set((state: CartStoreState) => ({
      items: state.items.map((cartItem) =>
        cartItem.ticket.id === item.ticket.id
          ? { ...item, amount: item.amount + 1 }
          : item,
      ),
    }));
  },
  decreaseItemAmount: (item: CartItem) => {
    if (item.amount <= 0) return;
    console.log("aqui");
    set((state: CartStoreState) => ({
      items: state.items.map((cartItem) =>
        cartItem.ticket.id === item.ticket.id
          ? { ...item, amount: item.amount - 1 }
          : item,
      ),
    }));
  },
}));
