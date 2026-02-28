// Description: Avatar with grayscale image filter
// Order: 17

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/registry/bases/radix/ui/avatar"

export default function Pattern() {
  return (
    <Avatar>
      <AvatarImage
        src="https://github.com/phillipwinder.png"
        alt="@phillip_winder"
        className="grayscale"
      />
      <AvatarFallback>PW</AvatarFallback>
    </Avatar>
  )
}
