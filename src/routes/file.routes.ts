import { Router } from "express";
import { handleUploadImage } from "../controllers/file.controller.js";

export const fileRouter = Router();

fileRouter.post("/upload", handleUploadImage);
