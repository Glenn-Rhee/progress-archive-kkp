import { create } from "zustand";

interface PopoverStore {
  openId: string | null;
  setOpenId: (v: string | null) => void;
}

export const usePopover = create<PopoverStore>((set) => ({
  openId: null as string | null,
  setOpenId: (v) => set({ openId: v }),
}));
