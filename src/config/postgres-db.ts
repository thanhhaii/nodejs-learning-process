import { Pool } from "pg";
import { env } from "./env.js";

const pool = new Pool({
	connectionString: env.DATABASE_URL,
});

pool.on("connect", () => {
	console.log("Connected to Postgres Database!");
});

export const query = pool.query.bind(pool);
