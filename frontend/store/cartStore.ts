import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  _id: string;
  product: {
    _id: string;
    name: string;
    price: number;
    images: Array<{ url: string; alt: string }>;
  };
  quantity: number;
  size: string;
  color: string;
  price: number;
}

interface CartState {
  items: CartItem[];
  totalPrice: number;
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  setCart: (items: CartItem[], totalPrice: number) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      totalPrice: 0,
      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find(
            (i) =>
              i.product._id === item.product._id &&
              i.size === item.size &&
              i.color === item.color
          );

          if (existingItem) {
            const updatedItems = state.items.map((i) =>
              i._id === existingItem._id
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            );
            return {
              items: updatedItems,
              totalPrice: updatedItems.reduce(
                (sum, i) => sum + i.price * i.quantity,
                0
              ),
            };
          }     

          const newItems = [...state.items, item];
          return {
            items: newItems,
            totalPrice: newItems.reduce(
              (sum, i) => sum + i.price * i.quantity,
              0
            ),
          };
        }),
      removeItem: (itemId) =>
        set((state) => {
          const newItems = state.items.filter((i) => i._id !== itemId);
          return {
            items: newItems,
            totalPrice: newItems.reduce(
              (sum, i) => sum + i.price * i.quantity,
              0
            ),
          };
        }),
      updateQuantity: (itemId, quantity) =>
        set((state) => {
          const newItems = state.items.map((i) =>
            i._id === itemId ? { ...i, quantity } : i
          );
          return {
            items: newItems,
            totalPrice: newItems.reduce(
              (sum, i) => sum + i.price * i.quantity,
              0
            ),
          };
        }),
      clearCart: () => set({ items: [], totalPrice: 0 }),
      setCart: (items, totalPrice) => set({ items, totalPrice }),
    }),
    {
      name: 'cart-storage',
    }
  )
);
