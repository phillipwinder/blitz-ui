import * as React from "react"

import { transformStyleClassNames } from "@/lib/code-utils"
import { highlightCode } from "@/lib/highlight-code"
import { getIconLibraryFromStyle, transformIcons } from "@/lib/icons"
import { getRegistryItem, getRegistryMetadata } from "@/lib/registry"
import { cn } from "@/lib/utils"
import { CodeCollapsibleWrapper } from "@/components/code-collapsible-wrapper"
import { CopyButton } from "@/components/copy-button"
import { getIconForLanguageExtension } from "@/components/icons"
import { IconLibraryName } from "@/registry/config"

import { ComponentSourceClient } from "./component-source-client"

// Default styleName - matches the API default
const DEFAULT_STYLE_NAME = "radix-nova"

const srcToNameCache = new Map<string, { name: string; fileIndex: number }>()

function getRegistryKey(styleName: string) {
  return styleName.startsWith("base-") ? "base" : "radix"
}

function normalizeRegistryPath(value: string) {
  const normalized = value
    .replaceAll("\\", "/")
    .replace(/^@\//, "")
    .replace(/^\.\//, "")
    .replace(/^\/+/, "")

  if (normalized.includes("..")) {
    return null
  }

  if (
    !normalized.startsWith("registry/") &&
    !normalized.startsWith("registry-blitz-ui/")
  ) {
    return null
  }

  return normalized.replace(
    /^registry-blitz-ui\/bases\/__generated\/[^/]+\//,
    "registry-blitz-ui/bases/"
  )
}

function findRegistryItemFromSrc(src: string, styleName: string) {
  const normalizedSrc = normalizeRegistryPath(src)
  if (!normalizedSrc) {
    return null
  }

  const base = getRegistryKey(styleName)
  const cacheKey = `${base}:${normalizedSrc}`

  if (srcToNameCache.has(cacheKey)) {
    return srcToNameCache.get(cacheKey) ?? null
  }

  const metadata = getRegistryMetadata(base)

  for (const [itemName, item] of Object.entries(metadata)) {
    const files = item.files ?? []
    for (let fileIndex = 0; fileIndex < files.length; fileIndex += 1) {
      const file = files[fileIndex]
      const filePath =
        typeof file === "string"
          ? file
          : typeof file?.path === "string"
            ? file.path
            : null

      if (!filePath) {
        continue
      }

      const normalizedFilePath = normalizeRegistryPath(filePath)
      if (normalizedFilePath && normalizedFilePath === normalizedSrc) {
        const result = { name: itemName, fileIndex }
        srcToNameCache.set(cacheKey, result)
        return result
      }
    }
  }

  return null
}

export async function ComponentSource({
  name,
  src,
  title,
  language,
  collapsible = true,
  className,
  styleName = DEFAULT_STYLE_NAME,
  iconLibrary = "lucide",
  maxLines,
  code: initialCode,
  async = false,
  eventName,
}: React.ComponentProps<"div"> & {
  name?: string
  src?: string
  title?: string
  language?: string
  collapsible?: boolean
  styleName?: string
  iconLibrary?: IconLibraryName
  maxLines?: number
  code?: string
  async?: boolean
  eventName?: "copy_pattern_code" | "copy_component_code"
}) {
  if (async) {
    return (
      <ComponentSourceClient
        name={name}
        src={src}
        title={title}
        language={language}
        collapsible={collapsible}
        className={className}
        styleName={styleName}
        iconLibrary={iconLibrary}
        maxLines={maxLines}
        code={initialCode}
        eventName={eventName}
      />
    )
  }

  let code = initialCode

  if (code) {
    // Transform classNames for display (code prop comes raw, not from static JSON)
    code = transformStyleClassNames(code, styleName)

    // Transform icons for display if code is provided via prop (e.g. from rehype)
    const effectiveIconLibrary =
      iconLibrary || getIconLibraryFromStyle(styleName)
    code = transformIcons(code, effectiveIconLibrary)
  }

  if (!code && name) {
    try {
      const item = await getRegistryItem(name, styleName, iconLibrary)
      code = item?.files?.[0]?.content
    } catch (error) {
      console.error(`Error reading static registry: ${name}`, error)
    }

    if (code) {
      // Transform icons for display (not baked into static JSON)
      const effectiveIconLibrary =
        iconLibrary || getIconLibraryFromStyle(styleName)
      code = transformIcons(code, effectiveIconLibrary)
    }
  }

  if (!code && src) {
    const sourceMatch = findRegistryItemFromSrc(src, styleName)
    if (!sourceMatch) {
      console.error(`Unsupported source path: ${src}`)
    } else {
      try {
        const item = await getRegistryItem(
          sourceMatch.name,
          styleName,
          iconLibrary
        )
        const file = item?.files?.[sourceMatch.fileIndex] ?? item?.files?.[0]
        code = file?.content
      } catch (error) {
        console.error("Error loading source file from registry", error)
      }

      if (code) {
        const effectiveIconLibrary =
          iconLibrary || getIconLibraryFromStyle(styleName)
        code = transformIcons(code, effectiveIconLibrary)
      }
    }
  }

  if (!code) {
    return null
  }

  // Clean up any remaining artifacts
  code = code.replaceAll("/* eslint-disable react/no-children-prop */\n", "")

  if (maxLines) {
    code = code.split("\n").slice(0, maxLines).join("\n")
  }

  const lang = language ?? title?.split(".").pop() ?? "tsx"
  const highlightedCode = await highlightCode(code, lang)

  const effectiveEventName =
    eventName ||
    (name?.startsWith("p-") ? "copy_pattern_code" : "copy_component_code")

  if (!collapsible) {
    return (
      <div className={cn("relative", className)}>
        <ComponentCode
          code={code}
          highlightedCode={highlightedCode}
          language={lang}
          title={title}
          eventName={effectiveEventName}
          name={name}
          styleName={styleName}
          iconLibrary={iconLibrary}
        />
      </div>
    )
  }

  return (
    <CodeCollapsibleWrapper className={className}>
      <ComponentCode
        code={code}
        highlightedCode={highlightedCode}
        language={lang}
        title={title}
        eventName={effectiveEventName}
        name={name}
        styleName={styleName}
        iconLibrary={iconLibrary}
      />
    </CodeCollapsibleWrapper>
  )
}

function ComponentCode({
  code,
  highlightedCode,
  language,
  title,
  eventName,
  name,
  styleName,
  iconLibrary,
}: {
  code: string
  highlightedCode: string
  language: string
  title: string | undefined
  eventName?: string
  name?: string
  styleName?: string
  iconLibrary?: string
}) {
  return (
    <figure data-rehype-pretty-code-figure="" className="[&>pre]:max-h-96">
      {title && (
        <figcaption
          data-rehype-pretty-code-title=""
          className="text-code-foreground [&_svg]:text-code-foreground flex items-center gap-2 [&_svg]:size-4 [&_svg]:opacity-70"
          data-language={language}
        >
          {getIconForLanguageExtension(language)}
          {title}
        </figcaption>
      )}
      <CopyButton
        value={code}
        event={eventName as any}
        properties={{
          name,
          style: styleName,
          iconLibrary: iconLibrary,
        }}
      />
      <div dangerouslySetInnerHTML={{ __html: highlightedCode }} />
    </figure>
  )
}
