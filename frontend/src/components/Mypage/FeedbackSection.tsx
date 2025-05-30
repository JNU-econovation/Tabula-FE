import { IoIosArrowRoundForward } from "react-icons/io"

interface FeedbackSectionProps {
  onClick: () => void
}

const FeedbackSection = ({ onClick }: FeedbackSectionProps) => {
  return (
    <div onClick={onClick} className="flex w-full justify-between items-center group cursor-pointer hover:bg-gray-100 p-4 rounded transition-colors duration-400">
      <div className="flex flex-col gap-1">
        <div className="text-xl">서비스 의견 남기기</div>
        <p className="text-sm text-gray-500">소중한 의견 남겨주시면 추후 서비스 고도화에 반영될 예정입니다.</p>
      </div>
      <div className="flex text-4xl text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-400"><IoIosArrowRoundForward /></div>
    </div>
  )
}

export default FeedbackSection