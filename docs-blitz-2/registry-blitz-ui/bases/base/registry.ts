import { registryItemSchema, type Registry } from "shadcn/schema"

import { hooks } from "./hooks/_registry"
import { patterns } from "./patterns/_registry"
import { blitzUi } from "./blitz-ui/_registry"

export const registry = {
  name: "shadcn/ui",
  homepage: "https://ui.shadcn.com",
  items: registryItemSchema.array().parse([...blitzUi, ...hooks, ...patterns]),
} satisfies Registry
