import { StatsData } from "@/api/mypage"
import { useGetMypage } from "../query/mypage/query"

export const useStudyStats = (year: number, month: number) => {
  const { response, isLoading } = useGetMypage(year, month)

  const studyStatsMap: Record<string, number> = {}
  response?.data.forEach(({ date, cnt }: StatsData) => {
    const dateStr = date.split('T') ? date.split('T')[0] : date
    studyStatsMap[dateStr] = cnt
  })

  return { studyStatsMap, isLoading }
}