import { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern"

const title = "Blitz UI | Flexible UI components that adapt to how you build"
const description =
  "The UI library that lets you choose, per component, between dependency-based usage and full source integration — enterprise-ready, accessible and feature-rich."

export const dynamic = "force-static"
export const revalidate = false

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    images: [
      {
        url: `/og?title=${encodeURIComponent(
          title
        )}&description=${encodeURIComponent(description)}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: `/og?title=${encodeURIComponent(
          title
        )}&description=${encodeURIComponent(description)}`,
      },
    ],
  },
}

// export default function IndexPage() {
//   return (
//     <div className="homepage relative overflow-hidden bg-linear-to-b to-gray-100 to-35% dark:to-zinc-900">
//       <Hero />
//       <Stats />
//       <Patterns />
//       <WallOfLove />
//       <SiteSubscribe />
//       <SiteFooter />
//     </div>
//   )
// }

export default function IndexPage() {
  return (
    <main className="flex flex-1 flex-col">
      {/* Hero content */}
      <div className="relative z-10 mx-auto max-w-3xl py-20 text-center">
        <h1 className="mb-4 text-4xl leading-snug font-medium tracking-[-0.06em] text-balance sm:text-5xl md:text-7xl">
          Flexible UI components that adapt to how{" "}
          <span className="bg-primary text-primary-foreground inline-block rounded px-4 py-1 leading-none">
            you
          </span>{" "}
          build.
        </h1>
        <p className="text-fd-muted-foreground text-xl">
          The UI library that lets you choose, per component, between dependency-based usage and
          full source integration — enterprise-ready, accessible and feature-rich.
        </p>
        <Button
          size={"lg"}
          className="mt-4"
          nativeButton={false}
          render={
            <Link href="/docs/">
              Get Started <ArrowUpRight />
            </Link>
          }
        />
      </div>

      {/* Animated grid background */}
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        className={cn(
          "-z-10 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-70%] h-[200%] skew-y-12"
        )}
      />
    </main>
  )
}
