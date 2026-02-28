"use client"

import * as React from "react"
import { formatHex, parse } from "culori"
import { CheckIcon, Grid2X2Icon, ListIcon, PaletteIcon } from "lucide-react"
import tailwindColors from "tailwindcss/colors"
import { useTimeout } from "@base-ui/utils/useTimeout"

import { CUSTOM_THEME_TOKEN_LABELS, type CustomThemeToken } from "@/lib/custom-theme"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type TailwindColorOption = {
  id: string
  key: string
  palette: string
  shade: string
  value: string
}

type TailwindPalette = {
  key: string
  label: string
  colors: TailwindColorOption[]
}

const SHADE_KEY_REGEX = /^\d+$/

const TAILWIND_PALETTES: TailwindPalette[] = Object.entries(tailwindColors)
  .map(([paletteKey, paletteValue]) => {
    if (!paletteValue || typeof paletteValue !== "object") {
      return null
    }

    const paletteEntries = Object.entries(paletteValue as Record<string, string>)
      .filter(([shade, color]) => SHADE_KEY_REGEX.test(shade) && typeof color === "string")
      .map(([shade, color]) => ({
        id: `${paletteKey}-${shade}`,
        key: `${paletteKey}-${shade}`,
        palette: paletteKey,
        shade,
        value: color,
      }))

    if (paletteEntries.length === 0) {
      return null
    }

    return {
      key: paletteKey,
      label: paletteKey.charAt(0).toUpperCase() + paletteKey.slice(1),
      colors: paletteEntries,
    }
  })
  .filter((palette): palette is TailwindPalette => palette !== null)

function normalizeColorValue(color: string) {
  const parsed = parse(color)
  return parsed ? formatHex(parsed) : null
}

function toColorInputValue(color: string) {
  return normalizeColorValue(color) ?? "#000000"
}

function isColorMatch(valueA: string, valueB: string) {
  const normalizedA = normalizeColorValue(valueA)
  const normalizedB = normalizeColorValue(valueB)

  if (normalizedA && normalizedB) {
    return normalizedA === normalizedB
  }

  return valueA.trim().toLowerCase() === valueB.trim().toLowerCase()
}

export function ColorTokenInput({
  token,
  value,
  onChange,
}: {
  token: CustomThemeToken
  value: string
  onChange: (value: string) => void
}) {
  const label = CUSTOM_THEME_TOKEN_LABELS[token]
  const colorChangeTimeout = useTimeout()
  const [draftValue, setDraftValue] = React.useState(value)

  React.useEffect(() => {
    setDraftValue(value)
  }, [value])

  const handleImmediateChange = React.useCallback(
    (nextValue: string) => {
      colorChangeTimeout.clear()
      setDraftValue(nextValue)
      onChange(nextValue)
    },
    [colorChangeTimeout, onChange]
  )

  const handleDebouncedColorChange = React.useCallback(
    (nextValue: string) => {
      setDraftValue(nextValue)
      colorChangeTimeout.start(40, () => {
        onChange(nextValue)
      })
    },
    [colorChangeTimeout, onChange]
  )

  return (
    <div className="space-y-1.5">
      <div className="text-muted-foreground px-0.5 text-xs">{label}</div>
      <div className="flex items-center gap-1.5">
        <label
          className="border-input relative flex size-8 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-md border"
          style={
            {
              backgroundColor: draftValue || "transparent",
            } as React.CSSProperties
          }
        >
          <input
            type="color"
            value={toColorInputValue(draftValue)}
            onChange={(event) => handleDebouncedColorChange(event.target.value)}
            onBlur={(event) => handleImmediateChange(event.target.value)}
            className="absolute inset-0 size-full cursor-pointer opacity-0"
            aria-label={`Pick ${label} color`}
          />
          <span className="border-foreground/20 pointer-events-none absolute inset-0 rounded-[inherit] border" />
        </label>
        <Input
          value={draftValue}
          onChange={(event) => handleImmediateChange(event.target.value)}
          className="h-8 text-xs"
          placeholder="oklch(...) | hsl(...) | rgb(...) | #hex"
          aria-label={`${label} value`}
        />
        <TailwindColorPopover currentColor={draftValue} onChange={handleImmediateChange} />
      </div>
    </div>
  )
}

export function TailwindColorPopover({
  currentColor,
  onChange,
}: {
  currentColor: string
  onChange: (color: string) => void
}) {
  const [open, setOpen] = React.useState(false)
  const [tab, setTab] = React.useState<"list" | "palette">("list")

  const handleSelect = React.useCallback(
    (color: string) => {
      onChange(color)
      setOpen(false)
    },
    [onChange]
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="border-input size-8 rounded-md border"
          aria-label="Choose Tailwind color"
        >
          <PaletteIcon className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[320px] p-0">
        <div className="border-border border-b p-2">
          <Tabs
            value={tab}
            onValueChange={(value) => {
              if (value === "list" || value === "palette") {
                setTab(value)
              }
            }}
            className="gap-0"
          >
            <TabsList className="w-full">
              <TabsTrigger value="list" className="flex-1 gap-1">
                <ListIcon className="size-4" />
                List
              </TabsTrigger>
              <TabsTrigger value="palette" className="flex-1 gap-1">
                <Grid2X2Icon className="size-4" />
                Palette
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {tab === "list" ? (
          <Command className="rounded-none">
            <CommandInput placeholder="Search Tailwind colors..." />
            <ScrollArea className="h-64">
              <CommandList className="max-h-none">
                <CommandEmpty>No Tailwind color found.</CommandEmpty>
                {TAILWIND_PALETTES.map((palette) => (
                  <CommandGroup key={palette.key} heading={palette.label}>
                    {palette.colors.map((option) => {
                      const selected = isColorMatch(currentColor, option.value)
                      return (
                        <CommandItem
                          key={option.id}
                          value={option.key}
                          onSelect={() => handleSelect(option.value)}
                          className="gap-2"
                        >
                          <ColorSwatch
                            color={option.value}
                            label={option.key}
                            isSelected={selected}
                            size="sm"
                          />
                          <span>{option.key}</span>
                          {selected && <CheckIcon className="ml-auto size-4 opacity-70" />}
                        </CommandItem>
                      )
                    })}
                  </CommandGroup>
                ))}
              </CommandList>
            </ScrollArea>
          </Command>
        ) : (
          <ScrollArea className="h-64">
            <div className="space-y-1 p-1">
              {TAILWIND_PALETTES.map((palette) => (
                <div key={palette.key} className="flex gap-1">
                  {palette.colors.map((option) => (
                    <ColorSwatch
                      key={option.id}
                      color={option.value}
                      label={option.key}
                      isSelected={isColorMatch(currentColor, option.value)}
                      onClick={() => handleSelect(option.value)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </PopoverContent>
    </Popover>
  )
}

function ColorSwatch({
  color,
  label,
  isSelected,
  size = "md",
  className,
  ...props
}: React.ComponentProps<"button"> & {
  color: string
  label: string
  isSelected: boolean
  size?: "sm" | "md"
}) {
  return (
    <button
      type="button"
      className={cn(
        "relative rounded border transition-transform hover:z-10 hover:scale-110",
        size === "sm" ? "size-5" : "size-6",
        isSelected && "ring-2 ring-current ring-offset-1",
        className
      )}
      style={
        {
          backgroundColor: color,
        } as React.CSSProperties
      }
      aria-label={`Select ${label}`}
      title={label}
      {...props}
    />
  )
}
