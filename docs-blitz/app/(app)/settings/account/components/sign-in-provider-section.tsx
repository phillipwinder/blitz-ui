"use client"

import * as React from "react"
import { CheckCircle2Icon, Loader2Icon, UnlinkIcon } from "lucide-react"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  connectProvider,
  disconnectProvider,
  getLinkedProviders,
  type ActionError,
} from "@/app/(app)/settings/account/components/social-providers"
import {
  SOCIAL_PROVIDERS,
  type SocialProvider,
  type SocialProviderConfig,
} from "@/app/(app)/settings/account/components/social-provider-config"

type ProviderState = {
  id: SocialProvider
  label: string
  icon: SocialProviderConfig["icon"]
  linked: boolean
  accountId: string | null
}

function isActionError(value: unknown): value is ActionError {
  return (
    typeof value === "object" &&
    value !== null &&
    "message" in value &&
    typeof value.message === "string"
  )
}

function createProviderState(
  linkedProviders: Awaited<ReturnType<typeof getLinkedProviders>>
): ProviderState[] {
  const linkedById = isActionError(linkedProviders)
    ? new Map<SocialProvider, { accountId: string }>()
    : new Map(
        linkedProviders.map((provider) => [provider.providerId, { accountId: provider.accountId }])
      )

  return SOCIAL_PROVIDERS.map((provider) => {
    const linkedProvider = linkedById.get(provider.id)

    return {
      id: provider.id,
      label: provider.label,
      icon: provider.icon,
      linked: Boolean(linkedProvider),
      accountId: linkedProvider?.accountId ?? null,
    }
  })
}

function getCallbackUrl() {
  if (typeof window === "undefined") {
    return "/settings/account"
  }

  return `${window.location.pathname}${window.location.search}`
}

export function SignInProviderSection() {
  const [providers, setProviders] = React.useState<ProviderState[]>(() => createProviderState([]))
  const [isLoading, setIsLoading] = React.useState(true)
  const [connectingProvider, setConnectingProvider] = React.useState<SocialProvider | null>(null)
  const [disconnectingProvider, setDisconnectingProvider] = React.useState<SocialProvider | null>(
    null
  )

  const linkedCount = providers.filter((provider) => provider.linked).length

  const refreshProviders = React.useCallback(async () => {
    setIsLoading(true)

    const result = await getLinkedProviders()

    if (isActionError(result)) {
      toast.error("Failed to load linked socials", {
        description: result.message,
      })
      setIsLoading(false)
      return
    }

    setProviders(createProviderState(result))
    setIsLoading(false)
  }, [])

  React.useEffect(() => {
    void refreshProviders()
  }, [refreshProviders])

  async function handleConnect(provider: SocialProvider) {
    setConnectingProvider(provider)

    const result = await connectProvider(provider, getCallbackUrl())

    if (isActionError(result)) {
      toast.error("Failed to connect social account", {
        description: result.message,
      })
      setConnectingProvider(null)
      return
    }

    if (!result.redirecting) {
      setConnectingProvider(null)
      await refreshProviders()
    }
  }

  async function handleDisconnect(provider: ProviderState) {
    if (!provider.accountId || disconnectingProvider) {
      return
    }

    setDisconnectingProvider(provider.id)

    const result = await disconnectProvider(provider.id, provider.accountId)

    if (isActionError(result)) {
      toast.error("Failed to disconnect social account", {
        description: result.message,
      })
      setDisconnectingProvider(null)
      return
    }

    await refreshProviders()
    setDisconnectingProvider(null)
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Sign-in providers</CardTitle>
        <CardDescription>
          Connect or disconnect the social accounts you use to sign in.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {providers.map((provider) => {
          const Icon = provider.icon
          const isConnecting = connectingProvider === provider.id
          const isDisconnecting = disconnectingProvider === provider.id
          const disableDisconnect = provider.linked && linkedCount === 1

          return (
            <div
              key={provider.id}
              className={cn(
                "flex flex-col gap-3 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between",
                provider.linked ? "border-border" : "border-border/70"
              )}
            >
              <div className="flex items-start gap-3">
                <div className="bg-muted flex size-10 items-center justify-center rounded-lg border">
                  <Icon className="size-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{provider.label}</p>
                    {provider.linked ? (
                      <Badge variant="secondary">
                        <CheckCircle2Icon className="size-3.5" />
                        Linked
                      </Badge>
                    ) : (
                      <Badge variant="outline">Not linked</Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {provider.linked
                      ? `Use your ${provider.label} account to sign in.`
                      : `Connect ${provider.label} to use it for sign-in.`}
                  </p>
                  {disableDisconnect ? (
                    <p className="text-muted-foreground text-xs">
                      You must keep at least one sign-in provider connected.
                    </p>
                  ) : null}
                </div>
              </div>

              {provider.linked ? (
                <Button
                  variant="outline"
                  onClick={() => void handleDisconnect(provider)}
                  disabled={
                    disableDisconnect || Boolean(connectingProvider || disconnectingProvider)
                  }
                >
                  {isDisconnecting ? (
                    <Loader2Icon className="size-4 animate-spin" />
                  ) : (
                    <UnlinkIcon />
                  )}
                  Disconnect
                </Button>
              ) : (
                <Button
                  onClick={() => void handleConnect(provider.id)}
                  disabled={Boolean(connectingProvider || disconnectingProvider) || isLoading}
                >
                  {isConnecting ? <Loader2Icon className="size-4 animate-spin" /> : null}
                  Connect
                </Button>
              )}
            </div>
          )
        })}

        {isLoading ? (
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <Loader2Icon className="size-4 animate-spin" />
            Loading linked providers...
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}
