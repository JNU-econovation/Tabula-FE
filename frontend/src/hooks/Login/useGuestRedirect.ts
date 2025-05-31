import { AuthStore } from "@/stores/authStore"
import { useToastStore } from "@/stores/toastStore"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export const useGuestRedirect = () => {
  const router = useRouter()
  const { loginType } = AuthStore()
  const addToast = useToastStore((state) => state.addToast)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (loginType === undefined) return
    if (loginType === 'guest') {
      router.replace('/')
    } else {
      setChecked(true)
    }
  }, [loginType, router, addToast])

  return checked
}