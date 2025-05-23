import { AuthStore } from '@/stores/authStore';
import axios from 'axios';

export const BASE_URL = '/api';

export const END_POINT = {
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

AxiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = AuthStore.getState().accessToken
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

AxiosInstanceFormData.interceptors.request.use(
  (config) => {
    const accessToken = AuthStore.getState().accessToken
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => Promise.reject(error)
)
