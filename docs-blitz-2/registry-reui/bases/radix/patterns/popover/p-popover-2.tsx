// Description: Popovers opening from different sides.
// Order: 2

import { Button } from "@/registry/bases/radix/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/bases/radix/ui/popover"

const sides = ["left", "top", "bottom", "right"] as const

export default function Pattern() {
  return (
    <div className="grid grid-cols-3 gap-2">
      {sides.map((side) => (
        <Popover key={side}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full capitalize">
              {side}
            </Button>
          </PopoverTrigger>
          <PopoverContent side={side} className="w-40">
            <p>Popover on {side}</p>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  )
}
