import { Request, Response } from "express";
import {
    registerUser,
    loginUser,
    forgotPassword,
} from "../services/auth.service";
import ResponseService from "../utils/response.utils";
import RedisService from "../utils/Redis";
import JWTService from "../utils/jwt.utils";

const redis = new RedisService();
export const register = async (req: Request, res: Response) => {
    try {
        const { username, email, password, fullName } = req.body;

        if (!username || !email || !password || !fullName) {
            return ResponseService.error(
                res,
                "All field are required",
                400,
                {}
            );
        }

        const { token, refreshToken } = await registerUser({
            username,
            email,
            password,
            fullName,
        });
        res.cookie("token", token, {
            maxAge: 24 * 60 * 60,
        });
        res.cookie("refresh_token", refreshToken, {
            maxAge: 365 * 24 * 60 * 60,
        });

        await redis.set(token, refreshToken);

        ResponseService.success(res, {}, "User created Successfully", 201);
    } catch (error: any) {
        if (error.message == "User already exists") {
            ResponseService.error(res, "User already exists", 400, error);
        }
        ResponseService.error(res, "something went wrong", 500, error);
    }
};
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return ResponseService.error(
                res,
                "Email and password are required",
                400,
                {}
            );
        }
        const { token, refreshToken } = await loginUser({ email, password });
        res.cookie("token", token, { maxAge: 24 * 60 * 60 });
        res.cookie("refresh_token", refreshToken, {
            maxAge: 365 * 24 * 60 * 60,
        });
        await redis.set(token, refreshToken);
        ResponseService.success(res, {}, "Login Successful", 200);
    } catch (error: any) {
        if (
            error.messsage === "User not found" ||
            error.messsage === "Invalid Password"
        ) {
            return ResponseService.error(res, error.messsage, 401, {});
        }
        ResponseService.error(res, "something went wrong", 500, error);
    }
};

export const forgotPasswordController = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        if (!email) {
            return ResponseService.error(res, "Email is required", 400, {});
        }
        const token = await forgotPassword(email);

        await redis.set(token, email);
        ResponseService.success(
            res,
            {},
            "Password reset link sent successfully",
            200
        );
    } catch (error: any) {
        if (error.messsage === "User not found") {
            return ResponseService.error(res, error.messsage, 404, {});
        }
        ResponseService.error(res, "something went wrong", 500, error);
    }
};

export const logout = (req: Request, res: Response) => {
    res.cookie("token", "");
    res.cookie("refresh_token", "");
    return ResponseService.success(res, {}, "Logged out Successfully !!", 200);
};

export const refreshToken = async (req: Request, res: Response) => {
    try {
        const refresh_token = req.cookies.refresh_token;
        const token = req.cookies.token;

        if (JWTService.verifyToken(token)) {
            return ResponseService.success(
                res,
                {},
                "Token is not expired",
                200
            );
        }
        const decode1: { userId: string; refreshToken: Boolean } | null =
            JWTService.decodeToken(refresh_token);
        const decode2: { userId: string } | null =
            JWTService.decodeToken(token);

        if (
            decode1?.refreshToken === true &&
            decode1.userId &&
            decode1?.userId === decode2?.userId
        ) {
          const rf = await redis.get(token);
          if(rf != refresh_token){
            return ResponseService.error(res, "Refresh Token is wrong", 400, {});
          }
          const t = JWTService.generateToken({ userId: decode1.userId }, 60 * 60);
          await redis.del(token);
          await redis.set(t, refresh_token);
          res.cookie("token", t, {
              maxAge: 24 * 60 * 60,
          });

          ResponseService.success(res, {token: t}, "Token refreshed Successfully", 200);
        }else {
          return ResponseService.error(res, "JWT is wrong", 400, {});
        }
    } catch (err) {
        ResponseService.error(res, "something went wrong", 500, err);
    }
};
