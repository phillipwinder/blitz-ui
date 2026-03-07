import { fireEvent, render, screen, waitFor, within } from "@mui/internal-test-utils"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { DeleteAccountSection } from "@/app/(app)/settings/account/components/delete-account-section"

const { pushMock, refreshMock, deleteAccountMock, signOutMock, toastErrorMock } = vi.hoisted(
  () => ({
    pushMock: vi.fn(),
    refreshMock: vi.fn(),
    deleteAccountMock: vi.fn(),
    signOutMock: vi.fn(),
    toastErrorMock: vi.fn(),
  })
)

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
    refresh: refreshMock,
  }),
}))

vi.mock("sonner", () => ({
  toast: {
    error: toastErrorMock,
  },
}))

vi.mock("@/app/(app)/settings/actions", () => ({
  deleteAccount: deleteAccountMock,
}))

vi.mock("@/lib/auth-client", () => ({
  authClient: {
    signOut: signOutMock,
  },
}))

describe("<DeleteAccountSection />", () => {
  beforeEach(() => {
    deleteAccountMock.mockResolvedValue({ success: true })
    signOutMock.mockResolvedValue(undefined)
  })

  function openDialog() {
    fireEvent.click(screen.getByRole("button", { name: "Delete Account" }))
    return screen.getByRole("alertdialog")
  }

  it("keeps delete disabled until DELETE is typed", () => {
    render(<DeleteAccountSection />)

    const dialog = openDialog()
    const confirmInput = within(dialog).getByLabelText(/type delete to confirm/i)
    const confirmButton = within(dialog).getByRole("button", {
      name: "Delete Account",
    })

    expect(confirmButton).to.have.property("disabled", true)

    fireEvent.change(confirmInput, { target: { value: "DELETE" } })

    expect(confirmButton).to.have.property("disabled", false)
  })

  it("resets the confirmation text when the dialog closes", () => {
    render(<DeleteAccountSection />)

    let dialog = openDialog()
    const confirmInput = within(dialog).getByLabelText(/type delete to confirm/i)

    fireEvent.change(confirmInput, { target: { value: "DELETE" } })
    fireEvent.click(within(dialog).getByRole("button", { name: "Cancel" }))

    expect(screen.queryByRole("alertdialog")).to.equal(null)

    dialog = openDialog()

    expect(within(dialog).getByLabelText(/type delete to confirm/i)).to.have.value("")
  })

  it("signs out and redirects after a successful deletion", async () => {
    render(<DeleteAccountSection />)

    const dialog = openDialog()
    fireEvent.change(within(dialog).getByLabelText(/type delete to confirm/i), {
      target: { value: "DELETE" },
    })
    fireEvent.click(within(dialog).getByRole("button", { name: "Delete Account" }))

    await waitFor(() => {
      expect(deleteAccountMock).toHaveBeenCalledTimes(1)
      expect(signOutMock).toHaveBeenCalledTimes(1)
      expect(pushMock).toHaveBeenCalledWith("/")
      expect(refreshMock).toHaveBeenCalledTimes(1)
    })
  })

  it("shows an error toast and keeps the dialog usable after a failed deletion", async () => {
    deleteAccountMock.mockResolvedValueOnce({
      success: false,
      error: "No account could be deleted.",
    })

    render(<DeleteAccountSection />)

    const dialog = openDialog()
    fireEvent.change(within(dialog).getByLabelText(/type delete to confirm/i), {
      target: { value: "DELETE" },
    })
    const confirmButton = within(dialog).getByRole("button", {
      name: "Delete Account",
    })

    fireEvent.click(confirmButton)

    await waitFor(() => {
      expect(toastErrorMock).toHaveBeenCalledWith("Failed to delete account", {
        description: "No account could be deleted.",
      })
    })

    expect(signOutMock).not.toHaveBeenCalled()
    expect(confirmButton).to.have.property("disabled", false)
    expect(within(screen.getByRole("alertdialog")).getByLabelText(/type delete to confirm/i)).to.have.property(
      "disabled",
      false
    )
  })
})
