import { ToastProps } from "@/stores/toastStore"
import { AiOutlineNotification } from "react-icons/ai"
import { LuCircleAlert } from "react-icons/lu"

const ToastItem: React.FC<ToastProps> = ({ id, text, type = "error", isExit }) => {
  return (
    <div
      key={id}
      className={`flex items-center gap-3 px-5 py-2 text-base text-white shadow-md rounded-md 
        w-[32rem] max-w-[100%]
        ${type === "error" ? "bg-[#EE8282]" : "bg-gray-500"}
        ${isExit === true ? "toast-exit" : "toast-enter" } 
        opacity-100 will-change-opacity 
      `}>
      {type === "error" && <LuCircleAlert className=" text-xl font-bold flex-shrink-0" />}
      {type === "default" && <AiOutlineNotification className=" text-xl font-bold flex-shrink-0" />}
      
      <div>{text}</div>
    </div>
  )
}

export default ToastItem