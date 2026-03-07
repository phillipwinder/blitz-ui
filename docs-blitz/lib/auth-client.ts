import { createAuthClient } from "better-auth/react"

import { publicAppUrl } from "@/lib/utils"

export const authClient = createAuthClient({
  baseURL: publicAppUrl,
})
