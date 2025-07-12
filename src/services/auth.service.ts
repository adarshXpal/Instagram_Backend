import bcrypt from "bcryptjs";
import userModel from "../models/User.model";
import DatabaseService from "../utils/database";
import JWTService from "../utils/jwt.utils";
import { sendEmail } from "../utils/email.utils";

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

export const loginUser = async (loginData: {
  email: string;
  password: string;
}): Promise<{ token: string; refreshToken: string }> => {
  const { email, password } = loginData;
  const user = await db.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid Password");
  }
  const token = JWTService.generateToken({ userId: user._id }, 60 * 60);
  const refreshToken = JWTService.generateToken({ userId: user._id, refreshToken: true }, 365 * 60 * 60);
  return { token, refreshToken };
};

export const forgotPassword = async (email: string): Promise<string> => {
  const user = await db.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  const token = JWTService.generateToken({ userId: user._id }, 3600);
  const resetLink = `http://localhost:3000/api/auth/reset-password?token=${token}`;
  await sendEmail(email, 'Password Reset', `Click the following link to reset your password: ${resetLink}`);
  return token;
};
