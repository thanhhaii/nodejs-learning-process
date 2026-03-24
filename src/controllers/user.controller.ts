import type { Request, Response } from "express";
import { findUserById, users } from "../data/users.js";
import { loginUser, registerUser } from "../services/auth.service.js";
import type { UserLogin, UserRegister } from "../types/users/index.js";

export const handleUsersRoute = (_req: Request, res: Response) => {
	res.status(200).json(users);
};

export const handleSingleUserRoute = (req: Request, res: Response) => {
	const id = Number.parseInt(req.params.id as string, 10);

	if (Number.isNaN(id)) {
		res.status(400).json({ error: "Invalid user id" });
		return;
	}

	const user = findUserById(id);
	if (user) {
		res.status(200).json(user);
	} else {
		res.status(404).json({
			error: "User not found",
		});
	}
};

export const register = async (
	req: Request<unknown, unknown, UserRegister>,
	res: Response,
) => {
	const { username, email, password } = req.body;

	if (!username || !email || !password) {
		res.status(400).json({
			error: "username, email và password là bắt buộc",
		});
		return;
	}

	const result = await registerUser({
		username,
		email,
		password,
	});

	if ("error" in result) {
		res.status(result.status).json({
			error: result.error,
		});
		return;
	}

	res.status(201).json(result.user);
};

export const login = async (
	req: Request<unknown, unknown, UserLogin>,
	res: Response,
) => {
	try {
		const { identifier, password } = req.body;

		if (!identifier || !password) {
			res.status(400).json({
				error: "identifier và password là bắt buộc",
			});
			return;
		}

		const result = await loginUser({
			identifier,
			password,
		});

		if ("error" in result) {
			res.status(result.status).json({
				error: result.error,
			});
			return;
		}

		res.status(200).json(result);
	} catch (error) {
		console.error(`Login: ${error}`);
		res.status(500).json({
			error: "Internal Server Error",
		});
	}
};
