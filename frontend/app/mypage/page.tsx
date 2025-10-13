"use client"

import FeedbackModal from "@/components/Mypage/FeedbackModal"
import FeedbackSection from "@/components/Mypage/FeedbackSection"
import LogoutSection from "@/components/Mypage/LogoutSection"
import StatsSection from "@/components/Mypage/StatsSection"
import UserInfo from "@/components/Mypage/UserInfo"
import useModal from "@/hooks/common/useModal"
import { useGuestRedirect } from "@/hooks/Login/useGuestRedirect"
import { useLogout } from "@/hooks/mypage/useLogout"
import { AuthStore } from "@/stores/authStore"
import { useRouter } from "next/navigation"
import { IoMdArrowBack } from "react-icons/io"

const page = () => {
  const { username } = AuthStore()
  const { isModalOpen, openModal, closeModal } = useModal()
  const { logout } = useLogout()
  const shouldRender = useGuestRedirect()
  const router = useRouter()

  if (!shouldRender) return null

  return (
    <div className="flex flex-col items-center px-4 sm:px-6 md:px-10 lg:px-15 pt-24 sm:pt-30 pb-8 overflow-x-hidden">
      <IoMdArrowBack
        className="absolute left-5 top-25 sm:left-8 sm:top-25 cursor-pointer text-2xl text-gray-400"
        onClick={() => router.back()}
      />
      <div className="flex flex-col w-full items-start gap-6 max-w-md mt-10 sm:mt-0">
        <UserInfo username={username} />
        <StatsSection />
        <div>
          <FeedbackSection onClick={openModal} />
          <LogoutSection onClick={logout} />
        </div>
      </div>
      {isModalOpen && <FeedbackModal username={username} onClose={closeModal} />}
    </div>
  )
}

export default page