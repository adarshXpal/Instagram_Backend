import { Router } from "express";
import Controller from "../controllers";
const authRoute = Router();

authRoute.post("/register", Controller.auth.register);
authRoute.post("/login", Controller.auth.login);
authRoute.post("/logout", Controller.auth.logout);
authRoute.post("/refresh-token", Controller.auth.refreshToken);
authRoute.post("/forgot-password", Controller.auth.forgotPasswordController);
// authRoute.post("/reset-password");

export default authRoute;
