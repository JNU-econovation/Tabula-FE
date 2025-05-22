"use client"

export const useGoogleLogin = () => {

  const handleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/google`
  }

  return { handleLogin }
}