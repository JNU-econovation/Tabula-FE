"use client"

import StudyStats from "@/components/Mypage/StudyStats"
import { AuthStore } from "@/stores/authStore"
import { FaArrowRight, FaUserCircle } from "react-icons/fa"
import { IoIosArrowRoundForward, IoMdArrowDropright } from "react-icons/io"

const page = () => {
  const { username } = AuthStore()
  return (
    <div className="flex flex-col items-center p-20 min-h-calc(100vh-4.5rem)">
      <div className="flex flex-col items-start gap-8 min-w-110">
        <div className="flex relative items-center p-4">
          <div className="mr-8">
            <FaUserCircle className="text-5xl text-gray-400 rounded-full" />
          </div>
          <div className="text-xl">{username}님</div>
        </div>
        <div className="flex flex-col gap-1 w-115 px-4">
          <div className="text-xl">학습 통계</div>
          <p className="text-sm text-gray-500">사용자가 학습한 자료를 기반으로 학습 통계를 제공합니다.</p>
          <div><StudyStats /></div>
        </div>
        <div className="flex w-full justify-between items-center group cursor-pointer hover:bg-gray-100 p-4 rounded transition-colors duration-400">
          <div className="flex flex-col gap-1">
            <div className="text-xl">서비스 의견 남기기</div>
            <p className="text-sm text-gray-500">소중한 의견 남겨주시면 추후 서비스 고도화에 반영될 예정입니다.</p>
          </div>
          <div className="flex text-4xl text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-400"><IoIosArrowRoundForward /></div>
        </div>
      </div>
    </div>
  )
}

export default page