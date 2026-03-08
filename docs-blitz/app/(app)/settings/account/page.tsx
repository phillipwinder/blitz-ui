import { DeleteAccountSection } from "@/app/(app)/settings/account/components/delete-account-section"
import { SignInMethodsSection } from "@/app/(app)/settings/account/components/sign-in-methods-section"
import { SettingsHeader } from "@/app/(app)/settings/components/settings-header"

export default function SettingsAccountPage() {
  return (
    <div>
      <SettingsHeader title="Account" description="Manage your account settings" />
      <div className="space-y-6">
        <SignInMethodsSection />
        <DeleteAccountSection />
      </div>
    </div>
  )
}
