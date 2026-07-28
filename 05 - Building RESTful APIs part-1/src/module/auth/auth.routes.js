import { Router  } from "express";
import * as controller from './auth.controller.js';
import validate from "../../common/middleware/validate.middleware.js";
import RegisterDto from "./dto/register.dto.js";
import { authenticate } from "./auth.middleware.js";
import LoginDto from "./dto/login.dto.js";
import ForgotPasswordDto from "./dto/forgot-password.dto.js";

const router = Router();

router.post('/register', validate(RegisterDto), controller.register);

router.get('/verifyEmail', controller.verifyEmail);

router.post('/login', validate(LoginDto), controller.login);

router.post('/logout', authenticate, controller.logout);

router.get('/profile', authenticate, controller.getMe);

router.post('/forgotPassword', validate(ForgotPasswordDto), controller.forgot_password);

export default router;