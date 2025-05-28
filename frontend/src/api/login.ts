import { AxiosInstance, END_POINT } from "."

export const postAuth = async (code: string) => {
  const response = await AxiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/google/token`, {
    code,
  })
  return response.data
}

export const postReissue = async (refreshToken: string) => {
  const response = await AxiosInstance.post(END_POINT.authIssue, {}, {
    headers: {
      'Refresh-Token': `${refreshToken}`
    }
  })
  return response.data
}