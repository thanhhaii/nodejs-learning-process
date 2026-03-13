import express from "express";
import { notFoundHandler } from "./middlewares/not-found.middleware.js";
import { requestLogger } from "./middlewares/request-logger.middleware.js";
import { apiRouter } from "./routes/index.js";

export const app = express();

app.use(requestLogger);

app.get("/", (_req, res) => {
	res.status(200).json({
		health: true,
	});
});

app.use("/api", apiRouter);
app.use(notFoundHandler);
