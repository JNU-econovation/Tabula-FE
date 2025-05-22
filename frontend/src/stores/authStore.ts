import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AuthState {
  isLogin: boolean;
  username: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  setAuth: (data: {username: string; accessToken: string; refreshToken: string; }) => void;
  logout: () => void;
}

export const AuthStore = create<AuthState>() (
  devtools(
    persist(
      (set) => ({
        isLogin: false,
        username: null,
        accessToken: null,
        refreshToken: null,
        setAuth: ({ username, accessToken, refreshToken }) => set({ isLogin: true, username, accessToken, refreshToken }),
        logout: () => set({ isLogin: false, username: null, accessToken: null, refreshToken: null })
      }),
      {
        name: 'auth-storage'
      }
    )
  )
)