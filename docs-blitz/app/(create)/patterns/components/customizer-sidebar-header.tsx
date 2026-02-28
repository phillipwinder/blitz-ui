"use client"

import { PanelRightClose, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

import { useCustomizer } from "./patterns-provider"

export function CustomizerSidebarHeader() {
  const { toggleCustomizer } = useCustomizer()

  return (
    <div className="border-border/80 flex h-[51px] shrink-0 items-center justify-between overflow-hidden border-b px-4">
      <div className="min-w-0 flex-1 whitespace-nowrap">
        <h2 className="text-foreground inline-flex items-center gap-1 font-medium">
          <Zap className="text-muted-foreground size-4" />
          <span className="text-sm leading-none">Theme editor</span>
        </h2>
        <p className="text-muted-foreground text-xs leading-none">Adjust theme settings</p>
      </div>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={toggleCustomizer}
            className="shrink-0 opacity-60 hover:bg-transparent hover:opacity-100"
          >
            <PanelRightClose />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="flex items-center gap-2 pr-1">
          Close sidebar <Kbd>C</Kbd>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
