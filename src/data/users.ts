type UserInfo = {
	id: number;
	name: string;
	role: string;
};

export const users: UserInfo[] = [
	{ id: 1, name: "Alice", role: "Frontend Dev" },
	{ id: 2, name: "Bob", role: "Node.js Newbie" },
];

export const findUserById = (id: number) => users.find((u) => u.id === id);
