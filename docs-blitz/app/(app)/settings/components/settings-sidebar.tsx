"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { UserCog } from "lucide-react"

import { cn, isActive } from "@/lib/utils"

const navItems = [{ href: "/settings/account", label: "Account", icon: UserCog }]

export function SettingsSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-full shrink-0 md:w-56">
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const active = isActive(pathname, item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "hover:bg-accent hover:text-accent-foreground flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active && "bg-accent text-accent-foreground"
              )}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
