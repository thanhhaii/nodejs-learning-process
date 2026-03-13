import express from "express";
import { handleUploadImage } from "./controllers/file.controller.js";
import { handleSingleUserRoute, handleUsersRoute, } from "./controllers/user.controller.js";
const PORT = 8080;
const app = express();
app.use((req, _res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
});
app.get("/api/users", handleUsersRoute);
app.get("/api/user/:id", handleSingleUserRoute);
app.post("/api/upload", handleUploadImage);
app.use((_req, res) => {
    res.status(404).type("text/plain").send("404 Not Found!");
});
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
});
