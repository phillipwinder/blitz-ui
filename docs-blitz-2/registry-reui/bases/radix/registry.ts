import { registryItemSchema, type Registry } from "shadcn/schema"

import { hooks } from "./hooks/_registry"
import { patterns } from "./patterns/_registry"
import { reui } from "./reui/_registry"

export const registry = {
  name: "shadcn/ui",
  homepage: "https://ui.shadcn.com",
  items: registryItemSchema.array().parse([...reui, ...hooks, ...patterns]),
} satisfies Registry
