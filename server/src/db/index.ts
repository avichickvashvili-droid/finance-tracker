import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

// Surface unexpected idle-client errors instead of silently swallowing them
pool.on('error', (err) => {
  console.error('[db] Unexpected pool error:', err.message)
})

export default pool
