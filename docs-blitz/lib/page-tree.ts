import type { source } from "@/lib/source"
import { DEFAULT_CONFIG } from "@/hooks/use-config"

export type PageTreeNode = (typeof source.pageTree)["children"][number]
export type PageTreeFolder = Extract<PageTreeNode, { type: "folder" }>
export type PageTreePage = Extract<PageTreeNode, { type: "page" }>

// Recursively find all pages in a folder tree.
export function getAllPagesFromFolder(folder: PageTreeFolder): PageTreePage[] {
  const pages: PageTreePage[] = []

  for (const child of folder.children) {
    if (child.type === "page") {
      pages.push(child)
    } else if (child.type === "folder") {
      pages.push(...getAllPagesFromFolder(child))
    }
  }

  return pages
}

// Get the pages from a folder, handling nested installation method folders (package/registry).
export function getPagesFromFolder(
  folder: PageTreeFolder,
  currentInstallationMethod: string
): PageTreePage[] {
  // For the components folder, find the installation method subfolder.
  if (folder.$id === "components" || folder.name === "Components") {
    for (const child of folder.children) {
      if (child.type === "folder") {
        // Match by $id or by name.
        const isPackageInstallation =
          child.$id === "package" || child.name === "Install from package"
        const isRegistryInstallation =
          child.$id === "registry" || child.name === "Install from registry"

        if (
          (currentInstallationMethod === "package" && isPackageInstallation) ||
          (currentInstallationMethod === "registry" && isRegistryInstallation)
        ) {
          return child.children.filter((c): c is PageTreePage => c.type === "page")
        }
      }
    }

    // Fallback: return all pages from nested folders.
    return getAllPagesFromFolder(folder).filter((page) => !page.url.endsWith("/components"))
  }

  // For other folders, return direct page children.
  return folder.children.filter((child): child is PageTreePage => child.type === "page")
}

// Get current installation method (package or registry) from pathname.
export function getCurrentInstallationMethod(pathname: string): string {
  const installationMethodMatch = pathname.match(/\/docs\/(package|registry)\//)
  return installationMethodMatch ? installationMethodMatch[1] : DEFAULT_CONFIG.installationMethod // Default to package.
}
