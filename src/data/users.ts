type UserInfo = {
	id: string;
	name: string;
	role: string;
};

export const users: UserInfo[] = [
	{
		id: "2db7b37c-5901-447b-9e1d-5d5bb12f0c41",
		name: "Alice",
		role: "Frontend Dev",
	},
	{
		id: "5d28db85-f3d5-4627-bf3f-e2d6cff3450a",
		name: "Bob",
		role: "Node.js Newbie",
	},
];

export const findUserById = (id: string) => users.find((u) => u.id === id);
