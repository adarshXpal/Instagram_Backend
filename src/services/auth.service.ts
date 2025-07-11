import bcrypt from 'bcryptjs';
import { userSchema } from '../models/User.model';
import { IUser } from '../interfaces/User.interface';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const registerUser = async (userData: Omit<IUser, '_id' | 'createdAt' | 'updatedAt' | 'followers' | 'following' | 'followerCount' | 'followingCount' | 'postCount' | 'isVerified' | 'isPrivate'>): Promise<{ token: string }> => {
  const { username, email, password, fullName } = userData;

  const existingUser = await userSchema.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create new user
  const user = new userSchema({
    username,
    email,
    password: hashedPassword,
    fullName,
  });

  await user.save();

  // Generate JWT token
  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

  return { token };
};
