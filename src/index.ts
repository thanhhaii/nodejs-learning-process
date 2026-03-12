import { createServer } from "node:http";
import {
	handleSingleUserRoute,
	handleUsersRoute,
} from "./controllers/controller.js";

const PORT = 3000;

const server = createServer((req, res) => {
	const { method, url, headers } = req;
	const pathname = url
		? new URL(url, `http://${headers.host ?? "localhost"}`).pathname
		: "";
	const userIdMatch = pathname.match(/^\/api\/user\/(\d+)$/);
	console.log(`[${new Date().toISOString()}] ${method} ${url}`);

	if (pathname === "/api/users" && method === "GET") {
		handleUsersRoute(res);
	} else if (userIdMatch && method === "GET") {
		const id = Number.parseInt(userIdMatch[1], 10);
		handleSingleUserRoute(res, id);
	} else {
		res.writeHead(404, {
			"content-type": "text/plain",
		});
		res.end("404 Not Found!");
	}
});

server.listen(PORT, () => {
	console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
});
