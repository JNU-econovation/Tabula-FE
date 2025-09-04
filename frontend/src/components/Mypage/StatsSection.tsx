import StudyStats from "./StudyStats"

const StatsSection = () => {
  return (
    <div className="flex flex-col gap-1 w-full px-2 sm:px-4 overflow-hidden max-w-full">
      <div className="text-xl">학습 통계</div>
      <p className="text-sm text-gray-500">사용자가 학습한 자료를 기반으로 학습 통계를 제공합니다.</p>
      <div><StudyStats /></div>
    </div>
  )
}

export default StatsSection