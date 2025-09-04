"use client";

import { useToastStore } from "@/stores/toastStore"
import ToastItem from "./ToastItem";

const Toast = () => {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 space-y-2 z-100">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          id={toast.id}
          text={toast.text}
          type={toast.type}
          isExit={toast.isExit} />
      ))}
    </div>
  )
}

export default Toast
