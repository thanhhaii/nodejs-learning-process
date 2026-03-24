import type { NextFunction, Request, Response } from "express";
import tokenService from "../services/jwt.service.js";

export const requireAuth = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		res.status(401).json({
			error: "Unauthorized",
		});
		return;
	}

	const token = authHeader.slice(7).trim();

	if (!token || !tokenService.verifyToken(token)) {
		res.status(401).json({
			error: "Invalid or expired token",
		});
		return;
	}

	next();
};
