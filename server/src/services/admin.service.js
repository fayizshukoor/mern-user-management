import User from "../models/user.model.js";
import bcrypt from 'bcrypt';

export const getUsers = async (search = "", page = 1, limit = 10) => {
    const filter = search
        ? {
              $or: [
                  { name: { $regex: search, $options: "i" } },
                  { email: { $regex: search, $options: "i" } }
              ]
          }
        : {};

    const skip = (page - 1) * limit;

    const [users, totalUsers] = await Promise.all([
        User.find(filter)
            .select("-password")
            .skip(skip)
            .limit(limit),

        User.countDocuments(filter)
    ]);

    return {
        users,
        totalUsers,
        currentPage: page,
        totalPages: Math.ceil(totalUsers / limit)
    };
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