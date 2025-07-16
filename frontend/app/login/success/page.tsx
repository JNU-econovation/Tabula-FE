"use client"

import { getAuth } from "@/api/login"
import { AuthStore } from "@/stores/authStore"
import { useToastStore } from "@/stores/toastStore"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const LoginSuccess = () => {
  const addToast = useToastStore((state) => state.addToast)
  const router = useRouter()
  const setAuth = AuthStore((state) => state.setAuth)
  

  useEffect(() => {
    const fetchToken = async () => {

      try {
        // tempToken으로 정식 토큰 요청
        const getRes = await getAuth()
        const { accessToken, refreshToken, userName } = getRes.response
        
        setAuth({
          username: userName,
          accessToken,
          refreshToken,
          loginType: 'user'
        })
        router.replace('/')
        addToast(`로그인에 성공하였습니다. 안녕하세요 ${userName}님!`, 3, 'default')

      } catch (error) {
        console.log('에러 발생: ', error)
        addToast('로그인에 실패했습니다. 다시 시도해주세요.')
        router.replace('/login/error')
      }
    }
    fetchToken()
  }, [router, setAuth])

  return null
}

export default LoginSuccess