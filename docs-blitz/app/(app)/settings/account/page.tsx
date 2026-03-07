import { DeleteAccountSection } from "@/app/(app)/settings/account/components/delete-account-section"
import { SettingsHeader } from "@/app/(app)/settings/components/settings-header"

export default function SettingsAccountPage() {
  return (
    <div>
      <SettingsHeader title="Account" description="Manage your account settings" />
      <DeleteAccountSection />
    </div>
  )
}
