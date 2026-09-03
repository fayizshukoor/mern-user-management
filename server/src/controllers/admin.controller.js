import * as adminService from "../services/admin.service.js";

export const getUsers = async (req, res) => {
    try {
        const search = req.query.search || "";
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const data = await adminService.getUsers(
            search,
            page,
            limit
        );

        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

export const createUser = async (req, res) => {
    try {
        const user = await adminService.createUser(req.body);

        res.status(201).json({
            message: "User created successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        const user = await adminService.updateUser(
            req.params.id,
            req.body
        );

        res.status(200).json({
            message: "User updated successfully",
            user
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        await adminService.deleteUser(req.params.id);

        res.status(200).json({
            message: "User deleted successfully"
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};