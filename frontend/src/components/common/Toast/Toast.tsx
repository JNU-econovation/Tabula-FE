"use client";

import { useToastStore } from "@/stores/toastStore"
import { AiOutlineNotification, AiTwotoneNotification } from "react-icons/ai";
import { LuCircleAlert } from "react-icons/lu";

const Toast = () => {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 space-y-2 z-50">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-5 py-2 text-base text-white shadow-md rounded-md min-w-[450px]
            ${toast.type === "error" ? "bg-[#EE8282]" : ""}
            ${toast.type === "default" ? "bg-gray-500" : ""}
          `}>
          {toast.type === "error" && <LuCircleAlert className=" text-lg font-bold" />}
          {toast.type === "default" && <AiOutlineNotification className=" text-xl font-bold" />}
          
          <div>{toast.text}</div>
        </div>
      ))}
    </div>
  )
}

export default Toast