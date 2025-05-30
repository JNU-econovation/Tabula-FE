"use client"

import { postAuth } from "@/api/login"
import { AuthStore } from "@/stores/authStore"
import { useToastStore } from "@/stores/toastStore"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"

const CallbackPage = () => {
  const addToast = useToastStore((state) => state.addToast)

  const searchParams = useSearchParams()
  const router = useRouter()
  const code = searchParams.get('code')
  const setAuth = AuthStore((state) => state.setAuth)
  

  useEffect(() => {
    const fetchToken = async () => {
      if (!code) {
        alert('코드가 존재하지 않습니다.')
        router.replace('/auth/error')
        return
      }

      try {
        const data = await postAuth(code)

        if (data.success) {
          const { accessToken, refreshToken, userName } = data.response
          
          setAuth({
            username: userName,
            accessToken,
            refreshToken,
            loginType: 'user'
          })
          router.replace('/')

        } else {
          addToast('로그인에 실패했습니다. 다시 시도해주세요.')
          router.replace('/auth/error')
        }
      } catch (error) {
        console.log('에러 발생: ', error)
        addToast('로그인 중 에러가 발생했습니다. 다시 시도해주세요.')
        router.replace('/auth/error')
      }
    }
    fetchToken()
  }, [code, router, setAuth])
}

export default CallbackPage