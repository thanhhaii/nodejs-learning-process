export const users = [
    { id: 1, name: "Alice", role: "Frontend Dev" },
    { id: 2, name: "Bob", role: "Node.js Newbie" },
];
export const findUserById = (id) => users.find((u) => u.id === id);
