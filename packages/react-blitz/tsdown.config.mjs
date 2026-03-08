import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'tsdown';

const packageDir = path.dirname(fileURLToPath(import.meta.url));
const packageJson = JSON.parse(fs.readFileSync(path.join(packageDir, 'package.json'), 'utf8'));

function resolveExportPath(exportValue) {
  if (typeof exportValue === 'string') {
    return exportValue;
  }

  if (!exportValue || Array.isArray(exportValue) || typeof exportValue !== 'object') {
    return null;
  }

  const candidates = ['import', 'default', 'types'];

  for (const candidate of candidates) {
    const value = exportValue[candidate];
    if (typeof value === 'string') {
      return value;
    }
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      const nestedDefault = value.default;
      if (typeof nestedDefault === 'string') {
        return nestedDefault;
      }
    }
  }

  return null;
}

const entry = Object.fromEntries(
  Object.entries(packageJson.exports).flatMap(([, exportValue]) => {
    const exportPath = resolveExportPath(exportValue);
    if (!exportPath || !exportPath.startsWith('./src/') || exportPath.endsWith('.css')) {
      return [];
    }

    const entryName = exportPath.slice('./src/'.length).replace(/\.[^.]+$/, '');
    return [[entryName, exportPath]];
  }),
);

const external = [
  ...Object.keys(packageJson.dependencies ?? {}),
  ...Object.keys(packageJson.peerDependencies ?? {}),
];

export default defineConfig({
  entry,
  outDir: 'build',
  format: 'esm',
  fixedExtension: false,
  dts: {
    build: true,
  },
  clean: false,
  unbundle: true,
  deps: {
    neverBundle: external,
  },
});
