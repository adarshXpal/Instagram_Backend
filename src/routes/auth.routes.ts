import { Router } from "express";
import auth from "../controllers";
const authRoute = Router();

authRoute.post("/register", auth.register);
// authRoute.post("/login");
// authRoute.post("/logout");1
authRoute.post("/refresh-token", auth.refreshToken);
// authRoute.post("/forgot-password");
// authRoute.post("/reset-password");

export default authRoute;
