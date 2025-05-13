import { ToastProps } from "@/stores/toastStore"
import { AiOutlineNotification } from "react-icons/ai"
import { LuCircleAlert } from "react-icons/lu"

const ToastItem: React.FC<ToastProps> = ({ id, text, type = "error" }) => {
  return (
    <div
      key={id}
      className={`flex items-center gap-3 px-5 py-2 text-base text-white shadow-md rounded-md min-w-[450px]
        ${type === "error" ? "bg-[#EE8282]" : "bg-gray-500"}
      `}>
      {type === "error" && <LuCircleAlert className=" text-lg font-bold" />}
      {type === "default" && <AiOutlineNotification className=" text-xl font-bold" />}
      
      <div>{text}</div>
    </div>
  )
}

export default ToastItem