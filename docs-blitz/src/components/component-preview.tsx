import { cn, ImportParadigm, importParadigms } from '@/lib/utils';
import { components } from '@/registry/__index__';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/registry/components/ui/tabs';
import fs from 'fs/promises';
import path from 'path';
import { CodeBlock } from './code-block';

const DEMO_SRC_PREFIX = 'src/components/demo/';
const DEMO_SRC_ROOT = path.join(process.cwd(), 'src', 'components', 'demo');

export default async function ComponentPreview({
  name,
  importParadigm,
  center = true,
  constrainHeight = true,
}: {
  name: string;
  importParadigm: ImportParadigm;
  center?: boolean;
  constrainHeight?: boolean;
}) {
  if (!importParadigm || !importParadigms.some((p) => p.key === importParadigm)) {
    throw new Error(
      `Invalid importParadigm: ${importParadigm}. Must be one of: ${importParadigms
        .map((p) => p.key)
        .join(', ')}`,
    );
  }

  const { component: Component, src } = components[name];

  if (!Component || !src) {
    throw new Error(`Component not found in registry: ${name}`);
  }

  if (!src.startsWith(DEMO_SRC_PREFIX)) {
    throw new Error(`Unsupported source path for component: ${src}`);
  }

  const relativeSrcPath = path.normalize(src.slice(DEMO_SRC_PREFIX.length));
  if (relativeSrcPath.startsWith('..') || path.isAbsolute(relativeSrcPath)) {
    throw new Error(`Invalid source path for component: ${src}`);
  }

  const code = await fs.readFile(path.join(DEMO_SRC_ROOT, relativeSrcPath), 'utf-8');

  let codeWithUpdatedImports = code.replaceAll('@/registry/components/ui/', '@/components/ui/');
  codeWithUpdatedImports = codeWithUpdatedImports.replaceAll(
    '@/components/ui/form-tanstack',
    '@/components/ui/form',
  );
  codeWithUpdatedImports = codeWithUpdatedImports.replaceAll(
    '@/components/ui/separator-extended',
    '@/components/ui/separator',
  );

  return (
    <div className="not-prose">
      <Tabs defaultValue="preview">
        <div className="flex items-center justify-between mb-2">
          <TabsList className="h-8">
            <TabsTrigger value="preview" className="data-[selected]:shadow-xs">
              Preview
            </TabsTrigger>
            <TabsTrigger value="code" className="data-[selected]:shadow-xs">
              Code
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent
          value="preview"
          className={cn('border rounded-lg p-2 min-h-[400px] flex overflow-y-auto', {
            'items-center justify-center': center,
            'max-h-[400px]': constrainHeight,
            'py-10': !constrainHeight,
          })}
        >
          <Component />
        </TabsContent>
        <TabsContent value="code">
          <CodeBlock
            lang="tsx"
            code={codeWithUpdatedImports}
            importParadigm={importParadigm}
            className={cn(
              'bg-muted/50 p-0 overflow-hidden rounded-md shadow-sm/5',
              '[&_pre]:text-sm [&_pre]:font-normal [&_pre_span]:leading-[1.75]',
              '*:first:bg-background *:first:border  *:first:border-border/70 *:first:size-7 *:first:flex *:first:items-center *:first:justify-center',
              '[&>div:has(pre)]:rounded-md [&>div:has(pre)]:py-3 [&>div:has(pre)]:px-2 [&>div:has(pre)]:border-none [&>div:has(pre)]:min-h-[400px] my-0',
              {
                '[&>div:has(pre)]:max-h-[400px]': constrainHeight,
              },
            )}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
