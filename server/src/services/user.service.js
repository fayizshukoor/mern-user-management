import User from "../models/user.model.js";

export const getProfile = async (userId) => {
    const user = await User.findById(userId).select("-password");

    if (!user) {
        throw new Error("User not found");
    }

    return {
        userId: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    };
};

export const updateProfile = async (userId, { name, email }) => {
    const user = await User.findByIdAndUpdate(
        userId,
        {
            name,
            email
        },
        {
            new: true,
            runValidators: true
        }
    ).select("-password");

    if (!user) {
        throw new Error("User not found");
    }

    return {
        userId: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    };
};