import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type ToastProps = {
  id: string;
  text: string;
  sec?: number;
  type?: "error" | "default";
  isExit? :boolean;
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
        toasts: [...state.toasts, {id, text, sec, type, isExit: false}].slice(-3),
      }));

      // 애니메이션 시작 타이머
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.map((toast) =>
          toast.id === id ? { ...toast, isExit: true } : toast)
        }))

        // 실제 요소 제거 타이머
        setTimeout(() => {
          set((state) => ({
            toasts: state.toasts.filter((toast) => toast.id !== id),
          }))
        }, 500);
      }, sec * 1000)
    },
  }))
);