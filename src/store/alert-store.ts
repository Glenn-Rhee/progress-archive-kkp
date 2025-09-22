import { create } from "zustand";

interface AlertStore {
  type: "error" | "success";
  message: string;
  isVisible: boolean;
  setType: (type: "error" | "success") => void;
  setMessage: (message: string) => void;
  setIsVisible: (isVisible: boolean) => void;
}

export const useAlertStore = create<AlertStore>((set) => ({
  type: "error",
  message: "",
  isVisible: false,
  setType: (type) => set({ type }),
  setMessage: (message) => set({ message }),
  setIsVisible: (isVisible) => set({ isVisible }),
}));
