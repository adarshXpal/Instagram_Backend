import bcrypt from "bcryptjs";
import { userSchema } from "../models/User.model";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const registerUser = async(user)

