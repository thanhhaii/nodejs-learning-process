import { Router } from "express";
import { chatRouter } from "./chat.routes.js";
import { fileRouter } from "./file.routes.js";
import { userRouter } from "./user.routes.js";

export const apiRouter = Router();

apiRouter.use(userRouter);
apiRouter.use(fileRouter);
apiRouter.use(chatRouter);
