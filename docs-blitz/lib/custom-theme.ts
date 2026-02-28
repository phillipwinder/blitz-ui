import { buildRegistryTheme, DEFAULT_CONFIG, type DesignSystemConfig } from "@/registry/config"

export const CUSTOM_THEME_TOKENS = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "destructive-foreground",
  "border",
  "input",
  "ring",
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5",
  "sidebar",
  "sidebar-foreground",
  "sidebar-primary",
  "sidebar-primary-foreground",
  "sidebar-accent",
  "sidebar-accent-foreground",
  "sidebar-border",
  "sidebar-ring",
] as const

export type CustomThemeToken = (typeof CUSTOM_THEME_TOKENS)[number]

type CustomThemeTokenGroup = {
  id: string
  label: string
  tokens: readonly CustomThemeToken[]
}

export const CUSTOM_THEME_TOKEN_LABELS: Record<CustomThemeToken, string> = {
  background: "Background",
  foreground: "Foreground",
  card: "Card Background",
  "card-foreground": "Card Foreground",
  popover: "Popover Background",
  "popover-foreground": "Popover Foreground",
  primary: "Primary",
  "primary-foreground": "Primary Foreground",
  secondary: "Secondary",
  "secondary-foreground": "Secondary Foreground",
  muted: "Muted",
  "muted-foreground": "Muted Foreground",
  accent: "Accent",
  "accent-foreground": "Accent Foreground",
  destructive: "Destructive",
  "destructive-foreground": "Destructive Foreground",
  border: "Border",
  input: "Input",
  ring: "Ring",
  "chart-1": "Chart 1",
  "chart-2": "Chart 2",
  "chart-3": "Chart 3",
  "chart-4": "Chart 4",
  "chart-5": "Chart 5",
  sidebar: "Sidebar Background",
  "sidebar-foreground": "Sidebar Foreground",
  "sidebar-primary": "Sidebar Primary",
  "sidebar-primary-foreground": "Sidebar Primary Foreground",
  "sidebar-accent": "Sidebar Accent",
  "sidebar-accent-foreground": "Sidebar Accent Foreground",
  "sidebar-border": "Sidebar Border",
  "sidebar-ring": "Sidebar Ring",
}

export const CUSTOM_THEME_TOKEN_GROUPS: readonly CustomThemeTokenGroup[] = [
  {
    id: "primary-colors",
    label: "Primary Colors",
    tokens: ["primary", "primary-foreground"],
  },
  {
    id: "secondary-colors",
    label: "Secondary Colors",
    tokens: ["secondary", "secondary-foreground"],
  },
  {
    id: "accent-colors",
    label: "Accent Colors",
    tokens: ["accent", "accent-foreground"],
  },
  {
    id: "base-colors",
    label: "Base Colors",
    tokens: ["background", "foreground"],
  },
  {
    id: "card-colors",
    label: "Card Colors",
    tokens: ["card", "card-foreground"],
  },
  {
    id: "popover-colors",
    label: "Popover Colors",
    tokens: ["popover", "popover-foreground"],
  },
  {
    id: "muted-colors",
    label: "Muted Colors",
    tokens: ["muted", "muted-foreground"],
  },
  {
    id: "destructive-colors",
    label: "Destructive Colors",
    tokens: ["destructive", "destructive-foreground"],
  },
  {
    id: "border-input-colors",
    label: "Border & Input Colors",
    tokens: ["border", "input", "ring"],
  },
  {
    id: "chart-colors",
    label: "Chart Colors",
    tokens: ["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"],
  },
  {
    id: "sidebar-colors",
    label: "Sidebar Colors",
    tokens: [
      "sidebar",
      "sidebar-foreground",
      "sidebar-primary",
      "sidebar-primary-foreground",
      "sidebar-accent",
      "sidebar-accent-foreground",
      "sidebar-border",
      "sidebar-ring",
    ],
  },
]

type CustomThemeTokenMap = Record<CustomThemeToken, string>

export type CustomThemeVars = {
  light: CustomThemeTokenMap
  dark: CustomThemeTokenMap
}

type CustomThemeSeedConfig = Pick<
  DesignSystemConfig,
  "baseColor" | "theme" | "menuAccent" | "radius"
>

function createEmptyCustomThemeTokenMap(): CustomThemeTokenMap {
  return {} as CustomThemeTokenMap
}

export function createEmptyCustomThemeVars(): CustomThemeVars {
  return {
    light: createEmptyCustomThemeTokenMap(),
    dark: createEmptyCustomThemeTokenMap(),
  }
}

export function isCustomThemeVarsInitialized(customThemeVars: CustomThemeVars | null | undefined) {
  if (!customThemeVars) {
    return false
  }

  return CUSTOM_THEME_TOKENS.every((token) => {
    return Object.hasOwn(customThemeVars.light, token) && Object.hasOwn(customThemeVars.dark, token)
  })
}

export function seedCustomThemeVars(config: CustomThemeSeedConfig): CustomThemeVars {
  const registryTheme = buildRegistryTheme({
    ...DEFAULT_CONFIG,
    ...config,
  })

  const customThemeVars = createEmptyCustomThemeVars()

  CUSTOM_THEME_TOKENS.forEach((token) => {
    customThemeVars.light[token] = registryTheme.cssVars.light?.[token] ?? ""
    customThemeVars.dark[token] = registryTheme.cssVars.dark?.[token] ?? ""
  })

  return customThemeVars
}

export function mergeCustomThemeVars(
  registryTheme: ReturnType<typeof buildRegistryTheme> | null,
  customThemeVars: CustomThemeVars | null | undefined
) {
  if (!registryTheme || !customThemeVars) {
    return registryTheme
  }

  const lightVars: Record<string, string> = {
    ...(registryTheme.cssVars.light ?? {}),
  }
  const darkVars: Record<string, string> = {
    ...(registryTheme.cssVars.dark ?? {}),
  }

  CUSTOM_THEME_TOKENS.forEach((token) => {
    const lightValue = customThemeVars.light[token]
    if (typeof lightValue === "string" && lightValue.trim() !== "") {
      lightVars[token] = lightValue
    }

    const darkValue = customThemeVars.dark[token]
    if (typeof darkValue === "string" && darkValue.trim() !== "") {
      darkVars[token] = darkValue
    }
  })

  return {
    ...registryTheme,
    cssVars: {
      ...registryTheme.cssVars,
      light: lightVars,
      dark: darkVars,
    },
  }
}
