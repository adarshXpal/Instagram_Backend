import bcrypt from "bcryptjs";
import userModel from "../models/User.model";
import DatabaseService from "../utils/database";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

const db = new DatabaseService(userModel);

export const registerUser = async (userData: {
    username: string;
    email: string;
    password: string;
    fullName: string;
}): Promise<{ token: string }> => {
    const { username, email, password, fullName } = userData;

    const existingUser = await db.findOne({
        $or: [{ username }, { email }],
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

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
        expiresIn: "1h",
    });

    return { token };
};
