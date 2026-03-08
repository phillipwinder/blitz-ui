import { createAuthClient } from "better-auth/react"

import { type SocialProviderId } from "@/lib/social-auth-providers"
import { publicAppUrl } from "@/lib/utils"

export interface LinkedSocialAccount {
  id: string
  providerId: string
  createdAt: string
  updatedAt: string
  accountId: string
  userId: string
  scopes: string[]
}

export const authClient = createAuthClient({
  baseURL: publicAppUrl,
})

interface LinkSocialAccountInput {
  provider: SocialProviderId
  callbackURL: string
  errorCallbackURL: string
}

interface UnlinkSocialAccountInput {
  providerId: SocialProviderId
  accountId?: string
}

export async function listLinkedSocialAccounts() {
  const response = await authClient.$fetch<LinkedSocialAccount[]>("/list-accounts", {
    throw: true,
  })

  return ("data" in response ? response.data : response) ?? []
}

export async function linkSocialAccount(input: LinkSocialAccountInput) {
  const response = await authClient.$fetch<{ redirect: boolean; url: string }>("/link-social", {
    method: "POST",
    body: input,
    throw: true,
  })

  return "data" in response ? response.data : response
}

export async function unlinkSocialAccount(input: UnlinkSocialAccountInput) {
  try {
    const response = await authClient.$fetch<{ status: boolean }>("/unlink-account", {
      method: "POST",
      body: input,
      throw: true,
    })

    return "data" in response ? response.data : response
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Please try again.")
    }

    throw new Error("Please try again.")
  }
}
