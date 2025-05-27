"use client"

import FeedbackSection from "@/components/Mypage/FeedbackSection"
import StatsSection from "@/components/Mypage/StatsSection"
import UserInfo from "@/components/Mypage/UserInfo"
import { AuthStore } from "@/stores/authStore"

const page = () => {
  const { username } = AuthStore()
  return (
    <div className="flex flex-col items-center p-15 min-h-calc(100vh-4.5rem)">
      <div className="flex flex-col items-start gap-8 min-w-110">
        <UserInfo username={username} />
        <StatsSection />
        <FeedbackSection />
      </div>
    </div>
  )
}

export default page