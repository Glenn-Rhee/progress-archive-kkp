import { DataLink } from "@/types";
import { create } from "zustand";

interface PopoverStore {
  openId: string | null;
  data: DataLink | null;
  autoFocus: boolean;
  setAutoFocus: (v: boolean) => void;
  setData: (v: DataLink | null) => void;
  setOpenId: (v: string | null) => void;
}

export const usePopover = create<PopoverStore>((set) => ({
  openId: null as string | null,
  data: null,
  autoFocus: false,
  setAutoFocus: (v) => set({ autoFocus: v }),
  setData: (v) => set({ data: v }),
  setOpenId: (v) => set({ openId: v }),
}));
