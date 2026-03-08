import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const packageDir = path.dirname(fileURLToPath(import.meta.url));
const buildDir = path.join(packageDir, 'build');

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

function toBuildPath(sourcePath, extension) {
  return sourcePath.replace(/^\.\/src\//, './').replace(/\.[^.]+$/, extension);
}

async function assertFileExists(filePath) {
  await fs.access(filePath);
}

async function copyPublishAssets() {
  await fs.copyFile(path.join(packageDir, 'src', 'index.css'), path.join(buildDir, 'index.css'));
  await fs.cp(path.join(packageDir, 'src', 'styles'), path.join(buildDir, 'styles'), {
    recursive: true,
  });
  await fs.copyFile(
    path.join(packageDir, 'src', 'global.d.ts'),
    path.join(buildDir, 'global.d.ts'),
  );
  await fs.copyFile(path.join(packageDir, 'README.md'), path.join(buildDir, 'README.md'));
  await fs.copyFile(path.join(packageDir, '.npmignore'), path.join(buildDir, '.npmignore'));
}

function createRootExport() {
  return {
    types: './index.d.ts',
    style: {
      default: './index.css',
    },
    import: './index.js',
  };
}

async function createSubpathExports(packageJson) {
  const exportsMap = {
    './package.json': './package.json',
    '.': createRootExport(),
    './index.css': './index.css',
    './index': './index.css',
  };

  for (const [exportKey, exportValue] of Object.entries(packageJson.exports ?? {})) {
    if (exportKey === '.') {
      continue;
    }

    const sourcePath = resolveExportPath(exportValue);
    if (!sourcePath || sourcePath.endsWith('.css')) {
      continue;
    }

    const defaultPath = toBuildPath(sourcePath, '.js');
    const typesPath = toBuildPath(sourcePath, '.d.ts');

    await assertFileExists(path.join(buildDir, defaultPath.slice(2)));
    await assertFileExists(path.join(buildDir, typesPath.slice(2)));

    exportsMap[exportKey] = {
      types: typesPath,
      import: defaultPath,
    };
  }

  return exportsMap;
}

function createBuildPackageJson(packageJson, exportsMap) {
  return {
    name: packageJson.name,
    version: packageJson.version,
    author: packageJson.author,
    description: packageJson.description,
    keywords: packageJson.keywords,
    repository: packageJson.repository,
    license: packageJson.license,
    bugs: packageJson.bugs,
    homepage: packageJson.homepage,
    funding: packageJson.funding,
    type: 'module',
    style: 'index.css',
    exports: exportsMap,
    dependencies: packageJson.dependencies,
    peerDependencies: packageJson.peerDependencies,
    peerDependenciesMeta: packageJson.peerDependenciesMeta,
    sideEffects: packageJson.sideEffects,
    publishConfig: packageJson.publishConfig?.access
      ? {
          access: packageJson.publishConfig.access,
        }
      : undefined,
    engines: packageJson.engines,
  };
}

async function main() {
  const packageJson = JSON.parse(await fs.readFile(path.join(packageDir, 'package.json'), 'utf8'));

  await assertFileExists(path.join(buildDir, 'index.js'));
  await assertFileExists(path.join(buildDir, 'index.d.ts'));

  await copyPublishAssets();

  const exportsMap = await createSubpathExports(packageJson);
  const buildPackageJson = createBuildPackageJson(packageJson, exportsMap);

  await fs.writeFile(
    path.join(buildDir, 'package.json'),
    `${JSON.stringify(buildPackageJson, null, 2)}\n`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
