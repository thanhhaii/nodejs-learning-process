import { Router } from "express";
import {
	handleSingleUserRoute,
	handleUsersRoute,
	login,
	register,
} from "../controllers/user.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

export const userRouter = Router();

userRouter.get("/users", requireAuth, handleUsersRoute);
userRouter.get("/user/:id", requireAuth, handleSingleUserRoute);
userRouter.post("/login", login);
userRouter.post("/register", register);
