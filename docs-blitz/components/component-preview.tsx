import * as React from "react"

import { getRegistryComponent } from "@/lib/registry"
import { ComponentClient } from "@/components/component-client"
import { ComponentPreviewTabs } from "@/components/component-preview-tabs"
import { ComponentSource } from "@/components/component-source"

// Default styleName - matches the API default
const DEFAULT_STYLE_NAME = "base-nova"
const DEFAULT_INSTALLATION_METHOD = "package"

export function ComponentPreview({
  name,
  type,
  className,
  previewClassName,
  align = "center",
  hideCode = false,
  chromeLessOnMobile = false,
  styleName = DEFAULT_STYLE_NAME,
  installationMethod = DEFAULT_INSTALLATION_METHOD,
  code,
  ...props
}: React.ComponentProps<"div"> & {
  name: string
  installationMethod?: "package" | "registry"
  styleName?: string
  align?: "center" | "start" | "end"
  description?: string
  hideCode?: boolean
  type?: "block" | "component" | "example"
  chromeLessOnMobile?: boolean
  previewClassName?: string
  code?: string
}) {
  const Component = getRegistryComponent(name, styleName)

  if (!Component) {
    return (
      <p className="text-muted-foreground mt-6 text-sm">
        Component{" "}
        <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
          {name}
        </code>{" "}
        not found in registry.
      </p>
    )
  }

  return (
    <ComponentPreviewTabs
      className={className}
      previewClassName={previewClassName}
      align={align}
      hideCode={hideCode}
      component={<ComponentClient name={name} styleName={styleName} />}
      source={
        <ComponentSource
          name={name}
          collapsible={false}
          installationMethod={installationMethod}
          styleName={styleName}
          code={code}
        />
      }
      sourcePreview={
        <ComponentSource
          name={name}
          installationMethod={installationMethod}
          collapsible={false}
          styleName={styleName}
          maxLines={3}
          code={code}
        />
      }
      chromeLessOnMobile={chromeLessOnMobile}
      {...props}
    />
  )
}
