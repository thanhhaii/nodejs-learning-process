import type { Request, Response } from "express";
import * as chatService from "../services/chat.service.js";

export async function getChatHistoryMessages(
	req: Request,
	res: Response,
): Promise<void> {
	try {
		const currentUserId = req.user!.id;
		const otherUserId = req.params.userId as string;

		const messages = await chatService.getChatHistory(
			currentUserId,
			otherUserId,
		);
		res.json({
			data: messages,
		});
	} catch (err: any) {
		if (err.message === "User not found") {
			res.status(404).json({ error: err.message });
			return;
		}
		if (err.message === "Invalid userId") {
			res.status(400).json({ error: err.message });
			return;
		}
		res.status(500).json({
			error: "Internal server error",
			message: err?.message,
		});
	}
}

export async function getChatHistories(
	req: Request,
	res: Response,
): Promise<void> {
	try {
		const currentUserId = req.user!.id;
		const histories = await chatService.getChatHistories(currentUserId);

		res.json({
			data: histories,
		});
	} catch (err: any) {
		res.status(500).json({
			error: "Internal server error",
			message: err?.message,
		});
	}
}
