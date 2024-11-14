import { create } from 'zustand';

interface GlobalStore {
  isNav: boolean;
  toggleNav: () => void;
}

export const useGlobalStore = create<GlobalStore>((set) => ({
  isNav: true,
  toggleNav: () => set((state) => ({ isNav: !state.isNav })),
}));
