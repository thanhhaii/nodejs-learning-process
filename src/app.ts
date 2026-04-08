import express from "express";
import swaggerUi from "swagger-ui-express";
import { openApiDocument } from "./config/swagger.js";
import { notFoundHandler } from "./middlewares/not-found.middleware.js";
import { requestLogger } from "./middlewares/request-logger.middleware.js";
import { apiRouter } from "./routes/index.js";

export const app = express();

app.use(requestLogger);
app.use(express.json());

app.get("/", (_req, res) => {
	res.status(200).json({
		health: true,
	});
});

app.get("/docs.json", (_req, res) => {
	res.status(200).json(openApiDocument);
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));

app.use("/api", apiRouter);
app.use(notFoundHandler);
