// Description: Ghost button with a status badge
// Order: 47

import { Badge } from "@/registry-blitz-ui/bases/base/blitz-ui/badge"

import { Button } from "@/registry/bases/base/ui/button"

export default function Pattern() {
  return (
    <Button aria-label="Updates (new)">
      Updates
      <Badge variant="success" size="xs" aria-hidden="true">
        New
      </Badge>
    </Button>
  )
}
