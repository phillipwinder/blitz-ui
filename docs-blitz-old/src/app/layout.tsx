import './globals.css';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Suspense, type ReactNode } from 'react';
import { Databuddy } from '@databuddy/sdk';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config';
import { Toaster } from '@/components/ui/sonner';
import { ThemeScript } from '@/components/theme-script';
import { DynamicFontLoader } from '@/components/dynamic-font-loader';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { ThemeProvider } from '@/components/theme-provider';
import { QueryProvider } from '@/lib/query-client';
import { ChatProvider } from '@/hooks/use-chat-context';
import { TooltipProvider } from '@blitz-ui/react/tooltip';
import { SiteHeader } from '@/components/site-header';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: ['Next.js', 'React', 'Tailwind CSS', 'Components', 'shadcn'],
  authors: [
    {
      name: 'Phillip Winder',
      url: 'https://phillipwinder.com',
    },
  ],
  creator: 'Phillip Winder',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/opengraph-image.png`],
    creator: '@phillip_winder',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
  other: {
    'google-site-verification': 'aI5tSvPhdkm7BVkrBx_i8S2sHzfP7DxvPNbSCpBRfzo',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={cn(inter.className, 'antialiased')} suppressHydrationWarning>
      <head>
        <ThemeScript />
        <DynamicFontLoader />
        {/* PRELOAD FONTS USED BY BUILT-IN THEMES */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Architects+Daughter&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Fira+Code:wght@300..700&family=Geist+Mono:wght@100..900&family=Geist:wght@100..900&family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=IBM+Plex+Sans:ital,wght@0,100..700;1,100..700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Lora:ital,wght@0,400..700;1,400..700&family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Outfit:wght@100..900&family=Oxanium:wght@200..800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&family=Roboto:ital,wght@0,100..900;1,100..900&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&family=Source+Serif+4:ital,opsz,wght@0,8..60,200..900;1,8..60,200..900&family=Space+Grotesk:wght@300..700&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="style-vega flex flex-col min-h-screen [--header-height:calc(var(--spacing)*14)]">
        <NuqsAdapter>
          <Suspense>
            <QueryProvider>
              <ThemeProvider>
                <TooltipProvider>
                  <RootProvider>
                    <Databuddy
                      clientId="HMM4VGqblgu59xr2UOpco"
                      trackOutgoingLinks
                      trackInteractions
                      trackEngagement
                      trackBounceRate
                      trackWebVitals
                      enableBatching
                    />
                    <Toaster />
                    <ChatProvider>
                      <SiteHeader />
                      {children}
                    </ChatProvider>
                  </RootProvider>
                </TooltipProvider>
              </ThemeProvider>
            </QueryProvider>
          </Suspense>
        </NuqsAdapter>
      </body>
    </html>
  );
}
