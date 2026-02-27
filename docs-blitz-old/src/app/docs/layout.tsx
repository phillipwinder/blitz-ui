import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { source } from '@/lib/source';
import { Folder, Item } from '@/components/sidebar-components';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      themeSwitch={{ enabled: false }}
      searchToggle={{ enabled: false }}
      tree={source.pageTree}
      sidebar={{ components: { Folder, Item }, collapsible: false }}
    >
      {children}
    </DocsLayout>
  );
}
