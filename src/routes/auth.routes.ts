import { Router } from "express";
import auth from "../controllers";
const authRoute = Router();

authRoute.post("/register", auth.register);
authRoute.post("/login");
authRoute.post("/logout");
authRoute.post("/refresh-token");
authRoute.post("/forgot-password");
authRoute.post("/reset-password");

export default authRoute;
