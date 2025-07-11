import { Request, Response } from "express";
import { registerUser } from "../services/auth.service";
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

export const refrehToken = async (req: Request, res: Response) => {
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
        const decode = JWTService.decodeToken(refresh_token);
    } catch (err) {
        ResponseService.error(res, "something went wrong", 500, err);
    }
};
