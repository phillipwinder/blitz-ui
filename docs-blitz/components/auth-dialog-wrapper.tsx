"use client"

import { useEffect } from "react"

import { AuthDialog } from "@/app/(auth)/components/auth-dialog"
import { executePostLoginAction } from "@/hooks/use-post-login-action"
import { authClient } from "@/lib/auth-client"
import { useAuthStore } from "@/store/auth-store"

export function AuthDialogWrapper() {
  const { isOpen, mode, closeAuthDialog, postLoginAction, clearPostLoginAction } = useAuthStore()
  const { data: session } = authClient.useSession()

  useEffect(() => {
    if (isOpen && session) {
      closeAuthDialog()
    }

    if (session && postLoginAction) {
      executePostLoginAction(postLoginAction)
      clearPostLoginAction()
    }
  }, [session, isOpen, closeAuthDialog, postLoginAction, clearPostLoginAction])

  return (
    <AuthDialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) closeAuthDialog()
      }}
      initialMode={mode}
      postLoginActionType={postLoginAction?.type}
    />
  )
}
