import { Router } from 'express';
import cookieParser from 'cookie-parser';
import { authController } from '../controllers/auth.controller.js';
import { catchError } from '../utils/cathcError.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

export const authRouter = Router();

authRouter.post('/registration', catchError(authController.register));

authRouter.get(
  '/activation/:activationToken',
  catchError(authController.activate),
);
authRouter.post('/login', catchError(authController.login));
authRouter.get('/refresh', cookieParser(), catchError(authController.refresh));
authRouter.post('/logout', authMiddleware, catchError(authController.logout));
