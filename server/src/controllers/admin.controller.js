import * as adminService from "../services/admin.service.js";

export const getUsers = async (req, res) => {
    const users = await adminService.getUsers(req.query.search);

    res.status(200).json(users);
};