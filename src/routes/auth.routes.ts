import { Router } from "express";

const authRoute = Router();

authRoute.post("/register");
authRoute.post("/login");
authRoute.post("/logout");
authRoute.post("/refresh-token");
authRoute.post("/forgot-password");
authRoute.post("/reset-password");

export default authRoute;
