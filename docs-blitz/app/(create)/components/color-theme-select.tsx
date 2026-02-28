"use client"

import * as React from "react"
import { CheckIcon, ChevronDownIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import { useConfig } from "@/hooks/use-config"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { getThemesForBaseColor, type Theme } from "@/registry/config"
import { useDesignSystemSearchParams } from "@/app/(create)/lib/search-params"

export function ColorThemeSelect({ className }: { className?: string }) {
  const { resolvedTheme } = useTheme()
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const [params, setParams] = useDesignSystemSearchParams()
  const [config, setConfig] = useConfig()

  const mode: "light" | "dark" = resolvedTheme === "dark" ? "dark" : "light"
  const effectiveBaseColor = params.baseColor ?? config.baseColor
  const effectiveTheme = params.theme ?? config.theme

  const themesForBaseColor = React.useMemo(
    () => getThemesForBaseColor(effectiveBaseColor),
    [effectiveBaseColor]
  )

  const filteredThemes = React.useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) {
      return themesForBaseColor
    }

    return themesForBaseColor.filter((theme) => {
      return theme.title.toLowerCase().includes(term) || theme.name.toLowerCase().includes(term)
    })
  }, [themesForBaseColor, search])

  const getThemePreviewColors = React.useCallback(
    (theme: Theme) => {
      const cssVars = theme.cssVars[mode]
      return [cssVars.primary, cssVars.accent, cssVars.secondary, cssVars.border]
    },
    [mode]
  )

  const currentTheme = React.useMemo(
    () => themesForBaseColor.find((theme) => theme.name === effectiveTheme),
    [effectiveTheme, themesForBaseColor]
  )

  const handleSelectTheme = React.useCallback(
    (theme: Theme) => {
      const nextValues = {
        theme: theme.name,
        custom: false,
      }

      setParams(nextValues)
      setConfig((prev) => ({ ...prev, ...nextValues }))
    },
    [setConfig, setParams]
  )

  const currentPreviewColors = currentTheme ? getThemePreviewColors(currentTheme) : null

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className={cn("h-11 w-full justify-between rounded-md px-3", className)}
        >
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex gap-0.5">
              {(
                currentPreviewColors ?? ["transparent", "transparent", "transparent", "transparent"]
              ).map((color, index) => (
                <span
                  key={`${color}-${index}`}
                  className="border-border size-3 rounded-xs border"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <div className="min-w-0 text-left">
              <div className="text-muted-foreground text-xs">Color theme</div>
              <div className="truncate text-sm font-medium">{currentTheme?.title ?? "Custom"}</div>
            </div>
          </div>
          <ChevronDownIcon className="text-muted-foreground size-4 shrink-0" />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="start" className="w-80 p-0">
        <Command shouldFilter={false}>
          <CommandInput value={search} onValueChange={setSearch} placeholder="Search themes..." />
          <CommandList>
            <CommandEmpty>No themes found.</CommandEmpty>
            <CommandGroup heading="Color themes">
              {filteredThemes.map((theme) => {
                const selected = effectiveTheme === theme.name
                const colors = getThemePreviewColors(theme)

                return (
                  <CommandItem
                    key={`theme-${theme.name}`}
                    onSelect={() => handleSelectTheme(theme)}
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      <div className="flex gap-0.5">
                        {colors.map((color, index) => (
                          <span
                            key={`${theme.name}-${index}`}
                            className="border-border size-3 rounded-xs border"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <div className="min-w-0">
                        <div className="truncate">{theme.title}</div>
                      </div>
                    </div>
                    {selected && <CheckIcon className="ml-auto size-4 opacity-70" />}
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
