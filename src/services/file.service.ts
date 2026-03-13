import fs from "node:fs";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import type { Request } from "express";

export const saveFileToLocalMachine = async (req: Request) => {
	const fileName = `img-${Date.now()}.png`;
	const filePath = path.join(process.cwd(), "public", fileName);

	const writeStream = fs.createWriteStream(filePath);
	await pipeline(req, writeStream);

	return fileName;
};
