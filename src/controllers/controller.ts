import type { ServerResponse } from "node:http";
import { findUserById, users } from "../data/users.js";

export const handleUsersRoute = (res: ServerResponse) => {
	res.writeHead(200, {
		"content-type": "application/json",
	});
	res.end(JSON.stringify(users));
};

export const handleSingleUserRoute = (res: ServerResponse, id: number) => {
	const user = findUserById(id);
	if (user) {
		res.writeHead(200, {
			"content-type": "application/json",
		});
		res.end(JSON.stringify(user));
	} else {
		res.writeHead(404, {
			"content-type": "application/json",
		});
		res.end(
			JSON.stringify({
				error: "User not found",
			}),
		);
	}
};
