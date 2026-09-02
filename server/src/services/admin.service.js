import User from "../models/user.model.js";

export const getUsers = async (search) => {
    const filter = search
        ? {
            $or: [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } }
            ]
        }
        : {};

    return User.find(filter).select("-password");
};