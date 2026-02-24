// Description: Large phone input
// Order: 3

import { PhoneInput } from "@/registry-blitz-ui/bases/base/blitz-ui/phone-input"

export default function Pattern() {
  return (
    <PhoneInput
      variant="lg"
      placeholder="Enter phone number"
      defaultCountry="US"
      value="+12125551234"
    />
  )
}
