// This script syncs the generated Blitz UI components from the `react-blitz` package to the `registry-blitz-ui` base.
// It copies the component files and rewrites the imports to point to the correct locations in the registry.

import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

function toKebabCase(str: string): string {
  return str
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase();
}

async function copy(fileName: string, source: string, destination: string) {
  try {
    await mkdir(path.dirname(destination), { recursive: true });
    await cp(source, destination, { recursive: true, force: true });
  } catch (err) {
    console.error(err);
    throw new Error(`Failed to copy ${fileName}.`);
  }
}

function rewriteGeneratedImports(content: string, componentImports: Set<string>) {
  return content.replace(/from\s+(['"])\.\.\/([^'"]+)\1/g, (fullImport, quote, importPath) => {
    if (importPath === 'lib/utils') {
      return `from ${quote}@/registry/lib/utils${quote}`;
    }

    if (importPath.startsWith('hooks/')) {
      return `from ${quote}@/registry/${importPath}${quote}`;
    }

    if (importPath === 'icons/icon-placeholder') {
      return `from ${quote}@/registry/icons/icon-placeholder${quote}`;
    }

    if (componentImports.has(importPath)) {
      return `from ${quote}@/registry/components/ui/${importPath}${quote}`;
    }

    return fullImport;
  });
}

async function rewriteGeneratedFileImports(filePath: string, componentImports: Set<string>) {
  const content = await readFile(filePath, 'utf8');
  const updatedContent = rewriteGeneratedImports(content, componentImports);

  if (updatedContent !== content) {
    await writeFile(filePath, updatedContent, 'utf8');
  }
}

const components = [
  'Accordion',
  'Alert',
  'AlertDialog',
  'AspectRatio',
  'Autocomplete',
  'Avatar',
  'Badge',
  'Breadcrumb',
  'Button',
  'ButtonGroup',
  'Calendar',
  'Card',
  'Carousel',
  'Checkbox',
  'Collapsible',
  'Combobox',
  'Command',
  'ContextMenu',
  'Dialog',
  'Drawer',
  'DropdownMenu',
  'Empty',
  'Field',
  'Form',
  'FormTanstack',
  'HoverCard',
  'Input',
  'InputGroup',
  'InputOTP',
  'Item',
  'Kbd',
  'Label',
  'Menubar',
  'NativeSelect',
  'NavigationMenu',
  'Pagination',
  'Popover',
  'Progress',
  'RadioGroup',
  'Resizable',
  'ScrollArea',
  'Select',
  'Separator',
  'Sheet',
  'Sidebar',
  'Skeleton',
  'Slider',
  'Spinner',
  'Switch',
  'Table',
  'Tabs',
  'Textarea',
  'Toggle',
  'ToggleGroup',
  'Tooltip',
];
const componentImports = new Set(components.map(toKebabCase));

async function main() {
  console.info('Syncing blitz-ui components from package to registry...');
  await Promise.all(
    components.map(async (component) => {
      const source = path.join(
        import.meta.dirname,
        `../../packages/react-blitz/src/${toKebabCase(component)}/${component}.tsx`,
      );
      const destination = path.join(
        import.meta.dirname,
        `../src/registry/components/ui/${toKebabCase(component)}.tsx`,
      );
      await copy(component, source, destination);
      await rewriteGeneratedFileImports(destination, componentImports);
    }),
  );
  console.info('Sync completed. ✅');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
