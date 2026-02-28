"use client"

import * as React from "react"
import { converter, formatHex, type Hsl } from "culori"
import {
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
  CUSTOM_THEME_TOKENS,
  isCustomThemeVarsInitialized,
  seedCustomThemeVars,
  type CustomThemeToken,
  type CustomThemeVars,
} from "@/lib/custom-theme"
import { cn } from "@/lib/utils"
import { useConfig } from "@/hooks/use-config"
import { Button } from "@/components/ui/button"
import { FieldGroup } from "@/components/ui/field"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { ModeSwitcher } from "@/components/mode-switcher"
import { PRESETS, STYLES } from "@/registry/config"
import { MenuAccentPicker } from "@/app/(create)/components/accent-picker"
import { BaseColorPicker } from "@/app/(create)/components/base-color-picker"
import { ColorThemeSelect } from "@/app/(create)/components/color-theme-select"
import { ColorTokenInput } from "@/app/(create)/components/custom-theme-submenu"
import { CustomizerCollapsibleSection } from "@/app/(create)/components/customizer-collapsible-section"
import { FontSelect } from "@/app/(create)/components/font-select"
import { IconLibraryPicker } from "@/app/(create)/components/icon-library-picker"
import { MenuColorPicker } from "@/app/(create)/components/menu-picker"
import { PresetPicker } from "@/app/(create)/components/preset-picker"
import { RadiusPicker } from "@/app/(create)/components/radius-picker"
import { RandomButton } from "@/app/(create)/components/random-button"
import { ResetButton } from "@/app/(create)/components/reset-button"
import { SliderWithInput } from "@/app/(create)/components/slider-with-input"
import { StylePicker } from "@/app/(create)/components/style-picker"
import { useDesignSystemSearchParams } from "@/app/(create)/lib/search-params"

interface CustomizerSidebarContentProps {
  isMobile: boolean
  anchorRef: React.RefObject<HTMLDivElement | null>
}

type SectionKey = "general" | "colors" | "typography" | "other"
type ThemeMode = "light" | "dark"
type HslAdjustments = {
  hueShift: number
  saturationScale: number
  lightnessScale: number
}

const DEFAULT_HSL_ADJUSTMENTS: HslAdjustments = {
  hueShift: 0,
  saturationScale: 1,
  lightnessScale: 1,
}

const HSL_PRESETS: Array<{
  label: string
  adjustments: HslAdjustments
}> = [
  { label: "Hue -120°", adjustments: { hueShift: -120, saturationScale: 1, lightnessScale: 1 } },
  { label: "Hue -60°", adjustments: { hueShift: -60, saturationScale: 1, lightnessScale: 1 } },
  { label: "Hue +60°", adjustments: { hueShift: 60, saturationScale: 1, lightnessScale: 1 } },
  { label: "Hue +120°", adjustments: { hueShift: 120, saturationScale: 1, lightnessScale: 1 } },
  { label: "Hue invert", adjustments: { hueShift: 180, saturationScale: 1, lightnessScale: 1 } },
  { label: "Grayscale", adjustments: { hueShift: 0, saturationScale: 0, lightnessScale: 1 } },
  { label: "Muted", adjustments: { hueShift: 0, saturationScale: 0.6, lightnessScale: 1 } },
  { label: "Vibrant", adjustments: { hueShift: 0, saturationScale: 1.4, lightnessScale: 1 } },
  { label: "Dimmer", adjustments: { hueShift: 0, saturationScale: 1, lightnessScale: 0.8 } },
  { label: "Brighter", adjustments: { hueShift: 0, saturationScale: 1, lightnessScale: 1.2 } },
  {
    label: "H(+30) S(-50) L(-5%)",
    adjustments: { hueShift: 30, saturationScale: 0.5, lightnessScale: 0.95 },
  },
  {
    label: "H(-20) S(+20) L(+5%)",
    adjustments: { hueShift: -20, saturationScale: 1.2, lightnessScale: 1.05 },
  },
  {
    label: "H(+20) S(-30) L(-5%)",
    adjustments: { hueShift: 20, saturationScale: 0.7, lightnessScale: 0.95 },
  },
  {
    label: "H(-10) S(-25) L(+10%)",
    adjustments: { hueShift: -10, saturationScale: 0.75, lightnessScale: 1.1 },
  },
  {
    label: "H(+60) S(+50) L(+10%)",
    adjustments: { hueShift: 60, saturationScale: 1.5, lightnessScale: 1.1 },
  },
]

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

