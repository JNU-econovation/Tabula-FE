import { getMypage } from "@/api/mypage"
import { useQuery } from "@tanstack/react-query"

export const useGetMypage = (year: number, month: number) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['mypage', year, month],
    queryFn: () => getMypage(year, month)
  });

  const response = data?.response

  return { response, isLoading, isError }
}