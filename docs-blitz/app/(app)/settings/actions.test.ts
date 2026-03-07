import { beforeEach, describe, expect, it, vi } from "vitest"

import { subscription, user } from "@/db/schema"
import { deleteAccount } from "@/app/(app)/settings/actions"

const {
  getSessionMock,
  headersMock,
  whereSubscriptionMock,
  whereUserMock,
  dbDeleteMock,
} = vi.hoisted(() => ({
  getSessionMock: vi.fn(),
  headersMock: vi.fn(),
  whereSubscriptionMock: vi.fn(),
  whereUserMock: vi.fn(),
  dbDeleteMock: vi.fn(),
}))

vi.mock("next/headers", () => ({
  headers: headersMock,
}))

vi.mock("@/lib/auth", () => ({
  auth: {
    api: {
      getSession: getSessionMock,
    },
  },
}))

vi.mock("@/db", () => ({
  db: {
    delete: dbDeleteMock,
  },
}))

describe("deleteAccount", () => {
  beforeEach(() => {
    headersMock.mockResolvedValue(new Headers())
    getSessionMock.mockResolvedValue({
      user: { id: "user_123" },
    })
    whereSubscriptionMock.mockResolvedValue(undefined)
    whereUserMock.mockResolvedValue(undefined)
    dbDeleteMock
      .mockReturnValueOnce({ where: whereSubscriptionMock })
      .mockReturnValueOnce({ where: whereUserMock })
  })

  it("deletes subscriptions before deleting the user", async () => {
    const result = await deleteAccount()

    expect(result).toEqual({ success: true })
    expect(dbDeleteMock).toHaveBeenNthCalledWith(1, subscription)
    expect(dbDeleteMock).toHaveBeenNthCalledWith(2, user)
    expect(whereSubscriptionMock).toHaveBeenCalledTimes(1)
    expect(whereUserMock).toHaveBeenCalledTimes(1)
  })

  it("returns an error when no authenticated user exists", async () => {
    getSessionMock.mockResolvedValueOnce(null)

    const result = await deleteAccount()

    expect(result).toEqual({
      success: false,
      error: "You must be signed in to delete your account.",
    })
    expect(dbDeleteMock).not.toHaveBeenCalled()
  })

  it("returns an error when deletion fails", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {})
    dbDeleteMock.mockReset()
    dbDeleteMock.mockImplementationOnce(() => {
      throw new Error("boom")
    })

    const result = await deleteAccount()

    expect(result).toEqual({
      success: false,
      error: "Failed to delete account. Please try again.",
    })
    expect(errorSpy).toHaveBeenCalled()

    errorSpy.mockRestore()
  })
})
