import { Router } from "express";
import {
	handleSingleUserRoute,
	handleUsersRoute,
} from "../controllers/user.controller.js";

export const userRouter = Router();

userRouter.get("/users", handleUsersRoute);
userRouter.get("/user/:id", handleSingleUserRoute);
