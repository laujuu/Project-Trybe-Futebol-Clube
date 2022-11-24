import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import LoginMiddleware from '../middlewares/login.middleware';

const router = Router();

const loginController = new LoginController();
const loginMiddleware = new LoginMiddleware();

router.post('/', loginMiddleware.validateLogin, loginController.loginUser.bind(loginController));

export default router;
