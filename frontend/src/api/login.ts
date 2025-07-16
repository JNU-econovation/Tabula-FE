import { AxiosInstance, END_POINT } from "."

export const getAuth = async () => {
  const response = await AxiosInstance.get(END_POINT.authIsuue, {
    withCredentials: true,
  })
  return response.data
}

export const postReissue = async (refreshToken: string) => {
  const response = await AxiosInstance.post(END_POINT.authReissue, {}, {
    headers: {
      'Refresh-Token': `${refreshToken}`
    }
  })
  return response.data
}

export const postGuestAuth = async () => {
  const response = await AxiosInstance.post(END_POINT.guestLogin)
  return response.data
}