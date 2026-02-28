"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface CustomizerCollapsibleSectionProps {
  title: React.ReactNode
  children: React.ReactNode
  defaultOpen?: boolean
}

export function CustomizerCollapsibleSection({
  title,
  children,
  defaultOpen = false,
}: CustomizerCollapsibleSectionProps) {
  return (
    <Collapsible
      defaultOpen={defaultOpen}
      className="border-border group/section overflow-hidden rounded-md border"
    >
      <CollapsibleTrigger className="bg-background hover:bg-muted flex w-full items-center justify-between px-3 py-2 text-left text-xs font-medium">
        {title}
        <ChevronDownIcon className="text-muted-foreground size-4 transition-transform group-data-[state=open]/section:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden">
        <div className="bg-background border-t p-2">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  )
}
