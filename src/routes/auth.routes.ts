import { Router } from "express";
import auth from "../controllers";
const authRoute = Router();

authRoute.post("/register", auth.register);
authRoute.post("/login", auth.login);
authRoute.post("/logout", auth.logout);
authRoute.post("/refresh-token", auth.refreshToken);
authRoute.post("/forgot-password", auth.forgotPasswordController);
// authRoute.post("/reset-password");

export default authRoute;
