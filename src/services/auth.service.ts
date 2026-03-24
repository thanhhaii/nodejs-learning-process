import bcrypt from "bcrypt";
import { query } from "../config/postgres-db.js";
import type {
	AuthUser,
	LoginUserResult,
	RegisterUserResult,
	UserLogin,
	UserRegister,
} from "../types/users/index.js";
import tokenService from "./jwt.service.js";

export const registerUser = async (
	user: UserRegister,
): Promise<RegisterUserResult> => {
	try {
		const userCheck = await query(
			"SELECT 1 FROM users WHERE email = $1 OR username = $2",
			[user.email, user.username],
		);

		if (userCheck.rows.length > 0) {
			return {
				error: "Email hoặc username đã được sử dụng",
				status: 409,
			};
		}

		const passwordHash = await bcrypt.hash(user.password, 10);
		const newUser = await query(
			"INSERT INTO users (username, email, password_hash) values ($1, $2, $3) RETURNING id, username, email",
			[user.username, user.email, passwordHash],
		);

		return {
			user: newUser.rows[0] as AuthUser,
		};
	} catch (error) {
		if ((error as NodeJS.ErrnoException & { code?: string }).code === "23505") {
			return {
				error: "Email hoặc username đã được sử dụng",
				status: 409,
			};
		}

		console.error("Register Error:", error);

		return {
			error: "Internal Server Error",
			status: 500,
		};
	}
};

export const loginUser = async (user: UserLogin): Promise<LoginUserResult> => {
	try {
		const foundUser = await query(
			"SELECT id, username, email, password_hash FROM users WHERE username = $1 OR email = $1 LIMIT 1",
			[user.identifier],
		);

		if (foundUser.rows.length === 0) {
			return {
				error: "Thông tin đăng nhập không hợp lệ",
				status: 401,
			};
		}

		const matchedUser = foundUser.rows[0] as AuthUser & {
			password_hash: string;
		};
		const isPasswordValid = await bcrypt.compare(
			user.password,
			matchedUser.password_hash,
		);

		if (!isPasswordValid) {
			return {
				error: "Thông tin đăng nhập không hợp lệ",
				status: 401,
			};
		}

		const token = tokenService.createToken(matchedUser);
		return {
			user: {
				id: matchedUser.id,
				username: matchedUser.username,
				email: matchedUser.email,
			},
			accessToken: token.accessToken,
			refreshToken: token.refreshToken,
		};
	} catch (error) {
		console.error("Login Error:", error);

		return {
			error: "Internal Server Error",
			status: 500,
		};
	}
};
