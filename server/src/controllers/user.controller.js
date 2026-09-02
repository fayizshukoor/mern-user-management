import * as userService from "../services/user.service.js";
export const getProfile = async (req, res) => {
    const profile = await userService.getProfile(req.user.userId);

    res.status(200).json(profile);
};