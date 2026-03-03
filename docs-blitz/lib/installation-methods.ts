import { JSX } from "react"

import { Icons } from "@/components/icons"

export interface InstallationMethod {
  name: "package" | "registry"
  title: string
  description: string
  meta: {
    logo: JSX.Element
  }
}

export const INSTALLATION_METHODS: InstallationMethod[] = [
  {
    name: "package",
    title: "Package",
    description: "Install Blitz UI as a package dependency in your project.",
    meta: {
      logo: Icons.package({}),
    },
  },
  {
    name: "registry",
    title: "shadcn/ui",
    description: "Use shadcn/ui registry to install Blitz UI components.",
    meta: {
      logo: Icons.shadcn({}),
    },
  },
]
