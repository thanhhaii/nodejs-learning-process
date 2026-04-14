import http from "node:http";
import type WebSocket from "ws";
import { WebSocketServer } from "ws";
import { app } from "./app.js";
import { PORT } from "./config/constants.js";
import {
	handleSendMessage,
	registerSocket,
	removeSocket,
} from "./services/chat.service.js";
import tokenService from "./services/jwt.service.js";
import type { SocketAuthUser } from "./types/chat/index.js";

const server = http.createServer(app);

const wss = new WebSocketServer({ server });

wss.on("connection", (socket: WebSocket, req) => {
	console.log("[WS] Incoming connection...");
	const url = new URL(req.url!, `http://${req.headers.host}`);
	const token = url.searchParams.get("token");

	let authUser: SocketAuthUser;
	try {
		if (!token) throw new Error("No token");
		const decoded = tokenService.verifyToken(token);
		authUser = { userId: decoded!.id, email: decoded!.email! };
	} catch {
		socket.close(1008, "Unauthorized");
		return;
	}

	registerSocket(authUser.userId, socket);
	console.log(`[WS] User ${authUser.userId} connected`);

	socket.on("message", async (raw) => {
		try {
			const { event, payload } = JSON.parse(raw.toString());

			if (event === "send_message") {
				await handleSendMessage(authUser, payload, socket);
			}
		} catch {
			socket.send(
				JSON.stringify({
					event: "error",
					payload: { message: "Invalid message format" },
				}),
			);
		}
	});

	socket.on("close", () => {
		removeSocket(authUser.userId);
		console.log(`[WS] User ${authUser.userId} disconnected`);
	});

	wss.on("error", (err) => {
		console.error("[WS] Server error:", err);
	});
});

server.listen(PORT, () => {
	console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
});
