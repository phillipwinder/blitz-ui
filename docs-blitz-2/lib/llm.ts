import { getRegistryItem } from "@/lib/registry"

const DEFAULT_STYLE_NAME = "base-nova"

function getRegistryKey(styleName: string) {
  return styleName.startsWith("radix-") ? "radix" : "base"
}

async function getSourceForRegistryItem(name: string, styleName: string) {
  const item = await getRegistryItem(name, styleName)
  const rawSource = item?.files?.[0]?.content

  if (!rawSource) {
    return null
  }

  const registryKey = getRegistryKey(styleName)
  let source = rawSource
  source = source.replaceAll(
    `@/registry-reui/bases/${registryKey}/`,
    "@/components/"
  )
  source = source.replaceAll("export default", "export")

  return source
}

export async function processMdxForLLMs(content: string) {
  if (!content || typeof content !== "string") {
    return content || ""
  }

  const tagRegex = /<(ComponentPreview|ComponentSource)\s+([^>]+)\/>/g

  let transformed = ""
  let lastIndex = 0

  for (const tagMatch of content.matchAll(tagRegex)) {
    const match = tagMatch[0]
    const tag = tagMatch[1]
    const attributes = tagMatch[2]
    const index = tagMatch.index ?? 0

    transformed += content.slice(lastIndex, index)

    try {
      const name = attributes.match(/name="([^"]+)"/)?.[1]
      const styleName =
        attributes.match(/styleName="([^"]+)"/)?.[1] || DEFAULT_STYLE_NAME

      if (!name) {
        transformed += match
      } else {
        const source = await getSourceForRegistryItem(name, styleName)
        transformed += source ? `\`\`\`tsx\n${source}\n\`\`\`` : match
      }
    } catch (error) {
      console.error(`Error processing ${tag} for ${match}:`, error)
      transformed += match
    }

    lastIndex = index + match.length
  }

  transformed += content.slice(lastIndex)
  return transformed
}
