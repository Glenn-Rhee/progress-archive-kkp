import { create } from "zustand";

interface PopoverStore {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}

export const usePopover = create<PopoverStore>((set) => ({
  isOpen: false,
  setIsOpen: (v) => set({ isOpen: v }),
}));
