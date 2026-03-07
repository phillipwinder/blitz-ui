import { fireEvent, render, screen, waitFor } from "@mui/internal-test-utils"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { AuthDialog } from "@/app/(auth)/components/auth-dialog"

const { signInSocialMock } = vi.hoisted(() => ({
  signInSocialMock: vi.fn(),
}))

vi.mock("@/lib/auth-client", () => ({
  authClient: {
    signIn: {
      social: signInSocialMock,
    },
  },
}))

describe("<AuthDialog />", () => {
  beforeEach(() => {
    signInSocialMock.mockReset()
    window.history.replaceState({}, "", "/settings?tab=account")
  })

  it("shows the account_not_linked message", () => {
    render(
      <AuthDialog
        open
        onOpenChange={() => {}}
        authErrorMessage="An account with this email already exists. Sign in with the method you used when you created the account."
      />
    )

    expect(
      screen.getByText(
        "An account with this email already exists. Sign in with the method you used when you created the account."
      )
    ).not.to.equal(null)
  })

  it("clears the auth error when toggling modes and when the dialog closes", async () => {
    const clearAuthErrorMock = vi.fn()
    const { rerender } = render(
      <AuthDialog
        open
        onOpenChange={() => {}}
        authErrorMessage="An account with this email already exists. Sign in with the method you used when you created the account."
        onClearAuthError={clearAuthErrorMock}
      />
    )

    fireEvent.click(screen.getByRole("button", { name: "Create an account" }))

    expect(clearAuthErrorMock).toHaveBeenCalledTimes(1)

    rerender(
      <AuthDialog
        open={false}
        onOpenChange={() => {}}
        authErrorMessage="An account with this email already exists. Sign in with the method you used when you created the account."
        onClearAuthError={clearAuthErrorMock}
      />
    )

    await waitFor(() => {
      expect(clearAuthErrorMock).toHaveBeenCalledTimes(2)
    })
  })

  it("clears stale auth errors and passes callback and error callback URLs when signing in", async () => {
    const clearAuthErrorMock = vi.fn()
    signInSocialMock.mockResolvedValue(undefined)

    render(
      <AuthDialog
        open
        onOpenChange={() => {}}
        authErrorMessage="An account with this email already exists. Sign in with the method you used when you created the account."
        onClearAuthError={clearAuthErrorMock}
      />
    )

    fireEvent.click(screen.getByRole("button", { name: "Continue with Google" }))

    await waitFor(() => {
      expect(signInSocialMock).toHaveBeenCalledWith({
        provider: "google",
        callbackURL: "/settings?tab=account",
        errorCallbackURL: "/settings?tab=account",
      })
    })

    expect(clearAuthErrorMock).toHaveBeenCalledTimes(1)
  })
})
