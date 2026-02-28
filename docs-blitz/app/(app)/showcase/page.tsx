import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/custom/card"

import { showcaseApps } from "./data"

export default function ShowcasePage() {
  return (
    <div className="container-wrapper py-10">
      <div className="container space-y-8">
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight">Showcase</h1>
          <p className="text-muted-foreground max-w-3xl text-base">
            Starter mini-apps built with Blitz UI patterns. Each card opens a small interactive
            example you can expand into a full demo.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {showcaseApps.map((app) => {
            const Icon = app.icon
            return (
              <Card key={app.slug} className="gap-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-2">
                    <div className="bg-muted text-muted-foreground inline-flex rounded-md border p-2">
                      <Icon className="size-4" />
                    </div>
                    <h2 className="text-lg font-semibold">{app.name}</h2>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    nativeButton={false}
                    render={
                      <Link href={app.href} aria-label={`Open ${app.name}`}>
                        <ArrowUpRightIcon />
                      </Link>
                    }
                  />
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed">{app.description}</p>

                <div className="flex flex-wrap gap-1.5">
                  {app.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button
                  className="w-full"
                  nativeButton={false}
                  render={<Link href={app.href}>Open App</Link>}
                />
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
