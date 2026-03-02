"use client"

import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  baseURL: process.env.BASE_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
})
