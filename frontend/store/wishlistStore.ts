import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Product {
  _id: string;
  name: string;
  price: number;
  images: Array<{ url: string; alt: string }>;
  category: string;
  rating: {
    average: number;
    count: number;
  };
}

interface WishlistState {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  setWishlist: (items: Product[]) => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) =>
        set((state) => ({
          items: [...state.items, product],
        })),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item._id !== productId),
        })),
      isInWishlist: (productId) => {
        return get().items.some((item) => item._id === productId);
      },
      setWishlist: (items) => set({ items }),
    }),
    {
      name: 'wishlist-storage',
    }
  )
);
