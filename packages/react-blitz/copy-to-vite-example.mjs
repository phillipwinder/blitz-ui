import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const packageDir = path.dirname(fileURLToPath(import.meta.url));
const buildDir = path.join(packageDir, 'build');
const targetDir = path.join(packageDir, '..', '..', 'examples', 'vite-ts', 'node_modules', 'blitz-ui');
const targetPackageJsonPath = path.join(targetDir, 'package.json');

async function main() {
  await fs.rm(targetDir, { recursive: true, force: true });
  await fs.cp(buildDir, targetDir, { recursive: true });

  const packageJson = JSON.parse(await fs.readFile(targetPackageJsonPath, 'utf8'));
  packageJson.name = 'blitz-ui';

  await fs.writeFile(targetPackageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
