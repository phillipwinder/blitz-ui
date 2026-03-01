"use client"

import * as React from "react"
import { Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

import { useCustomizer } from "./patterns-provider"

export function CustomizerSidebarToggle() {
  const { customizerOpen, openCustomizer, toggleCustomizer, editThemeButtonRef } = useCustomizer()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "c" || e.key === "C") && !e.metaKey && !e.ctrlKey) {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return
        }

        e.preventDefault()
        toggleCustomizer()
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [toggleCustomizer])

  if (customizerOpen) {
    return null
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button ref={editThemeButtonRef} variant="outline" size="sm" onClick={openCustomizer}>
          <Zap className="size-3.5" />
          <span className="text-xm leading-none">Edit theme</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right" className="flex items-center gap-2">
        Toggle theme customizer
        <Kbd>C</Kbd>
      </TooltipContent>
    </Tooltip>
  )
}