function parseLetterSpacingValue(value: string | undefined) {
  if (!value) {
    return 0
  }

  const normalized = value.trim().toLowerCase()
  if (normalized === "normal") {
    return 0
  }

  const parsed = Number.parseFloat(normalized)
  if (Number.isNaN(parsed)) {
    return 0
  }

  if (normalized.endsWith("px")) {
    return parsed / 16
  }

  return parsed
}

function isDefaultHslAdjustments(adjustments: HslAdjustments) {
  return (
    adjustments.hueShift === DEFAULT_HSL_ADJUSTMENTS.hueShift &&
    adjustments.saturationScale === DEFAULT_HSL_ADJUSTMENTS.saturationScale &&
    adjustments.lightnessScale === DEFAULT_HSL_ADJUSTMENTS.lightnessScale
  )
}

function adjustColorByHsl(color: string, adjustments: HslAdjustments) {
  const hsl = converter("hsl")(color)
  const h = hsl?.h
  const s = hsl?.s
  const l = hsl?.l

  if (h === undefined || s === undefined || l === undefined) {
    return color
  }

  return formatHex({
    mode: "hsl",
    h: (((h + adjustments.hueShift) % 360) + 360) % 360,
    s: Math.min(1, Math.max(0, s * adjustments.saturationScale)),
    l: Math.min(1, Math.max(0.1, l * adjustments.lightnessScale)),
  } as Hsl)
}

