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
      const { accessToken, folderId } = data.response
      setAuth({
        username: '게스트',
        accessToken,
        refreshToken: null,
        loginType: 'guest'
      })
      router.replace(`/workspace/${folderId}/upload`)
      addToast('환영합니다! 게스트 모드로 Tabula를 체험해보세요.', 3, 'default')
    },
    onError: () => {
      addToast('게스트 로그인에 실패했습니다. 다시 시도해주세요!')
    }
  })
}
