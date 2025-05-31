"use client"

import FeedbackModal from "@/components/Mypage/FeedbackModal"
import FeedbackSection from "@/components/Mypage/FeedbackSection"
import StatsSection from "@/components/Mypage/StatsSection"
import UserInfo from "@/components/Mypage/UserInfo"
import useModal from "@/hooks/common/useModal"
import { useGuestRedirect } from "@/hooks/Login/useGuestRedirect"
import { AuthStore } from "@/stores/authStore"

const page = () => {
  const { username } = AuthStore()
  const { isModalOpen, openModal, closeModal } = useModal()
  const shouldRender = useGuestRedirect()
  if (!shouldRender) return null

  return (
    <div className="flex flex-col items-center p-15 min-h-calc(100vh-4.5rem)">
      <div className="flex flex-col items-start gap-8 min-w-110">
        <UserInfo username={username} />
        <StatsSection />
        <FeedbackSection onClick={openModal} />
      </div>
      {isModalOpen && <FeedbackModal username={username} onClose={closeModal} />}
    </div>
  )
}

export default page