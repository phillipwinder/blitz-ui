import fs from 'fs-extra';
import path from 'path';

function toKebabCase(str: string): string {
  return str
    .replace(/([A-Z])/g, '-$1')
    .slice(1)
    .toLowerCase();
}

async function copy(fileName: string, source: string, destination: string) {
  try {
    await fs.copy(source, destination);
  } catch (err) {
    console.error(err);
    throw new Error(`Failed to copy ${fileName}.`);
  }
}

const components = [
  'Accordion',
  'AlertDialog',
  'AspectRatio',
  'Autocomplete',
  'Avatar',
  'Badge',
  'Breadcrumb',
  'Button',
  'Calendar',
  'Carousel',
  'Checkbox',
  'Collapsible',
  'Combobox',
  'Command',
  'ContextMenu',
  'Dialog',
  'DropdownMenu',
  'Field',
  'Form',
  'FormTanstack',
  'HoverCard',
  'Input',
  'Label',
  'Menu',
  'Menubar',
  'NavigationMenu',
  'Pagination',
  'Popover',
  'PreviewCard',
  'Progress',
  'RadioGroup',
  'ScrollArea',
  'Select',
  'Separator',
  'Sheet',
  'Sidebar',
  'Skeleton',
  'Slider',
  'Switch',
  'Tabs',
  'Textarea',
  'Toggle',
  'ToggleGroup',
  'Tooltip',
];

console.info('Copying components to docs registry...');

for (const component of components) {
  const source = path.join(
    import.meta.dirname,
    `../../packages/react-blitz/src/${toKebabCase(component)}/${component}.tsx`,
  );
  const destination = path.join(
    import.meta.dirname,
    `../src/registry/components/ui/${toKebabCase(component)}.tsx`,
  );
  copy(component, source, destination);
}

copy(
  'hooks',
  path.join(import.meta.dirname, `../../packages/react-blitz/src/hooks`),
  path.join(import.meta.dirname, `../src/registry/hooks`),
);

console.info('Copying completed.');
