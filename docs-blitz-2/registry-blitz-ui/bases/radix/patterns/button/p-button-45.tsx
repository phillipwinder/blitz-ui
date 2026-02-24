// Description: Outline button with inline count badge
// Order: 45

import { Badge } from "@/registry-blitz-ui/bases/radix/blitz-ui/badge"

import { Button } from "@/registry/bases/radix/ui/button"

export default function Pattern() {
  return (
    <Button variant="outline" className="gap-2" aria-label="Messages (12)">
      Messages
      <Badge variant="destructive-outline" size="sm" aria-hidden="true">
        12
      </Badge>
    </Button>
  )
}
