import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "../interfaces/User.interface";
import User from "../models/User.model";
import ResponseService from "../utils/response.utils";
import JWTService from "../utils/jwt.utils";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      ResponseService.error(res, "No token provided, authorization denied", 401, {});
    }
    const decoded = JWTService.verifyToken(token) as { userId: string };
    if (!decoded) {
      ResponseService.error(res, "Token is not Valid !!", 401, {});
    }
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      ResponseService.error(res, "User not found", 404, {});
    }
    req.user = user|| undefined;
    next();
  } catch (err) {
    ResponseService.error(res, "Token is not valid", 401, err);
  }
};
