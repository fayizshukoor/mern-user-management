import cloudinary from "../config/cloudinary.config.js";
import User from "../models/user.model.js";

export const getProfile = async (userId) => {
    const user = await User.findById(userId).select("-password");

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};

export const updateProfile = async (userId, { name, email }) => {
    const user = await User.findByIdAndUpdate(
        userId,
        {
            name,
            email
        },
        {
            returnDocument: "after",
            runValidators: true
        }
    ).select("-password");

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};

export const uploadProfileImage = async (userId, file) => {
    if (!file) {
        throw new Error("Image is required");
    }

    const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "user-management/profile-images",
                resource_type: "image"
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );

        uploadStream.end(file.buffer);
    });

    const user = await User.findByIdAndUpdate(
        userId,
        {
            profileImage: result.secure_url
        },
        {
            returnDocument: "after"
        }
    ).select("-password");

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};

export const removeProfileImage = async (userId) => {
    const user = await User.findByIdAndUpdate(
        userId,
        { profileImage: null },
        { returnDocument: "after" }
    ).select("-password");

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};