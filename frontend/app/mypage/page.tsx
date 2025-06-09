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

const page = () => {
  const { username } = AuthStore()
  const { isModalOpen, openModal, closeModal } = useModal()
  const { logout } = useLogout()
  const shouldRender = useGuestRedirect()
  if (!shouldRender) return null

  return (
    <div className="flex flex-col items-center px-15 py-30 min-h-calc(100vh)">
      <div className="flex flex-col items-start gap-6 min-w-110">
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