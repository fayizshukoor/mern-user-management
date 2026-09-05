import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const generateAccessToken = (user) => {
    return jwt.sign(
        {
            userId: user._id,
            role: user.role,
        },
        process.env.JWT_ACCESS_SECRET,
        {
            expiresIn: "15m",
        }
    );
};

const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            userId: user._id,
        },
        process.env.JWT_REFRESH_SECRET,
        {
            expiresIn: "7d",
        }
    );
};

export const registerUser = async ({ name, email, password }) => {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    return user;
};

export const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        throw new Error("Invalid credentials");
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return {
        user,
        accessToken,
        refreshToken,
    };
};

export const regularLoginUser = async (credentials) =>{
    const result = await loginUser(credentials);

    if(result.user.role === "admin"){
        throw new Error("Please use admin login");
    }

    return result;
}

export const adminLoginUser = async ({ email, password }) => {
    const result = await loginUser({ email, password });

    if (result.user.role !== "admin") {
        throw new Error("Admin access required");
    }

    return result;
};

export const refreshAccessToken = async (refreshToken) => {

    const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET
    );


    const user = await User.findById(decoded.userId);


    if (!user) {
        throw new Error("User not found");
    }


    return generateAccessToken(user);
};