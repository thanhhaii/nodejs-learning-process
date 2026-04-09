import { Router } from "express";
import { getChatHistory } from "../controllers/chat.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

export const chatRouter = Router();

chatRouter.get("/chat/:userId/messages", requireAuth, getChatHistory);
