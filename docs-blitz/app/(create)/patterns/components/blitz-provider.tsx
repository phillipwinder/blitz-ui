"use client"

import React from "react"
import { ThemeProvider } from "@blitz-ui/react/theme-provider"

import { DesignSystemContext } from "../../components/design-system-provider"

export function BlitzProvider({ children }: { children: React.ReactNode }) {
  const context = React.useContext(DesignSystemContext)
  const iconLibrary = "lucide"

  return <ThemeProvider iconLibrary={iconLibrary}>{children}</ThemeProvider>
}
