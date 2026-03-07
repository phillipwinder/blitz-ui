"use client"

import * as React from "react"

import { AlertTriangleIcon, Loader2Icon } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { deleteAccount } from "@/app/(app)/settings/actions"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"

const CONFIRMATION_TEXT = "DELETE"

export function DeleteAccountSection() {
  const [open, setOpen] = React.useState(false)
  const [confirmText, setConfirmText] = React.useState("")
  const [isDeleting, setIsDeleting] = React.useState(false)
  const router = useRouter()

  const isConfirmed = confirmText === CONFIRMATION_TEXT

  async function handleDelete() {
    if (!isConfirmed || isDeleting) {
      return
    }

    setIsDeleting(true)

    const result = await deleteAccount()

    if (!result.success) {
      toast.error("Failed to delete account", {
        description: result.error,
      })
      setIsDeleting(false)
      return
    }

    await authClient.signOut()
    router.push("/")
    router.refresh()
  }

  function handleOpenChange(nextOpen: boolean) {
    if (isDeleting) {
      return
    }

    setOpen(nextOpen)

    if (!nextOpen) {
      setConfirmText("")
    }
  }

  return (
    <React.Fragment>
      <div className="border-destructive/40 rounded-xl border p-6">
        <h2 className="text-destructive text-lg font-semibold">Danger Zone</h2>
        <p className="text-muted-foreground mt-1 max-w-2xl text-sm">
          Permanently delete your account and all associated data. This action cannot be
          undone.
        </p>
        <Button variant="destructive" className="mt-4" onClick={() => setOpen(true)}>
          Delete Account
        </Button>
      </div>

      <AlertDialog open={open} onOpenChange={handleOpenChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangleIcon className="text-destructive size-5" />
              Delete your account
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-3">
                <p>
                  This will permanently delete your account and all associated data,
                  including:
                </p>
                <ul className="list-disc space-y-1 pl-5">
                  <li>Saved themes</li>
                  <li>Published community themes</li>
                  <li>AI usage history</li>
                  <li>Active subscriptions</li>
                </ul>
                <p className="font-medium text-foreground">This action cannot be undone.</p>
                <div className="pt-1">
                  <label htmlFor="confirm-delete" className="text-sm font-medium">
                    Type <span className="font-mono font-semibold">{CONFIRMATION_TEXT}</span> to
                    confirm
                  </label>
                  <Input
                    id="confirm-delete"
                    className="mt-1.5"
                    value={confirmText}
                    onChange={(event) => setConfirmText(event.target.value)}
                    placeholder={CONFIRMATION_TEXT}
                    autoComplete="off"
                    disabled={isDeleting}
                  />
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={!isConfirmed || isDeleting}
            >
              {isDeleting ? <Loader2Icon className="size-4 animate-spin" /> : null}
              Delete Account
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </React.Fragment>
  )
}
