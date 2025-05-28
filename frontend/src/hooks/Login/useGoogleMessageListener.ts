import { AuthStore } from "@/stores/authStore"
import { useToastStore } from "@/stores/toastStore"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export const useGoogleMessageListener = () => {
  const setAuth = AuthStore((state) => state.setAuth)
  const addToast = useToastStore((state) => state.addToast)
  const router = useRouter()

  useEffect(() => {
    const receiveMessage = (event: MessageEvent) => {
      if (!event.data || typeof event.data !== "string") return
      
      try {
        const { accessToken, refreshToken, userName } = JSON.parse(event.data)

        if (accessToken && refreshToken) {
          setAuth({
            username: userName,
            accessToken,
            refreshToken
          })
          router.replace('/subject')
          addToast(`로그인에 성공하였습니다. 안녕하세요 ${userName}님!`, 3, 'default')
        }
      } catch (e) {
        console.error('postMessage 파싱 에러', e)
      }
    }

    window.addEventListener('message', receiveMessage)
    return () => window.removeEventListener('message', receiveMessage)
  }, [setAuth, router])
}