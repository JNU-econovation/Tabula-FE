import { AuthStore } from '@/stores/authStore';
import axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

export const BASE_URL = '/api';

export const END_POINT = {
  authIssue: `/v1/auth/reissue`,
  workspaceList: `/v1/spaces/`,
  folderList: `/v1/folders`,
};

export const AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 3000,
});

export const AxiosInstanceFormData = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json',
  },
  timeout: 3000,
});

export const postReissue = async (refreshToken: string) => {
  const response = await AxiosInstance.post(END_POINT.authIssue, {}, {
    headers: {
      Authorization: `Bearer ${refreshToken}`
    }
  })
  return response.data
}

const addAccessToken = (config: InternalAxiosRequestConfig) => {
  const accessToken = AuthStore.getState().accessToken
    if (accessToken && config.headers) {
      config.headers.set('Authorization', `Bearer ${accessToken}`)
    }
    return config
}

const handleTokenRefresh = (instance: ReturnType<typeof axios.create>) => {
  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as any

      if (error.response?.status === 401 && !originalRequest._isRetry) {
        originalRequest._isRetry = true

        try {
          const { refreshToken, username } = AuthStore.getState()

          if (!refreshToken) {
            throw new Error('No refresh token available')
          }

          const { data } = await postReissue(refreshToken)

          const newAccessToken = data.response.accessToken

          AuthStore.getState().setAuth({
            username: username!,
            accessToken: newAccessToken,
            refreshToken: refreshToken!
          })
 
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
          return instance(originalRequest)
        } catch (e) {
          AuthStore.getState().logout()
          window.location.href = '/'  // 추후 로그인 페이지 생기면 교체
          return Promise.reject(e)
        }
      }
      return Promise.reject(error)
    }
  )
}

AxiosInstance.interceptors.request.use(addAccessToken, (error) => Promise.reject(error))
AxiosInstanceFormData.interceptors.request.use(addAccessToken, (error) => Promise.reject(error))

handleTokenRefresh(AxiosInstance)
handleTokenRefresh(AxiosInstanceFormData)