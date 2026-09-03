import * as userService from "../services/user.service.js";
export const getProfile = async (req, res) => {
    const profile = await userService.getProfile(req.user.userId);

    res.status(200).json(profile);
};

export const updateProfile = async (req, res) => {
    try {
        const user = await userService.updateProfile(
            req.user.userId,
            req.body
        );

        res.status(200).json({
            message: "Profile updated successfully",
            user
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

export const uploadProfileImage = async (req, res) => {
    try {
        const user = await userService.uploadProfileImage(
            req.user.userId,
            req.file
        );

        res.status(200).json({
            message: "Profile image uploaded successfully",
            user
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

export const removeProfileImage = async (req, res) => {
    try {
        const user = await userService.removeProfileImage(req.user.userId);

        res.status(200).json({
            message: "Profile image removed successfully",
            user
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};