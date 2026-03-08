"use client"

import { authClient } from "@/lib/auth-client"
import { SOCIAL_PROVIDER_IDS, type SocialProvider } from "@/app/(app)/settings/account/components/social-provider-config"

export type ActionError = {
  message: string
  cause?: unknown
}

type BetterAuthResult<T> = {
  data?: T | null
  error?: {
    message?: string
  } | null
}

type LinkedAccount = {
  providerId: SocialProvider
  accountId: string
}

type LinkedProvider = {
  providerId: SocialProvider
  accountId: string
}

function isActionError(value: unknown): value is ActionError {
  return (
    typeof value === "object" &&
    value !== null &&
    "message" in value &&
    typeof value.message === "string"
  )
}

function normalizeError(error: unknown, fallbackMessage: string): ActionError {
  if (isActionError(error)) {
    return error
  }

  if (error instanceof Error) {
    return {
      message: error.message || fallbackMessage,
      cause: error,
    }
  }

  return {
    message: fallbackMessage,
    cause: error,
  }
}

function getResponseError<T>(
  response: BetterAuthResult<T>,
  fallbackMessage: string
): ActionError | null {
  if (!response.error) {
    return null
  }

  return {
    message: response.error.message || fallbackMessage,
    cause: response.error,
  }
}

function isSupportedProvider(providerId: string): providerId is SocialProvider {
  return SOCIAL_PROVIDER_IDS.includes(providerId as SocialProvider)
}

function mapAccounts(accounts: unknown): LinkedProvider[] {
  if (!Array.isArray(accounts)) {
    return []
  }

  return accounts.flatMap((account) => {
    if (
      typeof account !== "object" ||
      account === null ||
      !("providerId" in account) ||
      !("accountId" in account)
    ) {
      return []
    }

    const providerId = account.providerId
    const accountId = account.accountId

    if (
      typeof providerId !== "string" ||
      typeof accountId !== "string" ||
      !isSupportedProvider(providerId)
    ) {
      return []
    }

    return [{ providerId, accountId }]
  })
}

export async function getLinkedProviders(): Promise<LinkedProvider[] | ActionError> {
  try {
    const response = (await authClient.listAccounts()) as BetterAuthResult<LinkedAccount[]>
    const responseError = getResponseError(response, "Failed to load linked social accounts.")

    if (responseError) {
      return responseError
    }

    return mapAccounts(response.data)
  } catch (error) {
    return normalizeError(error, "Failed to load linked social accounts.")
  }
}

export async function connectProvider(
  provider: SocialProvider,
  callbackURL: string
): Promise<{ redirecting: boolean } | ActionError> {
  try {
    const response = (await authClient.linkSocial({
      provider,
      callbackURL,
    })) as BetterAuthResult<{ redirect?: boolean | null }>
    const responseError = getResponseError(response, `Failed to connect ${provider}.`)

    if (responseError) {
      return responseError
    }

    return {
      redirecting: Boolean(response.data?.redirect ?? true),
    }
  } catch (error) {
    return normalizeError(error, `Failed to connect ${provider}.`)
  }
}

export async function disconnectProvider(
  providerId: SocialProvider,
  accountId: string
): Promise<{ disconnected: true } | ActionError> {
  try {
    const response = (await authClient.unlinkAccount({
      providerId,
      accountId,
    })) as BetterAuthResult<{ status?: boolean | null }>
    const responseError = getResponseError(response, `Failed to disconnect ${providerId}.`)

    if (responseError) {
      return responseError
    }

    return { disconnected: true }
  } catch (error) {
    return normalizeError(error, `Failed to disconnect ${providerId}.`)
  }
}
