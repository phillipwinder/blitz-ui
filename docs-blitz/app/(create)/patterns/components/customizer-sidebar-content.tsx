"use client"

import * as React from "react"
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PaletteIcon,
  Settings2Icon,
  SlidersHorizontalIcon,
  TypeIcon,
} from "lucide-react"
import { useTheme } from "next-themes"

import {
  createEmptyCustomThemeVars,
  CUSTOM_THEME_TOKEN_GROUPS,
  isCustomThemeVarsInitialized,
  seedCustomThemeVars,
  type CustomThemeToken,
} from "@/lib/custom-theme"
import { cn } from "@/lib/utils"
import { useConfig } from "@/hooks/use-config"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { FieldGroup } from "@/components/ui/field"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ModeSwitcher } from "@/components/mode-switcher"
import { getThemesForBaseColor, PRESETS, STYLES } from "@/registry/config"
import { MenuAccentPicker } from "@/app/(create)/components/accent-picker"
import { BaseColorPicker } from "@/app/(create)/components/base-color-picker"
import { ColorThemeSelect } from "@/app/(create)/components/color-theme-select"
import { ColorTokenInput } from "@/app/(create)/components/custom-theme-submenu"
import { FontPicker } from "@/app/(create)/components/font-picker"
import { IconLibraryPicker } from "@/app/(create)/components/icon-library-picker"
import { MenuColorPicker } from "@/app/(create)/components/menu-picker"
import { PresetPicker } from "@/app/(create)/components/preset-picker"
import { RadiusPicker } from "@/app/(create)/components/radius-picker"
import { RandomButton } from "@/app/(create)/components/random-button"
import { ResetButton } from "@/app/(create)/components/reset-button"
import { StylePicker } from "@/app/(create)/components/style-picker"
import { ThemePicker } from "@/app/(create)/components/theme-picker"
import { FONTS } from "@/app/(create)/lib/fonts"
import { useDesignSystemSearchParams } from "@/app/(create)/lib/search-params"

interface CustomizerSidebarContentProps {
  isMobile: boolean
  anchorRef: React.RefObject<HTMLDivElement | null>
}

type SectionKey = "general" | "colors" | "typography" | "other"
type ThemeMode = "light" | "dark"

const SECTIONS: Array<{
  key: SectionKey
  label: string
  icon: React.ComponentType<React.ComponentProps<"svg">>
}> = [
  { key: "general", label: "General", icon: SlidersHorizontalIcon },
  { key: "colors", label: "Colors", icon: PaletteIcon },
  { key: "typography", label: "Typography", icon: TypeIcon },
  { key: "other", label: "Other", icon: Settings2Icon },
]

