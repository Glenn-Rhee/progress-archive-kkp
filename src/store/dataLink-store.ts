import { DataLink } from "@/types";
import { create } from "zustand";

interface DataLinkStore {
  data: null | DataLink[];
  loading: boolean;
  isChange: boolean;
  setIsChange: (v: boolean) => void;
  setLoading: (v: boolean) => void;
  setData: (v: DataLinkStore["data"]) => void;
}

export const useDataLink = create<DataLinkStore>((set) => ({
  data: null,
  loading: true,
  isChange: false,
  setIsChange(v) {
    set({ isChange: v });
  },
  setLoading: (v) => set({ loading: v }),
  setData: (v) => set({ data: v }),
}));
