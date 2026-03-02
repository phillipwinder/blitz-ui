"use client"

import { Loader2Icon, LogOutIcon } from "lucide-react"
import { useRouter } from "next/navigation"

import { authClient } from "@/lib/auth-client"
import { useAuthStore } from "@/store/auth-store"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function UserProfileDropdown() {
  const { data: session, isPending } = authClient.useSession()
  const { openAuthDialog } = useAuthStore()
  const router = useRouter()

  const handleLogOut = async () => {
    await authClient.signOut()
    router.refresh()
  }

  if (isPending) {
    return (
      <div className="flex size-8 items-center justify-center">
        <Loader2Icon className="text-muted-foreground size-5 animate-spin" />
      </div>
    )
  }

  if (!session?.user) {
    return (
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          onClick={() => openAuthDialog("signin")}
          className="hidden h-8 px-2 md:inline-flex"
        >
          Sign In
        </Button>
        <Button onClick={() => openAuthDialog("signup")} className="h-8">
          Sign Up
        </Button>
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative isolate size-8 rounded-full">
          <Avatar className="size-8">
            <AvatarImage src={session.user.image || ""} alt={session.user.name || ""} />
            <AvatarFallback>{session.user.name?.[0] || "U"}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-0.5">
            <p className="text-sm leading-tight font-medium">{session.user.name}</p>
            <p className="text-muted-foreground text-xs leading-tight">{session.user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogOut}
          className="text-destructive focus:text-destructive"
        >
          <LogOutIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
