import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type ToastProps = {
  id: string;
  text: string;
  sec?: number;
  type?: "error" | "default";
}

type ToastStore = {
  toasts: ToastProps[];
  addToast: (text: string, sec?: number, type?: "error" | "default") => void;
}

export const useToastStore = create<ToastStore>() (
  devtools((set) => ({
    toasts: [],

    addToast: (text, sec = 3, type="error") => {
      const id = Date.now().toString();
      set((state) => ({
        toasts: [...state.toasts, {id, text, sec, type}].slice(-3),
      }));

      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((toast) => toast.id !== id),
        }))
      }, sec * 1000);
    },
  }))
);