import { useAuthStore } from "@/store/auth-store"
import { fireEvent, render, screen, waitFor } from "@mui/internal-test-utils"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { AuthDialogWrapper } from "@/components/auth-dialog-wrapper"

const { replaceMock, useSessionMock, executePostLoginActionMock } = vi.hoisted(() => ({
  replaceMock: vi.fn(),
  useSessionMock: vi.fn(),
  executePostLoginActionMock: vi.fn(),
}))

const navigationState = {
  pathname: "/pricing",
  searchParams: new URLSearchParams(),
}

vi.mock("next/navigation", () => ({
  usePathname: () => navigationState.pathname,
  useRouter: () => ({
    replace: replaceMock,
  }),
  useSearchParams: () => navigationState.searchParams,
}))

vi.mock("@/hooks/use-post-login-action", () => ({
  executePostLoginAction: executePostLoginActionMock,
}))

vi.mock("@/lib/auth-client", () => ({
  authClient: {
    useSession: useSessionMock,
  },
}))

vi.mock("@/app/(auth)/components/auth-dialog", () => ({
  AuthDialog: ({
    open,
    initialMode,
    authErrorMessage,
    onOpenChange,
  }: {
    open: boolean
    initialMode?: "signin" | "signup"
    authErrorMessage?: string | null
    onOpenChange: (open: boolean) => void
  }) => (
    <div
      data-testid="auth-dialog"
      data-open={String(open)}
      data-mode={initialMode ?? ""}
      data-error={authErrorMessage ?? ""}
    >
      <button onClick={() => onOpenChange(false)} type="button">
        Close
      </button>
    </div>
  ),
}))

describe("<AuthDialogWrapper />", () => {
  beforeEach(() => {
    replaceMock.mockReset()
    executePostLoginActionMock.mockReset()
    useSessionMock.mockReturnValue({ data: null })
    navigationState.pathname = "/pricing"
    navigationState.searchParams = new URLSearchParams()
    useAuthStore.setState({
      isOpen: false,
      mode: "signin",
      postLoginAction: null,
    })
    window.localStorage.clear()
  })

  it("reopens the dialog with an inline error for account_not_linked and removes the handled query param", async () => {
    navigationState.searchParams = new URLSearchParams("error=account_not_linked&foo=bar")

    render(<AuthDialogWrapper />)

    await waitFor(() => {
      const dialog = screen.getByTestId("auth-dialog")

      expect(dialog.getAttribute("data-open")).to.equal("true")
      expect(dialog.getAttribute("data-mode")).to.equal("signin")
      expect(dialog.getAttribute("data-error")).to.equal(
        "An account with this email already exists. Sign in with the method you used when you created the account."
      )
    })

    expect(replaceMock).toHaveBeenCalledWith("/pricing?foo=bar")
  })

  it("clears the inline auth error when the dialog closes", async () => {
    navigationState.searchParams = new URLSearchParams("error=account_not_linked")

    render(<AuthDialogWrapper />)

    await waitFor(() => {
      expect(screen.getByTestId("auth-dialog").getAttribute("data-error")).to.equal(
        "An account with this email already exists. Sign in with the method you used when you created the account."
      )
    })

    fireEvent.click(screen.getByRole("button", { name: "Close" }))

    await waitFor(() => {
      const dialog = screen.getByTestId("auth-dialog")

      expect(dialog.getAttribute("data-open")).to.equal("false")
      expect(dialog.getAttribute("data-error")).to.equal("")
    })
  })
})
