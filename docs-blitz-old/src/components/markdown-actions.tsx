'use client';

import { Check, ChevronDown, Copy } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '@/registry/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/registry/components/ui/dropdown-menu';
import { useCopyToClipboard } from '@/registry/hooks/use-copy-to-clipboard';
import { config } from '@/config';
import { cn } from '@/lib/utils';
import { Icons } from './icons';

function getPromptUrl(baseURL: string, url: string) {
  return `${baseURL}?q=${encodeURIComponent(
    `I'm reading this basecn documentation page: ${url}. Help me understand it thoroughly.

Please:
- Summarize the key idea(s) in plain language.
- If it's about a component: show minimal usage examples, list props/API, explain customization and accessibility.
- If it's about a concept or guide: explain the concept step by step with practical examples where possible.
- If it's about setup/configuration: walk me through the process and common pitfalls.
- Be ready to clarify doubts, explain terms, or help debug issues related to this page.
- Point out basecn-specific differences from shadcn/ui with Radix if relevant.
- Point out the migrating from Radix UI to Base UI steps if relevant.

If you can't access the page content, ask me to paste it here.
`,
  )}`;
}

interface MarkdownActionsProps extends React.ComponentProps<'div'> {
  content: string;
}

export function MarkdownActions({ content, className, ...props }: MarkdownActionsProps) {
  const { slug } = useParams<{ slug: string[] }>();
  const { copyToClipboard, isCopied } = useCopyToClipboard();

  if (!slug) {
    return null;
  }

  const url = `${config.appUrl}/docs/${slug.join('/')}`;

  const menuItems = [
    {
      label: 'View as Markdown',
      href: `/docs/${slug.join('/')}.md`,
      icon: Icons.markdown,
    },

    {
      label: 'Open in ChatGPT',
      href: getPromptUrl('https://chatgpt.com', url),
      icon: Icons.openAi,
    },

    {
      label: 'Open in Claude',
      href: getPromptUrl('https://claude.ai/new', url),
      icon: Icons.claude,
    },

    {
      label: 'Open in v0',
      href: getPromptUrl('https://v0.dev', url),
      icon: Icons.v0,
    },
  ];

  return (
    <div className={cn('flex items-center', className)} {...props}>
      <Button
        variant="secondary"
        size="sm"
        className="rounded-e-none h-8 text-xs border"
        onClick={() => copyToClipboard(content)}
      >
        {isCopied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
        Copy Page
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button size="icon" variant="secondary" />}
          className="rounded-s-none size-8 border border-l-0"
        >
          <ChevronDown />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {menuItems.map((item) => (
            <DropdownMenuItem
              key={item.label}
              render={<Link href={item.href} target="_blank" rel="noopener noreferrer" />}
            >
              <item.icon />
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
