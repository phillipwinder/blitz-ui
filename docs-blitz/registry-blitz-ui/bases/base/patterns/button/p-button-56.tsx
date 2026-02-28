// Description: Outline button with avatar
// Order: 56

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/bases/base/ui/avatar"
import { Button } from "@/registry/bases/base/ui/button"

export default function Pattern() {
  return (
    <Button variant="outline">
      <Avatar className="size-5">
        <AvatarImage src="https://github.com/phillipwinder.png" alt="@phillip_winder" />
        <AvatarFallback>PW</AvatarFallback>
      </Avatar>
      <span className="text-xs">@phillip_winder</span>
    </Button>
  )
}
