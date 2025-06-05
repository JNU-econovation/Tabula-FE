import { AuthStore } from "@/stores/authStore"
import { useToastStore } from "@/stores/toastStore"
import { useRouter } from "next/navigation"

export const useLogout = () => {
  const router = useRouter()
  const clearAuth = AuthStore((state) => state.logout)
  const addToast = useToastStore((state) => state.addToast)

  const logout = () => {
    clearAuth()
    router.replace('/')  // 추후 로그인 페이지로 교체
    addToast('로그아웃 되었습니다.', 3, 'default')
  }

  return { logout }
}