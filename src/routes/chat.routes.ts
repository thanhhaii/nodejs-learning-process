import { Router } from "express";
import {
	getChatHistories,
	getChatHistoryMessages,
} from "../controllers/chat.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

export const chatRouter = Router();

chatRouter.get("/chat/:userId/messages", requireAuth, getChatHistoryMessages);
chatRouter.get("/chat/histories", requireAuth, getChatHistories);
