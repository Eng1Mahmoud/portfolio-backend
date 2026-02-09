import { authService } from "../services/authService.js";
class AuthController {
    async register(req, res) {
        return authService.register(req, res);
    }
    async login(req, res) {
        return authService.login(req, res);
    }
}
export const authController = new AuthController();
