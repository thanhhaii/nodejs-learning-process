import type { Request, Response } from "express";

export const notFoundHandler = (_req: Request, res: Response) => {
	res.status(404).type("text/plain").send("404 Not Found!");
};
