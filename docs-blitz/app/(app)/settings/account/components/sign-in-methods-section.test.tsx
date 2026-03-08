import { fireEvent, render, screen, waitFor, within } from "@mui/internal-test-utils"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { type LinkedSocialAccount } from "@/lib/auth-client"
import { SignInMethodsSection } from "@/app/(app)/settings/account/components/sign-in-methods-section"

const {
  replaceMock,
  listLinkedSocialAccountsMock,
  linkSocialAccountMock,
  unlinkSocialAccountMock,
  toastErrorMock,
  toastSuccessMock,
  locationAssignMock,
} = vi.hoisted(() => ({
  replaceMock: vi.fn(),
  listLinkedSocialAccountsMock: vi.fn(),
  linkSocialAccountMock: vi.fn(),
  unlinkSocialAccountMock: vi.fn(),
  toastErrorMock: vi.fn(),
  toastSuccessMock: vi.fn(),
  locationAssignMock: vi.fn(),
}))

const navigationState = {
  pathname: "/settings/account",
  searchParams: new URLSearchParams(),
}

vi.mock("next/navigation", () => ({
  usePathname: () => navigationState.pathname,
  useRouter: () => ({
    replace: replaceMock,
  }),
  useSearchParams: () => navigationState.searchParams,
}))

vi.mock("sonner", () => ({
  toast: {
    error: toastErrorMock,
    success: toastSuccessMock,
  },
}))

vi.mock("@/lib/auth-client", () => ({
  listLinkedSocialAccounts: listLinkedSocialAccountsMock,
  linkSocialAccount: linkSocialAccountMock,
  unlinkSocialAccount: unlinkSocialAccountMock,
}))

Object.defineProperty(window, "location", {
  configurable: true,
  value: {
    ...window.location,
    assign: locationAssignMock,
  },
})

function createAccount(providerId: "google" | "github" | "microsoft"): LinkedSocialAccount {
  return {
    id: `${providerId}-id`,
    providerId,
    createdAt: "2026-03-08T12:00:00.000Z",
    updatedAt: "2026-03-08T12:00:00.000Z",
    accountId: `${providerId}-account`,
    userId: "user_123",
    scopes: [],
  }
}

