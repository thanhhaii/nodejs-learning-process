import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import type { AuthUser } from "../types/users/index.js";

type CreateToken = {
	accessToken: string;
	refreshToken: string;
};

class TokenService {
	private secretKey: string;

	constructor(secret: string) {
		this.secretKey = secret;
	}

	public createToken(user: AuthUser): CreateToken {
		const accessToken = jwt.sign(
			{
				id: user.id,
				username: user.username,
				email: user.email,
				type: "access",
			},
			this.secretKey,
			{
				algorithm: "HS256",
				expiresIn: "1h",
			},
		);

		const refreshToken = jwt.sign(
			{
				id: user.id,
				type: "refresh",
			},
			this.secretKey,
			{
				algorithm: "HS256",
				expiresIn: "7d",
			},
		);

		return {
			accessToken,
			refreshToken,
		};
	}

	public verifyToken(token: string): boolean {
		try {
			jwt.verify(token, this.secretKey);
			return true;
		} catch {
			return false;
		}
	}
}

const tokenService = new TokenService(env.SECRET_KEY);
export default tokenService;
