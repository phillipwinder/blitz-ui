"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import {
  CUSTOM_THEME_TOKEN_GROUPS,
  type CustomThemeToken,
  type CustomThemeVars,
} from "@/lib/custom-theme"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { ColorTokenInput } from "@/app/(create)/components/custom-theme-submenu"

type ThemeMode = "light" | "dark"

interface CustomThemePanelProps {
  open: boolean
  mode: ThemeMode
  customThemeVars: CustomThemeVars
  onOpenChange: (open: boolean) => void
  onTokenChange: (token: CustomThemeToken, value: string) => void
  onResetMode: () => void
  onResetAll: () => void
}

export function CustomThemePanel({
  open,
  mode,
  customThemeVars,
  onOpenChange,
  onTokenChange,
  onResetMode,
  onResetAll,
}: CustomThemePanelProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full max-w-none gap-0 p-0 sm:max-w-xl">
        <SheetHeader className="border-border gap-3 border-b p-4 pr-14">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <SheetTitle>Custom Theme Colors</SheetTitle>
              <Badge variant="secondary">Editing: {mode === "dark" ? "Dark" : "Light"}</Badge>
            </div>
            <SheetDescription>
              Tune color tokens for the active mode. Changes preview immediately.
            </SheetDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" size="sm" onClick={onResetMode}>
              Reset Mode
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={onResetAll}>
              Reset All
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </SheetHeader>

        <div className="text-muted-foreground border-border border-b px-4 py-2 text-xs">
          Accepted formats: <code>oklch(...)</code>, <code>hsl(...)</code>, <code>rgb(...)</code>, or
          <code> #hex</code>.
        </div>

        <ScrollArea className="min-h-0 flex-1">
          <div className="space-y-2 p-4">
            {CUSTOM_THEME_TOKEN_GROUPS.map((group, index) => (
              <Collapsible key={group.id} defaultOpen={index < 2} className="border-border group/section rounded-md border">
                <CollapsibleTrigger className="hover:bg-muted/40 flex w-full items-center justify-between px-3 py-2 text-left text-sm font-medium">
                  {group.label}
                  <ChevronDownIcon className="text-muted-foreground size-4 transition-transform group-data-[state=open]/section:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden">
                  <div className="space-y-2 border-t p-3">
                    {group.tokens.map((token) => (
                      <ColorTokenInput
                        key={token}
                        token={token}
                        value={customThemeVars[mode][token] ?? ""}
                        onChange={(value) => onTokenChange(token, value)}
                      />
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
