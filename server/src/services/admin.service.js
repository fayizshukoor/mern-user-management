import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
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

export const createUser = async ({ name, email, password, role }) => {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return User.create({
        name,
        email,
        password: hashedPassword,
        role
    });
};

export const updateUser = async (userId, { name, email, role }) => {
    const user = await User.findByIdAndUpdate(
        userId,
        {
            name,
            email,
            role
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

export const deleteUser = async (userId) => {
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};