describe("<SignInMethodsSection />", () => {
  beforeEach(() => {
    replaceMock.mockReset()
    listLinkedSocialAccountsMock.mockReset()
    linkSocialAccountMock.mockReset()
    unlinkSocialAccountMock.mockReset()
    toastErrorMock.mockReset()
    toastSuccessMock.mockReset()
    locationAssignMock.mockReset()
    navigationState.pathname = "/settings/account"
    navigationState.searchParams = new URLSearchParams()
    listLinkedSocialAccountsMock.mockResolvedValue([createAccount("github")])
    linkSocialAccountMock.mockResolvedValue({ redirect: true, url: "/api/auth/link-social" })
    unlinkSocialAccountMock.mockResolvedValue({ status: true })
  })

  it("renders linked and available sign-in methods", async () => {
    render(<SignInMethodsSection />)

    await waitFor(() => {
      expect(screen.getByText("Connected to your account")).not.to.equal(null)
      expect(screen.getAllByText("Not connected to your account")).to.have.length(2)
    })

    const githubRow = screen.getByText("GitHub").closest("div.rounded-lg")
    const googleRow = screen.getByText("Google").closest("div.rounded-lg")

    expect(githubRow).not.to.equal(null)
    expect(googleRow).not.to.equal(null)
    expect(
      within(githubRow as HTMLElement).getByRole("button", { name: "Disconnect" })
    ).not.to.equal(null)
    expect(within(googleRow as HTMLElement).getByRole("button", { name: "Connect" })).not.to.equal(
      null
    )
  })

  it("starts provider linking with the current callback URL", async () => {
    navigationState.searchParams = new URLSearchParams("foo=bar")

    render(<SignInMethodsSection />)

    await screen.findByText("Google")

    const googleRow = screen.getByText("Google").closest("div.rounded-lg")
    fireEvent.click(within(googleRow as HTMLElement).getByRole("button", { name: "Connect" }))

    await waitFor(() => {
      expect(linkSocialAccountMock).toHaveBeenCalledWith({
        provider: "google",
        callbackURL: "/settings/account?foo=bar",
        errorCallbackURL: "/settings/account?foo=bar",
      })
    })
  })

  it("keeps connect loading active until the redirect starts", async () => {
    let resolveLink:
      | ((value: { redirect: boolean; url: string }) => void)
      | undefined

    linkSocialAccountMock.mockReturnValueOnce(
      new Promise((resolve) => {
        resolveLink = resolve
      })
    )

    render(<SignInMethodsSection />)

    const googleRow = await screen.findByText("Google").then((node) => node.closest("div.rounded-lg"))
    const connectButton = within(googleRow as HTMLElement).getByRole("button", { name: "Connect" })

    fireEvent.click(connectButton)

    await waitFor(() => {
      expect(connectButton).to.have.property("disabled", true)
      expect(connectButton.querySelector("svg.animate-spin")).not.to.equal(null)
    })

    resolveLink?.({ redirect: true, url: "/api/auth/link-social" })

    await waitFor(() => {
      expect(locationAssignMock).toHaveBeenCalledWith("/api/auth/link-social")
    })

    expect(connectButton).to.have.property("disabled", true)
    expect(connectButton.querySelector("svg.animate-spin")).not.to.equal(null)
  })

  it("unlinks a provider, reloads accounts, and updates the UI", async () => {
    listLinkedSocialAccountsMock
      .mockResolvedValueOnce([createAccount("github"), createAccount("google")])
      .mockResolvedValueOnce([createAccount("google")])

    render(<SignInMethodsSection />)

    const githubRow = await screen
      .findByText("GitHub")
      .then((node) => node.closest("div.rounded-lg"))
    fireEvent.click(within(githubRow as HTMLElement).getByRole("button", { name: "Disconnect" }))

    await waitFor(() => {
      expect(unlinkSocialAccountMock).toHaveBeenCalledWith({ providerId: "github" })
      expect(toastSuccessMock).toHaveBeenCalledWith("Sign-in method removed", {
        description: "You can no longer sign in with GitHub.",
      })
    })

    await waitFor(() => {
      const githubRowAfter = screen.getByText("GitHub").closest("div.rounded-lg")
      expect(
        within(githubRowAfter as HTMLElement).getByRole("button", { name: "Connect" })
      ).not.to.equal(null)
    })
  })

  it("keeps disconnect loading active until the accounts refresh finishes", async () => {
    let resolveAccounts: ((value: LinkedSocialAccount[]) => void) | undefined

    listLinkedSocialAccountsMock
      .mockResolvedValueOnce([createAccount("github"), createAccount("google")])
      .mockReturnValueOnce(
        new Promise((resolve) => {
          resolveAccounts = resolve
        })
      )

    render(<SignInMethodsSection />)

    const githubRow = await screen
      .findByText("GitHub")
      .then((node) => node.closest("div.rounded-lg"))
    const disconnectButton = within(githubRow as HTMLElement).getByRole("button", {
      name: "Disconnect",
    })

    fireEvent.click(disconnectButton)

    await waitFor(() => {
      expect(unlinkSocialAccountMock).toHaveBeenCalledWith({ providerId: "github" })
      expect(disconnectButton).to.have.property("disabled", true)
      expect(disconnectButton.querySelector("svg.animate-spin")).not.to.equal(null)
    })

    resolveAccounts?.([createAccount("google")])

    await waitFor(() => {
      const githubRowAfter = screen.getByText("GitHub").closest("div.rounded-lg")
      expect(
        within(githubRowAfter as HTMLElement).getByRole("button", { name: "Connect" })
      ).not.to.equal(null)
    })
  })

  it("shows an error toast and keeps the row usable when unlinking fails", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {})
    listLinkedSocialAccountsMock.mockResolvedValueOnce([
      createAccount("github"),
      createAccount("google"),
    ])
    unlinkSocialAccountMock.mockRejectedValueOnce(new Error("You can't unlink your last account"))

    render(<SignInMethodsSection />)

    const githubRow = await screen
      .findByText("GitHub")
      .then((node) => node.closest("div.rounded-lg"))
    const disconnectButton = within(githubRow as HTMLElement).getByRole("button", {
      name: "Disconnect",
    })

    fireEvent.click(disconnectButton)

    await waitFor(() => {
      expect(toastErrorMock).toHaveBeenCalledWith("Failed to remove sign-in method", {
        description: "You can't unlink your last account",
      })
    })

    expect(disconnectButton).to.have.property("disabled", false)
    consoleErrorSpy.mockRestore()
  })

  it("disables disconnect when only one linked method remains", async () => {
    render(<SignInMethodsSection />)

    const githubRow = await screen
      .findByText("GitHub")
      .then((node) => node.closest("div.rounded-lg"))
    const disconnectButton = within(githubRow as HTMLElement).getByRole("button", {
      name: "Disconnect",
    })

    expect(disconnectButton).to.have.property("disabled", true)
    expect(
      screen.getByText(
        "Keep at least one sign-in method linked to avoid losing access to your account."
      )
    ).not.to.equal(null)
  })

  it("shows a callback error inline and removes the handled query param", async () => {
    navigationState.searchParams = new URLSearchParams("error=email_doesn't_match&foo=bar")

    render(<SignInMethodsSection />)

    await waitFor(() => {
      expect(
        screen.getByText(
          "This provider uses a different email address. Link a provider that matches your current account email."
        )
      ).not.to.equal(null)
    })

    expect(replaceMock).toHaveBeenCalledWith("/settings/account?foo=bar")
  })
})
