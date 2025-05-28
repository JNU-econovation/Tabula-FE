import { AuthStore } from "@/stores/authStore"
import { useRouter } from "next/navigation"
import { useToastStore } from "@/stores/toastStore"
import { useMutation } from "@tanstack/react-query"
import { postGuestAuth } from "@/api/login"

export const useGuestLogin = () => {
  const setAuth = AuthStore.getState().setAuth
  const addToast = useToastStore.getState().addToast
  const router = useRouter()

  return useMutation({
    mutationFn: postGuestAuth,
    onSuccess: (data) => {
      const { accessToken, refreshToken } = data.response
      setAuth({
        username: '게스트',
        accessToken,
        refreshToken
      })
      router.replace('/workspace')
      addToast('게스트 로그인 하였습니다.', 3, 'default')
    },
    onError: () => {
      addToast('게스트 로그인에 실패했습니다. 다시 시도해주세요!')
    }
  })
}
