import { AnimatedGridPattern } from '@/components/magicui/animated-grid-pattern';
import { Button } from '@/components/ui/button';
import FloatingPreviews from '@/components/home/preview-grid';
import { cn } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="relative overflow-hidden flex flex-1 flex-col text-center py-20">
      {/* Floating component previews */}
      <FloatingPreviews className="hidden lg:block" />

      {/* Hero content */}
      <div className="relative z-10 max-w-3xl mx-auto">
        <h1 className="mb-4 text-4xl sm:text-5xl md:text-7xl font-medium tracking-[-0.06em] text-balance leading-snug">
          Flexible UI components that adapt to how{' '}
          <span className="bg-primary px-4 py-1 rounded text-primary-foreground leading-none inline-block">
            you
          </span>{' '}
          build.
        </h1>
        <p className="text-fd-muted-foreground text-xl">
          The UI library that lets you choose, per component, between dependency-based usage and
          full source integration — enterprise-ready, accessible and feature-rich.
        </p>
        <Button
          size={'lg'}
          className="mt-4"
          render={
            <Link href="/docs/">
              Get Started <ArrowUpRight />
            </Link>
          }
        />
      </div>

      {/* <ThemePresetSelector /> */}

      {/* Animated grid background */}
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        className={cn(
          '-z-10 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]',
          'inset-x-0 inset-y-[-70%] h-[200%] skew-y-12',
        )}
      />
    </main>
  );
}
