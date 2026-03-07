import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { auth } from "@/lib/auth"
import { SettingsSidebar } from "@/app/(app)/settings/components/settings-sidebar"

export default async function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect("/")
  }

  return (
    <main className="container-wrapper flex-1 py-8 md:py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 md:flex-row md:gap-8">
        <SettingsSidebar />
        <div className="w-full min-w-0 flex-1">{children}</div>
      </div>
    </main>
  )
}
