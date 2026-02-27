import "server-only"

import { registryItemSchema } from "shadcn/schema"

import { getComponent, getRegistryItemMetadata, getRegistryMetadata } from "@/lib/registry"
import { getThemesForBaseColor, type BaseName } from "@/registry/config"
import { ALLOWED_ITEM_TYPES } from "@/app/(create)/lib/constants"

export async function getItemsForBase(base: BaseName) {
  const index = getRegistryMetadata(base)

  if (!index) {
    return []
  }

  return Object.values(index).filter((item) => ALLOWED_ITEM_TYPES.includes(item.type))
}

export async function getBaseItem(name: string, base: BaseName) {
  const item = getRegistryItemMetadata(name, base)
  if (!item) {
    return null
  }

  return registryItemSchema.parse(item)
}

export async function getBaseComponent(name: string, base: BaseName) {
  return getComponent(base, name)
}

// Re-export for server-side use.
export { getThemesForBaseColor }
