import { CardStoreStateType, CartStoreActionsType } from "@/types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const useCartStore = create<CardStoreStateType & CartStoreActionsType>()(
persist(
  devtools(
      (set, get) => ({
        count: 0,
        Cart: JSON.parse(localStorage.getItem("CartStore") || "[]"),
        addToCart: (item) => {
          const existingItem = get().Cart.find(
            (cartItem) => cartItem.id === item.id
          );
          if (existingItem)
            set((state) => ({
              Cart: state.Cart.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
              count: state.count + 1,
            }));
          else
            set((state) => ({
              Cart: [...state.Cart, item],
              count: state.count + 1,
            }));
        },
        removeFromCart: (id) =>
          set((state) => ({
            Cart: state.Cart.filter((item) => item.id !== id),
            count: state.count - (state.Cart.find(i => i.id === id)?.quantity || 1),
          })),
        updateCardItem: (id, updatedItem) =>
          set((state) => ({
            Cart: state.Cart.map((item) =>
              item.id === id ? { ...item, ...updatedItem } : item
            ),
          })),
        clearCart: () => set({ Cart: [], count: 0 }),
        // getTotalPrice: () => {
        //   return get().Cart.reduce(
        //     (total, item) => total + item.price * (item.quantity || 1),
        //     0
        //   );
        // },
        // getItemCount: () => {
        //   return get().Cart.reduce(
        //     (count, item) => count + (item.quantity || 1),
        //     0
        //   );
        // },
      }),
      { name: "CartStore" }
    ),
    { name: "CartStore" }
  )
);

export default useCartStore;
