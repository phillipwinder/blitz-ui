// Description: Badge rendered as a link
// Order: 23

import Link from "next/link"
import { Badge } from "@/registry-blitz-ui/bases/base/blitz-ui/badge"

export default function Pattern() {
  return (
    <Badge variant="outline" render={<Link href="#" />}>
      Badge
    </Badge>
  )
}
