import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type LoginType = 'user' | 'guest' | null;

interface AuthState {
  isLogin: boolean;
  loginType: LoginType;
  username: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  setAuth: (data: {username: string; accessToken: string; refreshToken: string; loginType: LoginType }) => void;
  logout: () => void;
}

export const AuthStore = create<AuthState>() (
  devtools(
    persist(
      (set) => ({
        isLogin: false,
        loginType: null,
        username: null,
        accessToken: null,
        refreshToken: null,
        setAuth: ({ username, accessToken, refreshToken, loginType }) => set({ isLogin: true, loginType, username, accessToken, refreshToken }),
        logout: () => set({ isLogin: false, loginType: null, username: null, accessToken: null, refreshToken: null })
      }),
      {
        name: 'auth-storage'
      }
    )
  )
)