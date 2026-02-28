"use client"

import * as React from "react"
import { CheckIcon, ChevronDownIcon } from "lucide-react"

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
import { FONTS, type Font } from "@/app/(create)/lib/fonts"
import { useDesignSystemSearchParams } from "@/app/(create)/lib/search-params"

export function FontSelect({ className }: { className?: string }) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const [params, setParams] = useDesignSystemSearchParams()
  const [config, setConfig] = useConfig()

  const effectiveFont = params.font ?? config.font

  const filteredFonts = React.useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) {
      return FONTS
    }

    return FONTS.filter((font) => {
      return font.name.toLowerCase().includes(term) || font.value.toLowerCase().includes(term)
    })
  }, [search])

  const currentFont = React.useMemo(
    () => FONTS.find((font) => font.value === effectiveFont),
    [effectiveFont]
  )

  const handleSelectFont = React.useCallback(
    (font: Font) => {
      const nextFont = { font: font.value }
      setParams(nextFont)
      setConfig((prev) => ({ ...prev, ...nextFont }))
    },
    [setConfig, setParams]
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className={cn("h-11 w-full justify-between rounded-md px-3", className)}
        >
          <div className="flex min-w-0 items-center gap-2">
            <div
              className="text-muted-foreground flex size-5 items-center justify-center text-xs"
              style={{ fontFamily: currentFont?.font.style.fontFamily }}
            >
              Aa
            </div>
            <div className="min-w-0 text-left">
              <div className="text-muted-foreground text-xs">Font</div>
              <div className="truncate text-sm font-medium">{currentFont?.name ?? "Default"}</div>
            </div>
          </div>
          <ChevronDownIcon className="text-muted-foreground size-4 shrink-0" />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="start" className="w-80 p-0">
        <Command shouldFilter={false}>
          <CommandInput value={search} onValueChange={setSearch} placeholder="Search fonts..." />
          <CommandList>
            <CommandEmpty>No fonts found.</CommandEmpty>
            <CommandGroup heading="Fonts">
              {filteredFonts.map((font) => {
                const selected = effectiveFont === font.value

                return (
                  <CommandItem key={`font-${font.value}`} onSelect={() => handleSelectFont(font)}>
                    <div className="flex min-w-0 items-center gap-2">
                      <div
                        className="text-muted-foreground flex size-5 items-center justify-center text-xs"
                        style={{ fontFamily: font.font.style.fontFamily }}
                      >
                        Aa
                      </div>
                      <div className="min-w-0">
                        <div className="truncate">{font.name}</div>
                        <div
                          className="text-muted-foreground truncate text-xs"
                          style={{ fontFamily: font.font.style.fontFamily }}
                        >
                          Designers love quirky glyphs.
                        </div>
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
