import { Pool } from "pg";
import { env } from "./env.js";

const pool = new Pool({
	connectionString: env.DATABASE_URL,
});

console.log("Postgres connection pool initialized.");

export const query = pool.query.bind(pool);
