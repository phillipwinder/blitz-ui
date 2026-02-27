// Description: Phone input with specific default country
// Order: 7

import { PhoneInput } from "@/registry-blitz-ui/bases/radix/blitz-ui/phone-input"

export default function Pattern() {
  return <PhoneInput defaultCountry="FR" placeholder="Enter phone number" />
}
