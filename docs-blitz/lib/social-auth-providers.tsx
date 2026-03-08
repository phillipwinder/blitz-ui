"use client"

import { Icons } from "@/components/icons"

export type SocialProviderId = "google" | "github" | "microsoft"

export const SOCIAL_AUTH_PROVIDERS: ReadonlyArray<{
  id: SocialProviderId
  label: string
  continueLabel: string
  Icon: typeof Icons.google
}> = [
  {
    id: "google",
    label: "Google",
    continueLabel: "Continue with Google",
    Icon: Icons.google,
  },
  {
    id: "github",
    label: "GitHub",
    continueLabel: "Continue with GitHub",
    Icon: Icons.gitHub,
  },
  {
    id: "microsoft",
    label: "Microsoft",
    continueLabel: "Continue with Microsoft",
    Icon: Icons.microsoft,
  },
]
