"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import {
  createEmptyCustomThemeVars,
  isCustomThemeVarsInitialized,
  seedCustomThemeVars,
  type CustomThemeToken,
} from "@/lib/custom-theme"
import { useConfig } from "@/hooks/use-config"
import { useMounted } from "@/hooks/use-mounted"
import { BASE_COLORS, type Theme, type ThemeName } from "@/registry/config"
import { CustomThemePanel } from "@/app/(create)/components/custom-theme-panel"
import { LockButton } from "@/app/(create)/components/lock-button"
import {
  Picker,
  PickerContent,
  PickerGroup,
  PickerItem,
  PickerRadioGroup,
  PickerRadioItem,
  PickerSeparator,
  PickerTrigger,
} from "@/app/(create)/components/picker"
import { useDesignSystemSearchParams } from "@/app/(create)/lib/search-params"

export function ThemePicker({
  themes,
  isMobile,
  anchorRef,
}: {
  themes: readonly Theme[]
  isMobile: boolean
  anchorRef: React.RefObject<HTMLDivElement | null>
}) {
  const { resolvedTheme } = useTheme()
  const mounted = useMounted()
  const [params, setParams] = useDesignSystemSearchParams()
  const [config, setConfig] = useConfig()
  const [customThemePanelOpen, setCustomThemePanelOpen] = React.useState(false)
  const effectiveTheme = params.theme ?? config.theme
  const isCustom = params.custom ?? config.custom
  const customThemeVars = config.customThemeVars ?? createEmptyCustomThemeVars()

  const currentTheme = React.useMemo(
    () => themes.find((theme) => theme.name === effectiveTheme),
    [themes, effectiveTheme]
  )

  const currentThemeIsBaseColor = React.useMemo(
    () => BASE_COLORS.find((baseColor) => baseColor.name === effectiveTheme),
    [effectiveTheme]
  )

  const handleValueChange = React.useCallback(
    (value: string) => {
      const newTheme = value as ThemeName
      setParams({ theme: newTheme, custom: false })
      setConfig((prev) => ({ ...prev, theme: newTheme, custom: false }))
    },
    [setParams, setConfig]
  )

  const handleActivateCustom = React.useCallback(() => {
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

  const activeMode = resolvedTheme === "dark" ? "dark" : "light"

  const handleCustomTokenChange = React.useCallback(
    (token: CustomThemeToken, value: string) => {
      setConfig((prev) => {
        const nextCustomThemeVars = prev.customThemeVars ?? createEmptyCustomThemeVars()

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
    [activeMode, setConfig]
  )

  const handleOpenCustomThemePanel = React.useCallback(() => {
    handleActivateCustom()
    setCustomThemePanelOpen(true)
  }, [handleActivateCustom])

  const handleResetMode = React.useCallback(() => {
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
  }, [activeMode, params.baseColor, params.menuAccent, params.radius, params.theme, setConfig])

  const handleResetAllModes = React.useCallback(() => {
    setConfig((prev) => ({
      ...prev,
      custom: true,
      customThemeVars: seedCustomThemeVars({
        baseColor: params.baseColor ?? prev.baseColor,
        theme: params.theme ?? prev.theme,
        menuAccent: params.menuAccent ?? prev.menuAccent,
        radius: params.radius ?? prev.radius,
      }),
    }))
  }, [params.baseColor, params.menuAccent, params.radius, params.theme, setConfig])

  React.useEffect(() => {
    if (!isCustom && customThemePanelOpen) {
      setCustomThemePanelOpen(false)
    }
  }, [customThemePanelOpen, isCustom])
  const fallbackColor =
    currentTheme?.cssVars?.[activeMode]?.[currentThemeIsBaseColor ? "muted-foreground" : "primary"]
  const triggerColor = isCustom
    ? customThemeVars[activeMode]?.primary || fallbackColor
    : fallbackColor
  let triggerLabel = "..."
  if (mounted) {
    triggerLabel = isCustom ? "Custom" : (currentTheme?.title ?? "...")
  }

  React.useEffect(() => {
    if (!currentTheme && themes.length > 0) {
      const firstTheme = themes[0].name
      if (params.theme) {
        setParams({ theme: firstTheme })
      }
      setConfig((prev) => ({ ...prev, theme: firstTheme }))
    }
  }, [currentTheme, themes, setParams, setConfig, params.theme])

  return (
    <div className="group/picker relative">
      <Picker>
        <PickerTrigger>
          <div className="flex flex-col justify-start text-left">
            <div className="text-muted-foreground text-xs">Theme</div>
            <div className="text-foreground text-sm font-medium">{triggerLabel}</div>
          </div>
          {mounted && resolvedTheme && (
            <div
              style={
                {
                  "--color": triggerColor,
                } as React.CSSProperties
              }
              className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 rounded-full bg-(--color) select-none"
            />
          )}
        </PickerTrigger>
        <PickerContent
          anchor={isMobile ? anchorRef : undefined}
          side={isMobile ? "top" : "right"}
          align={isMobile ? "center" : "start"}
          className="max-h-96"
        >
          <PickerRadioGroup value={currentTheme?.name} onValueChange={handleValueChange}>
            <PickerGroup>
              {themes
                .filter((theme) => BASE_COLORS.find((baseColor) => baseColor.name === theme.name))
                .map((theme) => {
                  const isBaseColor = BASE_COLORS.find((baseColor) => baseColor.name === theme.name)
                  return (
                    <PickerRadioItem key={theme.name} value={theme.name}>
                      <div className="flex items-start gap-2">
                        {mounted && resolvedTheme && (
                          <div
                            style={
                              {
                                "--color":
                                  theme.cssVars?.[resolvedTheme as "light" | "dark"]?.[
                                    isBaseColor ? "muted-foreground" : "primary"
                                  ],
                              } as React.CSSProperties
                            }
                            className="size-4 translate-y-1 rounded-full bg-(--color)"
                          />
                        )}
                        <div className="flex flex-col justify-start pointer-coarse:gap-1">
                          <div>{theme.title}</div>
                          <div className="text-muted-foreground text-xs pointer-coarse:text-sm">
                            Match base color
                          </div>
                        </div>
                      </div>
                    </PickerRadioItem>
                  )
                })}
            </PickerGroup>
            <PickerSeparator />
            <PickerGroup>
              {themes
                .filter((theme) => !BASE_COLORS.find((baseColor) => baseColor.name === theme.name))
                .map((theme) => {
                  return (
                    <PickerRadioItem key={theme.name} value={theme.name}>
                      <div className="flex items-center gap-2">
                        {mounted && resolvedTheme && (
                          <div
                            style={
                              {
                                "--color": theme.cssVars?.[resolvedTheme as "light" | "dark"]?.primary,
                              } as React.CSSProperties
                            }
                            className="size-4 rounded-full bg-(--color)"
                          />
                        )}
                        {theme.title}
                      </div>
                    </PickerRadioItem>
                  )
                })}
            </PickerGroup>
          </PickerRadioGroup>
          <PickerSeparator />
          <PickerGroup>
            <PickerItem
              onClick={handleOpenCustomThemePanel}
              className="py-2.5 pointer-coarse:py-3.5 pointer-coarse:text-base"
            >
              <div className="flex flex-col justify-start pointer-coarse:gap-1">
                <div className="flex items-center gap-2">
                  <span>Custom</span>
                  {isCustom && (
                    <span className="text-muted-foreground text-xs pointer-coarse:text-sm">
                      Active
                    </span>
                  )}
                </div>
                <div className="text-muted-foreground text-xs pointer-coarse:text-sm">
                  Open the full color editor panel
                </div>
              </div>
            </PickerItem>
          </PickerGroup>
        </PickerContent>
      </Picker>
      <LockButton param="theme" className="absolute top-1/2 right-10 -translate-y-1/2" />
      <CustomThemePanel
        open={customThemePanelOpen}
        mode={activeMode}
        customThemeVars={customThemeVars}
        onOpenChange={setCustomThemePanelOpen}
        onTokenChange={handleCustomTokenChange}
        onResetMode={handleResetMode}
        onResetAll={handleResetAllModes}
      />
    </div>
  )
}