export function CustomizerSidebarContent({ isMobile, anchorRef }: CustomizerSidebarContentProps) {
  const { resolvedTheme } = useTheme()
  const [activeSection, setActiveSection] = React.useState<SectionKey | null>(null)
  const [params, setParams] = useDesignSystemSearchParams()
  const [config, setConfig] = useConfig()

  const effectiveBaseColor = params.baseColor ?? config.baseColor
  const effectiveTheme = params.theme ?? config.theme
  const effectiveMenuAccent = params.menuAccent ?? config.menuAccent
  const effectiveRadius = params.radius ?? config.radius
  const isCustomTheme = params.custom ?? config.custom

  const activeMode: ThemeMode = resolvedTheme === "dark" ? "dark" : "light"

  const availableThemes = React.useMemo(
    () => getThemesForBaseColor(effectiveBaseColor),
    [effectiveBaseColor]
  )

  const seededThemeVars = React.useMemo(
    () =>
      seedCustomThemeVars({
        baseColor: effectiveBaseColor,
        theme: effectiveTheme,
        menuAccent: effectiveMenuAccent,
        radius: effectiveRadius,
      }),
    [effectiveBaseColor, effectiveTheme, effectiveMenuAccent, effectiveRadius]
  )

  const ensureCustomThemeActive = React.useCallback(() => {
    setParams({ custom: true })
    setConfig((prev) => {
      if (isCustomThemeVarsInitialized(prev.customThemeVars)) {
        return {
          ...prev,
          custom: true,
        }
      }

      return {
        ...prev,
        custom: true,
        customThemeVars: seedCustomThemeVars({
          baseColor: params.baseColor ?? prev.baseColor,
          theme: params.theme ?? prev.theme,
          menuAccent: params.menuAccent ?? prev.menuAccent,
          radius: params.radius ?? prev.radius,
        }),
      }
    })
  }, [params.baseColor, params.menuAccent, params.radius, params.theme, setConfig, setParams])

  const handleCustomTokenChange = React.useCallback(
    (token: CustomThemeToken, value: string) => {
      setParams({ custom: true })
      setConfig((prev) => {
        const nextCustomThemeVars = isCustomThemeVarsInitialized(prev.customThemeVars)
          ? prev.customThemeVars
          : seedCustomThemeVars({
              baseColor: params.baseColor ?? prev.baseColor,
              theme: params.theme ?? prev.theme,
              menuAccent: params.menuAccent ?? prev.menuAccent,
              radius: params.radius ?? prev.radius,
            })

        return {
          ...prev,
          custom: true,
          customThemeVars: {
            ...nextCustomThemeVars,
            [activeMode]: {
              ...nextCustomThemeVars[activeMode],
              [token]: value,
            },
          },
        }
      })
    },
    [
      activeMode,
      params.baseColor,
      params.menuAccent,
      params.radius,
      params.theme,
      setConfig,
      setParams,
    ]
  )

  const handleResetColorMode = React.useCallback(() => {
    setParams({ custom: true })
    setConfig((prev) => {
      const seeded = seedCustomThemeVars({
        baseColor: params.baseColor ?? prev.baseColor,
        theme: params.theme ?? prev.theme,
        menuAccent: params.menuAccent ?? prev.menuAccent,
        radius: params.radius ?? prev.radius,
      })

      const nextCustomThemeVars = prev.customThemeVars ?? createEmptyCustomThemeVars()

      return {
        ...prev,
        custom: true,
        customThemeVars: {
          ...nextCustomThemeVars,
          [activeMode]: seeded[activeMode],
        },
      }
    })
  }, [
    activeMode,
    params.baseColor,
    params.menuAccent,
    params.radius,
    params.theme,
    setConfig,
    setParams,
  ])

  const activeSectionConfig = activeSection
    ? SECTIONS.find((section) => section.key === activeSection)
    : null

  const effectiveThemeVars = React.useMemo(() => {
    if (!isCustomTheme) {
      return seededThemeVars
    }

    const customThemeVars = config.customThemeVars ?? createEmptyCustomThemeVars()

    const mergeMode = (mode: ThemeMode) => {
      const seededMode = seededThemeVars[mode]
      const customMode = customThemeVars[mode]

      return Object.fromEntries(
        Object.entries(seededMode).map(([token, seededValue]) => {
          const customValue = customMode[token as CustomThemeToken]
          const value =
            typeof customValue === "string" && customValue.trim() !== "" ? customValue : seededValue

          return [token, value]
        })
      ) as Record<CustomThemeToken, string>
    }

    return {
      light: mergeMode("light"),
      dark: mergeMode("dark"),
    }
  }, [config.customThemeVars, isCustomTheme, seededThemeVars])

  return (
    <>
      <ScrollArea className="max-h-[calc(100svh-240px)] flex-1">
        <div className="overflow-hidden p-2">
          <div
            className={cn(
              "flex w-[200%] transition-transform duration-300 ease-out",
              activeSection ? "-translate-x-1/2" : "translate-x-0"
            )}
          >
            <div className="w-1/2 shrink-0">
              <div className="space-y-1">
                {SECTIONS.map((section) => (
                  <Button
                    key={section.key}
                    type="button"
                    variant="ghost"
                    className="h-11 w-full justify-between rounded-md px-3 text-sm"
                    onClick={() => setActiveSection(section.key)}
                  >
                    <span className="flex items-center gap-2">
                      <section.icon className="text-muted-foreground size-4" />
                      {section.label}
                    </span>
                    <ChevronRightIcon className="text-muted-foreground size-4" />
                  </Button>
                ))}
              </div>
            </div>

            <div className="w-1/2 shrink-0 pl-2">
              <div className="border-border/80 mb-2 border-b pb-2">
                <Button
                  type="button"
                  variant="ghost"
                  className="h-11 w-full justify-between rounded-md px-3 text-sm"
                  onClick={() => setActiveSection(null)}
                  aria-label="Back to sections"
                >
                  <ChevronLeftIcon className="text-muted-foreground size-4" />
                  <span className="flex items-center gap-2">
                    {activeSectionConfig?.icon ? (
                      <activeSectionConfig.icon className="text-muted-foreground size-4" />
                    ) : null}
                    {activeSectionConfig?.label}
                  </span>
                </Button>
              </div>

              {activeSection === "general" && (
                <FieldGroup className="flex flex-col gap-0">
                  <PresetPicker presets={PRESETS} isMobile={isMobile} anchorRef={anchorRef} />
                  <StylePicker styles={STYLES} isMobile={isMobile} anchorRef={anchorRef} />
                  <BaseColorPicker isMobile={isMobile} anchorRef={anchorRef} />
                  <IconLibraryPicker isMobile={isMobile} anchorRef={anchorRef} />
                  <RadiusPicker isMobile={isMobile} anchorRef={anchorRef} />
                  <MenuColorPicker isMobile={isMobile} anchorRef={anchorRef} />
                  <MenuAccentPicker isMobile={isMobile} anchorRef={anchorRef} />
                </FieldGroup>
              )}

              {activeSection === "colors" && (
                <div className="space-y-2 pb-2">
                  <ColorThemeSelect />

                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <ModeSwitcher />
                      <span className="text-muted-foreground text-xs">
                        {activeMode === "dark" ? "Dark mode" : "Light mode"}
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleResetColorMode}
                    >
                      Reset mode
                    </Button>
                  </div>

                  {CUSTOM_THEME_TOKEN_GROUPS.map((group, index) => (
                    <Collapsible
                      key={group.id}
                      // defaultOpen={index < 2}
                      className="border-border group/section overflow-hidden rounded-md border"
                    >
                      <CollapsibleTrigger className="bg-background hover:bg-muted flex w-full items-center justify-between px-3 py-2 text-left text-xs font-medium">
                        {group.label}
                        <ChevronDownIcon className="text-muted-foreground size-4 transition-transform group-data-[state=open]/section:rotate-180" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden">
                        <div className="bg-background border-t p-2">
                          <div className="space-y-2">
                            {group.tokens.map((token) => (
                              <ColorTokenInput
                                key={token}
                                token={token}
                                value={effectiveThemeVars[activeMode][token] ?? ""}
                                onChange={(value) => {
                                  ensureCustomThemeActive()
                                  handleCustomTokenChange(token, value)
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </div>
              )}

              {activeSection === "typography" && (
                <div className="space-y-2">
                  <div className="text-muted-foreground text-xs">
                    To use custom fonts, embed them in your project.
                  </div>
                  <FontPicker fonts={FONTS} isMobile={isMobile} anchorRef={anchorRef} />
                </div>
              )}

              {activeSection === "other" && (
                <div className="space-y-2">
                  <div className="text-muted-foreground text-xs">Additional theme controls.</div>
                  <ThemePicker themes={availableThemes} isMobile={isMobile} anchorRef={anchorRef} />
                </div>
              )}
            </div>
          </div>
        </div>
      </ScrollArea>
      <div className="border-border/80 flex flex-col gap-0 border-t p-3">
        <RandomButton />
        <ResetButton />
      </div>
    </>
  )
}
