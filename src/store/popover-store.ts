import { DataLink } from "@/types";
import { create } from "zustand";

interface PopoverStore {
  openId: string | null;
  data: DataLink | null;
  setData: (v: DataLink | null) => void;
  setOpenId: (v: string | null) => void;
}

export const usePopover = create<PopoverStore>((set) => ({
  openId: null as string | null,
  data: null,
  setData: (v) => set({ data: v }),
  setOpenId: (v) => set({ openId: v }),
}));
