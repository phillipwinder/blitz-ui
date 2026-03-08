"use client"

import type * as React from "react"

import { Icons } from "@/components/icons"

export type SocialProvider = "google" | "github" | "gitlab" | "microsoft"

export type SocialProviderConfig = {
  id: SocialProvider
  label: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

export const SOCIAL_PROVIDERS = [
  { id: "github", label: "GitHub", icon: Icons.gitHub },
  { id: "gitlab", label: "GitLab", icon: Icons.gitLab },
  { id: "google", label: "Google", icon: Icons.google },
  { id: "microsoft", label: "Microsoft", icon: Icons.microsoft },
] as const satisfies readonly SocialProviderConfig[]

export const SOCIAL_PROVIDER_IDS = SOCIAL_PROVIDERS.map(
  (provider) => provider.id
) as readonly SocialProvider[]
