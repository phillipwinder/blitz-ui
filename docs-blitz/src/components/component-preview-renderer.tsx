import fs from 'fs/promises';
import path from 'path';
import { cn } from '@/lib/utils';
import { components } from '@/registry/__index__';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/registry/components/ui/tabs';
import { CodeBlock } from './code-block';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectPositioner,
  SelectTrigger,
  SelectValue,
} from '@/registry/components/ui/select';

enum ImportType {
  Dependency = 'dependency',
  Registry = 'registry',
}

const importTypes = {
  [ImportType.Dependency]: 'Dependency',
  [ImportType.Registry]: 'shadcn',
};

export default async function ComponentPreviewRenderer({
  name,
  center = true,
  constrainHeight = true,
}: {
  name: string;
  center?: boolean;
  constrainHeight?: boolean;
}) {
  const { component: Component, src } = components[name];

  let code = await fs.readFile(path.join(process.cwd(), src), 'utf-8');

  const getCode = (importType?: ImportType) => {
    if (importType === ImportType.Registry) {
      code = code.replaceAll('@blitz-ui/react/', '@/components/ui/');
    }
    code = code.replaceAll('@/registry/components/ui/', '@/components/ui/');
    code = code.replaceAll('@/components/ui/form-tanstack', '@/components/ui/form');
    return code;
  };

  const importType = ImportType.Dependency;

  return (
    <div className="not-prose">
      <Tabs defaultValue="preview">
        <div className="flex items-center justify-between mb-2">
          <TabsList className="h-8">
            <TabsTrigger value="preview" className="data-[selected]:shadow-xs">
              Preview
            </TabsTrigger>
            <TabsTrigger value={importType} className="data-[selected]:shadow-xs">
              Code
            </TabsTrigger>
          </TabsList>
          <Select
            // onValueChange={(value) => setImportType(value as ImportType)}
            items={importTypes}
            value={importType}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectPositioner alignItemWithTrigger>
              <SelectContent>
                {Object.entries(importTypes).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectPositioner>
          </Select>
        </div>
        <TabsContent
          value="preview"
          className={cn('border rounded-lg p-2 min-h-[400px] flex overflow-y-auto', {
            'items-center justify-center': center,
            'max-h-[400px]': constrainHeight,
          })}
        >
          <Component />
        </TabsContent>
        <TabsContent value={ImportType.Dependency}>
          <CodeBlock
            lang="tsx"
            code={getCode(ImportType.Dependency)}
            className={cn(
              'bg-background p-0 overflow-hidden rounded-md',
              '[&_pre]:text-sm [&_pre]:font-normal [&_pre_span]:leading-[1.75]',
              '[&>div:not(:has(pre))]:top-0 [&>div:not(:has(pre))]:right-0 [&>div:not(:has(pre))]:size-8',
              '[&>div:has(pre)]:rounded-md [&>div:has(pre)]:py-3 [&>div:has(pre)]:px-2 [&>div:has(pre)]:border-none [&>div:has(pre)]:min-h-[400px] my-0',
              {
                '[&>div:has(pre)]:max-h-[400px]': constrainHeight,
              },
            )}
          />
        </TabsContent>
        <TabsContent value={ImportType.Registry}>
          <CodeBlock
            lang="tsx"
            code={getCode(ImportType.Registry)}
            className={cn(
              'bg-background p-0 overflow-hidden rounded-md',
              '[&_pre]:text-sm [&_pre]:font-normal [&_pre_span]:leading-[1.75]',
              '[&>div:not(:has(pre))]:top-0 [&>div:not(:has(pre))]:right-0 [&>div:not(:has(pre))]:size-8',
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
