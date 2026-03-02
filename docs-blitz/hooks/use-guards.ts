import { type PostLoginActionType } from "@/hooks/use-post-login-action"
import { authClient } from "@/lib/auth-client"
import { useAuthStore } from "@/store/auth-store"

export function useGuards() {
  const { checkValidSession } = useSessionGuard()

  return { checkValidSession }
}

export function useSessionGuard() {
  const { data: session } = authClient.useSession()
  const { openAuthDialog } = useAuthStore()

  const checkValidSession = (
    mode: "signin" | "signup" = "signin",
    postLoginActionType?: PostLoginActionType,
    postLoginActionData?: unknown
  ) => {
    if (!session) {
      openAuthDialog(mode, postLoginActionType, postLoginActionData)
      return false
    }

    return true
  }

  return { checkValidSession }
}
