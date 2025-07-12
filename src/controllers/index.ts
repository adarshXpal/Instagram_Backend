import {
    register,
    login,
    logout,
    refreshToken,
    forgotPasswordController,
} from "./auth.controller";

export default {
    auth: { register, login, logout, refreshToken, forgotPasswordController },
};
