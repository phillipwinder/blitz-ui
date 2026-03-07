"use server"

import { headers } from "next/headers"

import { eq } from "drizzle-orm"

import { db } from "@/db"
import { subscription, user } from "@/db/schema"
import { auth } from "@/lib/auth"

export type DeleteAccountResult =
  | { success: true }
  | { success: false; error: string }

export async function deleteAccount(): Promise<DeleteAccountResult> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    const userId = session?.user?.id

    if (!userId) {
      return {
        success: false,
        error: "You must be signed in to delete your account.",
      }
    }

    await db.delete(subscription).where(eq(subscription.userId, userId))
    await db.delete(user).where(eq(user.id, userId))

    return { success: true }
  } catch (error) {
    console.error("Failed to delete account", error)

    return {
      success: false,
      error: "Failed to delete account. Please try again.",
    }
  }
}
