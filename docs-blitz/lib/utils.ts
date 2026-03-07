import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { siteConfig } from "@/lib/config"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isActive(pathname: string, href: string) {
  const normalizedPathname = pathname.replace(/\/$/, "")
  const normalizedHref = href.replace(/\/$/, "")
  return (
    normalizedPathname === normalizedHref ||
    (normalizedPathname.startsWith(normalizedHref) && normalizedHref !== "")
  )
}

export const publicAppUrl = process.env.NEXT_PUBLIC_APP_URL || siteConfig.url
export const authBaseUrl = process.env.BASE_URL || publicAppUrl

export function absoluteUrl(path: string) {
  return new URL(path, publicAppUrl).toString()
}

export function formatLabel(value: string): string {
  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export function normalizeSlug(value: string): string {
  return value.toLowerCase().replace(/\s+/g, "-")
}
