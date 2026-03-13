import { Router } from "express";
import { fileRouter } from "./file.routes.js";
import { userRouter } from "./user.routes.js";

export const apiRouter = Router();

apiRouter.use(userRouter);
apiRouter.use(fileRouter);
