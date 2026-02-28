import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Button } from "@/components/ui/button"

import { showcaseRenderers } from "../apps"
import { showcaseApps } from "../data"

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return showcaseApps.map((app) => ({ slug: app.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const app = showcaseApps.find((entry) => entry.slug === slug)

  if (!app) {
    return {
      title: "Showcase | Blitz UI",
    }
  }

  return {
    title: `${app.name} | Showcase | Blitz UI`,
    description: app.description,
  }
}

export default async function ShowcaseAppPage({ params }: PageProps) {
  const { slug } = await params
  const renderer = showcaseRenderers[slug]

  if (!renderer) {
    notFound()
  }

  const App = renderer.component

  return (
    <div className="container-wrapper py-10">
      <div className="container space-y-6">
        <Button
          variant="ghost"
          nativeButton={false}
          render={<Link href="/showcase">Back to Showcase</Link>}
        />

        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">{renderer.label}</h1>
          <p className="text-muted-foreground text-sm">{renderer.description}</p>
        </div>

        <App />
      </div>
    </div>
  )
}
