import ThemePresetSelect from '@/components/theme-preset-select';
import { ThemeToggle } from '@/components/theme-toggle';
import { config } from '@/config';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { BookIcon, Zap } from 'lucide-react';

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <div className="flex items-center gap-2">
        <Zap className="text-foreground/70 fill-foreground/10" />
        <span className="text-lg font-bold">Blitz UI</span>
      </div>
    ),
  },
  githubUrl: config.githubUrl,
  links: [
    {
      text: 'Documentation',
      url: '/docs/get-started/introduction',
    },
    {
      text: 'Theme Playground',
      url: '/theme-playground/',
    },
  ],
  themeSwitch: {
    component: <ThemeToggle />,
    // component: <ThemePresetSelect />,
  },
};
