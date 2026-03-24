import { findUserById, users } from "../data/users.js";
import { loginUser, registerUser } from "../services/auth.service.js";
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
export const register = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400).json({
            error: "username, email và password là bắt buộc",
        });
        return;
    }
    const result = await registerUser({
        username,
        email,
        password,
    });
    if ("error" in result) {
        res.status(result.status).json({
            error: result.error,
        });
        return;
    }
    res.status(201).json(result.user);
};
export const login = async (req, res) => {
    try {
        const { identifier, password } = req.body;
        if (!identifier || !password) {
            res.status(400).json({
                error: "identifier và password là bắt buộc",
            });
            return;
        }
        const result = await loginUser({
            identifier,
            password,
        });
        if ("error" in result) {
            res.status(result.status).json({
                error: result.error,
            });
            return;
        }
        res.status(200).json(result.user);
    }
    catch (error) {
        console.error(`Login: ${error}`);
        res.status(500).json({
            error: "Internal Server Error",
        });
    }
};
