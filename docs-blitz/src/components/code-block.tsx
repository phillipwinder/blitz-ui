import * as Base from 'fumadocs-ui/components/codeblock';
import { highlight } from 'fumadocs-core/highlight';
import { type HTMLAttributes } from 'react';
import { cn, ImportType } from '@/lib/utils';

export async function CodeBlock({
  code,
  lang,
  importType,
  ...rest
}: HTMLAttributes<HTMLElement> & {
  code: string;
  lang: string;
  importType?: ImportType;
}) {
  if (importType) {
    if (importType === ImportType.Registry) {
      code = code.replaceAll('@blitz-ui/react/', '@/components/ui/');
    }
    code = code.replaceAll('@/registry/components/ui/', '@/components/ui/');
    code = code.replaceAll('@/components/ui/form-tanstack', '@/components/ui/form');
  }

  const rendered = await highlight(code, {
    lang,
    components: {
      pre: ({ className, ...props }) => (
        <Base.Pre className={cn('text-sm', className)} {...props} />
      ),
    },
  });

  return <Base.CodeBlock {...rest}>{rendered}</Base.CodeBlock>;
}
