import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres"
import { Pool } from "pg"

let _db: NodePgDatabase | null = null

export const db = new Proxy({} as NodePgDatabase, {
  get(_target, prop) {
    if (!_db) {
      if (!process.env.DATABASE_URL) {
        throw new Error(
          "DATABASE_URL is not set. Database features are disabled in local development without a database."
        )
      }

      const pool = new Pool({ connectionString: process.env.DATABASE_URL })
      _db = drizzle({ client: pool })
    }

    return (_db as any)[prop]
  },
})
