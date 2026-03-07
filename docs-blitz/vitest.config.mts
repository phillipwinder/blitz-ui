import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

import { mergeConfig, defineProject } from "vitest/config"

// eslint-disable-next-line import/no-relative-packages
import sharedConfig from "../vitest.shared.mts"

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url))

export default mergeConfig(
  sharedConfig,
  defineProject({
    define: {
      "process.env.NODE_ENV": JSON.stringify("test"),
    },
    resolve: {
      alias: {
        "@": resolve(CURRENT_DIR, "./"),
        "@blitz-ui/react": resolve(CURRENT_DIR, "../packages/react-blitz/src"),
      },
    },
    test: {
      name: "docs-blitz",
    },
  })
)