function applyHslAdjustments(
  themeVars: CustomThemeVars,
  adjustments: HslAdjustments
): CustomThemeVars {
  if (isDefaultHslAdjustments(adjustments)) {
    return {
      light: { ...themeVars.light },
      dark: { ...themeVars.dark },
    }
  }

  const applyMode = (mode: ThemeMode) =>
    Object.fromEntries(
      CUSTOM_THEME_TOKENS.map((token) => {
        const value = themeVars[mode][token] ?? ""
        if (token === "letter-spacing") {
          return [token, value]
        }
        return [token, adjustColorByHsl(value, adjustments)]
      })
    ) as CustomThemeVars[ThemeMode]

  return {
    light: applyMode("light"),
    dark: applyMode("dark"),
  }
}

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
  const [hslAdjustments, setHslAdjustments] =
    React.useState<HslAdjustments>(DEFAULT_HSL_ADJUSTMENTS)
  const hslSourceThemeVarsRef = React.useRef<CustomThemeVars | null>(null)

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

  const letterSpacingValue = React.useMemo(
    () => parseLetterSpacingValue(effectiveThemeVars[activeMode]["letter-spacing"]),
    [activeMode, effectiveThemeVars]
  )

  const applySidebarHslAdjustments = React.useCallback(
    (nextAdjustments: HslAdjustments) => {
      const startingFromDefault = isDefaultHslAdjustments(hslAdjustments)
      const sourceThemeVars =
        startingFromDefault && !isDefaultHslAdjustments(nextAdjustments)
          ? effectiveThemeVars
          : (hslSourceThemeVarsRef.current ?? effectiveThemeVars)

      if (startingFromDefault && !isDefaultHslAdjustments(nextAdjustments)) {
        hslSourceThemeVarsRef.current = sourceThemeVars
      }

      if (isDefaultHslAdjustments(nextAdjustments)) {
        hslSourceThemeVarsRef.current = null
      }

      const nextThemeVars = applyHslAdjustments(sourceThemeVars, nextAdjustments)
      setParams({ custom: true })
      setConfig((prev) => ({
        ...prev,
        custom: true,
        customThemeVars: nextThemeVars,
      }))
      setHslAdjustments(nextAdjustments)
    },
    [effectiveThemeVars, hslAdjustments, setConfig, setParams]
  )

  React.useEffect(() => {
    hslSourceThemeVarsRef.current = null
    setHslAdjustments(DEFAULT_HSL_ADJUSTMENTS)
  }, [effectiveBaseColor, effectiveTheme, effectiveMenuAccent, effectiveRadius])

  const hslPreviewThemeVars = hslSourceThemeVarsRef.current ?? effectiveThemeVars

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

                  {CUSTOM_THEME_TOKEN_GROUPS.map((group) => (
                    <CustomizerCollapsibleSection key={group.id} title={group.label}>
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
                    </CustomizerCollapsibleSection>
                  ))}
                </div>
              )}

              {activeSection === "typography" && (
                <div className="space-y-2 pb-2">
                  <div className="text-muted-foreground text-xs">
                    To use custom fonts, embed them in your project.
                  </div>
                  <FontSelect />
                  <CustomizerCollapsibleSection title="Letter Spacing">
                    <SliderWithInput
                      value={letterSpacingValue}
                      onChange={(value) => {
                        ensureCustomThemeActive()
                        handleCustomTokenChange("letter-spacing", `${value}em`)
                      }}
                      min={-0.5}
                      max={0.5}
                      step={0.025}
                      unit="em"
                      label="Letter Spacing"
                    />
                  </CustomizerCollapsibleSection>
                </div>
              )}

              {activeSection === "other" && (
                <div className="space-y-2">
                  <div className="text-muted-foreground text-xs">Additional theme controls.</div>
                  <CustomizerCollapsibleSection title="HSL Adjustments">
                    <div className="space-y-3">
                      <div className="grid grid-cols-5 gap-2">
                        {HSL_PRESETS.map((preset) => {
                          const selected =
                            hslAdjustments.hueShift === preset.adjustments.hueShift &&
                            hslAdjustments.saturationScale === preset.adjustments.saturationScale &&
                            hslAdjustments.lightnessScale === preset.adjustments.lightnessScale
                          const baseBg = hslPreviewThemeVars[activeMode].background
                          const basePrimary = hslPreviewThemeVars[activeMode].primary
                          const baseSecondary = hslPreviewThemeVars[activeMode].secondary
                          const previewBg = adjustColorByHsl(baseBg, preset.adjustments)
                          const previewPrimary = adjustColorByHsl(basePrimary, preset.adjustments)
                          const previewSecondary = adjustColorByHsl(
                            baseSecondary,
                            preset.adjustments
                          )

                          return (
                            <Tooltip key={preset.label}>
                              <TooltipTrigger asChild>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  aria-label={preset.label}
                                  className={cn(
                                    "relative h-8 w-full overflow-hidden rounded-md p-0 shadow-sm transition-all duration-200",
                                    "hover:scale-105 hover:shadow-md",
                                    selected
                                      ? "ring-primary ring-1 ring-offset-1"
                                      : "border-border border"
                                  )}
                                  style={{ background: previewBg }}
                                  onClick={() => applySidebarHslAdjustments(preset.adjustments)}
                                >
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="flex h-full w-full">
                                      <div
                                        className="h-full w-1/2 rounded-l-md"
                                        style={{ background: previewPrimary }}
                                      />
                                      <div
                                        className="h-full w-1/2 rounded-r-md"
                                        style={{ background: previewSecondary }}
                                      />
                                    </div>
                                  </div>
                                  {selected && (
                                    <div className="bg-primary absolute right-0.5 bottom-0.5 h-2 w-2 rounded-full" />
                                  )}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent side="bottom" className="text-xs font-medium">
                                {preset.label}
                              </TooltipContent>
                            </Tooltip>
                          )
                        })}
                      </div>
                      <SliderWithInput
                        value={hslAdjustments.hueShift}
                        onChange={(value) =>
                          applySidebarHslAdjustments({ ...hslAdjustments, hueShift: value })
                        }
                        min={-180}
                        max={180}
                        step={1}
                        unit="deg"
                        label="Hue Shift"
                      />
                      <SliderWithInput
                        value={hslAdjustments.saturationScale}
                        onChange={(value) =>
                          applySidebarHslAdjustments({
                            ...hslAdjustments,
                            saturationScale: value,
                          })
                        }
                        min={0}
                        max={2}
                        step={0.01}
                        unit="x"
                        label="Saturation Multiplier"
                      />
                      <SliderWithInput
                        value={hslAdjustments.lightnessScale}
                        onChange={(value) =>
                          applySidebarHslAdjustments({ ...hslAdjustments, lightnessScale: value })
                        }
                        min={0.2}
                        max={2}
                        step={0.01}
                        unit="x"
                        label="Lightness Multiplier"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => applySidebarHslAdjustments(DEFAULT_HSL_ADJUSTMENTS)}
                      >
                        Reset adjustments
                      </Button>
                    </div>
                  </CustomizerCollapsibleSection>
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
