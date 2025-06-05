import { AuthStore } from '@/stores/authStore';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { postReissue } from './login';
import { useToastStore } from '@/stores/toastStore';

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const BASE_URL_AI = process.env.NEXT_PUBLIC_AI_API_URL;

export const END_POINT = {
  authIssue: `/v1/auth/reissue`,
  guestLogin: `/v1/auth/guest`,
  workspaceList: `/v1/spaces/`,
  folderList: `/v1/folders`,
  mypage: `/v1/user/info`,
  aiWorkspaceList:`/v1/ai/spaces/`,
  aiResult:`/v1/ai/results/`,
};

export const AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': true,
    Accept: 'application/json',
  },
  timeout: 3000,
});

export const AxiosInstanceFormData = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
    'ngrok-skip-browser-warning': true,
    Accept: 'application/json',
  },
  timeout: 3000,
});

export const AxiosAIInstanceFormData = axios.create({
  baseURL: BASE_URL_AI,
  headers: {
    'Content-Type': 'multipart/form-data',
    'ngrok-skip-browser-warning': true,
    Accept: 'application/json',
  },
  timeout: 3000,
});

const addAccessToken = (config: InternalAxiosRequestConfig) => {
  const accessToken = AuthStore.getState().accessToken;
  if (accessToken && config.headers) {
    config.headers.set('Authorization', `Bearer ${accessToken}`);
  }
  return config;
};

// const handleTokenErrorRedirct = (instance: ReturnType<typeof axios.create>) => {
//   instance.interceptors.response.use(
//     (response) => response,
//     async (error: AxiosError) => {
//       if (error.response?.status === 401) {
//         const { addToast } = useToastStore.getState();
//         addToast('로그인 세션이 만료되었습니다. 다시 로그인해주세요.')
//         AuthStore.getState().logout()
//         localStorage.removeItem('auth-storage')
//         window.location.href = '/' // 홈으로 강제 이동 (추후 로그인 페이지 생성시 대체)
//         return Promise.reject(error)
//       }
//       return Promise.reject(error)
//     }
//   );
// }

const handleTokenRefresh = (instance: ReturnType<typeof axios.create>) => {
  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as any;

      if (error.response?.status === 401 && !originalRequest._isRetry) {
        originalRequest._isRetry = true;

        try {
          const authState = AuthStore.getState();
          const { refreshToken, username } = authState;

          if (!refreshToken) {
            throw new Error('No refresh token available');
          }

          const { data } = await postReissue(refreshToken);
          const newAccessToken = data.response.accessToken;
          const newRefreshToken = data.response.refreshToken;

          authState.setAuth({
            username: username!,
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            loginType: 'user',
          });

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return instance(originalRequest);
        } catch (e) {
          AuthStore.getState().logout();
          window.location.href = '/'; // 추후 로그인 페이지 생기면 교체
          return Promise.reject(e);
        }
      }
      return Promise.reject(error);
    },
  );
};

const handleCustomErrors = (instance: ReturnType<typeof axios.create>) => {
  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const errorData = error.response?.data as any;

      if (errorData?.error?.code === 'MEMBER_404_1') {
        const { addToast } = useToastStore.getState()
        addToast('존재하지 않는 회원입니다. 다시 로그인해주세요')
        AuthStore.getState().logout()
        window.location.href = '/' // 추후 로그인 페이지 생기면 교체
        return Promise.reject(error)
      }

      return Promise.reject(error)
    }
  )
}

AxiosInstance.interceptors.request.use(addAccessToken, (error) =>
  Promise.reject(error),
);
AxiosInstanceFormData.interceptors.request.use(addAccessToken, (error) =>
  Promise.reject(error),
);
AxiosAIInstanceFormData.interceptors.request.use(addAccessToken, (error) =>
  Promise.reject(error),
);
// handleTokenErrorRedirct(AxiosInstance)
// handleTokenErrorRedirct(AxiosInstanceFormData)

// 백엔드 토큰 리프레쉬 로직 개발 이후 handleTokenRefresh 제거하고 아래 함수 활성화 할 것
handleTokenRefresh(AxiosInstance);
handleTokenRefresh(AxiosInstanceFormData);
handleTokenRefresh(AxiosAIInstanceFormData)

handleCustomErrors(AxiosInstance)
handleCustomErrors(AxiosAIInstanceFormData)
handleCustomErrors(AxiosAIInstanceFormData)