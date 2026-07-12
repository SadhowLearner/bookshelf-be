import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

try {
  const result = await pool.query("SELECT NOW()");
  console.log(result.rows);
} catch (err) {
  console.error(err);
} finally {
  await pool.end();
}