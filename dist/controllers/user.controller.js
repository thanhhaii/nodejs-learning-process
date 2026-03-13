import { findUserById, users } from "../data/users.js";
export const handleUsersRoute = (_req, res) => {
    res.status(200).json(users);
};
export const handleSingleUserRoute = (req, res) => {
    const id = Number.parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
        res.status(400).json({ error: "Invalid user id" });
        return;
    }
    const user = findUserById(id);
    if (user) {
        res.status(200).json(user);
    }
    else {
        res.status(404).json({
            error: "User not found",
        });
    }
};
