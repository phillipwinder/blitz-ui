import Link from "next/link"

import { INSTALLATION_METHODS, InstallationMethod } from "@/lib/installation-methods"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export function DocsInstallationMethodSwitcher({
  installationMethod,
  component,
  className,
}: {
  installationMethod: InstallationMethod["name"]
  component: string
  className?: string
}) {
  // const activeMethod = INSTALLATION_METHODS.find((method) => installationMethod === method.name)

  const methodTooltips: Record<InstallationMethod["name"], string> = {
    package: "Show documentation for usage as a package dependency",
    registry: "Show documentation for usage via shadcn registry",
  }

  return (
    <div className={cn("inline-flex w-full items-center gap-6", className)}>
      {INSTALLATION_METHODS.map((method) => (
        <Tooltip key={method.name}>
          <TooltipTrigger asChild>
            <Link
              href={`/docs/${method.name}/${component}`}
              data-active={installationMethod === method.name}
              className="text-muted-foreground hover:text-foreground data-[active=true]:text-foreground after:bg-foreground relative inline-flex items-center justify-center gap-1 pt-1 pb-0.5 text-base font-medium transition-colors after:absolute after:inset-x-0 after:bottom-[-4px] after:h-0.5 after:opacity-0 after:transition-opacity data-[active=true]:after:opacity-100"
            >
              {method.title}
              <div className="text-muted-foreground ml-0.5 size-4 shrink-0 opacity-80 [&_svg]:size-4">
                {method.meta.logo}
              </div>
            </Link>
          </TooltipTrigger>
          <TooltipContent>{methodTooltips[method.name]}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  )
}
