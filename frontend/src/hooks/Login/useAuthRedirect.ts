"use client"

import { AuthStore } from "@/stores/authStore"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export const useAuthRedirect = () => {
  const router = useRouter()
  const { isLogin, loginType } = AuthStore()

  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (isLogin && loginType === 'user') {
      router.replace('/subject')
    } else {
      setChecked(true)
    }
  }, [isLogin, loginType, router])

  return checked
}