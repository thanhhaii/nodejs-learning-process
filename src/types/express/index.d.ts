import type { JwtPayload } from "jsonwebtoken";
import type { AuthUser } from "../users/index.js";

declare global {
	namespace Express {
		interface Request {
			user?: JwtPayload & { id: AuthUser["id"]; type: "access" };
		}
	}
}
