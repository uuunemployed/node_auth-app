import { Router } from 'express';
import { catchError } from '../utils/cathcError.js';
import { userController } from '../controllers/user.controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

export const userRouter = Router();

userRouter.post('/forgot-password', catchError(userController.forgotPassword));

userRouter.post(
  '/reset-password/:token',
  catchError(userController.resetPassword),
);

userRouter.patch(
  '/profile/name',
  authMiddleware,
  catchError(userController.updateName),
);

userRouter.patch(
  '/profile/password',
  authMiddleware,
  catchError(userController.changePassword),
);

userRouter.patch(
  '/profile/email',
  authMiddleware,
  catchError(userController.changeEmail),
);
