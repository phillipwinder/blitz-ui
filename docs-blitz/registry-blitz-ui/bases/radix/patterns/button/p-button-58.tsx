// Description: Small outline button with avatar
// Order: 58

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/bases/radix/ui/avatar"
import { Button } from "@/registry/bases/radix/ui/button"

export default function Pattern() {
  return (
    <Button variant="outline" size="sm">
      <Avatar className="size-5">
        <AvatarImage src="https://github.com/phillipwinder.png" alt="@phillip_winder" />
        <AvatarFallback>PW</AvatarFallback>
      </Avatar>
      <span className="text-xs">@phillip_winder</span>
    </Button>
  )
}
