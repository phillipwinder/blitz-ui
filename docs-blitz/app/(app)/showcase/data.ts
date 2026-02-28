import { FocusIcon, PaletteIcon, ReceiptTextIcon, type LucideIcon } from "lucide-react"

export type ShowcaseApp = {
  slug: string
  name: string
  description: string
  href: string
  icon: LucideIcon
  tags: string[]
}

export const showcaseApps: ShowcaseApp[] = [
  {
    slug: "focus-sprint",
    name: "Focus Sprint",
    description: "A tiny sprint planner to add tasks, check progress, and clear completed work.",
    href: "/showcase/focus-sprint",
    icon: FocusIcon,
    tags: ["Productivity", "Progress", "Checklist"],
  },
  {
    slug: "trip-splitter",
    name: "Trip Splitter",
    description:
      "Track shared expenses and instantly calculate per-person totals for small group trips.",
    href: "/showcase/trip-splitter",
    icon: ReceiptTextIcon,
    tags: ["Finance", "Calculator", "Group"],
  },
  {
    slug: "palette-lab",
    name: "Palette Lab",
    description: "Tune RGB values and save swatches while building a small color system.",
    href: "/showcase/palette-lab",
    icon: PaletteIcon,
    tags: ["Design", "Color", "Tooling"],
  },
]
