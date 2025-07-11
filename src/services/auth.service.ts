import bcrypt from "bcryptjs";
import userModel from "../models/User.model";
import DatabaseService from "../utils/database";
import JWTService from "../utils/jwt.utils";

const db = new DatabaseService(userModel);

export const registerUser = async (userData: {
    username: string;
    email: string;
    password: string;
    fullName: string;
}): Promise<{ token: string; refreshToken: string }> => {
    const { username, email, password, fullName } = userData;

    const existingUser = await db.findOne({
        email,
    });
    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await db.create({
        username,
        email,
        password: hashedPassword,
        fullName,
    });

    const token = JWTService.generateToken({ userId: user._id }, 60 * 60);
    const refreshToken = JWTService.generateToken(
        {
            userId: user._id,
            refreshToken: true,
        },
        365 * 24 * 60 * 60
    );

    return { token, refreshToken };
};
