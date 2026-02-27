// Description: Hover card with positions.
// Order: 2

import { Button } from "@/registry/bases/radix/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/registry/bases/radix/ui/hover-card"

// Only include supported sides for HoverCardContent
const sides = ["left", "top", "bottom", "right"] as const

export default function Pattern() {
  return (
    <div className="grid grid-cols-3 gap-2">
      {sides.map((side) => (
        <HoverCard key={side} openDelay={100} closeDelay={100}>
          <HoverCardTrigger asChild>
            <Button variant="outline" className="flex-1 capitalize">
              {side}
            </Button>
          </HoverCardTrigger>

          <HoverCardContent side={side}>
            <div className="flex flex-col gap-1">
              <h4 className="font-medium">Hover Card</h4>
              <p className="text-muted-foreground">
                This hover card appears on the {side} side of the trigger.
              </p>
            </div>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  )
}
