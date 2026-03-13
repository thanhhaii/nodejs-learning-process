import type { Request, Response } from "express";
import { saveFileToLocalMachine } from "../services/file.service.js";

export const handleUploadImage = async (req: Request, res: Response) => {
	try {
		const fileName = await saveFileToLocalMachine(req);
		res.status(201).json({
			message: "Upload successful",
			file: fileName,
		});
	} catch (error) {
		console.error("Upload Error:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
