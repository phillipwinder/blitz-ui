"use client"

import { useEffect, useState } from "react"
import { Loader2Icon } from "lucide-react"

import { authClient } from "@/lib/auth-client"
import { type PostLoginActionType } from "@/hooks/use-post-login-action"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  SOCIAL_PROVIDERS,
  type SocialProvider,
} from "@/app/(app)/settings/account/components/social-provider-config"

interface AuthDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialMode?: "signin" | "signup"
  postLoginActionType?: PostLoginActionType | null
}

function getContextualCopy(actionType?: PostLoginActionType | null) {
  switch (actionType) {
    case "SAVE_THEME":
      return {
        title: "Sign in to Save",
        description: "Sign in to save your work and sync it across devices.",
      }
    case "SAVE_THEME_FOR_SHARE":
      return {
        title: "Sign in to Share",
        description: "Sign in to save and share your work with others.",
      }
    case "AI_GENERATE_FROM_PAGE":
    case "AI_GENERATE_FROM_CHAT":
    case "AI_GENERATE_FROM_CHAT_SUGGESTION":
    case "AI_GENERATE_EDIT":
    case "AI_GENERATE_RETRY":
      return {
        title: "Sign in for AI",
        description: "Sign in to use AI-powered generation.",
      }
    case "CHECKOUT":
      return {
        title: "Sign in to continue",
        description: "Sign in to continue checkout.",
      }
    default:
      return null
  }
}

export function AuthDialog({
  open,
  onOpenChange,
  initialMode = "signin",
  postLoginActionType,
}: AuthDialogProps) {
  const [isSignIn, setIsSignIn] = useState(initialMode === "signin")
  const [loadingProvider, setLoadingProvider] = useState<SocialProvider | null>(null)

  const contextualCopy = getContextualCopy(postLoginActionType)

  const getCallbackUrl = () => {
    if (typeof window === "undefined") {
      return "/"
    }

    return `${window.location.pathname}${window.location.search}`
  }

  useEffect(() => {
    if (open) {
      setIsSignIn(initialMode === "signin")
    }
  }, [open, initialMode])

  const handleProviderSignIn = async (provider: SocialProvider) => {
    setLoadingProvider(provider)

    try {
      await authClient.signIn.social({
        provider,
        callbackURL: getCallbackUrl(),
      })
    } catch (error) {
      console.error(`${provider} sign-in failed`, error)
      setLoadingProvider(null)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden sm:max-w-md">
        <div className="space-y-4">
          <DialogHeader className="pt-2">
            <DialogTitle className="text-center text-2xl font-bold">
              {contextualCopy?.title ?? (isSignIn ? "Welcome back" : "Create account")}
            </DialogTitle>
            <p className="text-muted-foreground text-center text-sm">
              {contextualCopy?.description ??
                (isSignIn
                  ? "Sign in to your account to continue"
                  : "Sign up to get started with Blitz UI")}
            </p>
          </DialogHeader>

          <div className="space-y-6 px-1 pb-2">
            <div className="space-y-3">
              {SOCIAL_PROVIDERS.map((provider) => {
                const Icon = provider.icon

                return (
                  <Button
                    key={provider.id}
                    variant="outline"
                    onClick={() => handleProviderSignIn(provider.id)}
                    size="lg"
                    className="hover:bg-primary/10 hover:text-foreground flex w-full items-center justify-center gap-2"
                    disabled={loadingProvider !== null}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">Continue with {provider.label}</span>
                    {loadingProvider === provider.id ? (
                      <Loader2Icon className="h-4 w-4 animate-spin" />
                    ) : null}
                  </Button>
                )
              })}
            </div>

            <div className="pt-2">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background text-muted-foreground px-2">
                    {isSignIn ? "New to Blitz UI?" : "Already have an account?"}
                  </span>
                </div>
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setIsSignIn((prev) => !prev)}
                  className="text-primary text-sm font-medium hover:underline"
                  type="button"
                >
                  {isSignIn ? "Create an account" : "Sign in to your account"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
