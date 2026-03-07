import { create } from "zustand"
import { persist } from "zustand/middleware"

import { type PostLoginActionType, type StoredPostLoginAction } from "@/hooks/use-post-login-action"

interface AuthStore {
  isOpen: boolean
  mode: "signin" | "signup"
  authErrorMessage: string | null
  postLoginAction: StoredPostLoginAction
  openAuthDialog: (
    mode?: "signin" | "signup",
    postLoginActionType?: PostLoginActionType,
    postLoginActionData?: unknown
  ) => void
  closeAuthDialog: () => void
  setAuthErrorMessage: (message: string) => void
  clearAuthErrorMessage: () => void
  clearPostLoginAction: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isOpen: false,
      mode: "signin",
      authErrorMessage: null,
      postLoginAction: null,
      openAuthDialog: (newMode, postLoginActionType, postLoginActionData) => {
        set((state) => ({
          isOpen: true,
          mode: newMode || state.mode,
          postLoginAction: postLoginActionType
            ? { type: postLoginActionType, data: postLoginActionData }
            : null,
        }))
      },
      closeAuthDialog: () => set({ isOpen: false }),
      setAuthErrorMessage: (message) => set({ authErrorMessage: message }),
      clearAuthErrorMessage: () => set({ authErrorMessage: null }),
      clearPostLoginAction: () => set({ postLoginAction: null }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ postLoginAction: state.postLoginAction }),
    }
  )
)
