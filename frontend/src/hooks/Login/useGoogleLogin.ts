export const useGoogleLogin = () => {

  const handleLogin = () => {
    const width = 500;
    const height = 600;

    const left = window.innerWidth / 2 + window.screenX - width / 2;
    const top = window.innerHeight / 2 + window.screenY - height / 2;

    const popup = window.open(
      `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/google`,
      "_blank",
      `width=${width},height=${height},left=${left},top=${top}`
    )

    if (!popup) {
      alert("팝업이 차단되었습니다. 팝업을 허용해주세요.")
    }
  }

  return { handleLogin }
}
