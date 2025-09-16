import { DataLink } from "@/types";
import { create } from "zustand";

interface DataLinkStore {
  data: null | DataLink[];
  loading: boolean;
  setLoading: (v: boolean) => void;
  setData: (v: DataLinkStore["data"]) => void;
}

export const useDataLink = create<DataLinkStore>((set) => ({
  data: null,
  loading: true,
  setLoading: (v) => set({ loading: v }),
  setData: (v) => set({ data: v }),
}));
