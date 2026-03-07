"use client"

import { useEffect, useRef } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useAuthStore } from "@/store/auth-store"

import { authClient } from "@/lib/auth-client"
import { executePostLoginAction } from "@/hooks/use-post-login-action"
import { AuthDialog } from "@/app/(auth)/components/auth-dialog"

const ACCOUNT_NOT_LINKED_MESSAGE =
  "An account with this email already exists. Sign in with the method you used when you created the account."

export function AuthDialogWrapper() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const {
    isOpen,
    mode,
    authErrorMessage,
    openAuthDialog,
    closeAuthDialog,
    setAuthErrorMessage,
    clearAuthErrorMessage,
    postLoginAction,
    clearPostLoginAction,
  } = useAuthStore()
  const { data: session } = authClient.useSession()
  const hasHandledAccountNotLinkedRef = useRef(false)

  useEffect(() => {
    if (isOpen && session) {
      clearAuthErrorMessage()
      closeAuthDialog()
    }

    if (session && postLoginAction) {
      executePostLoginAction(postLoginAction)
      clearPostLoginAction()
    }
  }, [
    session,
    isOpen,
    clearAuthErrorMessage,
    closeAuthDialog,
    postLoginAction,
    clearPostLoginAction,
  ])

  useEffect(() => {
    const error = searchParams.get("error")

    if (error !== "account_not_linked") {
      hasHandledAccountNotLinkedRef.current = false
      return
    }

    if (hasHandledAccountNotLinkedRef.current) {
      return
    }

    hasHandledAccountNotLinkedRef.current = true

    setAuthErrorMessage(ACCOUNT_NOT_LINKED_MESSAGE)
    openAuthDialog("signin")

    const nextSearchParams = new URLSearchParams(searchParams.toString())
    nextSearchParams.delete("error")

    const nextUrl = nextSearchParams.toString()
      ? `${pathname}?${nextSearchParams.toString()}`
      : pathname
    router.replace(nextUrl)
  }, [openAuthDialog, pathname, router, searchParams, setAuthErrorMessage])

  return (
    <AuthDialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          clearAuthErrorMessage()
          closeAuthDialog()
        }
      }}
      initialMode={mode}
      postLoginActionType={postLoginAction?.type}
      authErrorMessage={authErrorMessage}
      onClearAuthError={clearAuthErrorMessage}
    />
  )
}
