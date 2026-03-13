import fs from "node:fs";
import path from "node:path";
import { pipeline } from "node:stream/promises";
export const saveFileToLocalMachine = async (req) => {
    const fileName = `img-${Date.now()}.png`;
    const filePath = path.join(process.cwd(), "public", fileName);
    const writeStream = fs.createWriteStream(filePath);
    await pipeline(req, writeStream);
    return fileName;
};
