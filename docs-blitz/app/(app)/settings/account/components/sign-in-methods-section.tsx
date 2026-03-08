"use client"

import * as React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { AlertCircleIcon, Loader2Icon } from "lucide-react"
import { toast } from "sonner"

import {
  linkSocialAccount,
  listLinkedSocialAccounts,
  unlinkSocialAccount,
  type LinkedSocialAccount,
} from "@/lib/auth-client"
import { SOCIAL_AUTH_PROVIDERS, type SocialProviderId } from "@/lib/social-auth-providers"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const ERROR_MESSAGES: Record<string, string> = {
  account_not_linked:
    "An account with this email already exists. Sign in with the method you used when you created the account.",
  email_does_not_match:
    "This provider uses a different email address. Link a provider that matches your current account email.",
  unable_to_link_account:
    "We couldn't link that sign-in method. Try again or verify the provider account email first.",
  account_already_linked_to_different_user:
    "This sign-in method is already linked to a different account.",
  failed_to_unlink_last_account:
    "Keep at least one sign-in method linked to avoid losing access to your account.",
}

function getCallbackUrl(pathname: string, searchParams: { toString(): string }) {
  const nextSearchParams = new URLSearchParams(searchParams.toString())
  nextSearchParams.delete("error")

  const query = nextSearchParams.toString()
  return query ? `${pathname}?${query}` : pathname
}

export function SignInMethodsSection() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [accounts, setAccounts] = React.useState<LinkedSocialAccount[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [actionProvider, setActionProvider] = React.useState<SocialProviderId | null>(null)
  const [actionType, setActionType] = React.useState<"connect" | "disconnect" | null>(null)
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)

  const loadAccounts = React.useCallback(async () => {
    setIsLoading(true)

    try {
      const nextAccounts = await listLinkedSocialAccounts()
      setAccounts(nextAccounts)
    } catch (error) {
      console.error("Failed to load linked accounts", error)
      toast.error("Failed to load sign-in methods", {
        description: "Refresh the page and try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    void loadAccounts()
  }, [loadAccounts])

  React.useEffect(() => {
    const error = searchParams.get("error")

    if (!error) {
      return
    }

    const message = ERROR_MESSAGES[error]

    if (message) {
      setErrorMessage(message)
    }

    const nextSearchParams = new URLSearchParams(searchParams.toString())
    nextSearchParams.delete("error")

    const nextUrl = nextSearchParams.toString()
      ? `${pathname}?${nextSearchParams.toString()}`
      : pathname

    router.replace(nextUrl)
    void loadAccounts()
  }, [loadAccounts, pathname, router, searchParams])

  const linkedProviders = new Set(accounts.map((account) => account.providerId as SocialProviderId))
  const linkedAccountCount = accounts.length
  const isMutating = actionProvider !== null

  async function handleConnect(provider: SocialProviderId) {
    setErrorMessage(null)
    setActionProvider(provider)
    setActionType("connect")

    try {
      const callbackURL = getCallbackUrl(pathname, searchParams)

      const response = await linkSocialAccount({
        provider,
        callbackURL,
        errorCallbackURL: callbackURL,
      })

      if (response.redirect && response.url) {
        window.location.assign(response.url)
        return
      }

      await loadAccounts()
      setActionProvider(null)
      setActionType(null)
    } catch (error) {
      console.error(`Failed to link ${provider}`, error)
      toast.error(`Failed to connect ${provider}`, {
        description: "Please try again.",
      })
      setActionProvider(null)
      setActionType(null)
    }
  }

  async function handleDisconnect(provider: SocialProviderId) {
    setErrorMessage(null)
    setActionProvider(provider)
    setActionType("disconnect")

    try {
      await unlinkSocialAccount({ providerId: provider })
      const nextAccounts = await listLinkedSocialAccounts()
      setAccounts(nextAccounts)
      const providerLabel =
        SOCIAL_AUTH_PROVIDERS.find((supportedProvider) => supportedProvider.id === provider)
          ?.label ?? provider

      toast.success("Sign-in method removed", {
        description: `You can no longer sign in with ${providerLabel}.`,
      })
    } catch (error) {
      console.error(`Failed to unlink ${provider}`, error)

      const description =
        error instanceof Error && error.message ? error.message : "Please try again."

      toast.error("Failed to remove sign-in method", {
        description,
      })
    } finally {
      setActionProvider(null)
      setActionType(null)
    }
  }

  return (
    <div className="rounded-xl border p-6">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Sign in methods</h2>
        <p className="text-muted-foreground max-w-2xl text-sm">
          Manage which social accounts can be used to sign in to this account.
        </p>
      </div>

      {errorMessage ? (
        <Alert variant="destructive" className="mt-4">
          <AlertCircleIcon className="size-4" />
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      ) : null}

      <div className="mt-6 space-y-3">
        {SOCIAL_AUTH_PROVIDERS.map((provider) => {
          const isConnected = linkedProviders.has(provider.id)
          const isLastLinkedMethod = isConnected && linkedAccountCount === 1
          const isCurrentProvider = actionProvider === provider.id

          return (
            <div
              key={provider.id}
              className="flex items-center justify-between gap-4 rounded-lg border p-4"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="bg-muted flex size-10 shrink-0 items-center justify-center rounded-md border">
                  <provider.Icon className="size-5" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium">{provider.label}</p>
                  <p className="text-muted-foreground text-sm">
                    {isConnected ? "Connected to your account" : "Not connected to your account"}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <Badge variant={isConnected ? "default" : "outline"}>
                  {isConnected ? "Connected" : "Available"}
                </Badge>

                {isConnected ? (
                  <Button
                    variant="outline"
                    onClick={() => handleDisconnect(provider.id)}
                    disabled={isLoading || isMutating || isLastLinkedMethod}
                  >
                    {isCurrentProvider && actionType === "disconnect" ? (
                      <Loader2Icon className="size-4 animate-spin" />
                    ) : null}
                    Disconnect
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => handleConnect(provider.id)}
                    disabled={isLoading || isMutating}
                  >
                    {isCurrentProvider && actionType === "connect" ? (
                      <Loader2Icon className="size-4 animate-spin" />
                    ) : null}
                    Connect
                  </Button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {isLoading ? (
        <p className="text-muted-foreground mt-4 text-sm">Loading sign-in methods...</p>
      ) : null}

      {!isLoading && linkedAccountCount === 1 ? (
        <p className="text-muted-foreground mt-4 text-sm">
          Keep at least one sign-in method linked to avoid losing access to your account.
        </p>
      ) : null}
    </div>
  )
}
