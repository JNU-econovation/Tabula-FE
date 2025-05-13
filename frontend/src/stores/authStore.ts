import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AuthState {
  isLogin: boolean;
  username: string | null;
  login: (username: string) => void;
  logout: () => void;
}

export const AuthStore = create<AuthState>() (
  devtools(
    persist(
      (set) => ({
        isLogin: false,
        username: null,
        login: (username) => set({ isLogin: true, username }),
        logout: () => set({ isLogin: false, username: null })
      }),
      {
        name: 'auth-storage'
      }
    )
  )
)