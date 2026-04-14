import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

const { DATABASE_URL, FRONTEND_ORIGIN, PORT, SECRET_KEY } = process.env;

if (!DATABASE_URL) {
	throw new Error("DATABASE_URL is required");
}

if (!SECRET_KEY) {
	throw new Error("SECRET_KEY is required");
}

export const env = {
	DATABASE_URL,
	FRONTEND_ORIGIN: FRONTEND_ORIGIN ?? "http://localhost:5173",
	PORT: Number.parseInt(PORT ?? "8080", 10),
	SECRET_KEY,
};
